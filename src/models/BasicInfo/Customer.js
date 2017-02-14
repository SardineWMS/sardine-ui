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
                console.log("data");
                console.dir(data);
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
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
            if (data) {
                const uuid = data.obj;
                const customer = yield call(get, {
                    customerUuid: uuid,
                });
                yield put({
                    type: 'onViewItem',
                    payload: {
                        currentItem: customer.data.obj,
                    }
                })
            }
        },

        *remove({payload}, {call, put}) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            const customer = yield call(get, {
                customerUuid: payload.uuid,
            });
            yield put({
                type: 'onViewItem',
                payload: {
                    currentItem: customer.data.obj,
                }
            })
        },

        *recover({payload}, {call, put}) {
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            const customer = yield call(get, {
                customerUuid: payload.uuid,
            });
            yield put({
                type: 'onViewItem',
                payload: {
                    currentItem: customer.data.obj,
                }
            })
        },

        *update({payload}, {call, put}) {
            yield call(updateCustomer, payload)
            const customer = yield call(get, {
                customerUuid: payload.uuid,
            });
            console.log("customer对象是。。。");
            console.dir(customer);
            yield put({
                type: 'onViewItem',
                payload: {
                    currentItem: customer.data.obj,
                }
            })
        },

        *gridRemove({payload}, {call, put}) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            const {data} = yield call(queryCustomer, parse(null));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.current,
                        }
                    }
                },
                )
            }
        },

        *gridRecover({payload}, {call, put}) {
            console.log("effects");
            yield call(recover, {
                uuid: payload.uuid,
                version: payload.version,
                token: payload.token,
            })
            const {data} = yield call(queryCustomer, parse(null));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.current,
                        }
                    }
                },
                )
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
    },

}