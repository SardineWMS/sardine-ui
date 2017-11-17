import { parse } from 'qs';
import {
    querybypage, get, create, edit, abort,
    queryWrhs, refreshCaseQtyAndAmount, approve, beginalc
} from '../../services/forward/AcceptanceBill';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import { queryStockExtendInfo } from '../../services/common/common.js';
import { queryCustomer, getByCode as getCustomer } from '../../services/basicinfo/Customer';
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    namespace: 'acceptanceBill',
    state: {
        list: [],
        currentAcceptanceBill: {},
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        supplierPagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total}条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showPage: '',
        batchApproveProcessModal: false,
        approveAcceptanceBillEntitys: [],
        batchAlcProcessModal: false,
        alcAcceptanceBillEntitys: [],
        batchAbortProcessModal: false,
        abortAcceptanceBillEntitys: [],
        customerModalVisible: false,
        wrhs: [],
        stocks: []
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/acceptanceBill') {

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
            const { data } = yield call(querybypage, parse(payload));
            if (data.status == "200") {
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
                            pageSize: payload.pageSize
                        }
                    }
                });
            }

        },

        *get({ payload }, { call, put }) {
            const acceptanceBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (acceptanceBill) {
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentAcceptanceBill: acceptanceBill.data.obj,
                    }
                });
            };
        },

        *onCreate({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(queryWrhs, parse(payload));
            const currentAcceptanceBill = {};
            currentAcceptanceBill.totalAmount = 0;
            currentAcceptanceBill.totalCaseQtyStr = 0;
            yield put({
                type: 'showCreatePage',
                payload: {
                    wrhs: data.obj,
                    currentAcceptanceBill: currentAcceptanceBill
                }
            });
        },

        *create({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(create, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: data.obj
                }
            });
        },
        *addItem({payload},{call,put}){
            const nullObj = new Object();
            nullObj.line = payload.acceptanceBillItems.length +1;
            payload.acceptanceBillItems.push(nullObj);
            yield put({
                type:'showEditPage',
                payload:{
                    acceptanceBillItems:payload.acceptanceBillItems
                }
            });
        },
        *editItem({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(edit, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *editGrid({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(edit, parse(payload));
            yield put({
                type: 'query',
            });
        },


        *approveItem({ payload }, { call, put }) {
            yield call(approve, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *approveGrid({ payload }, { call, put }) {
            yield call(approve, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query',
            });
        },

        *beginAlcItem({ payload }, { call, put }) {
            yield call(beginalc, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *beginAlcGrid({ payload }, { call, put }) {
            yield call(beginalc, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *abortItem({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *abortGrid({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *queryCustomers({ payload }, { call, put }) {
            const result = yield call(queryCustomer, parse(payload));
            if (result) {
                const customers = [];
                for (var customer of result.data.obj.records) {
                    const customerUcn = new Object();
                    customerUcn.uuid = customer.uuid;
                    customerUcn.code = customer.code;
                    customerUcn.name = customer.name;
                    customers.push(customerUcn);
                };

                yield put({
                    type: 'showCustomerModal',
                    payload: {
                        customers: customers,
                        customersagination: {
                            total: result.data.obj.recordCount,
                            current: result.data.obj.page
                        }
                    }
                });
            };
        },

        *getCustomer({ payload }, { call, put }) {
            const result = yield call(getCustomer, parse(payload));
            if (result.data.status === "200" && result.data.obj) {
                yield put({
                    type: 'showEditPage',
                    payload: {
                        customer: {
                            uuid: result.data.obj.uuid,
                            code: result.data.obj.code,
                            name: result.data.obj.name
                        }
                    }
                });
            };
        },

        *queryWrhs({ payload }, { call, put }) {
            const wrhs = yield call(queryWrhs, parse(payload));
            if (wrhs) {
                yield put({
                    type: 'showEditPage',
                    payload: {
                        wrhs: wrhs.data.obj
                    }
                });
            };
        },

        *queryStocks({ payload }, { call, put }) {
            if (payload.articleCode == null || payload.articleCode == "") {
                message.warning("请输入商品代码");
                return;
            }
            const {data} = yield call(queryStockExtendInfo, {
                articleCode: payload.articleCode
            });
            if (data.status == "200") {                              
                const acceptanceBill = payload.acceptanceBill;
                const acceptanceItem = payload.acceptanceBill.items[payload.line - 1];
                const stock = data.obj[0];
                acceptanceItem.article = stock.article;
                acceptanceItem.binCode = stock.binCode;
                acceptanceItem.containerBarCode = stock.containerBarcode;
                acceptanceItem.supplier = stock.supplier;
                acceptanceItem.qpcStr = stock.qpcStr;
                acceptanceItem.munit = stock.munit;
                acceptanceItem.price = stock.price;
                acceptanceItem.stockQty = stock.qty;
                acceptanceItem.productionDate = moment(stock.productionDate);
                acceptanceItem.validDate = moment(stock.validDate);
                acceptanceItem.stockBatch = stock.stockBatch;
                acceptanceItem.stocks = data.obj;
                payload.acceptanceBill.items[payload.line - 1] = acceptanceItem;
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentAcceptanceBill: acceptanceBill
                    }
                });
            };
        },

        *refreshCaseQtyAndAmount({ payload }, { call, put }) {
            // yield put({ type: 'showLoading' });
            // const { data } = yield call(refreshCaseQtyAndAmount, parse(payload));
            // if (data) {
            //     yield put({
            //         type: 'showEditPage',
            //         payload: {
            //             currentAcceptanceBill: data.obj
            //         }
            //     });
            // };

            if(payload.record.qpcStr == null || payload.record.qpcStr==''){
                message.warning("请选择规格！", 2, '');
                return;
            }
            let qty = new Number();
            qty = Number.parseFloat(payload.record.qty);
            if (isNaN(qty)) {
                message.warning("数量格式错误，请正确输入数字", 2, '');
                return;
            };

            const {data} = yield call(qtyToCaseQtyStr,{
                qty:qty,
                qpcStr:payload.record.qpcStr
            });
            for(var item of payload.items){
                if(item.line == payload.line){
                    item.caseQtyStr = data.obj;
                    item.amount = Number.parseFloat(payload.record.price) * qty;
                };
            };
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if(payload.items.length == 1){
                totalCaseQtyStr = data.obj;
                totalAmount = payload.items[0].amount;
            }else{
                for(var item of payload.items){
                    totalAmount = Number.parseFloat(item.amount) + Number.parseFloat(totalAmount);
                    if (item.caseQtyStr == 0 || item.caseQtyStr == '')
                        continue;
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd, {
                        addend: totalCaseQtyStr, augend: item.caseQtyStr
                    });
                    totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            const CaseQtyStrResult = yield call(caseQtyStrAdd,{
                addend:payload.acceptanceBill.totalCaseQtyStr,
                augend:data.obj
            });
            payload.acceptanceBill.totalCaseQtyStr = totalCaseQtyStr;
            payload.acceptanceBill.totalAmount = totalAmount;

            yield put({
                type:'showEditPage',
                payload:{
                    items:payload.items,
                    acceptanceBill:payload.acceptanceBill
                }
            });
        },

        *getForEdit({ payload }, { call, put }) {
            const acceptanceBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (acceptanceBill) {
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentAcceptanceBill: acceptanceBill.data.obj
                    }
                });
            };
        }
    },



    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },
        querySuccess(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'search'
            };
        },
        showCreatePage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'create'
            };
        },
        showEditPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'create'
            };
        },
        showViewPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage: 'view'
            };
        },
        backViewForm(state) {
            return {
                ...state,
                loading: false,
                showPage: 'view'
            };
        },
        backSearchForm(state) {
            return {
                ...state,                           
                loading: false,                
                showPage: 'search'
            };
        },
        batchApproveAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchApproveProcessModal: true
            };
        },
        hideApproveAcceptanceBillModal(state) {
            return {
                ...state,
                batchApproveProcessModal: false
            };
        },
        batchAlcAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchAlcProcessModal: true
            };
        },
        hideAlcAcceptanceBillModal(state) {
            return {
                ...state,
                batchAlcProcessModal: false
            };
        },
        batchAbortAcceptanceBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchAbortProcessModal: true
            };
        },
        hideAbortAcceptanceBillModal(state) {
            return {
                ...state,
                batchAbortProcessModal: false
            };
        },
        showCustomerModal(state, action) {
            return {
                ...state,
                ...action.payload,
                customerModalVisible: true
            };
        },
        hideCustomerModal(state) {
            return {
                ...state,
                customerModalVisible: false
            };
        },
        selectCustomer(state, action) {
            return {
                ...state,
                customer: action.payload.customer,
                customerModalVisible: false
            };
        }

    }

};
