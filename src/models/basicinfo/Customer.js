import {
    parse
} from 'qs';
import { queryCustomer, create, get, offline, online, updateCustomer } from '../../services/basicinfo/Customer';
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
        batchOfflineProcessModal: false,
        onlineCustomerEntitys: [],
        batchOnlineProcessModal: false,
        onlinesCustomerEntitys: []
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

        *offline({ payload }, { call, put }) {
            yield call(offline, {
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

        *online({ payload }, { call, put }) {
            yield call(online, {
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

        *gridOffline({ payload }, { call, put }) {
            yield call(offline, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token
            });
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *gridOnline({ payload }, { call, put }) {
            yield call(online, {
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
        batchOfflineCustomer(state, action) {
            return { ...state, ...action.payload, batchOfflineProcessModal: true };
        },
        hideOfflineCustomerModal(state, action) {
            return { ...state, batchOfflineProcessModal: false };
        },
        batchOnlineCustomer(state, action) {
            return { ...state, ...action.payload, batchOnlineProcessModal: true };
        },
        hideOnlineCustomerModal(state, action) {
            return { ...state, batchOnlineProcessModal: false };
        },
        refreshGridData(state, action) {
            return { ...state, ...action.payload };
        }
    },

}