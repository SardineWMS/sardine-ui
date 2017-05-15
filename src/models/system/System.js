import {
   create
} from '../../services/system/System';

import {
	parse, stringify
} from 'qs';

export default {
	namespace: 'system',

	state: {
		loading: false,
		
	},

	effects: {
		*create({ payload }, { call, put }) {
			yield put({
				type: 'showLoading'
			})
			const { data } = yield call(create, parse(payload));
			if (data.status != 200) {
				const message = data.obj;
				const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
				alert(data.message + "：" + simpleMessage);
				return;
			}
		}
	},

	reducers: {
		showLoading(state) {
			return {
				...state,
				loading: true
			}
		}
	}
}