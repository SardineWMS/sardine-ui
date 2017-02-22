import {
	queryUser, createUser, get, update, remove, onlineUser, offlineUser
} from '../services/user';

import {
	parse, stringify
} from 'qs';

export default {
	namespace: 'user',

	state: {
		list: [],
		loading: false,
		searchExpand: false,
		currentItem: {},
		showCreate: false,
		showEdit: false,
		showView: false,
		pagination: {
			showSizeChanger: true,
			showQuickJumper: true,
			showTotal: total => `共 ${total} 条`,
			current: 1,
			total: null,
			size: 'default'
		},
		batchDeleteProcessModal: false,
		batchOnlineProcessModal: false,
		batchOfflineProcessModal: false,
		deleteUserEntitys: [],
		onlineUserEntitys: [],
		offlineUserEntitys: [],
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				if (location.pathname === '/user') {
					dispatch({
						type: 'query',
						payload: location.query,
					})
				}
			})
		},
	},

	effects: {
		* query({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showLoading'
			});
			const {
				data
			} = yield call(queryUser, parse(payload));
			if (data) {
				let userList = data.obj.records;
				for (var user of userList) {
					user.userState = (user.userState === 'online' ? '已启用' : '已停用');
					user.administrator = (user.administrator === true ? '是' : '否');
				}
				yield put({
					type: 'querySuccess',
					payload: {
						list: userList,
						pagination: {
							total: data.obj.recordCount,
							current: data.obj.page,
						}
					},
				})
			}
		},

		*create({payload}, {call, put}) {
			yield put({
				type: 'showLoading'
			})
			try {
				const {data} = yield call(createUser, parse(payload));
				if (data.status !== 200) {
					const message = data.obj;
					const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
					alert(`新建用户出错：` + simpleMessage);
					return;
				}
				if (data) {
					yield put({
						type: 'get',
						payload: {
							uuid: data.obj
						},
					})
				}
			} catch (error) {
				alert(`新建用户出错：` + error.message);
				return;
			}
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*update({payload}, {call, put}) {
			yield call(update, payload);
			yield put({
				type: 'get',
				payload: payload,
			})
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*delete({payload}, {call, put}) {
			yield call(remove, {
				uuid: payload.uuid,
				version: payload.version
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*gridOnline({payload}, {call, put}) {
			yield call(onlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*gridOffline({payload}, {call, put}) {
			yield call(offlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*online({payload}, {call, put}) {
			yield call(onlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'get',
				payload: payload,
			})
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*get({payload}, {call, put}) {
			console.log("payload");
			console.dir(payload);
			const user = yield call(get, {
				userUuid: payload.uuid,
			});
			if (user) {
				user.data.obj.userState = (user.data.obj.userState === 'online' ? '已启用' : '已停用');
				user.data.obj.administrator = (user.data.obj.administrator === true ? '是' : '否');
				yield put({
					type: 'showViewPage',
					payload: {
						currentItem: user.data.obj,
					}
				})
			}
		},

		*offline({payload}, {call, put}) {
			yield call(offlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'get',
				payload: payload,
			})
			yield put({
				type: 'query',
				payload: {},
			})
		}
	},

	reducers: {
		showLoading(state) {
			return {
				...state,
				loading: true
			}
		},

		querySuccess(state, action) {
			return {
				...state,
				...action.payload,
				loading: false
			}
		},

		showCreatePage(state) {
			return {
				...state,
				showCreate: true,
				showView: false
			};
		},

		showViewPage(state, action) {
			return {
				...state,
				...action.payload,
				showCreate: false,
				showView: true,
			}
		},

		toggle(state, action) {
			return {
				...state,
				...action.payload,
			}
		},

		showEditPage(state, action) {
			return {
				...state,
				...action.payload,
				showCreate: true,
				showView: false,
			}
		},

		backSearch(state, action) {
			return {
				...state,
				...action.payload,
				showCreate: false,
				showView: false,
				loading: false,
			}
		},

		batchDeleteUser(state, action) {
			return { ...state, ...action.payload, batchDeleteProcessModal: true }
		},

		hideDeleteUserModal(state, action) {
			return { ...state, batchDeleteProcessModal: false }
		},

		batchOnlineUser(state, action) {
			return { ...state, ...action.payload, batchOnlineProcessModal: true }
		},

		hideOnlineUserModal(state, action) {
			return { ...state, batchOnlineProcessModal: false }
		},


		batchOfflineUser(state, action) {
			return { ...state, ...action.payload, batchOfflineProcessModal: true }
		},

		hideOfflineUserModal(state, action) {
			return { ...state, batchOfflineProcessModal: false }
		}
	},
}