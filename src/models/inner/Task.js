import { parse } from 'qs';
import {
    queryTask, queryStocks, saveArticleMoveRule, saveAndMoveArticleMoveRule, saveContainerMoveRule,
    saveAndMoveContainerMoveRule, articleMove, containerMove, execute,abort,putaway,rpl,batchPick
} from '../../services/Inner/Task';
import { getByBarcode } from '../../services/basicinfo/Container';
import { queryUser,getByCode as getUserByCode} from '../../services/ia/User';

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
        batchAbortProcessModalVisable: false,
        abortTaskEntitys:[],
        putAwayModalVisable:false,
        putAwayTaskEntitys:[],
        batchPutAwayProcessModalVisable:false,
        rplTaskEntitys:[],
        batchRplProcessModalVisable:false,
        userList:[],
        userModalVisable:false,
        setRplerModalVisable:false,
        setPickModalVisable:false,
        pickTaskEntitys:[],
        batchPickProcessModalVisable:false,
        currentUser:{}
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/inner/task') {
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
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(queryTask, parse(payload));
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
                });
            };
        },
        *queryStocks({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(queryStocks, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'queryStocksSuccess',
                    payload: {
                        stockInfos: data.obj
                    }
                });
            };
        },
        *getContainer({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(getContainer, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'getContainerSuccess',
                    payload: {
                        container: data.obj
                    }
                });
            };
        },
        *saveArticleMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading'
            });
            const { data } = yield call(saveArticleMoveRule, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *saveAndMoveArticleMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(saveAndMoveArticleMoveRule, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *saveContainerMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(saveContainerMoveRule, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *saveAndMoveContainerMoveRule({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(saveAndMoveContainerMoveRule, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *articleMove({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            });
            const { data } = yield call(articleMove, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *containerMove({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(containerMove, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *execute({ payload }, { call, put }) {
            yield call(execute, { uuid: payload.uuid, version: payload.version });
        },
                *abort({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(abort, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *putAway({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(putaway, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'hidePutAwayModal'
                })
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *rpl({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(rpl,payload);
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *batchPick({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(batchPick,payload);
            if (data.status == "200") {
                yield put({
                    type: 'hidePickModal'
                })
                const { data } = yield call(queryTask, parse(payload));
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
                    });
                };
            };
        },
        *queryUserByPage({ payload }, { call, put }) {
            const { data } = yield call(queryUser, parse(payload));
            if(data.obj){
                yield put({
                    type: 'showUerModal',
                    payload: {
                        userList: data.obj.records,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
       *getUser({ payload }, { call, put }) {
            const { data } = yield call(getUserByCode,parse(payload));
            if(data.obj){
                yield put({
                    type: 'showLoading'
                })
                yield put({
                    type: "PICK"===payload.type?'showPickModal':'showRplerModal',
                    payload: {
                        currentUser:data.obj
                    }
                })
            }
        }
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: false };
        },
        querySuccess(state, action) {
            return { ...state, ...action.payload, loading: false, articleMoveModalVisable: false, containerMoveModalVisable: false };
        },
        queryStocksSuccess(state, action) {
            return { ...state, ...action.payload, loading: false };
        },
        showArticleMoveModal(state, action) {
            return {
                ...state,
                payload: {
                    currentArticleItem: action.payload.currentArticleItem ? action.payload.currentArticleItem : {}
                },
                articleMoveModalVisable: true,
                containerMoveModalVisable: false
            };
        },
        showContainerMoveModal(state, action) {
            return { ...state, ...action.payload, containerMoveModalVisable: true, articleMoveModalVisable: false };
        },

        hideMoveModal(state, action) {
            return { ...state, ...action.payload, articleMoveModalVisable: false, containerMoveModalVisable: false };
        },

        getContainerSuccess(state, action) {
            return { ...state, ...action.payload, loading: false };
        },
                batchAbortTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                batchAbortProcessModalVisable: true };
        },
        hideAbortTaskModal(state, action) {
            return { ...state, batchAbortProcessModalVisable: false };
        },
        showPutAwayModal(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                putAwayModalVisable: true };
        },
        hidePutAwayModal(state, action) {
            return { ...state, putAwayModalVisable: false };
        },
        batchPutAwayTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                putAwayModalVisable: false ,
                batchPutAwayProcessModalVisable: true };
        },
        hideBatchPutAwayTask(state, action) {
            return { ...state, batchPutAwayProcessModalVisable: false };
        },
        batchRplTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                setRplerModalVisable:false,
                batchRplProcessModalVisable: true };
        },
        hideBatchRplTask(state, action) {
            return { ...state, batchRplProcessModalVisable: false };
        },
        showUerModal(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                userModalVisable: true };
        },
        hideUerModal(state, action) {
            return { ...state, userModalVisable: false };
        },
        showRplerModal(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                setRplerModalVisable: true };
        },
        hideRplerModal(state, action) {
            return { ...state, setRplerModalVisable: false };
        },
        batchPickTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                setPickModalVisable:false,
                batchPickProcessModalVisable: true };
        },
        hideBatchPickTask(state, action) {
            return { ...state, batchPickProcessModalVisable: false };
        },
        showPickModal(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                setPickModalVisable: true };
        },
        hidePickModal(state, action) {
            return { ...state, setPickModalVisable: false };
        },
        selectUser(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                userModalVisable: false };
        }
    }
}