import { parse } from 'qs';
import {
    querybypage, get, create, edit, remove, bookReg, check, finish, abort, getArticle,
    getOrderBillByBillNo, refreshCaseQtyAndAmount, queryWrhs
} from '../../services/forward/OrderBill';
import { removeByValue } from '../../utils/ArrayUtils';
import { getbycode, querybypage as querySuppliers } from '../../services/basicinfo/Supplier';
import { queryStock, qtyToCaseQtyStr, caseQtyStrAdd, caseQtyStrSubtract } from '../../services/common/common.js';
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    namespace: 'orderBill',
    state: {
        list: [],
        currentItem: {},
        articleQpcs: [],
        wrhs: [],
        suppliers: [],
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
        showCreatePage: false,
        showEditPage: false,
        showViewPage: false,
        batchBookRegProcessModal: false,
        bookRegOrderBillEntitys: [],
        batchCheckProcessModal: false,
        checkOrderBillEntitys: [],
        batchFinishProcessModal: false,
        finishOrderBillEntitys: [],
        batchAbortProcessModal: false,
        abortOrderBillEntitys: [],
        dateModalVisible: false,
        supplierModalVisible: false,
        bookRegBills: [],
        bookRegType: 'single'
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/forward/order') {
                    var pp = eval('(' + location.query.payload + ')');
                    if (location.query.type == 'getByNumber') {
                        dispatch({
                            type: 'getByNumber',
                            payload: {
                                orderBillNumber: location.query.key,
                            }
                        });
                    } else {
                        dispatch({
                            type: 'query',
                            payload: location.query,
                        });
                    };
                };
            });
        }
    },
    effects: {
        *query({ payload }, { call, put }) {
            const { data } = yield call(querybypage, parse(payload));
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
                            showTotal: total => `共 ${total}条`,
                            size: 'default'
                        },
                    }
                });
            }

        },

        *get({ payload }, { call, put }) {
            const orderBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (orderBill) {
                orderBill.data.obj.expireDate = moment(orderBill.data.obj.expireDate);
                if (orderBill.data.obj.bookedDate != null)
                    orderBill.data.obj.bookedDate = moment(orderBill.data.obj.bookedDate);

                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentItem: orderBill.data.obj
                    }
                });
            };
        },

        *getByNumber({
            payload
        }, {
            call, put
        }) {
            const orderBill = yield call(getOrderBillByBillNo, { billNumber: payload.orderBillNumber });
            if (orderBill) {
                orderBill.data.obj.expireDate = moment(orderBill.data.obj.expireDate);
                orderBill.data.obj.bookedDate = moment(orderBill.data.obj.bookedDate);
                yield put({
                    type: 'showViewPage',
                    payload: {
                        currentItem: orderBill.data.obj
                    }
                });
            };
        },

        *onCreate({ payload }, { call, put }) {
            const { data } = yield call(queryWrhs, parse(payload));
            const currentItem = {};
            currentItem.totalAmount = 0;
            currentItem.totalCaseQtyStr = 0;
            yield put({
                type: 'showCreatePage',
                payload: {
                    wrhs: data.obj,
                    currentItem: currentItem
                }
            });
        },

        *create({ payload }, { call, put }) {
            const { data } = yield call(create, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: data.obj
                }
            });
        },

        *edit({ payload }, { call, put }) {
            const { data } = yield call(edit, parse(payload));
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *bookReg({ payload }, { call, put }) {
            yield call(bookReg, {
                uuid: payload.uuid,
                version: payload.version,
                bookedDate: moment(payload.bookedDate).format("YYYY-MM-DD")
            });
            yield put({ type: 'hideDateModal' });
            yield put({
                type: 'get',
                payload: {
                    uuid: payload.uuid
                }
            });
        },

        *gridBookReg({ payload }, { call, put }) {
            yield call(bookReg, {
                uuid: payload.uuid,
                version: payload.version,
                bookedDate: payload.bookedDate
            });
            yield put({ type: 'hideDateModal' })
            yield put({
                type: 'query'
            });
        },

        *check({ payload }, { call, put }) {
            yield call(check, {
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

        *gridCheck({ payload }, { call, put }) {
            yield call(check, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *finish({ payload }, { call, put }) {
            yield call(finish, {
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

        *gridFinish({ payload }, { call, put }) {
            yield call(finish, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *abort({ payload }, { call, put }) {
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

        *gridAbort({ payload }, { call, put }) {
            yield call(abort, {
                uuid: payload.uuid,
                version: payload.version
            });
            yield put({
                type: 'query'
            });
        },

        *getArticle({ payload }, { call, put }) {
            const orderBillItems = payload.items;
            const param = { articleCode: orderBillItems[payload.index].article.code }
            const { data } = yield call(getArticle, parse(param))
            if (data.obj) {
                const article = new Object();
                article.uuid = data.obj.uuid;
                article.code = data.obj.code;
                article.name = data.obj.name;
                const price = data.obj.purchasePrice;
                orderBillItems[payload.index].article = article;
                orderBillItems[payload.index].price = price;
                const qpcs = [];
                data.obj.qpcs.map(function (articleQpc) {
                    const qpcInfo = new Object();
                    qpcInfo.munit = articleQpc.munit;
                    qpcInfo.qpcStr = articleQpc.qpcStr;
                    qpcs.push(qpcInfo);
                    if (articleQpc.default_) {
                        orderBillItems[payload.index].qpcStr = articleQpc.qpcStr;
                        orderBillItems[payload.index].munit = articleQpc.munit;
                    }
                });
                orderBillItems[payload.index].qpcs = qpcs;
                payload.currentBill.items = orderBillItems;
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentItem: payload.currentBill,
                        articleQpcs: qpcs
                    }
                });
            } else {
                message.error("商品不存在，请输入正确的商品！", 2, '');
            };
        },

        *getForEdit({ payload }, { call, put }) {
            const orderBill = yield call(get, {
                uuid: payload.uuid,
            });
            if (orderBill) {
                orderBill.data.obj.expireDate = moment(orderBill.data.obj.expireDate);
                orderBill.data.obj.bookedDate = moment(orderBill.data.obj.bookedDate); yield put({
                    type: 'showEditPage',
                    payload: {
                        currentItem: orderBill.data.obj
                    }
                });
            };
        },

        *refreshCaseQtyAndAmount({ payload }, { call, put }) {
            if(payload.orderBill.items[payload.line-1].qpcStr == null || payload.orderBill.items[payload.line-1].qpcStr ==''){
                message.warning("请选择规格！",2,'');
                return;
            };
            let qty = new Number();
            qty = Number.parseFloat(payload.orderBill.items[payload.line-1].qty);
            if(isNaN(qty)){
                message.warning("数据格式错误，请正确输入数字",2,'');
                return;
            }
            const {data} = yield call(qtyToCaseQtyStr,{
                qty:qty,
                qpcStr:payload.orderBill.items[payload.line-1].qpcStr
            });
            for(var billItem of payload.orderBill.items){
                if(billItem.line == payload.line){
                    billItem.caseQtyStr = data.obj;
                    billItem.amount = Number.parseFloat(payload.orderBill.items[payload.line-1].price)*qty;
                }
            }
            let totalCaseQtyStr = 0;
            let totalAmount = 0;
            if(payload.orderBill.length == 1){
                totalCaseQtyStr = data.obj;
                totalAmount = payload.orderBill.items[0].amount;
            }else{
                for(var billItem of payload.orderBill.items){
                    totalAmount = Number.parseFloat(billItem.amount)+Number.parseFloat(totalAmount)
                    if(billItem.caseQtyStr == 0|| billItem.caseQtyStr=='')
                        continue;
                    const totalCaseQtyStrResult = yield call(caseQtyStrAdd,{
                        addend:totalCaseQtyStr,
                        augend:billItem.caseQtyStr
                    });
                totalCaseQtyStr = totalCaseQtyStrResult.data.obj;
                };
            };
            const caseQtyStrResult = yield call(caseQtyStrAdd,{
                addend:payload.orderBill.totalCaseQtyStr,
                augend:data.obj
            });
            payload.orderBill.totalAmount = totalAmount;
            payload.orderBill.totalCaseQtyStr = totalCaseQtyStr;
            yield put(
                {
                    type:'showEditPage',
                    payload:{
                        items:payload.orderBill.items,
                        currentItem:payload.orderBill
                    }
                }
            );
        },

        *removeItem({payload},{call,put}){
            for(var billItem of payload.orderBill.items){
                if(payload.line==billItem.line){
                    removeByValue(payload.orderBill.items,billItem);
                    if(payload.orderBill.items.length == 0){                    
                        payload.orderBill.totalCaseQtyStr=0;
                        payload.orderBill.totalAmount = 0;
                    }else{
                        if((billItem.caseQtyStr == null ||billItem.caseQtyStr=="")==false){
                            const {data} = yield call(caseQtyStrSubtract,
                            {
                                subStr:payload.orderBill.totalCaseQtyStr,
                                subedStr:billItem.caseQtyStr
                            });
                            payload.orderBill.totalCaseQtyStr = data.obj;
                            payload.orderBill.totalAmount = Number.parseFloat(payload.orderBill.totalAmount)-Number.parseFloat(billItem.amount);   
                        }
                    }
                };
            };
            for(let i =0;i<payload.orderBill.items.length;i++){
                payload.orderBill.items[i].line = i+1;
            };
            yield put({
                type:'showEditPage',
                payload:{
                    items:payload.orderBill.items,
                    //currentItem:payload.orderBill
                }
            });
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


        *querySuppliers({ payload }, { call, put }) {
            const result = yield call(querySuppliers, parse(payload));
            if (result) {
                const suppliers = [];
                for (var supplier of result.data.obj.records) {
                    const supplierUcn = new Object();
                    supplierUcn.uuid = supplier.uuid;
                    supplierUcn.code = supplier.code;
                    supplierUcn.name = supplier.name;
                    suppliers.push(supplierUcn);
                };

                yield put({
                    type: 'showSupplierModal',
                    payload: {
                        suppliers: suppliers,
                        supplierPagination: {
                            total: result.data.obj.recordCount,
                            current: result.data.obj.page
                        }
                    }
                });
            };
        },
        *getSupplier({ payload }, { call, put }) {
            const supplier = yield call(getbycode, { supplierCode: payload.supplierCode });
            if (supplier) {
                const orderBill = payload.currentBill;
                const supplierUcn = new Object();
                supplierUcn.uuid = supplier.data.obj.uuid;
                supplierUcn.code = supplier.data.obj.code;
                supplierUcn.name = supplier.data.obj.name;
                orderBill.supplier = supplierUcn;
                yield put({
                    type: 'showEditPage',
                    payload: {
                        currentItem: orderBill
                    }
                });
            };
        },

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
                showViewPage: false,
                showCreatePage: false
            };
        },
        showCreatePage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showViewPage: false,
                showCreatePage: true
            };
        },
        showEditPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showViewPage: false,
                showCreatePage: true
            };
        },
        showViewPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showViewPage: true,
                showCreatePage: false
            };
        },
        backViewForm(state) {
            return {
                ...state,
                loading: false,
                showViewPage: true,
                showCreatePage: false
            };
        },
        backSearchForm(state) {
            return {
                ...state,
                loading: false,
                showViewPage: false,
                showCreatePage: false
            };
        },
        batchBookRegOrderBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchBookRegProcessModal: true,
                dateModalVisible: false
            };
        },
        hideBookRegOrderBillModal(state) {
            return {
                ...state,
                batchBookRegProcessModal: false
            };
        },
        batchCheckOrderBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchCheckProcessModal: true
            };
        },
        hideCheckOrderBillModal(state) {
            return {
                ...state,
                batchCheckProcessModal: false
            };
        },
        batchFinishOrderBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchFinishProcessModal: true
            };
        },
        hideFinishOrderBillModal(state) {
            return {
                ...state,
                batchFinishProcessModal: false
            };
        },
        batchAbortOrderBill(state, action) {
            return {
                ...state,
                ...action.payload,
                batchAbortProcessModal: true
            };
        },
        hideAbortOrderBillModal(state) {
            return {
                ...state,
                batchAbortProcessModal: false
            };
        },
        showDateModal(state, action) {
            return {
                ...state,
                ...action.payload,
                dateModalVisible: true
            };
        },

        hideDateModal(state) {
            return {
                ...state,
                dateModalVisible: false
            };
        },
        showSupplierModal(state, action) {
            return {
                ...state,
                ...action.payload,
                supplierModalVisible: true
            };
        },

        hideSupplierModal(state) {
            return {
                ...state,
                supplierModalVisible: false
            };
        },
    }

};
