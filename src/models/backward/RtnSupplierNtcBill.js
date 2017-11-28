import { parse } from 'qs';
import { queryBill, insertBill, getRtnSupplierNtcBill, updateBill, abort, finish, genTask } from '../../services/backward/RtnSupplierNtcBillService';
import modelExtend from 'dva-model-extend';
import { pageModel } from '../../utils/BaseModel';
import { queryWrhs } from '../../services/basicinfo/Bin.js';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import { removeByValue } from '../../utils/ArrayUtils';
import { getbycode as getSupplier, querybypage as querySuppliers } from '../../services/basicinfo/Supplier';
import { message } from 'antd';
import { timeStamp2date } from '../../utils/DateUtils';

export default modelExtend(pageModel, {
    namespace: 'rtnSupplierNtcBill',
    state: {
        billItems: [],
        wrhs: [],
        showSupplierSelectModal: false,
        abortBillEntitys: [],
        batchAbortProcessModal: false,
        removeBillEntitys: [],
        batchRemoveProcessModal: false,
        finishBillEntitys: [],
        batchFinishProcessModal: false,
        genTaskBillEntitys: [],
        batchGenTaskProcessModal: false,
        suppliers: [],
        currentSupplier: {}
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/backward/rtnsupplierntcbill') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    });
                };
            });
        }
    },

    effects: {
        *query({ payload }, { call, put }) {
            const { data } = yield call(queryBill, parse(payload));
            if (data.status === '200') {
                if (data.obj.records) {
                    data.obj.records.map(function item() {
                        item.rtnDate = timeStamp2date(item.rtnDate);
                    });
                }

                yield put({
                    type: 'querySuccess',
                    payload: {
                        showPage: '',
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            size: 'default'
                        },
                        currentItem: {},
                        billItems: [],
                    }
                })
            }
        },

        *showCreate({ payload }, { call, put }) {
            const { data } = yield call(queryWrhs, {});
            if (data.status === '200') {
                const currentItem = {};
                if (payload.billItems.length === 0) {
                    const nullObj = {};
                    nullObj.line = 1;
                    nullObj.editable = true;
                    payload.billItems.push(nullObj);
                    currentItem.totalCaseQtyStr = 0;
                    currentItem.totalAmount = 0;
                    currentSupplier: { };
                }
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        wrhs: data.obj,
                        billItems: payload.billItems,
                        currentItem: currentItem
                    }
                })
            }
        },

        *querySuppliers({ payload }, { call, put }) {
            const result = yield call(querySuppliers, parse(payload));
            if (result) {
                const suppliers = [];
                for (var supplier of result.data.obj.records) {
                    const supplierUcn = new Object();
                    supplierUcn.uuid = supplier.uuid;
                    supplierUcn.code = supplier.code;
                    supplierUcn.name = supplier.name;
                    suppliers.push(supplierUcn);
                };

                yield put({
                    type: 'showSupplierModal',
                    payload: {
                        suppliers: suppliers,
                        pagination: {
                            total: result.data.obj.recordCount,
                            current: result.data.obj.page,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            size: 'default'
                        },
                    }
                });
            };
        },

        *getSupplier({ payload }, { call, put }) {
            const supplier = yield call(getSupplier, parse(payload));
            if (supplier) {
                const supplierUcn = new Object();
                supplierUcn.uuid = supplier.data.obj.uuid;
                supplierUcn.code = supplier.data.obj.code;
                supplierUcn.name = supplier.data.obj.name;
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        currentSupplier: supplierUcn
                    }
                });
            };
        },

        *getArticleInfo({ payload }, { call, put }) {
            if (payload.record.article == null || payload.record.article.code == "") {
                for (var key in payload.record) {
                    if (payload.record.hasOwnProperty(key)) {
                        delete payload.record[key];
                    }
                }
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        billItems: payload.list,
                    }
                });
                return;
            }
            const { data } = yield call(getArticleInfo, {
                articleCode: payload.record
                    .article.code
            });
            if (data.status === '200') {
                if (data.obj == null) {
                    message.warning("商品不存在，请重新输入", 2);
                    return;
                }
                payload.record.article.uuid = data.obj.uuid;
                payload.record.article.name = data.obj.name;
                payload.record.price = data.obj.purchasePrice;
                let qpcs = [];
                qpcs = data.obj.qpcs;
                if (qpcs) {
                    payload.record.qpcStr = qpcs[0].qpcStr;
                    payload.record.munit = qpcs[0].munit;
                }
                let suppliers = [];
                suppliers = data.obj.articleSuppliers;
                payload.record.qpcs = qpcs;
                payload.suppliers = suppliers;
                yield put({
                    type: 'showCreateSuccess',
                });
            }
        },

        *refreshMunit({ payload }, { call, put }) {
            for (var qpc of payload.record.qpcs) {
                if (qpc.qpcStr == payload.record.qpcStr) {
                    payload.record.munit = qpc.munit;
                };
            };
            yield put({
                type: 'showCreateSuccess',
            });
        },

        *calculateCaseQtyStr({ payload }, { call, put }) {
            if (payload.record.qty == "")
                return;
            if (payload.record.qpcStr == null || payload.record.qpcStr == '') {
                message.warning("请选择规格！", 2);
                return;
            }
            if (payload.record.qty == null)
                return;
            let qty = new Number();
            qty = Number.parseFloat(payload.record.qty);
            if (isNaN(qty)) {
                message.warning("数量格式错误，请正确输入数字", 2);
                return;
            }
            const { data } = yield call(qtyToCaseQtyStr, { qty: qty, qpcStr: payload.record.qpcStr });
            payload.record.caseQtyStr = data.obj;
            if (payload.record.price) {
                payload.record.amount = Number.parseFloat(payload.record.price) * qty;
            }
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if (payload.dataSource.length == 1) {
                totalCaseQtyStr = data.obj;
                totalAmount = payload.dataSource[0].amount;
            } else {
                for (let item of payload.dataSource) {                    
                    if (item.caseQtyStr == null || item.caseQtyStr == ""||item.qty==null)
                        continue;
                    totalAmount = Number.parseFloat(item.amount) + Number.parseFloat(totalAmount);
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, {
                        addend: totalCaseQtyStr,
                        augend: item.caseQtyStr
                    });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            if (isNaN(totalAmount))
                totalAmount = 0;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'showCreateSuccess',
            });
        },

        *addItem({ payload }, { call, put }) {
            const nullObj = new Object();
            nullObj.editable = true;
            payload.dataSource.push(nullObj);
            yield put({
                type: 'showCreateSuccess',
            });
        },

        *removeItem({ payload }, { call, put }) {
            removeByValue(payload.dataSource, payload.record);
            if (payload.dataSource.length == 0) {
                const nullObj = new Object();
                nullObj.line = 1;
                nullObj.editable = true;
                payload.dataSource.push(nullObj);
                payload.currentItem.totalCaseQtyStr = 0;
                payload.currentItem.totalAmount = 0;
            }
            else {
                if (payload.record.caseQtyStr != null) {
                    const { data } = yield call(caseQtyStrSubtract, { subStr: payload.currentItem.totalCaseQtyStr, subedStr: payload.record.caseQtyStr });
                    payload.currentItem.totalCaseQtyStr = data.obj;
                    payload.currentItem.totalAmount = Number.parseFloat(payload.currentItem.totalAmount) - Number.parseFloat(payload.record.amount);
                }
            };
            yield put({
                type: 'showCreateSuccess',
            })
        },

        *saveBill({ payload }, { call, put }) {
            const { data } = yield call(insertBill, parse(payload));
            yield put({
                type: 'showView',
                payload: {
                    uuid: data.obj
                }
            })
        },

        *showView({ payload }, { call, put }) {
            const { data } = yield call(getRtnSupplierNtcBill, { uuid: payload.uuid });
            if (data.status === '200') {
                yield put({
                    type: 'showViewSuccess',
                    payload: { currentItem: data.obj }
                });
            };
        },

        *showEdit({ payload }, { call, put }) {
            const { data } = yield call(getRtnSupplierNtcBill, { uuid: payload.uuid });
            if (data.status === '200') {
                const wrhsData = yield call(queryWrhs, {});
                for (var item of data.obj.items) {
                    const { data } = yield call(getArticleInfo, {
                        articleCode: item.article.code
                    });
                    if (data.status === '200') {
                        if (data.obj == null) {
                            message.warning("商品不存在，请重新输入", 2);
                            return;
                        }
                        let qpcs = [];
                        qpcs = data.obj.qpcs;
                        item.qpcs = qpcs;
                    };

                }
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        currentItem: data.obj,
                        billItems: data.obj.items,
                        wrhs: wrhsData.data.obj,
                        currentSupplier: data.obj.supplier
                    }
                })
            }
        },

        *updateBill({ payload }, { call, put }) {
            const { data } = yield call(updateBill, parse(payload));
            yield put({
                type: 'showView',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *abort({ payload }, { call, put }) {
            yield call(abort, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'query',
                payload: {}
            })
        },

        *gridAbort({ payload }, { call, put }) {
            yield call(abort, { uuid: payload.uuid, version: payload.version });
        },

        *gridFinish({ payload }, { call, put }) {
            yield call(finish, { uuid: payload.uuid, version: payload.version });
        },

        *finish({ payload }, { call, put }) {
            yield call(finish, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'showView',
                payload: payload
            })
        },

        *refreshAmount({ payload }, { call, put }) {
            if (payload.record.qty) {
                if (payload.record.qty == null)
                    return;
                let qty = Number.parseFloat(payload.record.qty);
                if (isNaN(qty)) {
                    message.warning("数量格式错误，请正确输入数字", 2);
                    return;
                }
                let amount = Number.parseFloat(qty) * Number.parseFloat(payload.record.price);
                let totalAmount = 0;
                payload.record.amount = amount;
                for (var item of payload.dataSource) {
                    totalAmount = Number.parseFloat(totalAmount) + Number.parseFloat(item.amount);
                };
                payload.currentItem.totalAmount = totalAmount;
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        billItems: payload.dataSource,
                        currentItem: payload.currentItem
                    }
                })
            }
        },

        *genTask({ payload }, { call, put }) {
            const { data } = yield call(genTask, { uuid: payload.uuid, version: payload.version });
            if (data.status == "200") {
                yield put({
                    type: 'showView',
                    payload: { uuid: payload.uuid }
                })
            }
        }
    },

    reducers: {
        showCreateSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'create' };
        },
        showSupplierModal(state, action) {
            return { ...state, ...action.payload, showSupplierSelectModal: true }
        },
        hideSupplierModal(state, action) {
            return { ...state, ...action.payload, showSupplierSelectModal: false }
        },
        selectSupplier(state, action) {
            return {
                ...state,
                currentSupplier: {
                    uuid: action.payload.uuid,
                    code: action.payload.code,
                    name: action.payload.name
                },
                showSupplierSelectModal: false,
            }
        },
        showViewSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'view' };
        },
        batchAbortBill(state, action) {
            return { ...state, ...action.payload, batchAbortProcessModal: true }
        },
        hideAbortBillModal(state) {
            return { ...state, batchAbortProcessModal: false }
        },
        batchRemoveBill(state, action) {
            return { ...state, ...action.payload, batchRemoveProcessModal: true }
        },
        hideRemoveBillModal(state) {
            return { ...state, batchRemoveProcessModal: false }
        },
        batchFinishBill(state, action) {
            return { ...state, ...action.payload, batchFinishProcessModal: true }
        },
        hideFinishBillModal(state) {
            return { ...state, batchFinishProcessModal: false }
        },
        batchGenTask(state, action) {
            return { ...state, ...action.payload, batchGenTaskProcessModal: true }
        },
        hideGenTaskModal(state) {
            return { ...state, batchGenTaskProcessModal: false }
        }
    }
})