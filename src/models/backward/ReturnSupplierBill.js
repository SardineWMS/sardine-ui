import { parse } from 'qs';
import { querybypage, get, finish } from '../../services/backward/ReturnSupplierBill.js';
import {queryWrhs} from '../../services/basicinfo/Bin.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    namespace: 'returnSupplierBill',
    state: {
        list: [],
        wrhs:[],
        currentReturnSupplierBill: {},
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
        finishReturnSupplierBillEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/backward/returnSupplierBill') {
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
            const returnSupplierBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (returnSupplierBill) {
                returnSupplierBill.data.obj.productionDate = moment(returnSupplierBill.data.obj.productionDate);
                returnSupplierBill.data.obj.validDate = moment(returnSupplierBill.data.obj.validDate);
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentReturnSupplierBill: returnSupplierBill.data.obj
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

        *queryWrhs({ payload }, { call, put }) {
            const wrhs = yield call(queryWrhs, parse(payload));
            if (wrhs) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        wrhs: wrhs.data.obj
                    }
                });
            };
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
        batchFinishReturnSupplierBill(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                batchFinishProcessModal: true };
        },
        hideFinishReturnSupplierBillModal(state, action) {
            return { ...state, batchFinishProcessModal: false };
        }
    }
};