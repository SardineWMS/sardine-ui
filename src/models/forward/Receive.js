import { parse } from 'qs';
import { queryReceiveBill, insetReceiveBill, getReceiveBillByBillNo, remove, audit, update } from '../../services/forward/receive.js';
import { get as getOrderBill, querybypage as queryOrderBill, getOrderBillByBillNo } from '../../services/forward/OrderBill.js';
import { get } from '../../services/basicinfo/Article.js';
import { timeStamp2date } from '../../utils/DateUtils';
import { removeByValue } from '../../utils/ArrayUtils.js';
import { qtyToCaseQtyStr, caseQtyStrAdd } from '../../services/common/common.js';
import { queryBin } from '../../services/basicinfo/Bin.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { routerRedux } from 'dva/router';

moment.locale('zh-cn');

export default {
    namespace: 'receive',

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
        showCreatePage: false,
        showViewPage: false,
        batchDeleteProcessModal: false,
        deleteReceiveBillEntitys: [],
        batchFinishProcessModal: false,
        finishReceiveBillEntitys: [],
        showOrderBillSelectModal: false,
        orderBillNo: '',//根据订单重新构造订单商品明细，只在新建收货单时使用
        supplierMsg: '',//选中订单自动带出供应商信息，
        wrhMsg: '',//选中订单自动带出仓位信息。
        orderItems: [],//选中订单中的商品明细集合
        canReceiveOrderBillLists: [],//可收货订单集合
        orderBillPagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        treeData: [],//商品下拉框数据源
        qpcStrTreeData: [],//商品规格下拉框数据源
        receiveStorageBin: "",//仓位下的收货暂存位
        orderBillItemArticles: [],//订单中所有的商品明细集合，
        article_qpcStr: {},
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/receiveBill') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    })
                }
            })
        }
    },

    effects: {
        *query({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(queryReceiveBill, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.obj.records,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        },
                        currentItem: {},
                        orderItems: [],
                        treeData: [],
                        orderBillno: "",
                        article_qpcStr: {},
                        receiveStorageBin: "",
                    }
                })
            }
        },

        *createWithOrderBill({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(getOrderBill, parse(payload));
            if (data) {

            }
        },

        *onOrderBillSelect({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(queryOrderBill, parse(payload));
            if (data) {
                let orderBillList = data.obj.records;
                for (var orderBill of orderBillList) {
                    orderBill.supplierCodeName = orderBill.supplier.name + "[" + orderBill.supplier.code + "]";
                    orderBill.wrhCodeName = orderBill.wrh.name + "[" + orderBill.wrh.code + "]";
                    orderBill.expireDateFormat = timeStamp2date(orderBill.expireDate);
                }
                yield put({
                    type: 'showOrderBillModal',
                    payload: {
                        canReceiveOrderBillLists: orderBillList,
                        orderBillPagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        }
                    }
                })
            };
        },


        /***
         * 选中订单后的触发事件,
         * 填充收货单单头即明细信息
         */
        *selectOderBill({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(getOrderBill, parse(payload));
            if (data) {
                const article_qpcStr = {};
                const bin = yield call(queryBin, { wrhUuid: data.obj.wrh.uuid, usage: 'ReceiveStorageBin' });
                const articles = [];
                let itemLists = [];

                /***
                 * 获取订单，根据订单明细构造orderBillItemArticles.
                 * orderBillItemArticles:订单中所有商品明细信息
                 */
                for (var itemArt of data.obj.items) {
                    itemArt.canReceiveQty = itemArt.qty - itemArt.receivedQty;
                    itemArt.canReceiveCaseQtyStr = itemArt.caseQtyStr - itemArt.receivedCaseQtyStr;
                    const articleUuid = itemArt.article.uuid;
                    const param = {};
                    param.articleUuid = articleUuid;
                    const article = yield call(get, parse(param));
                    const expDays = article.data.obj.expDays;
                    itemArt.expDays = expDays;
                    itemArt.articleSpec = article.data.obj.spec;
                    itemArt.editable = true;
                    // itemArt.bin = bin.data.obj.pageData.records[0].code;
                    const sku = {};
                    sku.value = itemArt.article.code;
                    sku.label = itemArt.article.code;
                    articles.push(sku);

                    /***
                     * 构造article_qpcStr对象。
                     * 根据订单明细中的商品信息，获取商品代码及规格。
                     * article_qpcStr对象:articleCode-qpcStrs[]
                     */
                    if (JSON.stringify(article_qpcStr) == "{}") {
                        let qpcStrs = [];
                        const qpcStr = new Object();
                        qpcStr.value = itemArt.qpcStr;
                        qpcStr.label = itemArt.qpcStr;
                        qpcStrs.push(qpcStr);
                        var articleCode = itemArt.article.code;
                        article_qpcStr[articleCode] = qpcStrs;
                    } else {
                        for (var prop in article_qpcStr) {
                            if (prop == itemArt.articleUuid) {
                                for (var qpcStr of article_qpcStr[prop]) {
                                    if (qpcStr != itemArt.qpcStr) {
                                        article_qpcStr[prop].push(qpcStr);
                                    }
                                }
                            } else {
                                let qpcStrs = [];
                                const qpcStr = new Object();
                                qpcStr.value = itemArt.qpcStr;
                                qpcStr.label = itemArt.qpcStr;
                                qpcStrs.push(qpcStr);
                                var articleCode = itemArt.article.code;
                                article_qpcStr[articleCode] = qpcStrs;
                            }
                        }
                    }
                }


                /***
                 * 初始选中订单后，收货单明细行只有一条空的记录
                 */
                const nullOrderItem = new Object();
                nullOrderItem.editable = true;
                nullOrderItem.line = 1;

                itemLists.push(nullOrderItem);
                let current = data.obj;
                current.totalCaseQtyStr = "";
                current.type = "订单";
                yield put({
                    type: 'orderBillSelectSuccess',
                    payload: {
                        orderBillNo: data.obj.billNumber,
                        currentItem: current,
                        supplierMsg: data.obj.supplier,
                        wrhMsg: data.obj.wrh.name + "[" + data.obj.wrh.code + "]",
                        orderItems: itemLists,
                        treeData: articles,
                        orderBillItemArticles: data.obj.items,
                        article_qpcStr: article_qpcStr,
                    }
                })
            }
        },

        *addReceiveArticle({ payload }, {
            call, put
        }) {
            const nullOrderItem = new Object();
            nullOrderItem.editable = true;
            const size = payload.length;
            nullOrderItem.editable = true;
            nullOrderItem.line = size + 1;
            payload.push(nullOrderItem);
            yield put({
                type: 'addReceiveArticleSuccess',
                payload: {
                    orderItems: payload,
                }
            })
        },

        *queryOrderBillItem({ payload }, {
            call, put
        }) {
            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload,
                }
            })
        },

        /***
         * 同*selectOderBill();
         */
        *getOrderBillByBillNo({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(getOrderBillByBillNo, parse(payload));
            if (data) {
                const article_qpcStr = {};
                const bin = yield call(queryBin, { wrhUuid: data.obj.wrh.uuid, usage: 'ReceiveStorageBin' });
                const articles = [];
                let itemLists = [];
                for (var itemArt of data.obj.items) {
                    itemArt.canReceiveQty = itemArt.qty - itemArt.receivedQty;
                    itemArt.canReceiveCaseQtyStr = itemArt.caseQtyStr - itemArt.receivedCaseQtyStr;
                    const articleUuid = itemArt.article.uuid;
                    const param = {};
                    param.articleUuid = articleUuid;
                    const article = yield call(get, parse(param));
                    const expDays = article.data.obj.expDays;
                    itemArt.expDays = expDays;
                    itemArt.articleSpec = article.data.obj.spec;
                    itemArt.editable = true;
                    itemArt.bin = bin.data.obj.pageData.records[0].code;
                    const sku = {};
                    sku.value = itemArt.article.code;
                    sku.label = itemArt.article.code;
                    articles.push(sku);

                    if (JSON.stringify(article_qpcStr) == "{}") {
                        let qpcStrs = [];
                        const qpcStr = new Object();
                        qpcStr.value = itemArt.qpcStr;
                        qpcStr.label = itemArt.qpcStr;
                        qpcStrs.push(qpcStr);
                        var articleCode = itemArt.article.code;
                        article_qpcStr[articleCode] = qpcStrs;
                    } else {
                        for (var prop in article_qpcStr) {
                            if (prop == itemArt.articleUuid) {
                                for (var qpcStr of article_qpcStr[prop]) {
                                    if (qpcStr != itemArt.qpcStr) {
                                        article_qpcStr[prop].push(qpcStr);
                                    }
                                }
                            } else {
                                let qpcStrs = [];
                                const qpcStr = new Object();
                                qpcStr.value = itemArt.qpcStr;
                                qpcStr.label = itemArt.qpcStr;
                                qpcStrs.push(qpcStr);
                                var articleCode = itemArt.article.code;
                                article_qpcStr[articleCode] = qpcStrs;
                            }
                        }
                    }
                }


                /***
                 * 初始选中订单后，明细行只有一条空的记录
                 */
                const nullOrderItem = new Object();
                nullOrderItem.line = 0;
                nullOrderItem.editable = true;

                itemLists.push(nullOrderItem);
                let current = data.obj;
                current.type = "订单";
                yield put({
                    type: 'orderBillSelectSuccess',
                    payload: {
                        orderBillNo: data.obj.billNumber,
                        currentItem: current,
                        supplierMsg: data.obj.supplier,
                        wrhMsg: data.obj.wrh.name + "[" + data.obj.wrh.code + "]",
                        orderItems: itemLists,
                        treeData: articles,
                        orderBillItemArticles: data.obj.items,
                        article_qpcStr: article_qpcStr,
                    }
                })
            }
        },

        *saveReceiveBill({
            payload
        }, {
            call, put
        }) {

            const { data } = yield call(insetReceiveBill, parse(payload));
            if (data) {
                const param = {};
                param.billNumber = data.obj;
                const receiveBill = yield call(getReceiveBillByBillNo, parse(param));
                if (receiveBill) {
                    yield put({
                        type: 'showViewSucess',
                        payload: {
                            currentItem: receiveBill.data.obj,
                        }
                    })
                }
            }
        },

        *getReceiveBillByBillNumber({
            payload
        }, {
            call, put
        }) {
            const { data } = yield call(getReceiveBillByBillNo, parse(payload));
            if (data) {
                yield put({
                    type: 'showViewSucess',
                    payload: {
                        currentItem: data.obj,
                    }
                })
            }

        },

        *gridRemove({
            payload
        }, {
            call, put
        }) {
            yield call(remove, {
                uuid: payload.uuid,
                version: payload.version,

            })
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *gridAudit({
            payload
        }, {
            call, put
        }) {
            yield call(audit, {
                uuid: payload.uuid,
                version: payload.version,
            })
            yield put({
                type: 'query',
                payload: {},
            })
        },

        *showEditPage({ payload }, {
            call, put
        }) {
            const { data } = yield call(getReceiveBillByBillNo, parse(payload));
            const orderBill = yield call(getOrderBillByBillNo, { billNumber: data.obj.orderBillNumber });
            const articles = [];
            let totalCaseQtyStr = '0';
            let article_qpcStr = {};//类似map，存放商品UUID-商品规格集合
            let receiveStorageBin = "";//统配收货暂存位
            const bin = yield call(queryBin, { wrhUuid: data.obj.wrh.uuid, usage: 'ReceiveStorageBin' });
            receiveStorageBin = bin.data.obj.pageData.records[0].code;
            /***
             * 构造订单明细集合
             */
            for (var orderItem of orderBill.data.obj.items) {
                for (var receiveItem of data.obj.items) {
                    if (orderItem.article.uuid == receiveItem.article.uuid && orderItem.qpcStr == receiveItem.qpcStr) {
                        receiveItem.canReceiveQty = orderItem.qty - orderItem.receivedQty;
                        const caseQtyStr = yield call(qtyToCaseQtyStr, { qty: receiveItem.canReceiveQty, qpcStr: receiveItem.qpcStr });
                        receiveItem.canReceiveCaseQtyStr = caseQtyStr.data.obj;
                        receiveItem.receiveQty = receiveItem.qty;
                        receiveItem.receiveCaseQtyStr = receiveItem.caseQtyStr;
                        const total = yield call(caseQtyStrAdd, { addend: receiveItem.receiveCaseQtyStr, augend: totalCaseQtyStr });
                        totalCaseQtyStr = total.data.obj;
                    }
                    var produceDate = moment(receiveItem.produceDate);
                    receiveItem.produceDate = produceDate.format("YYYY-MM-DD");
                    var validDate = moment(receiveItem.validDate);
                    receiveItem.validDate = validDate.format("YYYY-MM-DD");
                    receiveItem.editable = true;
                    receiveItem.bin = receiveStorageBin;
                    receiveItem.qpcStrs = article_qpcStr[receiveItem.article.code];
                    const param = {};
                    param.articleUuid = receiveItem.article.uuid;
                    const sku = yield call(get, parse(param));
                    const expDays = sku.data.obj.expDays;
                    receiveItem.expDays = expDays;
                }

                const article = new Object();
                article.value = orderItem.article.code;
                article.label = orderItem.article.code;
                articles.push(article);
                if (JSON.stringify(article_qpcStr) == "{}") {
                    let qpcStrs = [];
                    const qpcStr = new Object();
                    qpcStr.value = orderItem.qpcStr;
                    qpcStr.label = orderItem.qpcStr;
                    qpcStrs.push(qpcStr);
                    var articleCode = orderItem.article.code;
                    article_qpcStr[articleCode] = qpcStrs;
                } else {
                    for (var prop in article_qpcStr) {
                        if (prop == orderItem.articleUuid) {
                            for (var qpcStr of article_qpcStr[prop]) {
                                if (qpcStr != orderItem.qpcStr) {
                                    article_qpcStr[prop].push(qpcStr);
                                }
                            }
                        } else {
                            let qpcStrs = [];
                            const qpcStr = new Object();
                            qpcStr.value = orderItem.qpcStr;
                            qpcStr.label = orderItem.qpcStr;
                            qpcStrs.push(qpcStr);
                            var articleCode = orderItem.article.code;
                            article_qpcStr[articleCode] = qpcStrs;
                        }
                    }
                }
            }

            for (var skuItem of data.obj.items) {
                skuItem.qpcStrs = article_qpcStr[skuItem.article.code];
            }

            data.obj.totalCaseQtyStr = totalCaseQtyStr;
            if (data) {
                yield put({
                    type: 'showEditSuccess',
                    payload: {
                        currentItem: data.obj,
                        orderItems: data.obj.items,
                        treeData: articles,
                        orderBillNo: data.obj.orderBillNumber,
                        article_qpcStr: article_qpcStr,
                        receiveStorageBin: receiveStorageBin,
                        orderBillItemArticles: orderBill.data.obj.items,
                    }
                })
            }
        },

        *updateReceiveBill({
            payload
        }, {
            call, put
        }) {
            yield call(update, parse(payload));
            yield put({
                type: 'getReceiveBillByBillNumber',
                payload: {
                    billNumber: payload.billNumber
                }
            })
        },

        /***
         * 用户输入生产日期，根据商品保质期计算到效期
         */
        *calculateValidDate({
            payload
        }, {
            call, put
        }) {

            for (var item of payload.list) {
                if (item.uuid == payload.record.uuid) {
                    var produceDate = moment(payload.record.produceDate);
                    payload.record.produceDate = produceDate.format("YYYY-MM-DD");
                    yield
                    var validDate = produceDate.add(payload.record.expDays, 'days');
                    payload.record.validDate = validDate.format("YYYY-MM-DD");
                    break;
                }
            };
            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload.list,
                }
            })
        },

        /***
         * 用户输入收货数量，根据商品规格计算出收货件数
         */
        *calculateCaseQtyStr({
            payload
        }, {
            call, put
        }) {
            payload.record.receivedCaseQtyStr = payload.record.receivedQty;
            const { data } = yield call(qtyToCaseQtyStr, { qty: Number(payload.record.receiveQty), qpcStr: payload.record.qpcStr });
            payload.record.receiveCaseQtyStr = data.obj;
            let totalQty = 0;
            let totalAmount = 0;
            for (var item of payload.list) {
                if (item.uuid == payload.record.uuid) {
                    payload.record.amount = (Number(payload.record.receiveQty) * Number(payload.record.price));
                    break;
                }
            };
            for (var item of payload.list) {
                totalQty = Number(item.receiveQty) + Number(totalQty);
                totalAmount = Number(item.amount) + Number(totalAmount);
            }
            const total = yield call(qtyToCaseQtyStr, {
                qty: Number(totalQty), qpcStr: payload.record.qpcStr
            });
            payload.currentItem.caseQtyStr = total.data.obj;
            payload.currentItem.totalAmount = totalAmount;
            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload.list,
                    currentItem: payload.currentItem,
                }
            })
        },

        *removeItemLists({
            payload
        }, {
            call, put
        }) {
            for (var orderItem of payload.orderItems) {
                if (payload.data.uuid != null) {
                    if (orderItem.uuid == payload.data.uuid) {
                        removeByValue(payload.orderItems, orderItem);
                    }
                } else {
                    if (payload.data.line == orderItem.line) {
                        removeByValue(payload.orderItems, orderItem);
                    }
                }
            };
            if (payload.orderItems.length == 0) {
                const nullOrderItem = new Object();
                nullOrderItem.editable = true;
                nullOrderItem.editable = true;
                nullOrderItem.line = 1;
                payload.orderItems.push(nullOrderItem);
            }
            let totalQty = 0;
            for (var item of payload.orderItems) {
                totalQty = parseInt(item.receiveQty) + parseInt(totalQty);
                if (isNaN(parseInt(totalQty)))
                    totalQty = 0;
            }
            let totalCaseQtyStr = 0;
            if (totalQty != 0) {
                const total = yield call(qtyToCaseQtyStr, {
                    qty: parseInt(totalQty), qpcStr: payload.data.qpcStr
                });
                totalCaseQtyStr = total.data.obj;
            }
            payload.currentItem.totalCaseQtyStr = totalCaseQtyStr;
            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload.orderItems,
                    currentItem: payload.currentItem,
                    orderBillNo: payload.currentItem.orderBillNumber,
                }
            })
        },

        /***
         * 选中商品后的触发事件
         */
        *selectArticle({
            payload
        }, {
            call, put
        }) {
            const qpcStrs = [];
            const qpcStr = payload.article_qpcStr[payload.record.article.code];
            qpcStrs.push(qpcStr);
            for (var article of payload.array) {//该商品不在原收货单明细中，只存在订单明细中
                if (payload.record.line != null) {
                    if (article.line == payload.record.line) {
                        for (var item of payload.orderBillItemArticles) {
                            if (item.article.code == payload.record.article.code) {
                                article.article.uuid = item.article.uuid;
                                article.article.name = item.article.name;
                                const param = {};
                                param.articleUuid = item.article.uuid;
                                const sku = yield call(get, parse(param));
                                const spec = sku.data.obj.spec;
                                article.articleSpec = spec;
                                const expDays = sku.data.obj.expDays;
                                article.expDays = expDays;
                                article.qpcStrs = qpcStrs;//商品规格数据源，也放在明细集合里
                                article.price = item.price;
                                article.qpcStr = '';
                                article.receiveQty = '';
                                article.canReceiveQty = '';
                                article.canReceiveCaseQtyStr = '';
                                article.receiveCaseQtyStr = '';
                                break;
                            }
                        }
                    }
                } else {
                    if (payload.record.uuid == article.uuid) {
                        for (var item of payload.orderBillItemArticles) {
                            if (item.article.code == payload.record.article.code) {
                                article.article.uuid = item.article.uuid;
                                article.article.name = item.article.name;
                                const param = {};
                                param.articleUuid = item.article.uuid;
                                const sku = yield call(get, parse(param));
                                const spec = sku.data.obj.spec;
                                article.articleSpec = spec;
                                const expDays = sku.data.obj.expDays;
                                article.expDays = expDays;
                                article.qpcStrs = qpcStrs;//商品规格数据源，也放在明细集合里
                                article.price = item.price;
                                article.qpcStr = '';
                                article.receiveQty = '';
                                article.canReceiveQty = '';
                                article.canReceiveCaseQtyStr = '';
                                article.receiveCaseQtyStr = '';
                                break;
                            }
                        }
                    }
                }
            }

            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload.array,
                }
            })

        },


        /**
         * 选中规格后的触发事件
         */
        *selectQpcStr({
            payload
        }, {
            call, put
        }) {
            for (var orderBillItemArticle of payload.orderBillItemArticles) {
                if (orderBillItemArticle.article.code == payload.record.article.code) {
                    payload.record.canReceiveQty = orderBillItemArticle.qty - orderBillItemArticle.receivedQty;
                    const { data } = yield call(qtyToCaseQtyStr, {
                        qty: payload.record.canReceiveQty, qpcStr: payload.record.qpcStr
                    });
                    payload.record.canReceiveCaseQtyStr = data.obj;
                    payload.record.expDays = orderBillItemArticle.expDays;
                    payload.record.bin = orderBillItemArticle.bin;
                    payload.record.munit = orderBillItemArticle.munit;
                    payload.record.article.uuid = orderBillItemArticle.article.uuid;
                    payload.record.article.name = orderBillItemArticle.article.name;
                    payload.record.article.code = orderBillItemArticle.article.code;
                    break;
                }
            }
            for (var item of payload.array) {
                if (payload.record.article.uuid != null) {
                    if (item.article.uuid == payload.record.article.uuid) {
                        for (var orderBillItemArticle of payload.orderBillItemArticles) {
                            if (orderBillItemArticle.article.code == payload.record.article.code) {
                                payload.record.canReceiveQty = orderBillItemArticle.qty - orderBillItemArticle.receivedQty;
                                const { data } = yield call(qtyToCaseQtyStr, {
                                    qty: payload.record.canReceiveQty, qpcStr: payload.record.qpcStr
                                });
                                payload.record.canReceiveCaseQtyStr = data.obj;
                                payload.record.expDays = orderBillItemArticle.expDays;
                                payload.record.bin = orderBillItemArticle.bin;
                                payload.record.munit = orderBillItemArticle.munit;
                                payload.record.article.uuid = orderBillItemArticle.article.uuid;
                                payload.record.article.name = orderBillItemArticle.article.name;
                                payload.record.article.code = orderBillItemArticle.article.code;
                                break;
                            }
                        }
                    }
                } else {
                    if (payload.record.article.line == item.line) {
                        for (var orderBillItemArticle of payload.orderBillItemArticles) {
                            if (orderBillItemArticle.article.code == payload.record.article.code) {
                                payload.record.canReceiveQty = orderBillItemArticle.qty - orderBillItemArticle.receivedQty;
                                const { data } = yield call(qtyToCaseQtyStr, {
                                    qty: payload.record.canReceiveQty, qpcStr: payload.record.qpcStr
                                });
                                payload.record.canReceiveCaseQtyStr = data.obj;
                                payload.record.expDays = orderBillItemArticle.expDays;
                                payload.record.bin = orderBillItemArticle.bin;
                                payload.record.munit = orderBillItemArticle.munit;
                                payload.record.article.uuid = orderBillItemArticle.article.uuid;
                                payload.record.article.name = orderBillItemArticle.article.name;
                                payload.record.article.code = orderBillItemArticle.article.code;
                                break;
                            }
                        }
                    }
                }
            }
            yield put({
                type: 'orderBillSelectSuccess',
                payload: {
                    orderItems: payload.array,
                }
            });
        },

        *toViewOrderBill({
            payload
        }, {
            call, put
        }) {
            yield put(routerRedux.push({
                pathname: '/forward/order',
                query: {
                    type: 'getByNumber',
                    key: payload.orderBillNumber,
                }
            }))
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload, showViewPage: false, showCreatePage: false }
        },
        createSuccess(state) {
            return { ...state, showCreatePage: true, }
        },
        cancelSuccess(state, action) {
            return { ...state, showCreatePage: false, showViewPage: false, ...action.payload }
        },
        showOrderBillModal(state, action) {
            return { ...state, showOrderBillSelectModal: true, showViewPage: false, ...action.payload }
        },
        hideOrderBillSelectModal(state) {
            return {
                ...state, showOrderBillSelectModal: false, showViewPage: false
            }
        },
        orderBillSelectSuccess(state, action) {
            return { ...state, showOrderBillSelectModal: false, ...action.payload }
        },
        addReceiveArticleSuccess(state, action) {
            return { ...state, ...action.payload }
        },
        showViewSucess(state, action) {
            return { ...state, showCreatePage: false, showViewPage: true, ...action.payload }
        },
        onViewItem(state, action) {
            return { ...state, showViewPage: true, ...action.payload }
        },
        batchDeleteReceiveBill(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true, }
        },
        batchAuditReceiveBill(state, action) {
            return { ...state, ...action.payload, batchFinishProcessModal: true }
        },
        hideDeleteReceiveBillModal(state, action) {
            return { ...state, batchDeleteProcessModal: false }
        },
        hideFinishReceiveBillModal(state, action) {
            return { ...state, batchFinishProcessModal: false }
        },
        showEditSuccess(state, action) {
            return { ...state, showCreatePage: true, ...action.payload }
        }
    }
}