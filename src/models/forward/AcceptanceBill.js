import { parse } from 'qs';
import { querybypage, get, create, edit, remove, finish, abort,
    queryCustomers,queryWrhs,refreshCaseQtyAndAmount,approve,beginalc} from '../../services/forward/AcceptanceBill';
import {queryStockExtendInfo} from '../../services/common/common.js'; 
import { message } from 'antd';

export default {
    namespace: 'acceptanceBill',
    state: {
        list: [],
        currentAcceptanceBill: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        supplierPagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showPage: '',
        batchDeleteProcessModal: false,
        deleteAcceptanceBillEntitys: [],
        batchApproveProcessModal: false,
        approveAcceptanceBillEntitys: [],
        batchAlcProcessModal: false,
        alcAcceptanceBillEntitys: [],
        batchFinishProcessModal: false,
        finishAcceptanceBillEntitys: [],
        batchAbortProcessModal: false,
        abortAcceptanceBillEntitys: [],
        customerModalVisible:false,
        wrhs:[],
        stocks:[]
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/acceptanceBill') {
             
                        dispatch({
                            type: 'query',
                            payload: location.query,
                        })
                    }
            })
        }
    },

    effects: {
        *query({ payload }, { call, put }) {
            const { data } = yield call(querybypage, parse(payload));
            yield put({
                type: 'querySuccess',
                payload: {
                    list: data.obj.records,
                    pagination: {
                        total: data.obj.recordCount,
                        current: data.obj.page,
                    }
                }
            })
        },

        *get({ payload }, { call, put }) {
            const acceptanceBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (acceptanceBill) {
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentAcceptanceBill: acceptanceBill.data.obj,
                    }
                })
            }
        },

        *create({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(create, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: data.obj
                }
            })
        },

        *editItem({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(edit, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

       *editGrid({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(edit, parse(payload));
            yield put({
                type: 'query',
            })
        },


        *approveItem({ payload }, { call, put }) {
            yield call(approve, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *approveGrid({ payload }, { call, put }) {
            yield call(approve, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },

        *beginAlcItem({ payload }, { call, put }) {
            yield call(beginalc, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *beginAlcGrid({ payload }, { call, put }) {
            yield call(beginalc, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },

        *finishItem({ payload }, { call, put }) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *finishGrid({ payload }, { call, put }) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },

       *abortItem({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            })
        },

        *abortGrid({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },


        *remove({ payload }, { call, put }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },

        *queryCustomers({ payload }, { call, put }) {
            const result = yield call(queryCustomers, parse(payload));
            if (result) {
                const customers=[];
                for (var customer of result.data.obj.records) {
                    const customerUcn=new Object();
                    customerUcn.uuid=customer.uuid;
                    customerUcn.code=customer.code;
                    customerUcn.name=customer.name;
                    customers.push(customerUcn);
                }

                yield put({
                    type: 'showCustomerModal',
                    payload: {
                        customers: customers,
                        customersagination: {
                            total: result.data.obj.recordCount,
                            current: result.data.obj.page,
                        }
                    }
                })
            }
        },


        *queryWrhs({ payload }, { call, put }) {
            const wrhs = yield call(queryWrhs, parse(payload));
            if (wrhs) {
                yield put({
                    type: 'showEditPage',
                    payload: {
                        wrhs: wrhs.data.obj,
                    }
                })
            }
        },

        *queryStocks({ payload }, { call, put }) {
            const stocks = yield call(queryStockExtendInfo, {
                articleCode: payload.articleCode
            });
            if (stocks) {
                const acceptanceBill=payload.acceptanceBill;
                acceptanceBill.items[payload.index].article=stocks.data.obj[0].article;
                yield put({
                    type: 'showEditPage',
                    payload: {
                        stocks: stocks.data.obj,
                        currentAcceptanceBill:acceptanceBill
                    }
                })
            }
        },

        *refreshCaseQtyAndAmount({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(refreshCaseQtyAndAmount, parse(payload));
            if(data){
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentAcceptanceBill: data.obj
                    }
                })
            }
        },

        *getForEdit({ payload }, { call, put }) {
            const acceptanceBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (acceptanceBill) {
              yield put({
                    type: 'showEditPage',
                    payload: {
                        currentAcceptanceBill: acceptanceBill.data.obj,
                    }
                })
            }
        }


    },

    

    reducers: {
        showLoading(state) {
            return { ...state, loading: true }
        },
        querySuccess(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'search'
            }
        },
        showCreatePage(state,action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'create'
            }
        },
        showEditPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'create'
            }
        },
        showViewPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'view'

            }
        },
        backViewForm(state) {
            return {
                ...state,
                loading: false,
                showPage: 'view'
            }
        },
        backSearchForm(state) {
            return {
                ...state,
                loading: false,
                showPage: 'search'
            }
        },
        batchRemoveAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchDeleteProcessModal: true
            }
        },
        hideRemoveAcceptanceBillModal(state) {
            return {
                ...state,
                batchDeleteProcessModal: false
            }
        },
        batchApproveAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchApproveProcessModal: true
            }
        },
        hideApproveAcceptanceBillModal(state) {
            return {
                ...state,
                batchApproveProcessModal: false
            }
        },
        batchAlcAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchAlcProcessModal: true
            }
        },
        hideAlcAcceptanceBillModal(state) {
            return {
                ...state,
                batchAlcProcessModal: false
            }
        },
        batchFinishAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchFinishProcessModal: true
            }
        },
        hideFinishAcceptanceBillModal(state) {
            return {
                ...state,
                batchFinishProcessModal: false
            }
        },
        batchAbortAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchAbortProcessModal: true
            }
        },
        hideAbortAcceptanceBillModal(state) {
            return {
                ...state,
                batchAbortProcessModal: false
            }
        },
        showCustomerModal(state,action){
            return {
                ...state,
                ...action.payload,
                customerModalVisible: true
            }
        },
        hideCustomerModal(state){
            return {
                ...state,
                customerModalVisible: false
            }
        }
     
    }

};
