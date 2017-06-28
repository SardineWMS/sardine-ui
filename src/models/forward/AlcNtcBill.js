import { parse } from 'qs';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { removeByValue } from '../../utils/ArrayUtils';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import { getByCode as getCustomerInfo } from '../../services/basicinfo/Customer';
import { message } from 'antd';
import { queryWrhs, getBinByCode } from '../../services/basicinfo/Bin.js';
import { get, insert, update, queryAlcNtcBill, remove, audit, abort } from '../../services/forward/AlcNtcBill';

export default {
    namespace: 'alcNtc',
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
        billItems: [],//当前单据明细集合
        qpcs: [],//货品规格及计量单位集合
        wrhs: [],//仓位
        batchDeleteProcessModal: false,
        deleteAlcNtcBillEntitys: [],
        batchFinishProcessModal: false,
        finishAlcNtcBillEntitys: [],
        batchAbortProcessModal: false,
        abortAlcNtcBillEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/alcNtcBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                };
            });
        }
    },

    effects: {
        *query({
          payload
      }, { call, put }) {
            const { data } = yield call(queryAlcNtcBill, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        showPage: '',
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page
                        },
                        currentItem: {},
                        billItems: []
                    }
                });
            };
        },

        *showCreate({ payload }, { call, put }) {
            const billItem = new Object();
            billItem.line = 1;
            billItem.editable = true;
            const list = [];
            list.push(billItem);
            const currentItem = {};
            currentItem.totalCaseQtyStr = 0;
            currentItem.totalAmount = 0;
            const { data } = yield call(queryWrhs, {});

            yield put({
                type: 'createSuccess',
                payload: {
                    billItems: list,
                    currentItem: currentItem,
                    wrhs: data.obj
                }
            });
        },

        *getArticleInfo({ payload }, { call, put }) {
            const { data } = yield call(getArticleInfo, {
                articleCode: payload.record.article.code,
            });
            if (data) {
                payload.record.article.uuid = data.obj.uuid;
                payload.record.article.name = data.obj.name;
                const qpcs = [];
                for (var qpc of data.obj.qpcs) {
                    qpcs.push(qpc);
                };
                for (var item of payload.dataSource) {
                    if (item.line == payload.record.line) {
                        item.article.uuid = data.obj.uuid;
                        item.article.name = data.obj.name;
                        item.qpcs = qpcs;
                    };
                };

                yield put({
                    type: 'createSuccess',
                    payload: {
                        billItems: payload.dataSource,
                        qpcs: qpcs
                    }
                });
            };
        },

        *refreshMunit({ payload }, { call, put }) {
            for (var qpc of payload.record.qpcs) {
                if (qpc.qpcStr == payload.record.qpcStr) {
                    payload.record.munit = qpc.munit;
                };
            };
            const { data } = yield call(queryStock, {
                articleUuid: payload.record.article.uuid,
                qpcStr: payload.record.qpcStr
            });

            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.munit = payload.record.munit;
                    item.price = data.obj.price;
                };
            };

            yield put({
                type: 'createSuccess',
                payload: {
                    billItems: payload.dataSource
                }
            });
        },

        *calculateCaseQtyStr({ payload }, { call, put }) {
            if (payload.record.qpcStr == null || payload.record.qpcStr == '') {
                message.warning("请选择规格！", 2, '');
                return;
            };
            let qty = new Number();
            qty = Number.parseFloat(payload.record.qty);
            if (isNaN(qty)) {
                message.warning("数量格式错误，请正确输入数字", 2, '');
                return;
            };
            const { data } = yield call(qtyToCaseQtyStr, {
                qty: qty,
                qpcStr: payload.record.qpcStr
            });
            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.caseQtyStr = data.obj;
                    item.amount = Number.parseFloat(payload.record.price) * qty;
                };
            };
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if (payload.dataSource.length == 1) {
                totalCaseQtyStr = data.obj;
                totalAmount = payload.dataSource[0].amount;
            }
            else {
                for (var item of payload.dataSource) {
                    totalAmount = Number.parseFloat(item.amount) + Number.parseFloat(totalAmount);
                    if (item.caseQtyStr == 0 || item.caseQtyStr == '')
                        continue;
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, {
                        addend: totalCaseQtyStr, augend: item.caseQtyStr
                    });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            const caseQtyStrResult = yield call(caseQtyStrAdd, {
                addend: payload.currentItem.totalCaseQtyStr, augend: data.obj
            });
            // let totalAmount = 0;
            // totalAmount = payload.record.price * payload.record.qty + payload.currentItem.totalAmount;
            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'createSuccess',
                payload: {
                    billItems: payload.dataSource,
                    currentItem: payload.currentItem
                }
            });
        },

        *addItem({ payload }, { call, put }) {
            const nullObj = new Object();
            nullObj.line = payload.dataSource.length + 1;
            nullObj.editable = true;
            payload.dataSource.push(nullObj);
            yield put({
                type: 'createSuccess',
                payload: {
                    billItems: payload.dataSource
                }
            });
        },

        *removeItem({ payload }, { call, put }) {
            for (var item of payload.dataSource) {
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
                        const { data } = yield call(caseQtyStrSubtract, { subStr: payload.currentItem.totalCaseQtyStr, subedStr: item.caseQtyStr });
                        payload.currentItem.totalCaseQtyStr = data.obj;
                        payload.currentItem.totalAmount = Number.parseFloat(payload.currentItem.totalAmount) - Number.parseFloat(item.amount);
                    };
                };
            };
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].line = i + 1;
            };
            yield put({
                type: 'createSuccess',
                payload: {
                    billItems: payload.dataSource
                }
            });
        },

        *checkCustomer({ payload }, { call, put }) {
            const { data } = yield call(getCustomerInfo, {
                customerCode: payload.value
            });
            if (data) {
                if (data.obj == null) {
                    message.warning("客户不存在，请重新输入", 2, '');
                    return;
                }
                else if (data.obj.state == 'deleted') {
                    message.warning("该客户已被删除，请重新输入", 2, '');
                    return;
                };
                payload.currentItem.customer.uuid = data.obj.uuid;
                payload.currentItem.customer.code = data.obj.code;
                payload.currentItem.customer.name = data.obj.name;

                yield put({
                    type: 'createSuccess',
                    payload: {
                        currentItem: payload.currentItem
                    }
                });
            };
        },

        *update({ payload }, { call, put }) {
            const { data } = yield call(update, parse(payload));
            yield put({
                type: 'viewAlcNtc',
                payload: payload
            });
        },

        *viewAlcNtc({ payload }, { call, put }) {
            const { data } = yield call(get, { uuid: payload.uuid });
            if (data) {
                yield put({
                    type: 'viewSuccess',
                    payload: {
                        currentItem: data.obj,
                        billItems: data.obj.item
                    }
                });
            };
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data) {
                const alcNtcBillResult = yield call(get, {
                    uuid: data.obj
                });
                if (alcNtcBillResult) {
                    yield put({
                        type: 'viewSuccess',
                        payload: {
                            currentItem: alcNtcBillResult.data.obj,
                            billItems: alcNtcBillResult.data.obj.items
                        }
                    });
                };
            };
        },

        *edit({ payload }, { call, put }) {
            const { data } = yield call(get, { uuid: payload.uuid });
            if (data) {
                yield put({
                    type: 'createSuccess',
                    payload: {
                        currentItem: data.obj,
                        billItems: data.obj.items
                    }
                });
            };
        },

        *gridRemove({ payload }, { call, put }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query',
                payload: {}
            });
        },

        *gridAudit({ payload }, { call, put }) {
            yield call(audit, {
                uuid: payload.uuid, version: payload.version
            });
            yield put({
                type: 'query',
                payload: {}
            });
        },

        *gridAbort({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid, version: payload.version
            });
            yield put({
                type: 'query',
                payload: {}
            });
        }

    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        createSuccess(state, action) {
            return {
                ...state, showPage: 'create', ...action
                    .payload
            };
        },
        viewSuccess(state, action) {
            return {
                ...state, showPage: 'view', ...action.payload
            };
        },
        batchDeleteAlcNtcBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true };
        },
        batchAuditAlcNtcBill(state, action) {
            return { ...state, ...action.payload, batchFinishProcessModal: true };
        },
        batchAbortAlcNtcBill(state, action) {
            return { ...state, ...action.payload, batchAbortProcessModal: true };
        },
        hideDeleteAlcNtcBillModal(state, action) {
            return { ...state, batchDeleteProcessModal: false };
        },
        hideFinishAlcNtcBillModal(state, action) {
            return { ...state, batchFinishProcessModal: false };
        },
        hideAbortAlcNtcBillModal(state, action) {
            return { ...state, batchAbortProcessModal: false };
        },
    }
}