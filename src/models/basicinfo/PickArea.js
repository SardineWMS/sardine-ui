import { parse } from 'qs';
import { insert, get, queryPickArea, update, remove } from '../../services/basicinfo/PickArea';

export default {
    namespace: 'pickArea',

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
        batchRemoveProcessModal: false,
        removePickAreaEntitys: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/basicInfo/pickArea') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                };
            });
        }
    },

    effects: {
        *query({ payload }, { call, put }) {
            const { data } = yield call(queryPickArea, parse(payload));
            if (data.status == '200') {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            size: 'default',
                            current: data.obj.page,
                            total: data.obj.recordCount,
                        },
                        showPage: ''
                    }
                });
            };
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data) {
                yield put({
                    type: 'refreshGrid',
                    payload: {}
                });
                yield put({
                    type: 'get',
                    payload: {
                        uuid: data.obj
                    }
                });
            };
        },

        *get({ payload }, { call, put }) {
            const { data } = yield call(get, {
                uuid: payload.uuid
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

        *refreshGrid({ payload }, { call, put }) {
            const { data } = yield call(queryPickArea, parse(payload));
            if (data.status == '200') {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            size: 'default',
                            current: data.obj.page,
                            total: data.obj.recordCount
                        }
                    }
                });
            };
        },

        *update({ payload }, { call, put }) {
            const { data } = yield call(update, parse(payload));
            if (data) {
                yield put({
                    type: 'refreshGrid',
                    payload: {}
                });
                yield put({
                    type: 'get',
                    payload: {
                        uuid: payload.uuid
                    }
                });
            };
        },

        *remove({ payload }, { call, put }) {
            const { data } = yield call(remove, {
                uuid: payload.uuid, version: payload.version
            });
            if (data.status == '200') {
                yield put({
                    type: 'query',
                    payload: {},
                });
            };
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        createSuccess(state, action) {
            return { ...state, showPage: 'create' };
        },
        onViewItem(state, action) {
            return { ...state, ...action.payload, showPage: 'view' };
        },
        backSuccess(state, action) {
            return { ...state, ...action.payload, showPage: '' };
        },
        itemEditSuccess(state, action) {
            return {
                ...state, ...action.payload, showPage: 'create'
            };
        },
        batchRemovePickArea(state, action) {
            return { ...state, ...action.payload, batchRemoveProcessModal: true };
        },
        hideRemovePickAreaModal(state, action) {
            return { ...state, batchRemoveProcessModal: false };
        }
    }
}