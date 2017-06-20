import { parse } from 'qs';
import { queryArticleInStocks } from '../../services/basicinfo/Article.js';
import { queryWrhs, getBinByCode } from '../../services/basicinfo/Bin.js';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd } from '../../services/common/common.js';
import { message } from 'antd';
import { removeByValue } from '../../utils/ArrayUtils.js';
import { get, insert, queryDecInc, update, remove, audit, queryStockExtendInfo } from '../../services/inner/decInc.js';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


export default {
    namespace: 'decinc',

    state: {
        list: [],
        currentItem: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        wrhs: [],//当前组织下的仓位
        showCreatePage: false,
        showViewPage: false,
        decIncItem: [],//当前的损溢单明细集合,
        qpcStrs: [],//当前商品的规格集合
        billType: '',//单据类型
        proDates: [],//单据类型为损耗单时，生产日期取自库存
        totalCaseQtyStr: '0',//总件数
        totalAmount: 0,//总金额
        suppliers: [],//商品供应商数据源
        batchDeleteProcessModal: false,
        deleteDecIncBillEntitys: [],
        batchAuditProcessModal: false,
        auditDecIncBillEntitys: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/inner/decIncBill') {
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
            const { data } = yield call(queryDecInc, parse(payload));
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
                        decIncItem: []
                    }
                });
            };
        },

        *create({ payload }, { call, put }) {
            const { data } = yield call(queryArticleInStocks, parse(payload));
            yield put({
                type: 'createSuccess',
                payload: {

                }
            });
        },

        *onSelectType({ payload }, { call, put }) {
            const { data } = yield call(queryWrhs, {});
            const decIncItem = [];
            const currentItem = {};
            currentItem.totalCaseQtyStr = '0';
            currentItem.totalAmount = 0;
            currentItem.type = payload;
            if (payload.decIncItem == null) {
                const nullObj = new Object();
                nullObj.line = 1;
                nullObj.editable = true;
                decIncItem.push(nullObj);
            };
            yield put({
                type: 'createSuccess',
                payload: {
                    wrhs: data.obj,
                    decIncItem: decIncItem,
                    billType: payload,
                    currentItem: currentItem
                }
            });
        },

        *getArticleInfo({ payload }, { call, put }) {
            const { data } = yield call(getArticleInfo, {
                articleCode: payload.record.article.code,
            });
            if (data) {
                payload.record.article.uuid = data.obj.uuid;
                payload.record.article.name = data.obj.name;
                let qpcStrs = [];
                if (payload.currentItem.type == 'Dec') {
                    const stockInfo = yield call(queryStock, {
                        articleUuid: payload.record.article.uuid,
                        binCode: payload.record.binCode,
                        containerBarcode: payload.record.containerBarCode,
                    });
                    qpcStrs = stockInfo.data.obj.qpcStrs;
                }
                else {
                    for (var qpc of data.obj.qpcs) {
                        qpcStrs.push(qpc.qpcStr);
                    };
                };
                const suppliers = [];
                for (var supplier of data.obj.articleSuppliers) {
                    suppliers.push(supplier);
                };
                for (var item of payload.dataSource) {
                    if (item.line == payload.record.line) {
                        item.article.uuid = data.obj.uuid;
                        item.article.name = data.obj.name;
                        item.qpcStrs = qpcStrs;
                        item.suppliers = suppliers;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: payload.dataSource,
                        qpcStrs: qpcStrs,
                        suppliers: suppliers
                    }
                });
            };
        },

        // *verifyBin({ payload }, { call, put }) {
        //     const { data } = yield call(getBinByCode, {
        //         bincode: payload.value,
        //     });

        //     if (data) {

        //     } else { }
        // },

        *queryStockQty({ payload }, { call, put }) {
            const { data } = yield call(queryStock, {
                articleUuid: payload.record.article.uuid,
                qpcStr: payload.record.qpcStr,
                supplierUuid: payload.record.supplier.uuid
            });
            if (data) {
                if (data.obj.totalQty == 0 && payload.billType == 'dec') {
                    message.warning("该商品不存在库存，不能新建类型为损耗的损溢单", 2, '');
                    return;
                };
                for (var item of payload.dataSource) {
                    if (item.article.uuid == payload.record.article.uuid && item.qpcStr == payload.record.qpcStr) {
                        item.stockQty = data.obj.totalQty;
                        item.price = data.obj.price;
                        item.proDates = data.obj.productionDates;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: payload.dataSource
                    }
                });
            };
        },

        *calculateCaseQtyStr({ payload }, { call, put }) {
            const { data } = yield call(qtyToCaseQtyStr, {
                qty: payload.record.qty,
                qpcStr: payload.record.qpcStr,
            });
            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.caseQtyStr = data.obj;
                };
            };
            // const caseQtyStrResult = yield call(caseQtyStrAdd, {
            //     addend: payload.currentItem.totalCaseQtyStr, augend: data.obj,
            // });
            let totalAmount = 0;
            let totalCaseQtyStr = 0;
            if (payload.dataSource.length == 1) {
                totalCaseQtyStr = data.obj;
                totalAmount = payload.dataSource[0].price * payload.dataSource[0].qty;
            }
            else {
                for (var item of payload.dataSource) {
                    totalAmount = Number.parseFloat(item.price) * Number.parseFloat(item.qty) + Number.parseFloat(totalAmount);
                    if (item.caseQtyStr == 0 || item.caseQtyStr == '')
                        continue;
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, { addend: totalCaseQtyStr, augend: item.caseQtyStr, });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            // totalAmount = payload.record.price * payload.record.qty + payload.currentItem.totalAmount;
            // 
            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource,
                    currentItem: payload.currentItem
                }
            });
        },

        *removeItem({ payload }, { call, put }) {
            for (var item of payload.dataSource) {
                if (payload.record.line == item.line) {
                    removeByValue(payload.dataSource, item);
                };
            };
            if (payload.dataSource.length == 0) {
                const nullObj = new Object();
                nullObj.line = 1;
                nullObj.editable = true;
                payload.dataSource.push(nullObj);
            };
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].line = i + 1;
            };
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource
                }
            });
        },

        *addItem({ payload }, { call, put }) {
            const nullObj = new Object();
            nullObj.line = payload.dataSource.length + 1;
            nullObj.editable = true;
            payload.dataSource.push(nullObj);
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource
                }
            });
        },

        *onView({ payload }, { call, put }) {
            const { data } = yield call(get, {
                uuid: payload.uuid
            });
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: data.obj.items
                }
            });
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data) {
                const decIncBill = yield call(get, {
                    uuid: data.obj
                });
                if (decIncBill) {
                    const wrhs = yield call(queryWrhs, {});
                    const decIncItem = [];
                    const currentItem = {};
                    currentItem.totalCaseQtyStr = '0';
                    currentItem.totalAmount = 0;
                    const nullObj = new Object();
                    nullObj.line = 1;
                    nullObj.editable = true;
                    decIncItem.push(nullObj);

                    yield put({
                        type: 'viewSuccess',
                        payload: {
                            wrhs: wrhs.data.obj,
                            currentItem: decIncBill.data.obj,
                            decIncItem: decIncBill.data.obj.items,
                        }
                    });
                };
            };
        },

        *update({ payload }, { call, put }) {
            yield call(update, parse(payload));
            yield put({
                type: 'viewDecInc',
                payload: payload
            });
        },

        *refreshSupplier({ payload }, { call, put }) {
            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.supplier = payload.record.supplier;
                };
            };
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource
                }
            });
        },

        *viewDecInc({ payload }, { call, put }) {
            const { data } = yield call(get, {
                uuid: payload.uuid,
            });
            if (data) {
                const wrhs = yield call(queryWrhs, {});
                yield put({
                    type: 'viewSuccess',
                    payload: {
                        decIncItem: data.obj.item,
                        wrhs: wrhs.data.obj,
                        currentItem: data.obj
                    }
                });
            };
        },

        *edit({ payload }, { call, put }) {
            const { data } = yield call(get, { uuid: payload.uuid });
            if (data) {
                const wrhs = yield call(queryWrhs, {});
                for (var item of data.obj.items) {
                    item.editable = true;
                    var produceDate = moment(item.productionDate);
                    item.productionDate = produceDate.format("YYYY-MM-DD");
                    const stocks = yield call(queryStock, {
                        articleUuid: item.article.uuid,
                        qpcStr: item.qpcStr,
                        supplierUuid: item.supplier.uuid,
                    });
                    if (stocks.data) {
                        if (stocks.data.obj.totalQty == 0 && item.type == 'dec') {
                            message.warning("该商品不存在库存，不能新建类型为损耗的损溢单", 2, '');
                            return;
                        };
                        const proDates = [];
                        // for (var item of payload.dataSource) {
                        // if (item.article.uuid == payload.record.article.uuid && item.qpcStr == payload.record.qpcStr) {
                        item.stockQty = stocks.data.obj.totalQty;
                        proDates.push(stocks.data.obj.productionDate);

                        item.proDates = proDates;
                    };
                    // }

                    const article = yield call(getArticleInfo, {
                        articleCode: item.article.code,
                    });
                    if (article.data) {
                        const qpcStrs = [];
                        for (var qpc of article.data.obj.qpcs) {
                            qpcStrs.push(qpc.qpcStr);
                        };

                        const suppliers = [];
                        for (var supplier of article.data.obj.articleSuppliers) {
                            suppliers.push(supplier);
                        };
                        item.qpcStrs = qpcStrs;
                        item.suppliers = suppliers;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: data.obj.items,
                        wrhs: wrhs.data.obj,
                        currentItem: data.obj
                    }
                });
            };

        },

        *gridDelete({ payload }, { call, put }) {
            yield call(remove, { uuid: payload.uuid, version: payload.version });
            yield put({
                type: 'query',
                payload: {}
            });
        },

        *gridAudit({ payload }, { call, put }) {
            yield call(audit, {
                uuid: payload.uuid, version: payload.version,
            });
            yield put({
                type: 'query',
                payload: {}
            });
        },

        *getSupplier({ payload }, { call, put }) {
            const { data } = yield call(queryStockExtendInfo, {
                articleUuid: payload.record.article.uuid,
                binCode: payload.record.binCode,
                containerBarcode: payload.record.containerBarCode,
                qpcStr: payload.record.qpcStr,
            });
            if (data) {
                for (var item of payload.dataSource) {
                    if (item.line == payload.record.line) {
                        item.suppliers = data.obj;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: payload.dataSource
                    }
                });
            };
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload, showCreatePage: false, showViewPage: false };
        },
        createSuccess(state, action) {
            return { ...state, ...action.payload, showCreatePage: true, showViewPage: false };
        },
        viewSuccess(state, action) {
            return { ...state, ...action.payload, showViewPage: true, showCreatePage: false };
        },
        batchDeleteDecIncBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true };
        },
        batchAuditDecIncBill(state, action) {
            return { ...state, ...action.payload, batchAuditProcessModal: true };
        },
        hideDeleteDecIncBillModal(state, action) {
            return {
                ...state, ...action.payload, batchDeleteProcessModal: false
            };
        },
        hideAuditDecIncBillModal(state, action) {
            return { ...state, batchAuditProcessModal: false };
        }
    }
}