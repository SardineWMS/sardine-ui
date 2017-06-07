import { parse } from 'qs';
import { create, queryCarrier, deleteCarrier, update, online, offline } from '../../services/tms/Carrier.js';
export default {
    namespace: 'carrier',
    state: {
        list: [],
        currentItem: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        modalVisible: false,
        modalType: 'create',
        batchDeleteProcessModal: false,
        deleteCarrierEntitys: [],
        batchOnlineProcessModal: false,
        onlineCarrierEntitys: [],
        batchOfflineProcessModal: false,
        offlineCarrierEntitys: [],
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/tms/carrier') {
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
            const { data } = yield call(queryCarrier, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共${total}条`,
                            size: 'default'
                        },
                        currentItem: {},
                    }
                })
            }
        },

        *create({ payload }, { call, put }) {
            yield put({
                type: 'hideModal'
            });
            yield call(create, payload);
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *update({ payload }, { call, put }) {
            yield put({
                type: 'hideModal',
                payload: {
                    currentItem: {}
                }
            });
            yield call(update, payload);
            yield put({
                type: 'query',
                payload: {}
            })
        },

        *gridRemove({ payload }, { call, put }) {
            yield call(deleteCarrier, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *gridOnline({ payload }, { call, put }) {
            yield call(online, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *gridOffline({ payload }, { call, put }) {
            yield call(offline, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query',
                payload: {},
            })
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload }
        },
        showModal(state, action) {
            return { ...state, ...action.payload, modalVisible: true }
        },
        hideModal(state, action) {
            return { ...state, modalVisible: false, ...action.payload }
        },
        batchDeleteCarrier(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true };
        },
        batchOnlineCarrier(state, action) {
            return { ...state, ...action.payload, batchOnlineProcessModal: true };
        },
        batchOfflineCarrier(state, action) {
            return { ...state, ...action.payload, batchOfflineProcessModal: true };
        },
        hideDeleteCarrierModal(state, action) {
            return { ...state, batchDeleteProcessModal: false }
        },
        hideOnlineCarrierModal(state, action) {
            return { ...state, batchOnlineProcessModal: false }
        },
        hideOfflineCarrierModal(state, action) {
            return { ...state, batchOfflineProcessModal: false }
        },
    }
}