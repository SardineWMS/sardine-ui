import { parse } from 'qs';
import { queryArticleInStocks } from '../../services/basicinfo/Article.js';
import { queryWrhs, getBinByCode } from '../../services/basicinfo/Bin.js';
import { getByCode as getArticleInfo } from '../../services/basicinfo/Article.js';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, queryStockExtendInfo } from '../../services/common/common.js';
import { message } from 'antd';
import { removeByValue } from '../../utils/ArrayUtils.js';
import { get, insert, queryDecInc, update, remove, audit } from '../../services/inner/decInc.js';
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

        // *create({ payload }, { call, put }) {
        //     const { data } = yield call(queryArticleInStocks, parse(payload));
        //     yield put({
        //         type: 'createSuccess',
        //         payload: {

        //         }
        //     });
        // },

        *onSelectType({ payload }, { call, put }) {
            // const { data } = yield call(queryWrhs, {});
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
                    //  wrhs: data.obj,
                    decIncItem: decIncItem,
                    //billType: payload,
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
                console.log("商品结果", data);
                payload.record.article.uuid = data.obj.uuid;
                payload.record.article.name = data.obj.name;
                let qpcStrs = [];
                let suppliers = [];
                let productionDates = [];
                let stocks = [];
                // let itemStockInfo={};
                if (payload.currentBill.type == 'Dec') {
                    // const stockInfo = yield call(queryStock, {
                    //     articleUuid: payload.record.article.uuid,
                    //     binCode: payload.record.binCode,
                    //     containerBarcode: payload.record.containerBarCode,
                    // });
                    // qpcStrs = stockInfo.data.obj.qpcStrs;

                    const stockInfo = yield call(queryStockExtendInfo, {
                        articleUuid: payload.record.article.uuid,
                        binCode: payload.record.binCode,
                        containerBarcode: payload.record.containerBarCode,
                    });
                    if (stockInfo && stockInfo.data.obj.length > 0) {
                        stocks = stockInfo.data.obj;
                        stocks.sort(function (a, b) {
                            return a.productionDate - b.productionDate
                        });
                        stocks.map(function (stock) {
                            qpcStrs.push(stock.qpcStr);
                        });
                        // itemStockInfo.line=payload.record.line;
                        // itemStockInfo.stocks=stocks;
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
                        }
                        item.stockQty = stocks[0] ? stocks[0].qty : 0;
                        item.stocks = stocks;
                    };
                };
                yield put({
                    type: 'createSuccess',
                    payload: {
                        decIncItem: payload.dataSource
                        // qpcStrs: qpcStrs,
                        // suppliers: suppliers,
                        // stocks:stocks
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
            const { data } = yield call(qtyToCaseQtyStr, {
                qty: payload.record.qty,
                qpcStr: payload.record.qpcStr,
            });
            for (var item of payload.dataSource) {
                if (item.line == payload.record.line) {
                    item.caseQtyStr = data.obj;
                };
            };

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

            payload.currentBill.totalCaseQtyStr = totalCaseQtyStr;
            payload.currentBill.totalAmount = totalAmount;
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
            var totalAmount = 0;
            var totalCaseQtyStr = 0;
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].line = i + 1;
                totalAmount = Number.parseFloat(payload.dataSource[i].price) * Number.parseFloat(payload.dataSource[i].qty) + Number.parseFloat(totalAmount);
                if (payload.dataSource[i].caseQtyStr === undefined || payload.dataSource[i].caseQtyStr == 0)
                    continue;
                const totalCaseQtyStrResult = yield call(caseQtyStrAdd, { addend: totalCaseQtyStr, augend: payload.dataSource[i].caseQtyStr, });
                totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
            };
            payload.currentBill.totalCaseQtyStr = totalCaseQtyStr;
            payload.currentBill.totalAmount = totalAmount;
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
                    // const wrhs = yield call(queryWrhs, {});
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
                            // wrhs: wrhs.data.obj,
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
                        // for (var qpc of article.data.obj.qpcs) {
                        //     if (qpc.qpcStr == item.qpcStr)
                        // };

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