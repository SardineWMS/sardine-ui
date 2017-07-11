import {
	create, queryCompany, get, update
} from '../../services/system/System';

import {
	parse, stringify
} from 'qs';

export default {
	namespace: 'dc',

	state: {
		loading: false,
		wareHouses: [],
    defaultActiveKey: '',
    showCreate: false,
    visible: false
	},

	subscriptions: {
     setup({
       dispatch,
       history
     }) {
       history.listen(location => {
         if (location.pathname === '/dc') {
            dispatch({
              type: 'queryCompany',
            })
        }
      })
    },
  },


	effects: {
		*create({ payload }, { call, put }) {
			yield put({
				type: 'showLoading'
			});
			const { data } = yield call(create, parse(payload));
			if (data.status == '200') {
        let key = data.obj;
				const queryData = yield call(queryCompany, {});
        if (queryData && queryData.data) {
             yield put({
               type: 'querySuccess',
               payload: {
                 wareHouses: queryData.data.obj,
                 defaultActiveKey: key
               }
             });
        }
			};
		},

    *update({ payload }, { call, put }) {
      yield put({
        type: 'showLoading'
      });
      const { data } = yield call(update, parse(payload));
      if (data) {
        let key = data.obj;
        const queryData = yield call(queryCompany, {});
        if (queryData && queryData.data) {
             yield put({
               type: 'querySuccess',
               payload: {
                 wareHouses: queryData.data.obj,
                 defaultActiveKey: key
               }
             });
        }
      };
    },

		*queryCompany({ payload }, {
           call,
           put
        }) {
           yield put({
             type: 'showLoading'
           })
           const {
             data
           } = yield call(queryCompany, parse(payload))
           if (data) {
             yield put({
               type: 'querySuccess',
               payload: {
                 wareHouses: data.obj,
                 defaultActiveKey: data.obj && data.obj.length > 0 ? data.obj[0].code : ''
               }
             })
           }
        }
	},

	reducers: {
		showLoading(state) {
			return {
				...state,
				loading: true
			};
		},

		querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false,
        showCreate: false,
        visible: false
      }
    },

    showCreate(state, action) {
      return {
        ...state,
        ...action.payload,
        showCreate: true,
        visible: true
      }
    },

    hideCreate(state, action) {
      return {
        ...state,
        ...action.payload,
        showCreate: false,
        visible: false
      }
    }
	}
}