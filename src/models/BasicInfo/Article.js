import {
  parse
} from 'qs';
import {
  queryArticles,
  create,
  update,
  get
} from '../../services/BasicInfo/Article'



export default {
  namespace: 'article',

  state: {
    list: [],
    loading: false,
    currentArticle: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      size: 'default'
    }
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/wms/basicInfo/category') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: { 
    *query({ payload}, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(queryArticles, parse(payload))
      if (data) {
        console.log(data);
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj.records,
            pagination: {
              total: data.obj.recordCount,
              current: data.obj.page,
            }
          },
        })
      }
    },
    *getAndView({ payload}, {
      call,
      put
    }){
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(get, parse(payload))
      if (data) {
        console.log(data);
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *getAndShowEditPage({ payload}, {
      call,
      put
    }){
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(get, parse(payload))
      if (data) {
        console.log(data);
        yield put({
          type: 'showEditPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *create({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideModal'
      })
      yield put({
        type: 'showLoading'
      })
      const {data} = yield call(create, payload)
      if (data) {
        console.log(data);
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *update({
      payload
    }, {
      select,
      call,
      put
    }) {
      yield put({
        type: 'hideModal'
      })
      yield put({
        type: 'showLoading'
      })
      const id = yield select(({
        users
      }) => users.currentItem.id)
      const newUser = {...payload,
        id
      }
      const data = yield call(update, newUser)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            }
          },
        })
      }
    },
  },

  reducers: {
    showLoading(state) {
      return {...state,
        loading: true
      }
    },
    querySuccess(state, action) {
      return {...state,
        ...action.payload,
        loading: false
      }
    },
    showCreatePage(state) {
      return {...state,
        showCreate: true,
        showView: false,
        currentArticle: {},
      };
    },

    showViewPage(state, action) {
      return {...state,
        ...action.payload,
        showCreate: false,
        showView: true,
      }
    },

    showEditPage(state, action) {
            console.log("ahu  sssnn");
      console.log(action);
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
  },

}