import { parse } from 'qs';
import { createSerialArch, queryTreeData, createLine, getLineByCode, addCustomer, queryCustomerWithoutLine, getLine, removeCustomer, upOrder, downOrder, stickCustomer, postponeCustomer, queryCustomerByLine } from '../../services/tms/SerialArch';
import { queryCustomer } from '../../services/basicinfo/customer';
export default {
    namespace: 'serialArch',
    state: {
        list: [],
        showCreateModal: false,
        treeData: [],
        showCreateLineModal: false,
        showAddCustomerModal: false,
        currentLine: "",
        customers: [],
        batchRemoveProcessModal: false,
        removeCustomerEntitys: [],
        batchStickProcessModal: false,
        stickCustomerEntitys: [],
        batchPostponeProcessModal: false,
        postponeCustomerEntitys: [],
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        currentLineCode: '',
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/tms/SerialArch') {
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
            const { data } = yield call(queryTreeData, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        treeData: data.obj,
                    }
                })
            }
        },
        *createSerialArch({ payload }, { call, put }) {
            yield call(createSerialArch, parse(payload));
            yield put({
                type: 'query',
                payload: {}
            })
        },
        *createLine({ payload }, { call, put }) {
            yield call(createLine, parse(payload));
            yield put({
                type: 'query',
                payload: {}
            })
        },
        *getLine({ payload }, { call, put }) {
            const { data } = yield call(queryCustomerByLine, parse(payload));
            if (data) {
                yield put({
                    type: 'showCustomerList',
                    payload: {
                        currentLine: data.obj.lineUuid,
                        list: data.obj.result.records,
                        pagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            current: data.obj.result.page,
                            total: data.obj.result.recordCount,
                            size: 'default'
                        },
                        currentLineCode: payload.lineCode,
                    }
                })
            }
        },
        *refreshLine({ payload }, { call, put }) {
            const { data } = yield call(queryCustomerByLine, parse(payload))
            if (data) {
                yield put({
                    type: 'showCustomerList',
                    payload: {
                        currentLine: data.obj.uuid,
                        list: data.obj.customers,
                    }
                })
            }
        },
        *showAddCustomer({ payload }, { call, put }) {
            const { data } = yield call(queryCustomerWithoutLine, { lineUuid: payload });
            if (data) {
                yield put({
                    type: 'showAddCustomerSuccess',
                    payload: {
                        customers: data.obj.records,
                    }
                })
            }
        },
        *addCustomer({ payload }, { call, put }) {
            const { data } = yield call(addCustomer, parse(payload));
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: data.obj },
                })
            }
        },
        *gridRemoveCustomer({ payload }, { call, put }) {
            const { data } = yield call(removeCustomer, {
                customerUuid: payload.customerUuid,
                lineUuid: payload.lineUuid,
            });
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: payload.lineCode },
                })
            }
        },
        *upOrder({ payload }, { call, put }) {
            const { data } = yield call(upOrder, {
                customerUuid: payload.record.customer.uuid,
                lineUuid: payload.record.serialArchLineUuid,
                order: payload.record.order
            });
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: payload.lineCode },
                })
            }
        },
        *onDown({ payload }, { call, put }) {
            const { data } = yield call(downOrder, {
                customerUuid: payload.record.customer.uuid,
                lineUuid: payload.record.serialArchLineUuid,
                order: payload.record.order
            });
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: payload.lineCode },
                })
            }
        },
        *stickCustomer({ payload }, { call, put }) {
            const { data } = yield call(stickCustomer, {
                customerUuid: payload.customerUuid,
                lineUuid: payload.lineUuid,
                order: payload.order
            });
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: payload.lineCode },
                })
            }
        },
        *postponeCustomer({ payload }, { call, put }) {
            const { data } = yield call(postponeCustomer, {
                customerUuid: payload.customerUuid,
                lineUuid: payload.lineUuid,
                order: payload.order
            });
            if (data) {
                yield put({
                    type: 'getLine',
                    payload: { lineCode: payload.lineCode },
                })
            }
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload, showCreateModal: false, showCreateLineModal: false }
        },
        showCreateSerialArch(state) {
            return { ...state, showCreateModal: true }
        },
        hideCreateModal(state) {
            return { ...state, showCreateModal: false }
        },
        showCreateLine(state) {
            return { ...state, showCreateLineModal: true }
        },
        hideCreateLineModal(state) {
            return { ...state, showCreateLineModal: false }
        },
        showAddCustomerSuccess(state, action) {
            return { ...state, ...action.payload, showAddCustomerModal: true }
        },
        hideAddCustomer(state) {
            return { ...state, showAddCustomerModal: false }
        },
        showCustomerList(state, action) {
            return { ...state, ...action.payload, showAddCustomerModal: false, }
        },
        batchRemoveFromLine(state, action) {
            return { ...state, ...action.payload, batchRemoveProcessModal: true }
        },
        hideRemoveCustomerModal(state) {
            return { ...state, batchRemoveProcessModal: false }
        },
        batchPostpone(state, action) {
            return { ...state, ...action.payload, batchPostponeProcessModal: true }
        },
        hidePostponeCustomerModal(state) {
            return { ...state, batchPostponeProcessModal: false }
        },
        batchStick(state, action) {
            return { ...state, ...action.payload, batchStickProcessModal: true }
        },
        hideStickCustomerModal(state) {
            return { ...state, batchStickProcessModal: false }
        }
    }
}