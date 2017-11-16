import { parse } from 'qs';
import { queryArticleInStocks } from '../../services/basicinfo/Article.js';
import { queryWrhs, getBinByCode } from '../../services/basicinfo/Bin.js';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, queryStockExtendInfo } from '../../services/common/common.js';
import { message } from 'antd';
import { removeByValue } from '../../utils/ArrayUtils.js';
import { get, insert, queryDecInc, update, remove, audit, refreshCaseQtyStrAndAmount } from '../../services/inner/decInc.js';
import { queryReasonConfig } from '../../services/basicinfo/config/ReasonConfig.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


export default {
    namespace: 'decinc',

    state: {
        list: [],
        currentBill: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        reasons: [],
        showCreatePage: false,
        showViewPage: false,
        decIncItem: [],//当前的损溢单明细集合,
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
                        currentBill: {},
                        decIncItem: []
                    }
                });
            };
        },

        *onSelectType({ payload }, { call, put }) {
            const decIncItem = [];
            const currentBill = {};
            currentBill.totalCaseQtyStr = '0';
            currentBill.totalAmount = 0;
            currentBill.type = payload;
            if (payload.decIncItem == null) {
                const nullObj = new Object();
                nullObj.line = 1;
                nullObj.editable = true;
                decIncItem.push(nullObj);
            };
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: decIncItem,
                    currentBill: currentBill
                }
            });
        },

        *getArticleInfo({ payload }, { call, put }) {
            const { data } = yield call(getArticleInfo, {
                articleCode: payload.record.article.code,
            });
            if (data) {
                if (!data.obj) {
                    message.warning("商品不存在，请重新输入！", 2);
                    return;
                }
                payload.record.article.uuid = data.obj.uuid;
                payload.record.article.name = data.obj.name;
                if (data.obj.expflag === 'none' && payload.currentBill.type == 'Inc') {
                    payload.record.productionDate = moment('8888-12-31');
                }
                let qpcStrs = [];
                let suppliers = [];
                let productionDates = [];
                let stocks = [];
                let stockQty = 0;
                if (payload.currentBill.type == 'Dec') {
                    const stockInfo = yield call(queryStockExtendInfo, {
                        articleUuid: payload.record.article.uuid,
                        binCode: payload.record.binCode,
                        containerBarcode: payload.record.containerBarCode,
                        state: 'normal'
                    });
                    if (stockInfo && stockInfo.data.obj.length > 0) {
                        stocks = stockInfo.data.obj;
                        stocks.sort(function (a, b) {
                            return a.productionDate - b.productionDate
                        });
                        stocks.map(function (stock) {
                            qpcStrs.push(stock.qpcStr);
                        });
                        suppliers.push(stocks[0].supplier);
                        productionDates.push(stocks[0].productionDate);
                    }
                } else {
                    for (var qpc of data.obj.qpcs) {
                        qpcStrs.push(qpc.qpcStr);
                    };
                    for (var supplier of data.obj.articleSuppliers) {
                        const supplierUcn = new Object();
                        supplierUcn.uuid = supplier.supplierUuid;
                        supplierUcn.code = supplier.supplierCode;
                        supplierUcn.name = supplier.supplierName;
                        suppliers.push(supplierUcn);
                    };
                };

                for (var item of payload.dataSource) {
                    if (item.line == payload.record.line) {
                        item.article.uuid = data.obj.uuid;
                        item.article.name = data.obj.name;
                        item.qpcStrs = qpcStrs;
                        item.suppliers = suppliers;
                        item.price = data.obj.purchasePrice ? data.obj.purchasePrice : 0;
                        item.supplier = suppliers[0];
                        item.qpcStr = qpcStrs[0];
                        if (payload.currentBill.type == 'Dec' && productionDates.length > 0) {
                            item.proDates = productionDates;
                            item.productionDate = productionDates[0];
                            item.price = stocks[0].price;
                        }
                        stocks.map(function (stock) {
                            if (stock.qpcStr == item.qpcStr && stock.supplier == stock.supplier) {
                                if (item.productionDate) {
                                    if (stock.productionDate == item.productionDate) {
                                        stockQty = stockQty + Number.parseInt(stock.qty);
                                    }
                                }
                                else {
                                    stockQty = stockQty + Number.parseInt(stock.qty);
                                }
                            }
                        })
                        item.stockQty = stockQty;
                        item.stocks = stocks;
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
            if (payload.record.qpcStr == null || payload.record.qpcStr == '') {
                message.error("请先选择规格", 2);
                return;
            };
            if (isNaN(Number.parseFloat(payload.record.qty))) {
                message.error("数量格式不正确，请正确输入数字。");
                return;
            };
            payload.currentBill.items.map(function (item) {
                if (!item.qty)
                    item.qty = 0;
            })
            const { data } = yield call(refreshCaseQtyStrAndAmount, payload.currentBill);
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].caseQtyStr = data.obj.items[i].caseQtyStr;
            }
            payload.currentBill = { ...data.obj };
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource,
                    currentBill: payload.currentBill
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
            payload.currentBill.items.map(function (item) {
                if (!item.qty)
                    item.qty = 0;
            })
            const { data } = yield call(refreshCaseQtyStrAndAmount, payload.currentBill);
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].caseQtyStr = data.obj.items[i].caseQtyStr;
            }
            payload.currentBill = { ...data.obj };
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: payload.dataSource,
                    currentBill: payload.currentBill
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
                    const decIncItem = [];
                    const currentBill = {};
                    currentBill.totalCaseQtyStr = '0';
                    currentBill.totalAmount = 0;
                    const nullObj = new Object();
                    nullObj.line = 1;
                    nullObj.editable = true;
                    decIncItem.push(nullObj);

                    yield put({
                        type: 'viewSuccess',
                        payload: {
                            currentBill: decIncBill.data.obj,
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
                yield put({
                    type: 'viewSuccess',
                    payload: {
                        decIncItem: data.obj.item,
                        currentBill: data.obj
                    }
                });
            };
        },

        *edit({ payload }, { call, put }) {
            const { data } = yield call(get, { uuid: payload.uuid });
            if (data) {
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
                        item.stockQty = stocks.data.obj.totalQty;
                        proDates.push(stocks.data.obj.productionDate);

                        item.proDates = proDates;
                    };

                    const article = yield call(getArticleInfo, {
                        articleCode: item.article.code,
                    });
                    if (article.data) {
                        const qpcStrs = [];
                        qpcStrs.push(item.qpcStr);

                        const suppliers = [];
                        for (var supplier of article.data.obj.articleSuppliers) {
                            if (supplier.supplierUuid == item.supplier.uuid) {
                                let supplierUcn = {};
                                supplierUcn.uuid = supplier.supplierUuid;
                                supplierUcn.code = supplier.supplierCode;
                                supplierUcn.name = supplier.supplierName;
                                suppliers.push(supplierUcn);
                            }
                        };
                        item.qpcStrs = qpcStrs;
                        item.suppliers = suppliers;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: data.obj.items,
                        currentBill: data.obj
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
        },

        *showCreate({ payload }, { call, put }) {
            const billItem = new Object();
            billItem.line = 1;
            billItem.editable = true;
            const list = [];
            list.push(billItem);
            const currentBill = {};
            currentBill.totalCaseQtyStr = 0;
            currentBill.totalAmount = 0;
            currentBill.type = 'Dec';
            const { data } = yield call(queryReasonConfig, { reasonType: "DECINC" });
            yield put({
                type: 'createSuccess',
                payload: {
                    decIncItem: list,
                    currentBill: currentBill,
                    reasons: data.obj
                }
            });
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