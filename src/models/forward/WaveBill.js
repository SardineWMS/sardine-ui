import { parse } from 'qs';
import { queryAlcNtcBill } from '../../services/forward/AlcNtcBill';
import { removeByValue } from '../../utils/ArrayUtils';
import { message } from 'antd';
import { querySerialArch } from '../../services/tms/SerialArch';
import { insert, getWaveBill, queryWaveBill, update, remove, start, confirm, rollBack } from '../../services/forward/WaveBill';

export default {
    namespace: 'waveBill',
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
        selectModalVisible: false,
        allInitialAlcNtcList: [],//所有初始状态的波次单
        selectedAlcNtcList: [],//选中的配单
        waveType: '',
        line: '',//正常波次下的线路
        serialArchList: [],
        batchDeleteProcessModal: false,
        deleteWaveBillEntitys: [],
        allRemoveAlcNtcList: [],//所有点击添加编辑时删除的配单
        isUpdate: false,//编辑还是新增，默认新增
        existAlcNtcList: [],//编辑操作，原来包含的配单集合
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/waveBill') {
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
            const { data } = yield call(queryWaveBill, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        showPage: '',
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: total => `共 ${total}条`,
                            size: 'default'
                        },
                        currentItem: {},
                        allInitialAlcNtcList: [],
                        selectedAlcNtcList: [],
                        waveType: '',
                        serialArchList: [],
                        allRemoveAlcNtcList: [],
                        existAlcNtcList: [],
                    }
                });
            };
        },

        *showSelectModal({ payload }, { call, put }) {
            // if (!payload.waveType) {
            //     message.warning("请先选择波次类型", 2);
            //     return;
            // } else if (payload.waveType === 'normal' && !payload.line) {
            //     message.warning("请先选择线路!", 2);
            //     return;
            // }
            const { data } = yield call(queryAlcNtcBill, { ...payload, state: 'initial' });
            if (data.status == '200') {
                let initialAlcNtcBill = [];//所有初始+当前波次单明细中包含的
                initialAlcNtcBill = data.obj.records;
                let allAlcNtcBill = [];
                for (var exist of payload.existAlcNtcList) {
                    let obj = {};
                    obj.billNumber = exist.ntcBillNumber;
                    obj.state = exist.ntcBillState;
                    obj.customer = exist.customer;
                    obj.deliverySystem = exist.deliverySystem;
                    // 避免出现别名现象，可以使用es6 的析构赋值。
                    initialAlcNtcBill.push(obj);
                }

                for (var alcNtc of initialAlcNtcBill) {
                    if (payload.waveType === 'normal') {
                        allAlcNtcBill.push(alcNtc);
                    } else if (payload.waveType === 'eCommerce') {
                        allAlcNtcBill.push(alcNtc);
                    }
                }
                for (let i = 0; i < allAlcNtcBill.length; i++) {
                    for (let j = 0; j < payload.selectedAlcNtcList.length; j++) {
                        if (allAlcNtcBill[i].billNumber == payload.selectedAlcNtcList[j].ntcBillNumber) {
                            allAlcNtcBill.splice(i, 1);
                        }
                    }
                }
                yield put({
                    type: 'showSelectModalSuccess',
                    payload: {
                        allInitialAlcNtcList: allAlcNtcBill
                    }
                })
            }
        },

        *selectType({ payload }, { call, put }) {
            const { data } = yield call(querySerialArch, {});
            if (data.status === '200') {
                yield put({
                    type: 'selectTypeSuccess',
                    payload: {
                        serialArchList: data.obj,
                        waveType: payload.waveType
                    }
                })
            }
        },

        *update({ payload }, { call, put }) {
            const { data } = yield call(update, payload);
            if (data.status === '200')
                yield put({
                    type: 'viewWaveBill',
                    payload: payload
                })
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data.status === '200')
                yield put({
                    type: 'viewWaveBill',
                    payload: { uuid: data.obj }
                })
        },

        *viewWaveBill({ payload }, { call, put }) {
            const { data } = yield call(getWaveBill, { uuid: payload.uuid });
            if (data.status === '200') {
                yield put({
                    type: 'viewSuccess',
                    payload: {
                        currentItem: data.obj,
                        waveType: data.obj.waveType
                    }
                })
            }
        },

        *edit({ payload }, { call, put }) {
            const { data } = yield call(getWaveBill, { uuid: payload.uuid });
            const existAlcNtcList = [];
            for (var exist of data.obj.ntcItems)
                existAlcNtcList.push(exist);
            if (data.status === '200') {
                const serialArch = yield call(querySerialArch, {});
                yield put({
                    type: 'showCreate',
                    payload: {
                        currentItem: data.obj,
                        selectedAlcNtcList: data.obj.ntcItems,
                        existAlcNtcList: existAlcNtcList,//不能直接使用data.obj.items赋值，避免别名机制
                        isUpdate: true,
                        serialArchList: serialArch.data.obj,
                        waveType: data.obj.waveType
                    }
                })
            }
        },

        *delete({ payload }, { call, put }) {
            const { data } = yield call(remove, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'query',
                    payload: {}
                })
            }
        },

        *start({ payload }, { call, put }) {
            const { data } = yield call(start, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'viewWaveBill',
                    payload: {
                        uuid: payload.uuid
                    }
                })
            }
        },

        *confirm({ payload }, { call, put }) {
            const { data } = yield call(confirm, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'viewWaveBill',
                    payload: {
                        uuid: payload.uuid
                    }
                })
            }
        },

        *rollBack({ payload }, { call, put }) {
            const { data } = yield call(rollBack, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'viewWaveBill',
                    payload: {
                        uuid: payload.uuid
                    }
                })
            }
        },

        *removeSelectedBill({ payload }, { call, put }) {
            function compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            }
            for (let i = 0; i < payload.selectedAlcNtcList.length; i++) {
                for (let j = 0; j < payload.removes.length; j++) {
                    if (payload.selectedAlcNtcList[i].ntcBillNumber == payload.removes[j].ntcBillNumber)
                        payload.selectedAlcNtcList.splice(i, 1);
                }
            }
            payload.selectedAlcNtcList.sort(compare("line"))
            var i = 1;
            for (var select of payload.selectedAlcNtcList) {
                select.line = i;
                i += 1;
            }
            yield put({
                type: 'showCreate',
                payload: {
                    selectedAlcNtcList: payload.selectedAlcNtcList,
                }
            })
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        showCreate(state, action) {
            return { ...state, ...action.payload, showPage: 'create' };
        },
        showSelectModalSuccess(state, action) {
            return { ...state, ...action.payload, selectModalVisible: true };
        },
        hideSelectModal(state, action) {
            return { ...state, ...action.payload, selectModalVisible: false };
        },
        selectTypeSuccess(state, action) {
            return { ...state, ...action.payload }
        },
        viewSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'view' };
        },
        hideDeleteWaveBillModal(state, action) {
            return { ...state, batchDeleteProcessModal: false }
        },
        batchDeleteWaveBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true }
        }
    }
}