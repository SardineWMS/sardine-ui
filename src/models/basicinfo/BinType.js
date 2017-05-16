import { parse } from 'qs';
import { queryBinType, create, update, deleteBinType } from '../../services/basicinfo/BinType';

export default {
    namespace: 'binType',

    state: {
        list: [],
        loading: false,
        currentItem: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        modalVisible: false,
        modalType: 'create',
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/basicInfo/binType') {
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
            console.log("调用异步方法");
            console.dir(payload);
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(queryBinType, parse(payload));
            if (data) {
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
                })
            }
        },

        *create({
            payload,
        }, {
            call, put
        }) {
            yield put({
                type: 'hideModal'
            })
            yield put({
                type: 'showLoading'
            })
            yield call(create, payload);
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *update({payload}, {
            call,
            put
        }) {
            yield put({
                type: 'hideModal',
                payload: {
                    currentItem: {}
                }
            })
            yield put({ type: 'showLoading' })
            yield call(update, payload);
            yield put({
                type: 'query',
                payload: {}
            })
        },

        *remove({payload}, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            });
            yield call(deleteBinType, {
                uuid: payload.uuid,
                version: payload.version,
            });
            yield put({
                type: 'query',
                payload: {}
            })
        }
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: false }
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload, loading: false }
        },

        showModal(state, action) {
            return { ...state, ...action.payload, modalVisible: true }
        },

        hideModal(state, action) {
            return { ...state, modalVisible: false, ...action.payload }
        },
    }
}