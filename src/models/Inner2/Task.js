import { parse } from 'qs';
import { queryTask} from '../../services/Inner/Task';

export default {
    namespace: 'task',

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
                if (location.pathname === '/inner/task') {
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
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(queryTask, parse(payload));
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