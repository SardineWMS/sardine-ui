import { query,create,get,edit,remove} from '../../services/BasicInfo/Supplier';
import { parse } from 'qs';

export default {
  namespace: 'supplier',
  state: {
    list:[],
    loading:false,
    searchExpand: false,
    token: localStorage.getItem("token"),
    currentItem:{},
    modalVisible: false,
    showCreate:false,
    showEdit:false,
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
        if (location.pathname === '/wms/basicInfo/supplier') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects:{
    *query({payload},{call,put}){
      yield put({type: 'showLoading'});
      const {data} = yield call(query,parse(payload));
      if(data){
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
      yield put({type: 'showLoading'});
      const {data} = yield call(create,parse(payload));
      if(data){
        const newSupplier = yield call(get,{
          supplierUuid : data.obj
        });
        if(newSupplier.data){
        yield put({
          type:'showViewPage',
          payload:{
            currentItem:newSupplier.data.obj,
          }
        })
      }
      }
    },
     *edit({payload},{call,put}){
      yield put({type: 'showLoading'});
      const {data} = yield call(edit,parse(payload));
      if(data){
        const newSupplier = yield call(get,{
          supplierUuid : payload.uuid
        });
        if(newSupplier.data){
         console.log(newSupplier);
        yield put({
          type:'showViewPage',
          payload:{
            currentItem:newSupplier.data.obj,
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
        token:payload.token,
        version:payload.version
      });
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

  },

  reducers:{
    showLoading(state){
      return {...state,loading:true}
    },

    querySuccess(state,action){
      return {...state,...action.payload,loading:false,showView:false,showCreate:false}
    },

    showViewPage(state, action) {
      return {...state,
        ...action.payload,
        showCreate: false,
        showView: true,
      }
    },

    showCreatePage(state) {
      return {...state,
        showCreate: true,
        showView: false
      };
    },

    showEditPage(state, action) {
      return {...state,
        ...action.payload,
        showCreate: true,
        showView: false,
      }
    },

    backSearch(state) {
      return {...state,
        showCreate: false,
        showView: false,
      }
    },

    toggle(state, action) {
      return {...state,
        ...action.payload,
      }
    },

    hideModal(state) {
      return {...state,
        modalVisible: false
      }
    },

  },

};