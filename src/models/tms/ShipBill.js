import { parse } from 'qs';
import { querybypage, get, finish, insert, update, getByBillNumber, calculateVolume, calculateWeight } from '../../services/tms/ShipBill.js';
import { getByCode as getArticleInfo, getArticleQpcByQpcStr } from '../../services/basicinfo/Article.js';
import { getBinByWrhAndUsage } from '../../services/basicinfo/Bin.js';
import { qtyToCaseQtyStr, caseQtyStrAdd } from '../../services/common/common.js';
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    namespace: 'shipBill',
    state: {
        list: [],
        currentShipBill: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showPage: '',
        batchFinishProcessModal: false,
        finishShipBillEntitys: [],
        showCarrierModal: false,
        showDriverModal: false,
        billItems: [],
        showVehicleModal: false,
        showCreateItemModal: false,
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/tms/shipBill') {
                    if(location.query.type == 'showEdit'){
                        dispatch({
                             type: 'showEdit',
                             payload:{
                                containerStocks: JSON.parse(location.query.key)
                             }
                        });
                    }
                    else
                    {
                        dispatch({
                            type: 'query',
                            payload: location.query
                        });   
                    }
       
                };
            });
        }
    },

    effects: {
        *query({ payload }, { call, put }) {
            const { data } = yield call(querybypage, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共${total}条`,
                            size: 'default'
                        }
                    }
                });
            };
        },

        *get({ payload }, { call, put }) {
            const shipBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (shipBill) {
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentShipBill: shipBill.data.obj
                    }
                });
            };
        },

        *getByBillNumber({ payload }, { call, put }) {
            const { data } = yield call(getByBillNumber, { billNumber: payload });
            if (data.status == "200") {
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentShipBill: data.obj
                    }
                });
            }
        },

        *itemFinish({ payload }, { call, put }) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *gridFinish({ payload }, { call, put }) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *showCreate({ payload }, { call, put }) {
            const currentShipBill = {};
            if (payload.billItems.length === 0) {
                const nullObj = {};
                nullObj.editable = true;
                payload.billItems.push(nullObj);
                currentShipBill.totalCaseQty = 0;
                currentShipBill.totalAmount = 0;
                currentShipBill.totalVolume = 0;
                currentShipBill.totalWeight = 0;
            }
            yield put({
                type: 'showCreatePage',
                payload: {
                    billItems: [],
                    currentShipBill: currentShipBill
                }
            })
        },

        *calculateCaseQtyStr({ payload }, { call, put }) {
            if (isNaN(Number.parseFloat(payload.record.qty))) {
                message.error("数量格式不正确，请正确输入数字", 2);
                return;
            };
            const { data } = yield call(qtyToCaseQtyStr, { qty: Number(payload.record.qty), qpcStr: payload.record.qpcStr });
            payload.record.caseQtyStr = data.obj;
            let totalCaseQty = "0";
            let totalAmount = 0;
            let totalVolume = 0;
            let totalWeight = 0;

            for (let item of payload.list) {
                const { data } = yield call(getArticleQpcByQpcStr, { articleUuid: item.article.uuid, qpcStr: item.qpcStr });

                const volumeResult = yield call(calculateVolume, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty })
                if (volumeResult && volumeResult.data.status == "200")
                    totalVolume = totalVolume + volumeResult.data.obj;
                totalAmount = totalAmount + item.price * item.qty;
                const result = yield call(qtyToCaseQtyStr, { qty: item.qty, qpcStr: item.qpcStr });
                item.caseQtyStr = result.data.obj;
                const totalCaseQtyStr = yield call(caseQtyStrAdd, { addend: totalCaseQty, augend: item.caseQtyStr });
                totalCaseQty = totalCaseQtyStr.data.obj;

                const weightResult = yield call(calculateWeight, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty });
                if (weightResult && weightResult.data.status == "200")
                    totalWeight = totalWeight + weightResult.data.obj;
            }
            payload.currentShipBill.totalAmount = totalAmount;
            payload.currentShipBill.totalCaseQty = totalCaseQty;
            payload.currentShipBill.totalVolume = totalVolume;
            payload.currentShipBill.totalWeight = totalWeight;
            yield put({
                type: 'showCreatePage'
            })
        },

        *saveNew({ payload }, { call, put }) {
            const { data } = yield call(insert, payload);
            if (data.status == "200") {
                yield put({
                    type: 'getByBillNumber',
                    payload: data.obj
                })
            }
        },

        *saveModify({ payload }, { call, put }) {
            const { data } = yield call(update, payload);
            if (data.status == "200") {
                yield put({
                    type: 'getByBillNumber',
                    payload: payload.billNumber
                })
            }
        },

        *showEdit({ payload }, { call, put }) {
            yield put({
                type: 'showCreatePage',
                payload: {
                    currentShipBill: payload,
                    billItems: payload.containerStocks
                }
            })
        },

        *selectItems({ payload }, { call, put }) {
            let totalCaseQty = "0";
            let totalAmount = 0;
            let totalVolume = 0;
            let billItems = [];
            let totalWeight = 0;
            if (payload.billItems != null && payload.billItems.length > 0)
                for (let i of payload.billItems) {
                    billItems.push(i);
                    for (let j of payload.list) {
                        if (i.article.uuid == j.article.uuid && i.customer.uuid == j.customer.uuid && i.qpcStr == j.qpcStr && i.binCode == j.binCode && i.containerBarcode == j.containerBarcode)
                            continue;
                        billItems.push(j);
                    }
                }
            else billItems = payload.list;


            for (let item of billItems) {
                const { data } = yield call(getArticleQpcByQpcStr, { articleUuid: item.article.uuid, qpcStr: item.qpcStr });
                const volumeResult = yield call(calculateVolume, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty })
                if (volumeResult && volumeResult.data.status == "200")
                    totalVolume = totalVolume + volumeResult.data.obj;
                totalAmount = totalAmount + item.price * item.qty;
                const result = yield call(qtyToCaseQtyStr, { qty: item.qty, qpcStr: item.qpcStr });
                item.caseQtyStr = result.data.obj;
                const totalCaseQtyStr = yield call(caseQtyStrAdd, { addend: totalCaseQty, augend: item.caseQtyStr });
                totalCaseQty = totalCaseQtyStr.data.obj;
                const weightResult = yield call(calculateWeight, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty });
                if (weightResult && weightResult.data.status == "200")
                    totalWeight = totalWeight + weightResult.data.obj;
            }
            payload.currentShipBill.totalAmount = totalAmount;
            payload.currentShipBill.totalCaseQty = totalCaseQty;
            payload.currentShipBill.totalVolume = totalVolume;
            payload.currentShipBill.totalWeight = totalWeight;
            yield put({
                type: 'hideAddItemModal',
                payload: {
                    billItems: billItems,
                    currentShipBill: payload.currentShipBill
                }
            })
        },

        *removeBatch({ payload }, { call, put }) {
            let billItems = [];
            let totalCaseQty = "0";
            let totalAmount = 0;
            let totalVolume = 0;
            let totalWeight = 0;
            if (payload.lists != null && payload.lists.length > 0)
                for (let list of payload.lists) {
                    for (let item of payload.billItems) {
                        if (item.uuid == list.uuid)
                            continue;
                        billItems.push(item);
                    }
                }
            else billItems = payload.billItems;

            for (let item of billItems) {
                const { data } = yield call(getArticleQpcByQpcStr, { articleUuid: item.article.uuid, qpcStr: item.qpcStr });
                const volumeResult = yield call(calculateVolume, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty })
                if (volumeResult && volumeResult.data.status == "200")
                    totalVolume = totalVolume + volumeResult.data.obj;
                totalAmount = totalAmount + item.price * item.qty;
                const result = yield call(qtyToCaseQtyStr, { qty: item.qty, qpcStr: item.qpcStr });
                item.caseQtyStr = result.data.obj;
                const totalCaseQtyStr = yield call(caseQtyStrAdd, { addend: totalCaseQty, augend: item.caseQtyStr });
                totalCaseQty = totalCaseQtyStr.data.obj;
                const weightResult = yield call(calculateWeight, { articleUuid: item.article.uuid, qpcStr: item.qpcStr, qty: item.qty });
                if (weightResult && weightResult.data.status == "200")
                    totalWeight = totalWeight + weightResult.data.obj;
            }
            payload.currentShipBill.totalAmount = totalAmount;
            payload.currentShipBill.totalCaseQty = totalCaseQty;
            payload.currentShipBill.totalVolume = totalVolume;
            payload.currentShipBill.totalWeight = totalWeight;
            yield put({
                type: 'showCreatePage',
                payload: {
                    billItems: billItems,
                    currentShipBill: payload.currentShipBill
                }
            })
        }


    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload, showPage: '' };
        },
        showViewPage(state, action) {
            return {
                ...state,
                ...action.payload,
                showPage: 'view'
            };
        },
        backSearchForm(state) {
            return {
                ...state,
                loading: false,
                showPage: 'search'
            };
        },
        batchFinishShipBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchFinishProcessModal: true
            };
        },
        hideFinishShipBillModal(state, action) {
            return { ...state, batchFinishProcessModal: false };
        },
        showCreatePage(state, action) {
            return { ...state, ...action.payload, showPage: 'create' }
        },
        showCarrierModal(state, action) {
            return { ...state, showCarrierModal: true }
        },
        hideCarrierModal(state, action) {
            return { ...state, ...action.payload, showCarrierModal: false }
        },
        showDriverModal(state, action) {
            return { ...state, showDriverModal: true }
        },
        hideDriverModal(state, action) {
            return { ...state, ...action.payload, showDriverModal: false }
        },
        showVehicleModal(state, action) {
            return { ...state, ...action, showVehicleModal: true }
        },
        hideVehicleModal(state, action) {
            return { ...state, ...action, showVehicleModal: false }
        },
        showAddItem(state, action) {
            return { ...state, ...action.payload, showCreateItemModal: true }
        },
        hideAddItemModal(state, action) {
            return { ...state, ...action.payload, showCreateItemModal: false }
        }
    }
};