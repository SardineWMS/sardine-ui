import { parse } from 'qs';
import { queryTask, queryStocks, saveArticleMoveRule, saveAndMoveArticleMoveRule, saveContainerMoveRule,
         saveAndMoveContainerMoveRule, articleMove, containerMove} from '../../services/Inner/Task';
import {getByBarcode} from '../../services/basicinfo/Container';

export default {
    namespace: 'task',

    state: {
        list: [],
        loading: false,
        currentArticleItem: {},
        currentContainerItem: {},
        container: {},
        stockInfos: [],
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        articleMoveModalVisable: false,
        containerMoveModalVisable: false,
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
            if (data.status == "200") {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                          showSizeChanger: true,
                          showQuickJumper: true,
                          showTotal: total => `共 ${total} 条`,
                          current: data.obj.page,
                          total: data.obj.recordCount,
                          size: 'default'
                        },
                    }
                })
            }
        },
        *queryStocks({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(queryStocks, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'queryStocksSuccess',
                    payload: {
                        stockInfos: data.obj
                    }
                })
            }
        },
        *getContainer({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(getContainer, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'getContainerSuccess',
                    payload: {
                        container: data.obj
                    }
                })
            }
        },
        *saveArticleMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(saveArticleMoveRule, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
        *saveAndMoveArticleMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(saveAndMoveArticleMoveRule, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
        *saveContainerMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(saveContainerMoveRule, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
        *saveAndMoveContainerMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(saveAndMoveContainerMoveRule, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
        *articleMove({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(articleMove, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
        *containerMove({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const {data} = yield call(containerMove, parse(payload));
            if (data.status == "200") {
                const {data} = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'querySuccess',
                        payload: {
                            list: data.obj.records,
                            pagination: {
                              showSizeChanger: true,
                              showQuickJumper: true,
                              showTotal: total => `共 ${total} 条`,
                              current: data.obj.page,
                              total: data.obj.recordCount,
                              size: 'default'
                            }
                        }
                    })
                }
            }
        },
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: false }
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload, loading: false, articleMoveModalVisable: false, containerMoveModalVisable: false }
        },
        queryStocksSuccess(state, action) {
            return { ...state, ...action.payload, loading: false }
        },

        showArticleMoveModal(state, action) {
            return { ...state, 
                     payload: {
                        currentArticleItem : action.payload.currentArticleItem ? action.payload.currentArticleItem : {}
                     }, 
                     articleMoveModalVisable: true, 
                     containerMoveModalVisable: false
                   }
        },

        showContainerMoveModal(state, action) {
            return { ...state, ...action.payload, containerMoveModalVisable: true, articleMoveModalVisable: false }
        },

        hideMoveModal(state, action) {
            return { ...state, ...action.payload, articleMoveModalVisable: false, containerMoveModalVisable: false }
        },

        getContainerSuccess(state, action) {
            return { ...state, ...action.payload, loading: false }
        }
    }
}