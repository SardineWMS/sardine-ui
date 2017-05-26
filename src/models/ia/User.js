import {
	queryUser, createUser, get, update, remove, onlineUser, offlineUser, queryAllResourceByUser, saveUserResource, saveUserRole
} from '../../services/ia/user';
import { queryAllRole, queryRole, queryAllResourceByRole, } from '../../services/ia/Role';
import { removeByValue } from '../../utils/ArrayUtils';

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
		roleList: [],
		currentUserUuid: '',
		showRoleAssignmentModal: false,
		resourceListTree: [],
		showResourceAssignmentModal: false,
		currentSelected: [],
		showViewResourceModal: false,
		currentSelectedRoles: [],
		allRoles: [],//当前组织下所有角色，用于用户搜索时角色下拉框数据源.
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				if (location.pathname === '/ia/user') {
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
				const allRoles = yield call(queryAllRole, {});
				let userList = data.obj.records;
				yield put({
					type: 'querySuccess',
					payload: {
						list: userList,
						pagination: {
							total: data.obj.recordCount,
							current: data.obj.page,
						},
						allRoles: allRoles.data.obj,
					},
				})
			}
		},

		*create({ payload }, { call, put }) {
			yield put({
				type: 'showLoading'
			})
			const { data } = yield call(createUser, parse(payload));
			if (data.status != 200) {
				const message = data.obj;
				const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
				alert(data.message + "：" + simpleMessage);
				return;
			}
			if (data) {
				yield put({
					type: 'query',
					payload: {},
				})
			}
		},

		*update({ payload }, { call, put }) {
			yield call(update, payload);
			// yield put({
			// 	type: 'get',
			// 	payload: payload,
			// })
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*delete({ payload }, { call, put }) {
			yield call(remove, {
				uuid: payload.uuid,
				version: payload.version
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*gridOnline({ payload }, { call, put }) {
			yield call(onlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*gridOffline({ payload }, { call, put }) {
			yield call(offlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*online({ payload }, { call, put }) {
			yield call(onlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			// yield put({
			// 	type: 'get',
			// 	payload: payload,
			// })
			yield put({
				type: 'query',
				payload: {},
			})
		},

		// *get({ payload }, { call, put }) {
		// 	const user = yield call(get, {
		// 		userUuid: payload.uuid,
		// 	});
		// 	if (user) {
		// 		user.data.obj.userState = (user.data.obj.userState === 'online' ? '已启用' : '已停用');
		// 		user.data.obj.administrator = (user.data.obj.administrator === true ? '是' : '否');
		// 		yield put({
		// 			type: 'showViewPage',
		// 			payload: {
		// 				currentItem: user.data.obj,
		// 			}
		// 		})
		// 	}
		// },

		*offline({ payload }, { call, put }) {
			yield call(offlineUser, {
				uuid: payload.uuid,
				version: payload.version,
			});
			// yield put({
			// 	type: 'get',
			// 	payload: payload,
			// })
			yield put({
				type: 'query',
				payload: {},
			})
		},

		*assignRole({ payload }, {
			call, put
		}) {
			let currentSelected = [];
			const { data } = yield call(queryAllRole, parse());
			let roleList = [];
			roleList = data.obj;
			// console.dir("数据" + data);
			if (roleList.length > 0) {
				for (let role of roleList) {
					role.value = role.uuid;
					role.label = role.name;
					if (role.owned) {
						currentSelected.push(role.value);
					}
				}
			}

			yield put({
				type: 'showRoleAssignment',
				payload: {
					roleList: roleList,
					currentUserUuid: payload,
					currentSelectedRoles: currentSelected,
				}
			})
		},

		*assignResource({ payload }, {
			call, put
		}) {
			function buildResourceTree(resource, currentSelected) {
				resource.value = resource.uuid;
				resource.label = resource.name;
				if (resource.owned && resource.children.length <= 0) {
					currentSelected.push(resource.value);
				}
				if (resource.children.length > 0) {
					for (let lowerResource of resource.children) {
						resource.value = resource.uuid;
						resource.label = resource.name;
						if (lowerResource.owned && lowerResource.children.length <= 0) {
							currentSelected.push(lowerResource.value);
						}
						buildResourceTree(lowerResource, currentSelected);
					}
				}
			}

			const { data } = yield call(queryAllResourceByUser, parse(payload));
			let resourceListTree = [];
			let currentSelected = [];
			if (data.obj.length > 0) {
				resourceListTree = data.obj;
				for (let resource of resourceListTree) {
					resource.value = resource.uuid;
					resource.label = resource.name;
					if (resource.owned && resource.children.length <= 0) {
						currentSelected.push(resource.value);
					}
					buildResourceTree(resource, currentSelected);
				}
			}
			yield put({
				type: 'showResourceAssignment',
				payload: {
					resourceListTree: resourceListTree,
					currentUserUuid: payload,
					currentSelected: currentSelected,
				}
			})
		},

		*saveResource({ payload }, {
			call, put
		}) {
			yield call(saveUserResource, parse(payload));
			yield put({
				type: 'hideResourceAssignment',
			})
			yield put({
				type: 'query',
				payload: {}
			})
		},

		*saveRole({ payload }, {
			call, put
		}) {
			yield call(saveUserRole, parse(payload));
			yield put({
				type: 'hideRoleAssignment',
			})
			yield put({
				type: 'query',
				payload: {}
			})
		},
		*viewResource({ payload }, {
			call, put
		}) {
			function buildResourceTree(resource, currentSelected, resourceListTree) {
				resource.value = resource.uuid;
				resource.label = resource.name;
				resource.disabled = true;
				if (resource.owned && resource.children.length <= 0) {
					currentSelected.push(resource.value);

				}

				if (resource.children.length > 0) {
					for (let lowerResource of resource.children) {
						lowerResource.value = lowerResource.uuid;
						lowerResource.label = lowerResource.name;
						lowerResource.disabled = true;
						if (!lowerResource.owned) {
							removeByValue(resourceListTree, lowerResource);
						} else if (lowerResource.children.length <= 0) {
							currentSelected.push(lowerResource.value);

						}
						buildResourceTree(lowerResource, currentSelected, resourceListTree);
					}
				}
			}
			const { data } = yield call(queryAllResourceByUser, parse(payload));
			let resourceListTree = [];
			let currentSelected = [];
			if (data.obj.length > 0) {
				resourceListTree = data.obj;
				for (let resource of resourceListTree) {
					resource.value = resource.uuid;
					resource.label = resource.name;
					resource.disabled = true;
					if (resource.owned && resource.children.length <= 0) {
						currentSelected.push(resource.value);
					}
					buildResourceTree(resource, currentSelected, resourceListTree);
				}
			}

			yield put({
				type: 'showViewResource',
				payload: {
					viewResourceListTree: resourceListTree,
					currentSelected: currentSelected,
				}
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
				loading: false,
				showCreate: false,
				showEdit: false,
				showView: false,
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
		},

		showRoleAssignment(state, action) {
			return { ...state, ...action.payload, showRoleAssignmentModal: true };
		},

		hideRoleAssignment(state) {
			return { ...state, showRoleAssignmentModal: false };
		},

		showResourceAssignment(state, action) {
			return { ...state, ...action.payload, showResourceAssignmentModal: true }
		},

		hideResourceAssignment(state) {
			return { ...state, showResourceAssignmentModal: false };
		},
		showViewResource(state, action) {
			return { ...state, showViewResourceModal: true, ...action.payload };
		},
		hideViewResource(state) {
			return { ...state, showViewResourceModal: false };
		}
	},
}