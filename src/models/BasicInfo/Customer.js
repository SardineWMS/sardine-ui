import {
    parse
} from 'qs';
import { queryCustomer } from '../../services/BasicInfo/Customer';
export default {
    namespace: 'customer',

    state: {
        list: [],
        loading: false,
        currentItem: {},
        modalVisible: false,
        modalType: 'create',
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
        * query({
            payload
        }, {
            call, put
        }) {
            yield put({ type: 'showLoading' });
            const {data} = yield call(queryCustomer, parse(payload));
            console.dir(data);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        pagination: {
                            total: data.page.total,
                            current: data.page.current,
                        }
                    }
                },
                )
            }
        },

        // *create({
        //     payload
        // }, {
        //     call, put
        // }) {
        //     yield put({
        //         type: 'showLoading'
        //     })
        //     const data = yield call(create, parse(payload))
        //     if (data && data.success) {
        //         yield put({
        //             type: 'createSuccess',
        //             payload: {
        //             }
        //         })
        //     }
        // },
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
                loading: false
            }
        },
        createSuccess(state, action) {
            console.log("...createSuccess");
            return { ...state, showCreatePage: true, loading: false, }
        },
        cancelSuccess(state, action) {
            return { ...state, showCreatePage: false }
        },
        onViewItem(state, action) {
            return { ...state, ...action.payload, showViewPage: true }
        }
    },

}