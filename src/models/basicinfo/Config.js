import { queryArticleConfigByPage,setArticleFixedPickBin,setPickBinStockLimit,setArticleStorageArea} from '../../services/basicinfo/config/ArticleConfig';
import { queryCategoryStorageAreaConfigByPage,setCategoryStorageArea} from '../../services/basicinfo/config/CategoryStorageAreaConfig';
import { queryPickAreaStorageAreaConfigByPage,setPickAreaStorageArea} from '../../services/basicinfo/config/PickAreaStorageAreaConfig';
import { queryTaskAreaConfigByPage,createTaskAreaConfig,updateTaskAreaConfig,removeTaskAreaConfig} from '../../services/basicinfo/config/TaskAreaConfig';
import { queryReasonConfig,setReasonConfig} from '../../services/basicinfo/config/ReasonConfig';
import { queryUser} from '../../services/ia/User';

import { parse } from 'qs';

export default {
	namespace: 'config',
	state: {
	    loading:false,
	    showPage:'articleConfigPage',
        binScopeModalVisible:false,
	    articleConfigs:[],
        articlePagination:{
	        showSizeChanger: true,
	        showQuickJumper: true,
	        showTotal: recordCount => `共 ${recordCount} 条`,
	        current:1,
	        total:null,
	        size:'default'
      	},
        batchSetArticleFixedPickBinModal:false,
        batchSetArticleStorageAreaModal:false,
        batchSetPickBinStockLimitModal:false,
        pickBinStockLimitModalVisible:false,
	    categoryStorageAreaConfigs:[],
	    categoryStorageAreaPagination:{
	        showSizeChanger: true,
	        showQuickJumper: true,
	        showTotal: recordCount => `共 ${recordCount} 条`,
	        current:1,
	        total:null,
	        size:'default'
	    },
        batchSetCategoryStorageAreaModal:false,
        pickAreaStorageAreaConfigs:[],
        pickAreaStorageAreaPagination:{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: recordCount => `共 ${recordCount} 条`,
            current:1,
            total:null,
            size:'default'
        },
        batchSetPickAreaStorageAreaModal:false,
        taskAreaConfigs:[],
        taskAreaPagination:{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: recordCount => `共 ${recordCount} 条`,
            current:1,
            total:null,
            size:'default'
        },
        taskAreaConfigModalVisible:false,
        currentTaskAreaConfig:{},
        operators:[],
        operatorPagination:{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: recordCount => `共 ${recordCount} 条`,
            current:1,
            total:null,
            size:'default'
        },
        operatorModalVisible:false,
        reasons:[],
        reasonType:'DECINC'
	},

    subscriptions: {
        setup({ dispatch, history }) {
          history.listen(location => {
            if (location.pathname === '/basicInfo/config') {
              dispatch({
                type: 'queryArticleConfigByPage',
                payload: location.queryArticleConfigByPage
              });
            };
          });
        },
    },

    effects: {
        *queryArticleConfigByPage({ payload }, { call, put }) {
            const { data } = yield call(queryArticleConfigByPage, parse(payload));
            if(data.obj){
               yield put({
                    type: 'showArticleConfigByPage',
                    payload: {
                        articleConfigs: data.obj.records,
                        articlePagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
        *setArticleFixedPickBin({ payload }, { call, put }) {
            const { data } = yield call(setArticleFixedPickBin, parse(payload));
            if(data.obj){
                yield put({
                    type: 'queryArticleConfigByPage',
                })
            }
        },
        *setArticleStorageArea({ payload }, { call, put }) {
            const { data } = yield call(setArticleStorageArea, parse(payload));
            if(data.obj){
                yield put({
                    type: 'queryArticleConfigByPage',
                })
            }
        },
        *setPickBinStockLimit({ payload }, { call, put }) {
            const { data } = yield call(setPickBinStockLimit, parse(payload));
            if(data.obj){
                yield put({
                    type: 'queryArticleConfigByPage',
                })
            }
        },
	    *queryCategoryStorageAreaConfigByPage({ payload }, { call, put }) {
            const { data } = yield call(queryCategoryStorageAreaConfigByPage, parse(payload));
            if(data.obj){
               yield put({
                    type: 'showCategoryStorageConfigByPage',
                    payload: {
                        categoryStorageAreaConfigs: data.obj.records,
                        categoryStorageAreaPagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
        *setCategoryStorageArea({ payload }, { call, put }) {
            const { data } = yield call(setCategoryStorageArea, parse(payload));
            if(data.obj){
                yield put({
                    type: 'queryCategoryStorageAreaConfigByPage',
                })
            }
        },
        *queryPickAreaStorageAreaConfigByPage({ payload }, { call, put }) {
            const { data } = yield call(queryPickAreaStorageAreaConfigByPage, parse(payload));
            if(data.obj){
                yield put({
                    type: 'showPickAreaStorageAreaConfigByPage',
                    payload: {
                        pickAreaStorageAreaConfigs: data.obj.records,
                        pickAreaStorageAreaPagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
        *setPickAreaStorageArea({ payload }, { call, put }) {
            const { data } = yield call(setPickAreaStorageArea, parse(payload));
            if(data.obj){
                yield put({
                    type: 'queryPickAreaStorageAreaConfigByPage',
                })
            }
        },
        *queryTaskAreaConfigByPage({ payload }, { call, put }) {
            const { data } = yield call(queryTaskAreaConfigByPage, parse(payload));
            if(data.obj){
                yield put({
                    type: 'showTaskAreaConfigByPage',
                    payload: {
                        taskAreaConfigs: data.obj.records,
                        taskAreaPagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
       *queryUserByPage({ payload }, { call, put }) {
            const { data } = yield call(queryUser, parse(payload));
            if(data.obj){
                yield put({
                    type: 'showOperatorModal',
                    payload: {
                        operators: data.obj.records,
                        operatorPagination: {
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: recordCount => `共 ${recordCount} 条`,
                            size:'default',
                            total: data.obj.recordCount,
                            current: data.obj.page
                        }
                    }
                })
            }
        },
       *createTaskAreaConfig({ payload }, { call, put }) {
            const { data } = yield call(createTaskAreaConfig, parse(payload));
            if(data.status==='200'){
                yield put({
                    type: 'queryTaskAreaConfigByPage'
                })
            }
        },
        *updateTaskAreaConfig({ payload }, { call, put }) {
            const { data } = yield call(updateTaskAreaConfig, parse(payload));
            if(data.status==='200'){
                yield put({
                    type: 'queryTaskAreaConfigByPage'
                })
            }
        },
        *removeTaskAreaConfig({ payload }, { call, put }) {
            const { data } = yield call(removeTaskAreaConfig, parse(payload));
            if(data.status==='200'){
                yield put({
                    type: 'queryTaskAreaConfigByPage'
                })
            }
        },
       *queryReasonConfig({ payload }, { call, put }) {
            const { data } = yield call(queryReasonConfig, parse(payload));
            if(data.obj){
                yield put({
                    type: 'showReasonConfigByPage',
                    payload: {
                        reasons:data.obj,
                        reasonType:payload.reasonType
                    }
                })
            }
        },
        *setReasonConfig({ payload }, { call, put }) {
            const { data } = yield call(setReasonConfig, parse(payload));
            if(data.status==='200'){
                yield put({
                    type: 'queryReasonConfig',
                    payload: {
                        reasonType:payload.reasonType
                    }
                })
            }
        }
    },

    reducers: {
        queryMenuSuccess(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        },
        showArticleConfigByPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage:'articleConfigPage'
            }
        },
   		showCategoryStorageConfigByPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage:'categoryStorageAreaConfigPage'
            }
        },
        showPickAreaStorageAreaConfigByPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage:'pickAreaStorageAreaConfigPage'
            }
        },
        showTaskAreaConfigByPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage:'taskAreaConfigPage'
            }
        },
        showReasonConfigByPage(state, action) {
            return {
                ...state,
                ...action.payload,
                loading: false,
                showPage:'reasonConfigPage'
            }
        },
        showBinScopeModal(state, action) {
            return {
                ...state,
                ...action.payload,
                binScopeModalVisible: true
            }
        },
        hideBinScopeModal(state, action) {
            return {
                ...state,
                ...action.payload,
                binScopeModalVisible: false
            }
        },
        showBatchSetArticleFixedPickBinModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetArticleFixedPickBinModal: true,
                binScopeModalVisible: false
            }
        },
        hideBatchSetArticleFixedPickBinModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetArticleFixedPickBinModal: false
            }
        },
        showBatchSetArticleStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetArticleStorageAreaModal: true,
                binScopeModalVisible: false
            }
        },
        hideBatchSetArticleStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetArticleStorageAreaModal: false
            }
        },
        showPickBinStockLimitModal(state, action) {
            return {
                ...state,
                ...action.payload,
                pickBinStockLimitModalVisible: true
            }
        },
        hidePickBinStockLimitModal(state, action) {
            return {
                ...state,
                ...action.payload,
                pickBinStockLimitModalVisible: false
            }
        },
        showBatchSetPickBinStockLimitModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetPickBinStockLimitModal: true,
                pickBinStockLimitModalVisible: false
            }
        },
        hideBatchSetPickBinStockLimitModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetPickBinStockLimitModal: false
            }
        },
        showBatchSetCategoryStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetCategoryStorageAreaModal: true,
                binScopeModalVisible: false
            }
        },
        hideBatchSetCategoryStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetCategoryStorageAreaModal: false
            }
        },
        showBatchSetPickAreaStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetPickAreaStorageAreaModal:true,
                binScopeModalVisible: false
            }
        },
        hideBatchSetPickAreaStorageAreaModal(state, action) {
            return {
                ...state,
                ...action.payload,
                batchSetPickAreaStorageAreaModal: false
            }
        },
        showTaskAreaConfigModal(state, action) {
            return {
                ...state,
                ...action.payload,
                taskAreaConfigModalVisible:true
            }
        },
        hideTaskAreaConfigModal(state, action) {
            return {
                ...state,
                ...action.payload,
                taskAreaConfigModalVisible: false
            }
        },
        showOperatorModal(state, action) {
            return {
                ...state,
                ...action.payload,
                operatorModalVisible:true,
            }
        },
        hideOperatorModal(state, action) {
            return {
                ...state,
                ...action.payload,
                operatorModalVisible: false
            }
        }
    }
}