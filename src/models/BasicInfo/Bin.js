import {
  parse
} from 'qs';
import {
  queryBin,
  createWrh,
  createZone,
  createPath,
  createShelf,
  createBin,
  deleteBin,
  queryWrhs,
  queryZones,
  queryBinTypes
} from '../../services/BasicInfo/Bin';

export default {
  namespace: 'bin',

  state: {
    list: [],
    entitys: [],
    next:false,
    loading: false,
    currentItem: {},
    wrhModalVisible: false,
    zoneModalVisible: false,
    pathModalVisible: false,
    shelfModalVisible: false,
    binModalVisible: false,
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        var fieldsvalue = location.query;
        if (location.pathname === '/wms/basicInfo/bin') {
          dispatch({
            type: 'queryBin',
            payload: { 
                        token: localStorage.getItem("token"),
                        fieldsvalue
                     },
            
          })
        }
      })
    },
  },

  effects: { 
    * queryBin({
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
      } = yield call(queryBin, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj.pageData.records,
            treeData: data.obj.treeData,
            pagination: {
                            total: data.obj.pageData.recordCount,
                            current: data.obj.pageData.page,
                        }
          },
        })
      }
    },
    * queryWrhsAndShowZoneModal({
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
      } = yield call(queryWrhs, parse(payload))
      if (data) {
        yield put({
          type: 'showZoneModal',
          payload: {
            wrhs: data.obj,
          },
        })
      }
    },
    * queryZonesAndShowPathModal({
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
      } = yield call(queryZones, parse(payload))
      if (data) {
        yield put({
          type: 'showPathModal',
          payload: {
            zones: data.obj,
          },
        })
      }
    },
    * queryBinTypesAndShowBinModal({
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
      } = yield call(queryBinTypes, parse(payload))
      if (data) {
        yield put({
          type: 'showBinModal',
          payload: {
            binTypes: data.obj,
          },
        })
      }
    },
    * createWrh({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideWrhModal'
      })
      yield put({
        type: 'showLoading'
      })
      yield call(createWrh, payload);
      const {
        data
      } = yield call(queryBin, 
        payload: {
          token: payload.token
        });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj.pageData.records,
            treeData:data.obj.treeData,
            pagination: {
                            total: data.obj.pageData.recordCount,
                            current: data.obj.pageData.page,
                        }
          },
        })
      }
    },

    * createZone({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideZoneModal'
      })
      yield put({
        type: 'showLoading'
      })
      yield call(createZone, payload);
      const {
        data
      } = yield call(queryBin, 
        payload: {
          token: payload.token
        });
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj.pageData.records,
            treeData:data.obj.treeData,
            pagination: {
                            total: data.obj.pageData.recordCount,
                            current: data.obj.pageData.page,
                        }
          },
        })
      }
    },

    * createPath({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hidePathModal'
      })
      yield put({
        type: 'showLoading'
      })
      yield call(createPath, payload);
      yield put({
        type: 'executeNext'
      });
    },

    * createShelf({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideShelfModal'
      })
      yield put({
        type: 'showLoading'
      })
      yield call(createShelf, payload);
      yield put({
        type: 'executeNext'
      });
    },

    * createBin({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'hideBinModal'
      })
      yield put({
        type: 'showLoading'
      })
      yield call(createBin, payload);
      yield put({
        type: 'executeNext'
      });
    },

    * deleteBin({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      });
      yield call(deleteBin, payload);

      yield put({
        type: 'executeNext'
      });
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
    showWrhModal(state, action) {
      return {...state,
        ...action.payload,
        wrhModalVisible: true
      }
    },
    hideWrhModal(state) {
      return {...state,
        wrhModalVisible: false
      }
    },
    showZoneModal(state, action) {
      return {...state,
        ...action.payload,
        zoneModalVisible: true
      }
    },
    hideZoneModal(state) {
      return {...state,
        zoneModalVisible: false
      }
    },
    showPathModal(state, action) {
      return {...state,
        ...action.payload,
        pathModalVisible: true,
        batchCreatePathProcessModal: false,
        pathEntitys: [],
        pathNext: false,
      }
    },
    hidePathModal(state) {
      return {...state,
        pathModalVisible: false,
        batchCreatePathProcessModal : false,
      }
    },
    showShelfModal(state, action) {
      return {...state,
        ...action.payload,
        shelfModalVisible: true,
        batchCreateShelfProcessModal: false,
        shelfEntitys: [],
        shelfNext: false,
      }
    },
    hideShelfModal(state) {
      return {...state,
        shelfModalVisible: false,
        batchCreateShelfProcessModal : false,
      }
    },
    showBinModal(state, action) {
      return {...state,
        ...action.payload,
        binModalVisible: true,
        batchCreateBinProcessModal: false,
        binEntitys: [],
        binNext: false,
      }
    },
    hideBinModal(state) {
      return {...state,
        binModalVisible: false,
        batchCreateBinProcessModal : false,
      }
    },
    hideDeleteBinModal(state) {
      return {...state,
        batchDeleteBinProcessModal : false,
      }
    },
    batchSavePath(state, action) {
      return {...state,
        ...action.payload,
        pathModalVisible: false,
        batchCreatePathProcessModal: true
      }
    },
    batchSaveShelf(state, action) {
      return {...state,
        ...action.payload,
        shelfModalVisible: false,
        batchCreateShelfProcessModal: true
      }
    },
    batchSaveBin(state, action) {
      return {...state,
        ...action.payload,
        binModalVisible: false,
        batchCreateBinProcessModal: true
      }
    },
    batchDeleteBin(state, action) {
      return {...state,
        ...action.payload,
        batchDeleteBinProcessModal: true
      }
    },
    executeNext(state) {
      return {...state,
        next: true
      }
    },
  },
}