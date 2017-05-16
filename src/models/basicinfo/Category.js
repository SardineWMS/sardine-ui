import {
  parse
} from 'qs';
import {
  queryCategory,
  create,
  update,
  deleteCategory,
} from '../../services/basicinfo/Category';

export default {
  namespace: 'category',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/basicInfo/category') {
          dispatch({
            type: 'query',
            payload: {
              token: localStorage.getItem("token")
            }
          })
        }
      })
    },
  },

  effects: { * query({
      payload
    }, {
      call,
      put
    }) {
      const {
        data
      } = yield call(queryCategory, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
          },
        })
      }
    },
    * create({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideModal'
      })
      yield call(create, payload);
      const {
        data
      } = yield call(queryCategory, payload: {
        token: payload.token
      });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
          },
        })
      }
    },

    * createRoot({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideModal'
      })
      yield call(create, payload);
      const {
        data
      } = yield call(queryCategory, payload: {
        token: payload.token
      });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
          },
        })
      }
    },

    * update({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideModal'
      })
      yield call(update, payload);
      const {
        data
      } = yield call(queryCategory, payload: {
        token: payload.token
      });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
          },
        })
      }
    },

    * remove({
      payload
    }, {
      call,
      put
    }) {
      yield call(deleteCategory, {
        uuid: payload.uuid,
        version: payload.version,
        token: payload.token,
      });

      const {
        data
      } = yield call(queryCategory, payload: {
        token: payload.token
      });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
          },
        })
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return {...state,
        ...action.payload
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
    },
  },

}