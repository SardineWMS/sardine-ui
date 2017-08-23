import { parse } from 'qs';
import { querybypage, get, finish } from '../../services/tms/ShipBill.js';
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
        finishShipBillEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/tms/shipBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
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
                shipBill.data.obj.productionDate = moment(shipBill.data.obj.productionDate);
                shipBill.data.obj.validDate = moment(shipBill.data.obj.validDate);
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentShipBill: shipBill.data.obj
                    }
                });
            };
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


    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        showViewPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
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
                batchFinishProcessModal: true };
        },
        hideFinishShipBillModal(state, action) {
            return { ...state, batchFinishProcessModal: false };
        }
    }
};