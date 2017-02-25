import {
    parse
} from 'qs';
import { queryCustomer, create, get, remove, recover, updateCustomer } from '../../services/BasicInfo/Customer';
export default {
    namespace: 'customer',

    state: {
        list: [],
        loading: false,
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
        recoverCustomerEntitys: [],
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/wms/basicInfo/customer') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    })
                }
            })
        }
    },
    effects: {
        *query({
            payload
        }, {
            call, put
        }) {
            yield put({ type: 'showLoading' });
            const {data} = yield call(queryCustomer, parse(payload));

            if (data) {
                let customerList = data.obj.records;
                for (var customer of customerList) {
                    customer.state = (customer.state === 'normal' ? '正常' : '已删除');
                }
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: customerList,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        }
                    }
                },
                )
            }
        },

        *refreshGrid({
            payload
        }, {
            call, put
        }) {
            yield put({ type: 'showLoading' });
            const {data} = yield call(queryCustomer, parse(payload));
            if (data.status != 200) {
                const message = data.obj;
                const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
                alert(data.message + "：" + simpleMessage);
                return;
            }
            if (data) {
                let customerList = data.obj.records;
                for (var customer of customerList) {
                    customer.state = (customer.state === 'normal' ? '正常' : '已删除');
                }
                yield put({
                    type: 'refreshGridData',
                    payload: {
                        list: customerList,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        }
                    }
                },
                )
            }
        },

        *create({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading'
            })
            const {data} = yield call(create, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: data.obj
                }
            })
            yield put({
                type: 'refreshGrid',
            })
        },

        *remove({payload}, {call, put}) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            yield put({
                type: 'get',
                payload: payload,
            })
            yield put({
                type: 'refreshGrid',
            })
        },

        *recover({payload}, {call, put}) {
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            yield put({
                type: 'get',
                payload: payload,
            })
            yield put({
                type: 'refreshGrid',
            })
        },

        *update({payload}, {call, put}) {
            yield call(updateCustomer, payload)
            yield put({
                type: 'get',
                payload: payload,
            })
            yield put({
                type: 'refreshGrid',
            })
        },

        *gridRemove({payload}, {call, put}) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *gridRecover({payload}, {call, put}) {
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *get({payload}, {call, put}) {
            const customer = yield call(get, {
                customerUuid: payload.uuid,
            });
            if (customer) {
                customer.data.obj.state = (customer.data.obj.state === 'normal' ? '正常' : '已删除');
                yield put({
                    type: 'onViewItem',
                    payload: {
                        currentItem: customer.data.obj,
                    }
                })
            }
        },
    },
    reducers: {
        showLoading(state) {
            return {
                ...state,
                loading: true
            }
        },
        querySuccess(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false, showViewPage: false, showEditPage: false, showCreatePage: false
            }
        },
        createSuccess(state, action) {
            return { ...state, showCreatePage: true, loading: false, }
        },
        cancelSuccess(state, action) {
            return { ...state, showCreatePage: false, showViewPage: false, showEditPage: false, ...action.payload }
        },
        onViewItem(state, action) {
            return { ...state, ...action.payload, showViewPage: true, showCreatePage: false, showEditPage: false }
        },
        backSuccess(state, action) {
            return { ...state, showViewPage: false, ...action.payload }
        },
        gridEditSuccess(state, action) {
            return { ...state, showEditPage: true, showViewPage: false, ...action.payload }
        },
        itemEditSuccess(state, action) {
            return { ...state, showEditPage: true, showViewPage: true, ...action.payload }
        },
        cancelShoWItemSuccess(state, action) {
            return { ...state, showEditPage: false, ...action.payload }
        },
        toggle(state, action) {
            return { ...state, ...action.payload }
        },
        batchDeleteCustomer(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true }
        },
        hideDeleteCustomerModal(state, action) {
            return { ...state, batchDeleteProcessModal: false }
        },
        batchRecoverCustomer(state, action) {
            return { ...state, ...action.payload, batchRecoverProcessModal: true }
        },
        hideRecoverCustomerModal(state, action) {
            return { ...state, batchRecoverProcessModal: false }
        },
        refreshGridData(state, action) {
            return { ...state, ...action.payload }
        }
    },

}