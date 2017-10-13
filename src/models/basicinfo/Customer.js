import {
    parse
} from 'qs';
import { queryCustomer, create, get, remove, recover, updateCustomer } from '../../services/basicinfo/Customer';
export default {
    namespace: 'customer',

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
        showCreatePage: false,
        showViewPage: false,
        showEditPage: false,
        searchExpand: false,
        batchDeleteProcessModal: false,
        deleteCustomerEntitys: [],
        batchRecoverProcessModal: false,
        recoverCustomerEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/basicInfo/customer') {
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
        }, {
            call, put
        }) {
            const { data } = yield call(queryCustomer, parse(payload));
            if (data.status == "200") {
                let customerList = data.obj.records;
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: customerList,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            current: data.obj.page,
                            total: data.obj.recordCount,
                            pageSize: payload.pageSize
                        },
                        currentItem: {}
                    }
                });
            };
        },

        *create({
            payload
        }, {
            call, put
        }) {
            let { data } = yield call(create, parse(payload));
            if (data.status == "200") {
                let getData = yield call(get, { customerUuid: data.obj });
                if (getData.data.status == "200") {
                    yield put({
                        type: 'onViewItem',
                        payload: {
                            currentItem: getData.data.obj
                        }
                    });
                };
            };
        },

        *remove({ payload }, { call, put }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token
            });
            yield put({
                type: 'get',
                payload: payload
            });
            yield put({
                type: 'refreshGrid'
            });
        },

        *recover({ payload }, { call, put }) {
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token
            });
            yield put({
                type: 'get',
                payload: payload
            });
            yield put({
                type: 'refreshGrid'
            });
        },

        *update({ payload }, { call, put }) {
            const customer = payload;
            let { data } = yield call(updateCustomer, payload);
            if (data.status == "200") {
                let getData = yield call(get, { customerUuid: payload.uuid });
                if (getData.data.status == "200") {
                    yield put({
                        type: 'onViewItem',
                        payload: {
                            currentItem: getData.data.obj
                        }
                    });
                };
            };
        },

        *gridRemove({ payload }, { call, put }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token
            });
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *gridRecover({ payload }, { call, put }) {
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token
            });
            yield put({
                type: 'query',
                payload: {}
            });
        },

        *get({ payload }, { call, put }) {
            const customer = yield call(get, {
                customerUuid: payload.uuid
            });
            if (customer) {
                yield put({
                    type: 'onViewItem',
                    payload: {
                        currentItem: customer.data.obj
                    }
                });
            };
        },
    },
    reducers: {
        querySuccess(state, action) {
            return {
                ...state,
                ...action.payload, showViewPage: false, showEditPage: false, showCreatePage: false
            };
        },
        createSuccess(state, action) {
            return { ...state, showCreatePage: true };
        },
        cancelSuccess(state, action) {
            return { ...state, showCreatePage: false, showViewPage: false, showEditPage: false, ...action.payload };
        },
        onViewItem(state, action) {
            return { ...state, ...action.payload, showViewPage: true, showCreatePage: false, showEditPage: false };
        },
        backSuccess(state, action) {
            return { ...state, showViewPage: false, ...action.payload };
        },
        gridEditSuccess(state, action) {
            return { ...state, showEditPage: true, showViewPage: false, ...action.payload };
        },
        itemEditSuccess(state, action) {
            return { ...state, showEditPage: true, showViewPage: true, ...action.payload };
        },
        cancelShoWItemSuccess(state, action) {
            return { ...state, showEditPage: false, ...action.payload };
        },
        batchDeleteCustomer(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true };
        },
        hideDeleteCustomerModal(state, action) {
            return { ...state, batchDeleteProcessModal: false };
        },
        batchRecoverCustomer(state, action) {
            return { ...state, ...action.payload, batchRecoverProcessModal: true };
        },
        hideRecoverCustomerModal(state, action) {
            return { ...state, batchRecoverProcessModal: false };
        },
        refreshGridData(state, action) {
            return { ...state, ...action.payload };
        }
    },

}