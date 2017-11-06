import { parse } from 'qs';
import { getByCode as getCustomerByCode } from '../../services/basicinfo/Customer.js';
import { message } from 'antd';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import { insertRtnNtcBill, queryRtnNtcBill, getRtnNtcBill, updateRtnNtcBill, remove, finish, abort, genRtnBill } from '../../services/backward/RtnNtcBillService';
import { removeByValue } from '../../utils/ArrayUtils';


export default {
    namespace: 'rtnNtcBill',
    state: {
        list: [],
        currentItem: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showPage: '',
        showCustomerSelectModal: false,
        rtnNtcBillItems: [],//明细集合
        qpcs: [],
        batchDeleteProcessModal: false,
        deleteRtnNtcBillEntitys: [],
        batchAbortProcessModal: false,
        abortRtnNtcBillEntitys: [],
        batchGenRtnBillProcessModal: false,
        genRtnBillRtnNtcBillEntitys: [],
        batchFinishProcessModal: false,
        finishRtnNtcBillEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/backward/rtnNtcBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    });
                };
            });
        }
    },

    effects: {
        *query({
            payload
        }, { call, put }) {
            const { data } = yield call(queryRtnNtcBill, parse(payload));
            if (data.status === '200') {
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
                        rtnNtcBillItems: []
                    }
                })
            }
        },

        *showCreate({ payload }, { call, put }) {
            const currentItem = {};
            if (payload.rtnNtcBillItems.length === 0) {
                const nullObj = {};
                nullObj.line = 1;
                nullObj.editable = true;
                payload.rtnNtcBillItems.push(nullObj);
                currentItem.totalCaseQtyStr = 0;
                currentItem.totalAmount = 0;
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.rtnNtcBillItems,
                    currentItem: currentItem
                }
            })
        },

        *getCustomerByCode({ payload }, { call, put }) {
            const { data } = yield call(getCustomerByCode, { customerCode: payload.code });
            if (data.status === '200') {
                if (data.obj === null) {
                    message.warning("客户不存在，请重新输入", 2);
                    return;
                } else {
                    const customer = {};
                    payload.currentItem.customer = customer;
                    customer.code = data.obj.code;
                    customer.uuid = data.obj.uuid;
                    customer.name = data.obj.name;

                    yield put({
                        type: 'showCreateSuccess',
                        payload: {
                            currentItem: payload.currentItem,
                        }
                    })
                }
            }
        },

        *getArticleInfo({ payload }, { call, put }) {
            if (payload.record.article == null || payload.record.article.code == "")
                return;
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
                let qpcs = [];
                data.obj.qpcs.map(function (articleQpc) {
                    const qpcInfo = new Object();
                    qpcInfo.munit = articleQpc.munit;
                    qpcInfo.qpcStr = articleQpc.qpcStr;
                    qpcs.push(qpcInfo);
                    if (articleQpc.default_) {
                        payload.record.qpcStr = articleQpc.qpcStr;
                        payload.record.munit = articleQpc.munit;
                    }
                });
                let suppliers = [];
                suppliers = data.obj.articleSuppliers;
                payload.record.qpcs = qpcs;
                payload.record.suppliers = suppliers;
                payload.record.price = data.obj.purchasePrice;
                for (let supplier of suppliers) {
                    if (supplier.default_) {
                        let supplierObj = {};
                        supplierObj.code = supplier.supplierCode;
                        supplierObj.uuid = supplier.supplierUuid;
                        supplierObj.name = supplier.supplierName;
                        payload.record.supplier = supplierObj;
                        break;
                    }
                }
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        rtnNtcBillItems: payload.list,
                    }
                });
            }
        },

        *refreshMunit({ payload }, { call, put }) {
            for (var qpc of payload.record.qpcs) {
                if (qpc.qpcStr == payload.record.qpcStr) {
                    payload.record.munit = qpc.munit;
                };
            };
            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.munit = payload.record.munit;
                }
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.dataSource
                }
            });
        },

        *getSupplierInfo({ payload }, { call, put }) {
            if (payload.record.supplier == null || payload.record.supplier.code == "")
                return;
            if (payload.record.article == null) {
                message.warning("请先输入商品", 2);
                return;
            }
            if (payload.record.suppliers == null || payload.record.suppliers.length <= 0) {
                message.warning("商品不存在供应商，不能退仓", 2, '');
                return;
            }
            for (var supplier of payload.record.suppliers) {

                if (payload.record.supplier.uuid != null) {
                    if (supplier.supplierUuid == payload.record.supplier.uuid && supplier.supplierCode != payload.record.supplier.code) {
                        payload.record.supplier.uuid = null;
                        payload.record.supplier.name = null;
                    }
                };
                if (payload.record.supplier.code == supplier.supplierCode) {
                    payload.record.supplier.uuid = supplier.supplierUuid;
                    payload.record.supplier.name = supplier.supplierName;
                };
            };
            if (payload.record.supplier.uuid == null) {
                message.warning("供应商不是该商品供应商，请重新输入", 2);
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.dataSource
                }
            });
        },

        *addItem({ payload }, { call, put }) {
            const nullObj = new Object();
            nullObj.line = payload.dataSource.length + 1;
            nullObj.editable = true;
            payload.dataSource.push(nullObj);
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.dataSource
                }
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
            for (let item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.caseQtyStr = data.obj;
                    if (payload.record.price) {
                        item.amount = Number.parseFloat(payload.record.price) * qty;
                    }
                };
            };
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if (payload.dataSource.length == 1) {
                totalCaseQtyStr = data.obj;
                totalAmount = payload.dataSource[0].amount;
            } else {
                for (let item of payload.dataSource) {
                    totalAmount = Number.parseFloat(item.amount) + Number.parseFloat(totalAmount);
                    if (item.caseQtyStr == null || item.caseQtyStr == "")
                        continue;

                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, {
                        addend: totalCaseQtyStr,
                        augend: item.caseQtyStr
                    });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            // const caseQtyStrResult = yield call(caseQtyStrAdd, {
            //     addend: payload.currentItem.totalCaseQtyStr,
            //     augend: data.obj
            // });
            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            if (isNaN(totalAmount))
                totalAmount = 0;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.dataSource,
                    currentItem: payload.currentItem
                }
            });
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
                for (var item of payload.dataSource) {
                    if (item.line == payload.record.line) {
                        item.price = payload.record.price;
                        item.amount = amount;
                    }
                    totalAmount = Number.parseFloat(totalAmount) + Number.parseFloat(amount);
                };
                payload.currentItem.totalAmount = totalAmount;
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        rtnNtcBillItems: payload.dataSource,
                        currentItem: payload.currentItem
                    }
                })
            }
        },

        *saveRtnNtcBill({ payload }, { call, put }) {
            const { data } = yield call(insertRtnNtcBill, parse(payload));
            yield put({
                type: 'showView',
                payload: {
                    uuid: data.obj
                }
            })
        },

        *updateRtnNtcBill({ payload }, { call, put }) {
            const { data } = yield call(updateRtnNtcBill, parse(payload));
            yield put({
                type: 'showView',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *showView({ payload }, { call, put }) {
            const { data } = yield call(getRtnNtcBill, { uuid: payload.uuid });
            if (data.status === '200') {
                yield put({
                    type: 'showViewSuccess',
                    payload: { currentItem: data.obj }
                });
            };
        },

        *showEdit({ payload }, { call, put }) {
            const { data } = yield call(getRtnNtcBill, { uuid: payload.uuid });
            if (data.status === '200') {
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
                        let suppliers = [];
                        suppliers = data.obj.articleSuppliers;
                        item.qpcs = qpcs;
                        item.suppliers = suppliers;
                    };

                }
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        currentItem: data.obj,
                        rtnNtcBillItems: data.obj.items
                    }
                })
            }
        },

        *removeItem({ payload }, { call, put }) {
            for (let item of payload.dataSource) {
                if (payload.record.line == item.line) {
                    removeByValue(payload.dataSource, item);
                    if (payload.dataSource.length == 0) {
                        const nullObj = new Object();
                        nullObj.line = 1;
                        nullObj.editable = true;
                        payload.dataSource.push(nullObj);
                        payload.currentItem.totalCaseQtyStr = 0;
                        payload.currentItem.totalAmount = 0;
                    }
                    else {
                        if (item.caseQtyStr != null) {
                            const { data } = yield call(caseQtyStrSubtract, { subStr: payload.currentItem.totalCaseQtyStr, subedStr: item.caseQtyStr });
                            payload.currentItem.totalCaseQtyStr = data.obj;
                            payload.currentItem.totalAmount = Number.parseFloat(payload.currentItem.totalAmount) - Number.parseFloat(item.amount);
                        }
                    };
                };
            };
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].line = i + 1;
            };
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    rtnNtcBillItems: payload.dataSource
                }
            })
        },

        *remove({ payload }, { call, put }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query',
                payload: {}
            })
        },

        *finish({ payload }, { call, put }) {
            yield call(finish, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'showView',
                payload: payload
            })
        },

        *gridFinish({ payload }, { call, put }) {
            yield call(finish, { uuid: payload.uuid, version: payload.version });
        },

        *abort({ payload }, { call, put }) {
            yield call(abort, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'showView',
                payload: payload
            })
        },

        *gridAbort({ payload }, { call, put }) {
            yield call(abort, { uuid: payload.uuid, version: payload.version });
        },

        *gridGenRtnBill({ payload }, { call, put }) {
            yield call(genRtnBill, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'showView',
                payload: payload
            })
        }

    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        showCreateSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'create' }
        },
        showCustomerModal(state) {
            return { ...state, showCustomerSelectModal: true }
        },
        hideCustomerModal(state, action) {
            return { ...state, ...action.payload, showCustomerSelectModal: false }
        },
        showViewSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'view' }
        },
        batchDeleteRtnNtcBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true }
        },
        hideDeleteRtnNtcBillModal(state) {
            return { ...state, batchDeleteProcessModal: false }
        },
        batchAbortRtnNtcBill(state, action) {
            return { ...state, ...action.payload, batchAbortProcessModal: true }
        },
        hideAbortRtnNtcBillModal(state) {
            return { ...state, batchAbortProcessModal: false }
        },
        batchGenRtnBill(state, action) {
            return { ...state, ...action.payload, batchGenRtnBillProcessModal: true }
        },
        hideGenRtnBillRtnNtcBillModal(state) {
            return { ...state, batchGenRtnBillProcessModal: false }
        },
        batchFinishBill(state, action) {
            return { ...state, ...action.payload, batchFinishProcessModal: true }
        },
        hideFinishRtnNtcBillModal(state) {
            return { ...state, batchFinishProcessModal: false }
        },

    }
};