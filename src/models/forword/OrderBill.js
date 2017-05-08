import {parse} from 'qs';
import {querybypage,get,create,edit,remove,bookReg,check,finish,abort,getArticle} from '../../services/forword/OrderBill';
import {message} from 'antd';

export default {
	namespace: 'orderBill',
	state:{
  		list: [],
        currentItem: {},
        articleQpcs:[],
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showCreatePage: false,
        showEditPage: false,
        showViewPage: false,
        batchDeleteProcessModal: false,
        deleteOrderBillEntitys: [],
        batchBookRegProcessModal: false,
        bookRegOrderBillEntitys: [],
        batchCheckProcessModal: false,
        checkOrderBillEntitys: [],
        batchFinishProcessModal: false,
        finishOrderBillEntitys: [],
        batchAbortProcessModal: false,
        abortOrderBillEntitys: [],
        modalVisible: false,
        bookRegBills:[],
        bookRegType:'single'
	},

	 subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forword/orderBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    })
                }
            })
        }
    },
    effects: {
    	*query({ payload }, { call, put }) {
            const {data} = yield call(querybypage, parse(payload));
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
        },

        *get({payload}, {call, put}) {
            const orderBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (orderBill) {
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentItem: orderBill.data.obj,
                    }
                })
            }
        },

        *create({payload},{call,put}){
        	yield put({type: 'showLoading'});
	      	const {data} = yield call(create,parse(payload));
		      	yield put({
                    type: 'get',
                    payload: {
                    	uuid:data.obj
                    }
                })
   		 },

   		*edit({payload},{call,put}){
		    yield put({type: 'showLoading'});
		    const {data} = yield call(edit,parse(payload));
		       	yield put({
                    type: 'get',
                    payload: {
                    	uuid:payload.uuid
                    }
                })
	    },

        *remove({payload}, {call, put}) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version
            })
            yield put({
                type: 'query',
            })
        },

        *bookReg({payload}, {call, put}) {
            yield call(bookReg, {
                uuid: payload.uuid,
                version: payload.version,
                bookedDate: payload.bookedDate,
            })
            yield put({type: 'hideModal'})
         	yield put({
                    type: 'get',
                    payload: {
                    	uuid:payload.uuid
                    }
            })
        },

        *gridBookReg({payload}, {call, put}) {
            yield call(bookReg, {
                uuid: payload.uuid,
                version: payload.version,
                bookedDate: payload.bookedDate,
            })
            yield put({type: 'hideModal'})
            yield put({
            	type: 'query',
        	})
        },

        *check({payload}, {call, put}) {
            yield call(check, {
                uuid: payload.uuid,
                version: payload.version
            })
          	yield put({
                type: 'get',
                payload: {
                	uuid:payload.uuid
                }
            })
        },

        *gridCheck({payload}, {call, put}) {
            yield call(check, {
                uuid: payload.uuid,
                version: payload.version
            })
        	yield put({
            	type: 'query',
        	})
        },

        *finish({payload}, {call, put}) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            })
          	yield put({
                type: 'get',
                payload: {
                	uuid:payload.uuid
                }
            })
        },

        *gridFinish({payload}, {call, put}) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            })
        	yield put({
            	type: 'query',
        	})
        },

 		*abort({payload}, {call, put}) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            })
          	yield put({
                type: 'get',
                payload: {
                	uuid:payload.uuid
                }
            })
        },

        *gridAbort({payload}, {call, put}) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            })
        	yield put({
            	type: 'query',
        	})
        },

        *getArticle({ payload}, {call, put}){
              yield put({
                type: 'showLoading'
              })
              const orderBillItems=payload.items;
              const param={articleCode:orderBillItems[payload.index].article.code}
              const {data} = yield call(getArticle, parse(param))
              if (data.obj) {
                const article=new Object();
                article.uuid=data.obj.uuid;
                article.code=data.obj.code;
                article.name=data.obj.name;
                orderBillItems[payload.index].article=article;
                const qpcs=[];
                data.obj.qpcs.map(function(articleQpc){
                    const qpcInfo=new Object();
                    qpcInfo.munit=articleQpc.munit;
                    qpcInfo.qpcStr=articleQpc.qpcStr;
                    qpcs.push(qpcInfo);
                });
                payload.currentBill.items= orderBillItems;
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentItem:payload.currentBill,
                        articleQpcs:qpcs
                    }
                })
              }else{
                message.error("商品不存在，请输入正确的商品！", 2, '');
              }
        },

        *getForEdit({payload}, {call, put}) {
            const orderBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (orderBill) {
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentItem: orderBill.data.obj,
                    }
                })
            }
        },

    },	

  	reducers:{
	   showLoading(state){
	      return {...state,loading:true}
	    },
	    querySuccess(state, action) {
            return {
                ...state,
                ...action.payload, 
                loading:false,
                showViewPage: false,
                showCreatePage: false
            }
        },
    	showCreatePage(state) {
           return {
                ...state,
                loading:false,
                showViewPage: false,
                showCreatePage: true
            }
        },
        showEditPage(state,action) {
           return {
                ...state,
                ...action.payload, 
                loading:false,
                showViewPage: false,
                showCreatePage: true
            }
        },
       	showViewPage(state,action) {
           return {
                ...state,
                ...action.payload, 
                loading:false,
                showViewPage: true,
                showCreatePage: false
            }
        },
    	backViewForm(state) {
           return {
                ...state,
                loading:false,
                showViewPage: true,
                showCreatePage: false
            }
        },
		backSearchForm(state) {
           return {
                ...state,
                loading:false,
                showViewPage: false,
                showCreatePage: false
            }
        },
        batchRemoveOrderBill(state, action) {
            return { 
           	 	...state,
             	...action.payload, 
            	batchDeleteProcessModal: true 
            }
    	},
    	hideRemoveOrderBillModal(state) {
            return { 
            	...state, 
            	batchDeleteProcessModal: false 
            }
    	},
    	batchBookRegOrderBill(state, action) {
            return { 
           	 	...state,
             	...action.payload, 
            	batchBookRegProcessModal: true 
            }
    	},
    	hideBookRegOrderBillModal(state) {
            return { 
            	...state, 
            	batchBookRegProcessModal: false 
            }
    	},
		batchCheckOrderBill(state, action) {
            return { 
           	 	...state,
             	...action.payload, 
            	batchCheckProcessModal: true 
            }
    	},
    	hideCheckOrderBillModal(state) {
            return { 
            	...state, 
            	batchCheckProcessModal: false 
            }
    	},
		batchFinishOrderBill(state, action) {
            return { 
           	 	...state,
             	...action.payload, 
            	batchFinishProcessModal: true 
            }
    	},
    	hideFinishOrderBillModal(state) {
            return { 
            	...state, 
            	batchFinishProcessModal: false 
            }
    	},
		batchAbortOrderBill(state, action) {
            return { 
           	 	...state,
             	...action.payload, 
            	batchAbortProcessModal: true 
            }
    	},
    	hideAbortOrderBillModal(state) {
            return { 
            	...state, 
            	batchAbortProcessModal: false 
            }
    	},
        showModal(state, action) {
          return {...state,
            ...action.payload,
            modalVisible: true
          }
        },

        hideModal(state) {
          return {...state,
            modalVisible: false
          }
        }
	}

};
