import { querybypage,create,get,edit,remove} from '../../services/basicinfo/ContainerType';
import { parse } from 'qs';

export default {
  namespace: 'containerType',
  state: {
    list:[],
    loading:false,
    currentItem:{},
    modalVisible: false,
    modalType: 'create',
    pagination:{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: recordCount => `共 ${recordCount} 条`,
        current:1,
        total:null,
        size:'default'
      }
  },

    subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/basicInfo/containerType') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects:{
    *get({payload},{call,put}){
      yield put({type: 'hideModal'});
      const {data} = yield call(get,{
        uuid:payload.uuid
      });
      if(data){
       console.log(data.obj);
        yield put({
          type: 'showModal',
          payload:{
            currentItem:data.obj,
            modalType:payload.modalType
          },
       }
        );
      }
    },
    *query({payload},{call,put}){
      yield put({type: 'showLoading'});
      const {data} = yield call(querybypage,parse(payload));
      if(data){
        yield put({
          type: 'hideModal'
        })
        yield put({
          type:'querySuccess',
          payload:{
            list:data.obj.records,
            pagination:{
              total:data.obj.recordCount,
              current:data.obj.page,
            }
          }
        })
      }
    },
    *create({payload},{call,put}){
      yield put({type: 'hideModal'});
      yield put({type: 'showLoading'});
      const {data} = yield call(create,parse(payload));
      if(data){
        const result = yield call(query);
          if(result){
            yield put({
              type:'querySuccess',
              payload:{
                list:result.data.obj.records,
                pagination:{
                  total:result.data.obj.recordCount,
                  current:result.data.obj.page,
                }
              }
            })
          }
      }    
    },
    *edit({payload},{call,put}){
      yield put({type: 'hideModal'});
      yield put({type: 'showLoading'});
      const {data} = yield call(edit,parse(payload));
      if(data){
        const result = yield call(querybypage);
          if(result){
            yield put({
              type:'querySuccess',
              payload:{
                list:result.data.obj.records,
                pagination:{
                  total:result.data.obj.recordCount,
                  current:result.data.obj.page,
                }
              }
            })
          }
      }    
    },
    *remove({payload},{call,put}){
      yield put({type: 'hideModal'});
      yield put({type: 'showLoading'});
      const {data} = yield call(remove,{
        uuid:payload.uuid,
        token:localStorage.getItem("token"),
        version:payload.version
      });
      if(data){
        const result = yield call(querybypage);
          if(result){
            yield put({
              type:'querySuccess',
              payload:{
                list:result.data.obj.records,
                pagination:{
                  total:result.data.obj.recordCount,
                  current:result.data.obj.page,
                }
              }
            })
          }
      }
    },

  },

  reducers:{

    showLoading(state){
      return {...state,loading:true}
    },

    querySuccess(state,action){
      return {...state,...action.payload,loading:false,showView:false,showCreate:false}
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
    },

  },

};