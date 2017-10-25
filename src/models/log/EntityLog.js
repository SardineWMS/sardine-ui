import { queryEntityLogs } from '../../services/Log/EntityLog';
import { parse } from 'qs';

export default {
	namespace: 'entitylog',
	state: {
		entityUuid:null,
		list: [],
		pagination: {
		  showSizeChanger: true,
		  showQuickJumper: true,
		  showTotal: recordCount => `共 ${recordCount} 条`,
		  current: 1,
		  total: null,
		  size: 'default'
		}
	},

	subscriptions: {
	    setup({
	     	dispatch, 
	     	history 
	 	}) {
	      history.listen(location => {
	        if (location.pathname === '/inner/entitylog') {
	          dispatch({
	            type: 'query',
	            payload: { 
	            	...location.query,
	            	entityUuid: location.query.entityUuid? location.query.entityUuid :location.query.key
	            }
	          });
	        };
	      });
	    }
    },

  	effects: {
	    *query({ payload }, { call, put }) {
    	if(!payload.entityUuid)
    		return;
	      const { data } = yield call(queryEntityLogs, parse(payload));
	      if (data.status == '200') {
	        yield put({
	          type: 'querySuccess',
	          payload: {
	            list: data.obj.records,
	            entityUuid:payload.entityUuid,
	            pagination: {
	                            showSizeChanger: true,
	                            showQuickJumper: true,
	                            showTotal: total => `共 ${total}条`,
	                            current: data.obj.page,
	                            total: data.obj.recordCount,
	                            size: 'default'
	                        }
	          }
	        });
	      };
	    }
	},

	reducers: {
	    querySuccess(state, action) {
      		return { ...state, ...action.payload};
   		}
	}

}