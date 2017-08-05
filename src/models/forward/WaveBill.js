import { parse } from 'qs';
import { queryAlcNtcBill } from '../../services/forward/AlcNtcBill';
import { removeByValue } from '../../utils/ArrayUtils';
import { message } from 'antd';
import { querySerialArch } from '../../services/tms/SerialArch';
import { insert, getWaveBill, queryWaveBill, update, remove } from '../../services/forward/WaveBill';

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
            if (payload.waveType === '' || payload.waveType === undefined) {
                message.warning("请先选择波次类型", 2);
                return;
            }
            const { data } = yield call(queryAlcNtcBill, { state: 'initial' });
            if (data.status == '200') {
                let initialAlcNtcBill = [];//所有初始+当前波次单明细中包含的
                initialAlcNtcBill = data.obj.records;
                let allAlcNtcBill = [];
                for (var exist of payload.existAlcNtcList) {
                    // let obj = {};
                    // obj.billNumber = exist.alcNtcBillNumber;
                    // obj.state = exist.alcNtcBillState;
                    // obj.customer = exist.customer;
                    // obj.deliverySystem = exist.deliverySystem;
                    // 避免出现别名现象，可以使用es6 的析构赋值。
                    initialAlcNtcBill.push({ ...exist });
                }

                for (var alcNtc of initialAlcNtcBill) {
                    if (alcNtc.deliverySystem !== undefined) {
                        if (payload.waveType === 'normal') {
                            if (alcNtc.deliverySystem == 'tradition') {
                                allAlcNtcBill.push(alcNtc);
                            }
                        } else if (payload.waveType === 'eCommerce') {
                            if (alcNtc.deliverySystem == "eCommerce")
                                allAlcNtcBill.push(alcNtc);
                        }
                    }
                }
                for (var select of payload.selectedAlcNtcList) {
                    for (var bill of initialAlcNtcBill) {
                        if (select.alcNtcBillNumber != bill.billNumber) {
                            allAlcNtcBill.push(alcNtc);
                            break;
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
            for (var exist of data.obj.items)
                existAlcNtcList.push(exist);
            if (data.status === '200') {
                const serialArch = yield call(querySerialArch, {});
                yield put({
                    type: 'showCreate',
                    payload: {
                        currentItem: data.obj,
                        selectedAlcNtcList: data.obj.items,
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
                    if (payload.selectedAlcNtcList[i].alcNtcBillNumber == payload.removes[j].alcNtcBillNumber)
                        payload.selectedAlcNtcList.splice(i, 1);
                    // if (payload.allRemoveAlcNtcList.length == 0) {
                    //     payload.allRemoveAlcNtcList.push(payload.removes[i]);
                    // }
                    // if (payload.allRemoveAlcNtcList.length > 0) {
                    //     for (var allRemove of payload.allRemoveAlcNtcList) {
                    //         // if (payload.removes[i] === undefined)
                    //         //     continue;
                    //         if (payload.removes[j].alcNtcBillNumber != allRemove.alcNtcBillNumber)
                    //             payload.allRemoveAlcNtcList.push(payload.removes[i]);
                    //     }
                    // }
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
                    // allRemoveAlcNtcList: payload.allRemoveAlcNtcList
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