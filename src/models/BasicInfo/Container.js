import {
  parse
} from 'qs';
import {
  query,
  create,
  queryContainerTypes,
} from '../../services/BasicInfo/Container';

export default {
  namespace: 'container',

  state: {
    list: [],
    entitys: [],
    containerTypes: [],
    loading: false,
    searchExpand: false,
    modalVisible: false,
    modalType: 'create',
    batchProcessModal: false,
    batchProcess: false,
    next: false,
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
        if (location.pathname === '/wms/basicInfo/container') {
          dispatch({
            type: 'query',
            payload: location.query,
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
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(query, parse(payload));

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
    * createContainer({
      payload
    }, {
      call,
      put
    }) {
      yield call(create, payload);
      yield put({
        type: 'executeNext'
      });
    },

    * queryContainerType({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const {
        data
      } = yield call(queryContainerTypes, payload);

      if (data) {
        yield put({
          type: 'showModal',
          payload: {
            containerTypes: data.data,
          }
        });
      }
    },

  },

  reducers: {
    showLoading(state) {
      return {...state,
        loading: true
      }
    },
    showBatchProcess(state) {
      return {...state,
        batchProcess: true
      }
    },
    confirmSaveNew(state, action) {
      return {...state,
        ...action.payload,
        modalVisible: false,
        batchProcessModal: true
      }
    },
    querySuccess(state, action) {
      return {...state,
        ...action.payload,
        loading: false
      }
    },
    showModal(state, action) {
      return {...state,
        ...action.payload,
        entitys: [],
        next: false,
        modalVisible: true,
        batchProcessModal: false,
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
    hideBatchProcessModal(state) {
      return {...state,
        batchProcessModal: false
      }
    },
    executeNext(state) {
      return {...state,
        next: true
      }
    },
    queryContainerTypeSuccess(state, action) {
      return {...state,
        ...action.payload
      }
    }

  },

}