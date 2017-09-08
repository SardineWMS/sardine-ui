import { parse } from 'qs';
import {
    queryTask, queryStocks, saveArticleMoveRule, saveAndMoveArticleMoveRule, saveContainerMoveRule,
    saveAndMoveContainerMoveRule, articleMove, containerMove, execute,abort,putaway,rpl,batchPick,
    rtnshelf
} from '../../services/Inner/Task';
import { getByBarcode } from '../../services/basicinfo/Container';
import { queryUser,getByCode as getUserByCode} from '../../services/ia/User';
import { qtyToCaseQtyStr} from '../../services/common/common';

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
        putAwayTaskEntitys:[],
        batchPutAwayProcessModalVisable:false,
        rplTaskEntitys:[],
        batchRplProcessModalVisable:false,
        userList:[],
        userModalVisable:false,
        pickTaskEntitys:[],
        batchPickProcessModalVisable:false,
        setPickModalVisable:false,
        batchRtnShelfProcessModalVisable:false,
        currentUser:{}
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/inner/task') {
                    dispatch({
                        type: 'query',
                        payload: location.query
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
            payload.taskType = payload.taskType? payload.taskType:'Putaway';
            const { data } = yield call(queryTask, parse(payload));
            if (data.status == "200") {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        taskType:payload.taskType,
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
                const { data } = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'query',
                        payload:{
                            taskType:payload.taskType
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
                yield put({
                    type: 'query',
                    payload:{
                        taskType:payload.taskType
                    }
                });
            };
        },
        *rtnShelf({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'showLoading',
            })
            const { data } = yield call(rtnshelf, parse(payload));
            if (data.status == "200") {
                const { data } = yield call(queryTask, parse(payload));
                if (data.status == "200") {
                    yield put({
                        type: 'query',
                        payload:{
                            taskType:payload.taskType
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
        },
        *refresRealCaseQtyStr({ payload }, { call, put }) {
            const { data } = yield call(qtyToCaseQtyStr,{qty:payload.qty,qpcStr:payload.qpcStr});
            if(data.obj){
                var currentList=payload.tasks;
                currentList[payload.index].realCaseQtyStr=data.obj;
                yield put({
                    type: 'showLoading'
                })
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list:currentList
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
        batchPutAwayTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                batchPutAwayProcessModalVisable: true 
            };
        },
        hideBatchPutAwayTask(state, action) {
            return { 
                ...state, 
                batchPutAwayProcessModalVisable: false 
            };
        },
        batchRplTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                batchRplProcessModalVisable: true };
        },
        hideBatchRplTask(state, action) {
            return { 
                ...state,
                batchRplProcessModalVisable: false 
            };
        },
        batchRtnShelfTask(state, action) {
            return { 
                ...state, 
                ...action.payload, 
                batchRtnShelfProcessModalVisable: true 
            };
        },
        hideBatchRtnShelfTask(state, action) {
            return { ...state, batchRtnShelfProcessModalVisable: false };
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