import {
  parse
} from 'qs';
import {
  queryContainers,
  create,
  queryContainerTypes,
  queryContainerStockInfo,
} from '../../services/basicinfo/Container';
import { querybypage as queryContainerType, create as createContainerType, get, edit, remove } from '../../services/basicinfo/ContainerType';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'container',

  state: {
    list: [],
    entitys: [],
    containerTypes: [],
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
    },
    containerTypeModalVisible: false,
    containerTypeList: [],
    containerStockInfos: [],//容器库存信息
    showStockInfoPage: false
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        if (location.pathname === '/basicInfo/container') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        };
      });
    },
  },

  effects: {
    * query({
      payload
    }, {
      call,
        put
    }) {
      yield put({
        type: 'showLoading'
      });
      const {
        data
      } = yield call(queryContainers, parse(payload));

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj.records,
            pagination: {
              total: data.obj.recordCount,
              current: data.obj.page
            },
            containerStockInfos: [],
          }
        });
      };
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
      });
      const {
        data
      } = yield call(queryContainerTypes, {
        });

      if (data) {
        yield put({
          type: 'showModal',
          payload: {
            containerTypes: data.obj
          }
        });
      };
    },

    *createType({ payload },
      { call, put }) {
      const { data } = yield call(queryContainerType, parse(payload));
      if (data) {
        yield put({
          type: 'showContainerTypeSuccess',
          payload: {
            containerTypeList: data.obj.records
          }
        });
      };
    },
    *addContainerTypeLine({ payload }, {
      call, put
    }) {
      const { data } = yield call(queryContainerType, parse(payload));
      const containerTypeLists = data.obj.records;

      const nullContainerType = new Object();
      nullContainerType.editable = true;
      containerTypeLists.push(nullContainerType);
      yield put({
        type: 'showContainerTypeSuccess',
        payload: {
          containerTypeList: containerTypeLists
        }
      });
    },
    *deleteContainerType({ payload }, {
      call, put
    }) {
      yield call(remove, {
        uuid: payload.uuid,
        version: payload.version
      });
      yield put({
        type: 'refreshContainerType',
        payload: {}
      });
    },

    *saveNewContainerType({ payload }, {
      call, put
    }) {
      yield call(createContainerType, payload);
      yield put({
        type: 'refreshContainerType',
        payload: {}
      });
    },

    *saveModifyContainerType({ payload }, {
      call, put
    }) {
      yield call(edit, parse(payload));
      yield put({
        type: 'refreshContainerType',
        payload: {}
      });
    },

    * refreshContainerType({
      payload
    }, {
      call,
        put
    }) {
      yield put({
        type: 'showLoading'
      });
      const {
        data
      } = yield call(queryContainerType, {
        });

      if (data) {
        yield put({
          type: 'queryContainerTypeSuccess',
          payload: {
            containerTypeList: data.obj.records
          }
        });
      };
    },

    *queryContainerStock({ payload }, { call, put }) {
      const { data } = yield call(queryContainerStockInfo, { containerBarcode: payload.barcode });
      if (data) {
        yield put({
          type: 'showStockInfo',
          payload: {
            containerStockInfos: data.obj
          }
        });
      };
    },

    *toViewArticle({ payload }, { call, put }) {
      yield put(routerRedux.push({
        pathname: '/basicInfo/article',
        query: {
          type: 'getAndView',
          key: payload.article.uuid
        }
      }));
    }

  },

  reducers: {
    showBatchProcess(state) {
      return {
        ...state,
        batchProcess: true
      };
    },
    confirmSaveNew(state, action) {
      return {
        ...state,
        ...action.payload,
        modalVisible: false,
        batchProcessModal: true
      };
    },
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        showStockInfoPage: false,
      };
    },
    showModal(state, action) {
      return {
        ...state,
        ...action.payload,
        entitys: [],
        next: false,
        modalVisible: true,
        batchProcessModal: false
      };
    },
    toggle(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
        batchProcessModal: false
      };
    },
    hideBatchProcessModal(state) {
      return {
        ...state,
        batchProcessModal: false
      };
    },
    executeNext(state) {
      return {
        ...state,
        next: true
      };
    },
    queryContainerTypeSuccess(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    showContainerTypeSuccess(state, action) {
      return { ...state, ...action.payload, containerTypeModalVisible: true };
    },
    hideContainerTypeModal(state) {
      return { ...state, containerTypeModalVisible: false };
    },
    showStockInfo(state, action) {
      return { ...state, ...action.payload, showStockInfoPage: true };
    },

  },

}