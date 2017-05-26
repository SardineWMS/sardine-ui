import {
  parse
} from 'qs';
import {
  queryArticles,
  create,
  get,
  getAndSaveSupplier,
  addArticleSupplier,
  deleteArticleSupplier,
  setDefaultSupplier,
  setDefaultQpcStr,
  deleteArticleQpc,
  saveArticleQpc,
  addArticleQpc,
  deleteArticleBarcode,
  saveArticleBarcode,
  addArticleBarcode,
  setArticleFixedPickBin
} from '../../services/basicinfo/Article';

export default {
  namespace: 'article',

  state: {
    list: [],
    loading: false,
    currentArticle: {},
    currentSupplier: {},
    modalVisible: false,
    modalType: 'single',
    batchSetBinProcessModal: false,
    setFixedPickBinEntitys: [],
    articles: [],
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
        if (location.pathname === '/basicInfo/article') {
          if (location.query.type == 'getAndView') {
            dispatch({
              type: 'getAndView',
              payload: { articleUuid: location.query.key }
            })
          } else {
            dispatch({
              type: 'query',
              payload: location.query,
            })
          }
        }
      })
    },
  },

  effects: {
    *query({ payload }, {
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
    *getAndView({ payload }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(get, parse(payload))
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *getAndShowEditPage({ payload }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(get, parse(payload))
      if (data) {
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
      const { data } = yield call(create, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *setArticleFixedPickBin({
      payload
    }, {
      call,
        put
    }) {
      yield put({
        type: 'hideSetBinModal'
      })
      yield put({
        type: 'showLoading'
      })
      const { data } = yield call(setArticleFixedPickBin, parse(payload))
      if (data) {
        yield put({
          type: 'query',
        })
      }
    },

    *getAndSaveSupplier({
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
      const { data } = yield call(getAndSaveSupplier, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *deleteArticleSupplier({
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
      const { data } = yield call(deleteArticleSupplier, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *setDefaultSupplier({
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
      const { data } = yield call(setDefaultSupplier, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *addArticleSupplier({ payload }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(addArticleSupplier, parse(payload))
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *saveArticleQpc({
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
      const { data } = yield call(saveArticleQpc, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *deleteArticleQpc({
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
      const { data } = yield call(deleteArticleQpc, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *setDefaultQpcStr({
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
      const { data } = yield call(setDefaultQpcStr, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *addArticleQpc({ payload }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(addArticleQpc, parse(payload))
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
    *saveArticleBarcode({
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
      const { data } = yield call(saveArticleBarcode, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *deleteArticleBarcode({
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
      const { data } = yield call(deleteArticleBarcode, payload)
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },

    *addArticleBarcode({ payload }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(addArticleBarcode, parse(payload))
      if (data) {
        yield put({
          type: 'showViewPage',
          payload: {
            currentArticle: data.obj,
          },
        })
      }
    },
  },

  reducers: {
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    },
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    },
    showSupplier(state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false,
        showCreate: false,
        showView: true,
      }
    },
    showCreatePage(state) {
      return {
        ...state,
        showCreate: true,
        showView: false,
        currentArticle: {},
      };
    },

    showViewPage(state, action) {
      return {
        ...state,
        ...action.payload,
        showCreate: false,
        showView: true,
      }
    },

    showEditPage(state, action) {
      console.log("ahu  sssnn");
      console.log(action);
      return {
        ...state,
        ...action.payload,
        showCreate: true,
        showView: false,
      }
    },

    backSearch(state) {
      return {
        ...state,
        showCreate: false,
        showView: false,
      }
    },

    batchSetBinModal(state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: false,
        batchSetBinProcessModal: true
      }
    },
    hideBatchSetBinModal(state) {
      return {
        ...state,
        batchSetBinProcessModal: false
      }
    },

    showSetBinModal(state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: true
      }
    },

    hideSetBinModal(state) {
      return {
        ...state,
        modalVisible: false
      }
    },

  },

}