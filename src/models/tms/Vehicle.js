import { parse } from 'qs';
import { queryVehicle, queryVehicleType, createVehicleType, updateVehicleType, deleteVehicleType, insert, get, update, online, offline } from '../../services/tms/Vehicle';
import { queryCarrier } from '../../services/tms/Carrier';
import WMSProgress from '../../components/Widget/WMSProgress';

export default {
    namespace: 'vehicle',
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
        showPage: '',
        vehicleTypeList: [],
        vehicleTypeModalVisible: false,
        carrierList: [],
        batchOnlineProcessModal: false,
        batchOfflineProcessModal: false,
        onlineVehicleEntitys: [],
        offlineVehicleEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/tms/vehicle') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                };
            });
        }
    },

    effects: {
        *query({
            payload
        }, { call, put }) {
            const { data } = yield call(queryVehicle, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            current: data.obj.page,
                            total: data.obj.recordCount,
                            size: 'default'
                        },
                        currentItem: {}
                    }
                });
            };
        },

        *queryVehicleType({ payload }, { call, put }) {
            const { data } = yield call(queryVehicleType, parse(payload));
            if (data) {
                yield put({
                    type: 'queryVehicleTypeSuccess',
                    payload: {
                        vehicleTypeList: data.obj.records
                    }
                });
            };
        },

        *addVehicleTypeLine({ payload }, { call, put }) {
            const { data } = yield call(queryVehicleType, parse(payload));
            const vehicleTypeList = data.obj.records;

            const nullVehicleType = new Object();
            nullVehicleType.editable = true;
            vehicleTypeList.push(nullVehicleType);
            yield put({
                type: 'queryVehicleTypeSuccess',
                payload: {
                    vehicleTypeList: vehicleTypeList
                }
            });
        },

        *insertVehicleType({ payload }, { call, put }) {
            yield call(createVehicleType, payload);
            yield put({
                type: 'queryVehicleType',
                payload: {}
            });
        },

        *updateVehicleType({ payload }, { call, put }) {
            yield call(updateVehicleType, payload);
            yield put({
                type: 'queryVehicleType',
                payload: {}
            });
        },

        *deleteVehicleType({ payload }, { call, put }) {
            yield call(deleteVehicleType, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'queryVehicleType',
                payload: {}
            });
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data.status == "200") {
                const getData = yield call(get, { uuid: data.obj });
                if (getData.data.status == "200") {
                    yield put({
                        type: 'onViewItem',
                        payload: {
                            currentItem: getData.data.obj
                        }
                    });
                };
            };
        },

        *update({ payload }, { call, put }) {
            const { data } = yield call(update, parse(payload));
            if (data.status == "200") {
                const getData = yield call(get, { uuid: payload.uuid });
                if (getData.data.status == "200") {
                    yield put({
                        type: 'onViewItem',
                        payload: {
                            currentItem: getData.data.obj
                        }
                    });
                };
            };
        },

        *showCreate({ payload }, { call, put }) {
            const { data } = yield call(queryVehicleType, { pageSize: 0 });
            if (data) {
                const carrierResult = yield call(queryCarrier, { pageSize: 0 });
                yield put({
                    type: 'createSuccess',
                    payload: {
                        carrierList: carrierResult.data.obj.records,
                        vehicleTypeList: data.obj.records
                    }
                });
            };
        },

        *showEdit({ payload }, { call, put }) {
            const { data } = yield call(queryVehicleType, { pageSize: 0 });
            if (data) {
                const carrierResult = yield call(queryCarrier, { pageSize: 0 });
                yield put({
                    type: 'createSuccess',
                    payload: {
                        carrierList: carrierResult.data.obj.records,
                        vehicleTypeList: data.obj.records,
                        currentItem: payload
                    }
                });
            };
        },

        *online({ payload }, { call, put }) {
            yield call(online, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: payload
            });
        },

        *offline({ payload }, { call, put }) {
            yield call(offline, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: payload
            });
        },

        *get({ payload }, { call, put }) {
            const { data } = yield call(get, {
                uuid: payload.uuid,
            });
            if (data) {
                yield put({
                    type: 'onViewItem',
                    payload: {
                        currentItem: data.obj
                    }
                });
            };
        },

        *gridOnline({ payload }, { call, put }) {
            yield call(online, {
                uuid: payload.uuid,
                version: payload.version
            });
            // yield put({
            //     type: 'query',
            //     payload: {},
            // })
        },

        *gridOffline({ payload }, { call, put }) {
            yield call(offline, {
                uuid: payload.uuid,
                version: payload.version
            });
            // yield put({
            //     type: 'query',
            //     payload: {},
            // })
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload, showPage: '' };
        },
        queryVehicleTypeSuccess(state, action) {
            return { ...state, ...action.payload, vehicleTypeModalVisible: true };
        },
        hideVehicleTypeModal(state, action) {
            return { ...state, vehicleTypeModalVisible: false };
        },
        createSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'create' };
        },
        onViewItem(state, action) {
            return { ...state, ...action.payload, showPage: 'view' };
        },
        backSuccess(state, action) {
            return { ...state, showPage: '' };
        },
        itemEditSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'create' };
        },
        batchOnlineVehicle(state, action) {
            return { ...state, ...action.payload, batchOnlineProcessModal: true };
        },
        batchOfflineVehicle(state, action) {
            return { ...state, ...action.payload, batchOfflineProcessModal: true };
        },
        hideOnlineVehicleModal(state, action) {
            return { ...state, batchOnlineProcessModal: false };
        },
        hideOfflineVehicleModal(state, action) {
            return { ...state, batchOfflineProcessModal: false };
        }
    },
}