import { parse } from 'qs';
import { queryWrhs, queryBin } from '../../services/basicinfo/Bin.js';
import { getByCode as getCustomerByCode } from '../../services/basicinfo/Customer.js';
import { get as getArticle } from '../../services/basicinfo/Article.js';
import { queryRtnNtcBillByBillNumber } from '../../services/backward/RtnNtcBillService.js';
import { insert, queryBill, getRtnBill, update, remove, audit } from '../../services/backward/ReturnBillService.js';
import { message } from 'antd';
import { removeByValue } from '../../utils/ArrayUtils';
import { qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    namespace: 'rtnBill',
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
        showRtnNtcSelectModal: false,
        ntcBillItemArticles: [],
        billItems: [],
        treeData: [],//商品下拉框数据源
        article_qpcStr: {},
        batchModifyReturnTypeVisible: false,
        batchModifyReturnContainerVisible: false,
        batchModifyProductionDateVisible: false,
        modifyReturnTypeEntitys: [],
        modifyReturnContainerEntitys: [],
        modifyProductionDateEntitys: [],
        batchDeleteProcessModal: false,
        deleteRtnBillEntitys: [],
        batchAuditProcessModal: false,
        auditRtnBillEntitys: [],
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/backward/storeRtnBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query
                    });
                };
            });
        }
    },

    effects: {
        *query({
            payload
        }, { call, put }) {
            const { data } = yield call(queryBill, parse(payload));
            if (data.status === '200') {
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
                        billItems: [],
                        ntcBillItemArticles: []
                    }
                })
            }
        },

        *onReturnNtcBillSelect({ payload }, { call, put }) {
            const { data } = yield call(queryRtnNtcBillByBillNumber, { billNumber: payload });
            if (data.status == '200' && data.obj != null) {
                const article_qpcStr = {};
                const bin = yield call(queryBin, {
                    wrhUuid: data.obj.wrh.uuid, usage: 'RtnReceiveTempBin'
                });
                const articles = [];
                let itemLists = [];

                /**
                 * 获取退仓通知单，根据通知单明细构造ntcBillItemArticles
                 * ntcBillItemArticles:通知单所有商品明细信息
                 */
                for (let itemArt of data.obj.items) {
                    const articleUUid = itemArt.article.uuid;
                    const article = yield call(getArticle, { articleUuid: articleUUid });
                    const expDays = article.data.obj.expDays;
                    itemArt.editable = true;
                    itemArt.expDays = expDays;
                    if (!bin.data.obj.pageData.records[0]) {
                        message.error("当前仓位下不存在退货收货暂存位，无法退仓");
                        return;
                    }
                    itemArt.binCode = bin.data.obj.pageData.records[0].code;

                    const sku = {};
                    sku.value = itemArt.article.code;
                    sku.label = itemArt.article.code;
                    articles.push(sku);

                    /**
                     * 构造article——qpcStr对象
                     * 根据退仓通知单明细中的商品信息，获取商品代码及规格。
                     * article_qpcStr对象:articleCode-qpcStrs[]
                     */
                    if (JSON.stringify(article_qpcStr) == "{}") {
                        let qpcStrs = [];
                        const qpcStr = {};
                        qpcStr.value = itemArt.qpcStr;
                        qpcStr.label = itemArt.qpcStr;
                        qpcStrs.push(qpcStr);
                        let articleCode = itemArt.article.code;
                        article_qpcStr[articleCode] = qpcStrs;
                    } else {
                        for (let prop in article_qpcStr) {
                            if (prop == itemArt.article.code) {
                                for (let qpcStr of article_qpcStr[prop]) {
                                    if (qpcStr.value != itemArt.qpcStr) {
                                        const q = {};
                                        q.value = itemArt.qpcStr;
                                        q.label = itemArt.qpcStr;
                                        article_qpcStr[prop].push(q);
                                    };
                                }
                            } else {
                                let qpcStrs = [];
                                const qpcStr = {};
                                qpcStr.value = itemArt.qpcStr;
                                qpcStr.label = itemArt.qpcStr;
                                qpcStrs.push(qpcStr);
                                let articleCode = itemArt.article.code;
                                article_qpcStr[articleCode] = qpcStrs;
                            };
                        };
                    };
                };

                /**
                 * 初始选中通知单后，退仓单明细只有一条空的记录
                 */
                const nullItem = {};
                nullItem.editable = true;
                nullItem.line = 1;
                itemLists.push(nullItem);

                let current = {};
                current.customer = data.obj.customer;
                current.wrh = data.obj.wrh;
                current.totalCaseQtyStr = "";
                current.totalAmont = 0;
                current.returnNtcBillNumber = data.obj.billNumber

                yield put({
                    type: 'ntcBillSelectSuccess',
                    payload: {
                        currentItem: current,
                        billItems: itemLists,
                        treeData: articles,
                        article_qpcStr: article_qpcStr,
                        showRtnNtcSelectModal: false,
                        ntcBillItemArticles: data.obj.items
                    }
                });
            };
        },

        *selectArticle({ payload }, { call, put }) {
            const qpcStrs = [];
            const qpcStr = payload.article_qpcStr[payload.record.article.code];
            qpcStrs.push(qpcStr);
            for (let article of payload.array) {
                article.binCode = payload.ntcBillItemArticles[0].binCode;
                if (article.line == payload.record.line) {
                    for (let item of payload.ntcBillItemArticles) {
                        if (item.article.code == payload.record.article.code) {
                            article.article.uuid = item.article.uuid;
                            article.article.name = item.article.name;
                            article.expDays = item.expDays == null ? article.expDays : item.expDays;
                            article.qpcStrs = qpcStrs;
                            article.price = item.price;
                            break;
                        }
                    }
                }
            };

            yield put({
                type: 'ntcBillSelectSuccess',
                payload: {
                    billItems: payload.array
                }
            })
        },

        *selectQpcStr({ payload }, { call, put }) {
            const suppliers = [];
            for (let ntcBillItemArticle of payload.ntcBillItemArticles) {
                if (ntcBillItemArticle.article.code == payload.record.article.code) {
                    if (ntcBillItemArticle.qpcStr == payload.record.qpcStr) {
                        payload.record.munit = ntcBillItemArticle.munit;
                        const supplier = ntcBillItemArticle.supplier;
                        suppliers.push(supplier);
                        continue;
                    }
                }
            };
            for (let ntcBillItemArticle of payload.ntcBillItemArticles) {
                for (let item of payload.array) {
                    if (item.article.code == ntcBillItemArticle.article.code && item.qpcStr == ntcBillItemArticle.qpcStr) {
                        item.suppliers = suppliers;
                    }
                }
            }
            yield put({
                type: 'ntcBillSelectSuccess',
                payload: {
                    billItems: payload.array
                }
            });
        },

        *calculateCaseQtyStr({ payload }, { call, put }) {
            if (payload.record.qpcStr == null || payload.record.qpcStr == '') {
                message.warning("请先选择商品规格", 2);
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        currentItem: payload.record
                    }
                });
                return;
            };
            if (isNaN(Number.parseFloat(payload.record.qty))) {
                message.error("数量格式不正确，请正确输入数字", 2);
                return;
            };
            const { data } = yield call(qtyToCaseQtyStr, { qty: Number(payload.record.qty), qpcStr: payload.record.qpcStr });
            payload.record.caseQtyStr = data.obj;
            for (var item of payload.list) {
                if (item.line == payload.record.line) {
                    item.caseQtyStr = data.obj;
                };
            };
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if (payload.list.length == 1) {
                totalCaseQtyStr = data.obj;
                totalAmount = payload.list[0].price * payload.list[0].qty;
            } else {
                for (let item of payload.list) {
                    totalAmount = Number.parseFloat(item.price) * Number.parseFloat(item.qty) + Number.parseFloat(totalAmount);
                    if (item.caseQtyStr == 0 || item.caseQtyStr == '')
                        continue;
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, { addend: totalCaseQtyStr, augend: item.caseQtyStr, });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };

            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list,
                    currentItem: payload.currentItem
                }
            });
        },

        *calculateValidDate({ payload }, { call, put }) {
            for (let item of payload.list) {
                if (item.line == payload.record.line) {
                    let productionDate = moment(payload.record.productionDate);
                    payload.record.productionDate = productionDate.format("YYYY-MM-DD");
                    let validDate = productionDate.add(payload.record.expDays, 'days');
                    payload.record.validDate = validDate.format("YYYY-MM-DD");
                    break;
                };
            };
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list
                }
            });
        },

        *addItemList({ payload }, { call, put }) {
            const nullItem = {};
            nullItem.editable = true;
            nullItem.line = payload.length + 1;
            payload.push(nullItem);
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload
                }
            });
        },

        *removeItem({ payload }, { call, put }) {
            for (var item of payload.dataSource) {
                if (payload.record.line == item.line) {
                    removeByValue(payload.dataSource, item);
                    if (payload.dataSource.length == 0) {
                        const nullObj = new Object();
                        nullObj.line = 1;
                        nullObj.editable = true;
                        payload.dataSource.push(nullObj);
                        payload.currentItem.totalCaseQtyStr = 0;
                        payload.currentItem.totalAmount = 0;
                    }
                    else {
                        if (item.caseQtyStr == null) {
                            continue;
                        }
                        const { data } = yield call(caseQtyStrSubtract, { subStr: payload.currentItem.totalCaseQtyStr, subedStr: item.caseQtyStr });
                        payload.currentItem.totalCaseQtyStr = data.obj;
                        payload.currentItem.totalAmount = Number.parseFloat(payload.currentItem.totalAmount) - Number.parseFloat(item.price * item.qty);
                    };
                };
            };
            for (let i = 0; i < payload.dataSource.length; i++) {
                payload.dataSource[i].line = i + 1;
            };
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.dataSource
                }
            });
        },

        *insert({ payload }, { call, put }) {
            const { data } = yield call(insert, parse(payload));
            if (data.status == '200') {
                yield put({
                    type: 'showView',
                    payload: {
                        uuid: data.obj
                    }
                })
            }
        },

        *update({ payload }, { call, put }) {
            const { data } = yield call(update, parse(payload));
            if (data.status == '200') {
                yield put({
                    type: 'showView',
                    payload: {
                        uuid: payload.uuid
                    }
                })
            }
        },

        *showView({ payload }, { call, put }) {
            const { data } = yield call(getRtnBill, { uuid: payload.uuid });
            if (data.status === '200') {
                yield put({
                    type: 'showViewSuccess',
                    payload: {
                        currentItem: data.obj
                    }
                });
            };
        },

        *showEdit({ payload }, { call, put }) {
            const { data } = yield call(queryRtnNtcBillByBillNumber, { billNumber: payload.returnNtcBillNumber });

            const articles = [];
            let totalCaseQtyStr = "0";
            let article_qpcStr = {};
            const bin = yield call(queryBin, { wrhUuid: data.obj.wrh.uuid, usage: 'RtnReceiveTempBin' });
            let binCode = bin.data.obj.pageData.records[0].code;



            /**
             * 构造通知单明细集合
             */
            for (let ntcItem of data.obj.items) {
                const article = {};
                article.value = ntcItem.article.code;
                article.label = ntcItem.article.code;
                articles.push(article);

                if (JSON.stringify(article_qpcStr) == "{}") {
                    let qpcStrs = [];
                    const qpcStr = {};
                    qpcStr.value = ntcItem.qpcStr;
                    qpcStr.label = ntcItem.qpcStr;
                    qpcStrs.push(qpcStr);
                    let articleCode = ntcItem.article.code;
                    article_qpcStr[articleCode] = qpcStrs;
                } else {
                    for (var prop in article_qpcStr) {
                        if (prop == ntcItem.article.code) {
                            for (let qpcStr of article_qpcStr[prop]) {
                                if (qpcStr.value != ntcItem.qpcStr) {
                                    const q = {};
                                    q.value = ntcItem.qpcStr;
                                    q.label = ntcItem.qpcStr;
                                    article_qpcStr[prop].push(q);
                                };
                            };
                        } else {
                            let qpcStrs = [];
                            const qpcStr = {};
                            qpcStr.value = ntcItem.qpcStr;
                            qpcStr.label = ntcItem.qpcStr;
                            qpcStrs.push(qpcStr);
                            let articleCode = ntcItem.article.code;
                            article_qpcStr[articleCode] = qpcStrs;
                        };
                    };
                };
            };

            const suppliers = [];
            for (let ntcItem of data.obj.items) {
                const sku = yield call(getArticle, { articleUuid: ntcItem.article.uuid });
                ntcItem.expDays = sku.data.obj.expDays;
                ntcItem.binCode = binCode;
                for (let item of payload.items) {
                    if (ntcItem.article.code == item.article.code && item.qpcStr == ntcItem.qpcStr) {
                        const supplier = ntcItem.supplier;
                        suppliers.push(supplier);
                        continue;
                    }
                };
                for (let m of payload.items) {
                    if (ntcItem.article.code == m.article.code && m.qpcStr == ntcItem.qpcStr) {
                        m.suppliers = suppliers;
                    }
                }
            };
            for (let billItem of payload.items) {
                billItem.editable = true;
                billItem.qpcStrs = article_qpcStr[billItem.article.code];
                billItem.productionDate = moment(billItem.productionDate).format("YYYY-MM-DD");
                billItem.validDate = moment(billItem.validDate).format("YYYY-MM-DD");
            };
            if (data.status === '200') {
                yield put({
                    type: 'showCreateSuccess',
                    payload: {
                        currentItem: payload,
                        billItems: payload.items,
                        treeData: articles,
                        article_qpcStr: article_qpcStr,
                        ntcBillItemArticles: data.obj.items
                    }
                });
            };
        },

        *selectSupplier({ payload }, { call, put }) {
            for (let article of payload.ntcBillItemArticles) {
                if (payload.record.article.code == article.article.code && payload.record.qpcStr == article.qpcStr && payload.record.supplier.code == article.supplier.code) {
                    payload.record.supplier.name = article.supplier.name;
                    payload.record.supplier.uuid = article.supplier.uuid;
                }
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list,
                }
            });
        },

        *modifyReturnType({ payload }, { call, put }) {
            for (let item of payload.list) {
                for (let select of payload.selecteds) {
                    if (item.line == select.line) {
                        item.returnType = payload.data.returnType;
                    }
                }
            };
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list,
                    batchModifyReturnTypeVisible: false
                }
            })
        },

        *modifyReturnContainer({ payload }, { call, put }) {
            for (let item of payload.list) {
                for (let select of payload.selecteds) {
                    if (item.line == select.line) {
                        item.containerBarcode = payload.data.containerBarcode;
                    }
                }
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list,
                    batchModifyReturnContainerVisible: false
                }
            })
        },

        *modifyProductionDate({ payload }, { call, put }) {
            for (let item of payload.list) {
                for (let select of payload.selecteds) {
                    if (item.line == select.line) {
                        item.productionDate = payload.data.productionDate;
                        const { data } = yield call(getArticle, { articleUuid: select.article.uuid });
                        let proDate = moment(item.productionDate);
                        let vDate = proDate.add(data.obj.expDays, 'days');
                        item.validDate = vDate.format("YYYY-MM-DD");
                    }
                }
            }
            yield put({
                type: 'showCreateSuccess',
                payload: {
                    billItems: payload.list,
                    batchModifyProductionDateVisible: false
                }
            })
        },

        *remove({ payload }, { call, put }) {
            const { data } = yield call(remove, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'query',
                })
            }
        },

        *audit({ payload }, { call, put }) {
            const { data } = yield call(audit, { uuid: payload.uuid, version: payload.version });
            if (data.status === '200') {
                yield put({
                    type: 'query',
                })
            }
        },


    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload, showPage: '' }
        },
        showCreateSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'create' }
        },
        showRtnNtcBillModal(state) {
            return { ...state, showRtnNtcSelectModal: true }
        },
        hideRtnNtcBillModal(state, action) {
            return { ...state, ...action.payload, showRtnNtcSelectModal: false }
        },
        ntcBillSelectSuccess(state, action) {
            return { ...state, ...action.payload, showRtnNtcSelectModal: false }
        },
        showViewSuccess(state, action) {
            return { ...state, ...action.payload, showPage: 'view' }
        },
        showVisible(state, action) {
            return { ...state, ...action.payload, batchModifyReturnTypeVisible: true }
        },
        showModifyReturnContainer(state, action) {
            return { ...state, ...action.payload, batchModifyReturnContainerVisible: true }
        },
        showModifyDate(state, action) {
            return { ...state, ...action.payload, batchModifyProductionDateVisible: true }
        },
        hideVisible(state, action) {
            return { ...state, ...action.payload, batchModifyReturnTypeVisible: false }
        },
        hideModifyContainerVisible(state, action) {
            return { ...state, ...action.payload, batchModifyReturnContainerVisible: false }
        },
        hideModifyDateVisible(state, action) {
            return { ...state, ...action.payload, batchModifyProductionDateVisible: false }
        },
        batchDeleteRtnBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true }
        },
        batchAuditRtnBill(state, action) {
            return { ...state, ...action.payload, batchAuditProcessModal: true }
        },
        hideDeleteRtnBillModal(state) {
            return { ...state, batchDeleteProcessModal: false }
        },
        hideAuditRtnBillModal(state) {
            return { ...state, batchAuditProcessModal: false }
        }
    }
};