import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';
import UserSearchForm from '../../components/ia/User/UserSearchForm';
import UserSearchGrid from '../../components/ia/User/UserSearchGrid';
import UserCreateForm from '../../components/ia/User/UserCreateForm';
import UserViewForm from '../../components/ia/User/UserViewForm';
import WMSProgress from '../../components/Widget/WMSProgress';
import RoleAssginmentModal from '../../components/ia/User/RoleAssignmentModal';
import ResourceAssignmentModal from '../../components/ia/Role/ResourceAssignmentModal';
import ViewResourceModal from '../../components/ia/User/ViewResourceModal';

function User({ location, dispatch, user }) {
	const {
		loading,
		list,
		current,
		pagination,
		currentItem,
		showCreate,
		showView,
		searchExpand,
		batchOnlineProcessModal,
		batchDeleteProcessModal,
		batchOfflineProcessModal,
		userNext,
		deleteUserEntitys,
		onlineUserEntitys,
		offlineUserEntitys,
		showRoleAssignmentModal,
		roleList,
		showResourceAssignmentModal,
		resourceListTree,
		currentSelected,
		currentUserUuid,
		showViewResourceModal,
		viewResourceListTree,
		currentSelectedRoles,
		allRoles,
	} = user;

	const userSearchGridProps = {
		dataSource: list,
		loading,
		pagination: pagination,
		onPageChange(page) {
			dispatch(routerRedux.push({
				pathname: '/user',
				query: {
					page: page.current,
					pageSize: page.pageSize
				},
			}))
		},
		onCreate() {
			dispatch({
				type: 'user/showCreatePage'
			})
		},
		onViewItem(item) {
			dispatch({
				type: 'user/viewResource',
				payload: {
					userUuid: item.uuid
				}
			})
		},
		onBatchRemove(items) {
			if (items.length <= 0) {
				message.warning("请选择要删除的用户！", 2);
				return;
			}
			dispatch({
				type: 'user/batchDeleteUser',
				payload: {
					deleteUserEntitys: items,
				},
			});
		},
		onEditItem(item) {
			dispatch({
				type: 'user/showEditPage',
				payload: {
					currentItem: item
				}
			})
		},
		onDeleteItem(item) {
			dispatch({
				type: 'user/delete',
				payload: item,
			})
		},
		onOnline(item) {
			dispatch({
				type: 'user/gridOnline',
				payload: item,
			})
		},
		onOffline(item) {
			dispatch({
				type: 'user/gridOffline',
				payload: item,
			})
		},
		onBatchOnline(users) {
			if (users.length <= 0) {
				message.warning("请选择要启用的用户！", 2);
				return;
			}
			dispatch({
				type: 'user/batchOnlineUser',
				payload: {
					onlineUserEntitys: users,
				}
			})
		},

		onBatchOffline(users) {
			if (users.length <= 0) {
				message.warning("请选择要停用的用户！", 2);
				return;
			}
			dispatch({
				type: 'user/batchOfflineUser',
				payload: {
					offlineUserEntitys: users,
				}
			})
		},

		onAssignRole(record) {
			dispatch({
				type: 'user/assignRole',
				payload: {
					userUuid: record.uuid,
				}
			})
		},

		onAssignResource(record) {
			dispatch({
				type: 'user/assignResource',
				payload: {
					userUuid: record.uuid,
				}
			})
		}
	}

	const userSearchFormProps = {
		searchExpand,
		allRoles,
		onSearch(fieldsValue) {
			dispatch({
				type: 'user/query',
				payload: fieldsValue,
			})
		},
		onToggle(expand) {
			dispatch({
				type: 'user/toggle',
				payload: {
					searchExpand: !expand,
				}
			})
		},

	}

	const createFormProps = {
		item: currentItem,
		onOk(data) {
			if (data.uuid) {
				dispatch({
					type: 'user/update',
					payload: data,
				});
			} else {
				dispatch({
					type: 'user/create',
					payload: data,
				})
			}
		},
		onCancel() {
			dispatch({
				type: 'user/backSearch',
				payload: {
					currentItem: {},
				}
			});
		},
	}

	const viewFormProps = {
		item: currentItem,
		onCreate() {
			dispatch({
				type: 'user/showCreatePage'
			})
		},
		onEdit(item) {
			dispatch({
				type: 'user/showEditPage',
				payload: {
					currentItem: item
				}
			})
		},
		onBack() {
			dispatch({
				type: 'user/backSearch',
				payload: {
					currentItem: {},
				}
			});
		},
		onOnline(item) {
			dispatch({
				type: 'user/online',
				payload: item,
			})
		},
		onOffline(item) {
			dispatch({
				type: 'user/offline',
				payload: item,
			})
		}
	}

	const batchProcessOnlineUserProps = {
		showConfirmModal: batchOnlineProcessModal,
		records: onlineUserEntitys ? onlineUserEntitys : [],
		next: userNext,
		actionText: '启用',
		entityCaption: '用户',
		batchProcess(entity) {
			if (entity.administrator === "是") {
				return;
			}
			else {
				dispatch({
					type: 'user/gridOnline',
					payload: entity,
				})
			}
		},
		hideConfirmModal() {
			dispatch({
				type: 'user/hideOnlineUserModal',
			})
		},
		refreshGrid() {
			dispatch({
				type: 'user/query',
				payload: {},
			})
		}
	}

	const batchProcessOfflineUserProps = {
		showConfirmModal: batchOfflineProcessModal,
		records: offlineUserEntitys ? offlineUserEntitys : [],
		next: userNext,
		actionText: '停用',
		entityCaption: '用户',
		batchProcess(entity) {
			dispatch({
				type: 'user/gridOffline',
				payload: entity,
			})
		},
		hideConfirmModal() {
			dispatch({
				type: 'user/hideOfflineUserModal',
			})
		},
		refreshGrid() {
			dispatch({
				type: 'user/query',
				payload: {},
			})
		}
	}

	const batchProcessDeleteUserProps = {
		showConfirmModal: batchDeleteProcessModal,
		records: deleteUserEntitys ? deleteUserEntitys : [],
		next: userNext,
		actionText: '删除',
		entityCaption: '用户',
		batchProcess(entity) {
			dispatch({
				type: 'user/delete',
				payload: entity,
			})
		},
		hideConfirmModal() {
			dispatch({
				type: 'user/hideDeleteUserModal',
			})
		},
		refreshGrid() {
			dispatch({
				type: 'user/query',
				payload: {},
			})
		}
	}

	const roleAssignmentModalProps = {
		item: currentItem,
		visible: showRoleAssignmentModal,
		treeData: roleList,
		value: currentSelectedRoles,
		onCancel() {
			dispatch({
				type: 'user/hideRoleAssignment',
			})
		},
		onSave(values) {
			dispatch({
				type: 'user/saveRole',
				payload: { roleUuids: values.role, userUuid: currentUserUuid.userUuid },
			})
		}

	}

	const resourceAssignmentModalProps = {
		item: currentItem,
		visible: showResourceAssignmentModal,
		treeData: resourceListTree,
		value: currentSelected,
		onCancel() {
			dispatch({
				type: 'user/hideResourceAssignment',
			})
		},
		onSave(values) {
			dispatch({
				type: 'user/saveResource',
				payload: { resourceUuids: values.resource, userUuid: currentUserUuid.userUuid },
			})
		}
	}

	const viewResourceModalProps = {
		item: currentItem,
		visible: showViewResourceModal,
		treeData: viewResourceListTree,
		value: currentSelected,
		onCancel() {
			dispatch({
				type: 'user/hideViewResource',
			})
		},
	}

	const CreateFormGen = () => <UserCreateForm {...createFormProps} />;
	const UserViewGen = () => <UserViewForm {...viewFormProps} />;
	const UserGridGen = () => <UserSearchGrid {...userSearchGridProps} />
	const AssignRoleModalGen = () => <RoleAssginmentModal {...roleAssignmentModalProps} />
	const AssignResourceModalGen = () => <ResourceAssignmentModal {...resourceAssignmentModalProps} />
	const ViewResourceModalGen = () => <ViewResourceModal {...viewResourceModalProps} />

	function refreshWidget() {
		if (showCreate)
			return (<CreateFormGen />);
		if (showView)
			return (<UserViewGen />);
		else {
			return (<div>
				<UserSearchForm {...userSearchFormProps} />
				<UserGridGen />
				<WMSProgress {...batchProcessOnlineUserProps} />
				<WMSProgress {...batchProcessOfflineUserProps} />
				<WMSProgress {...batchProcessDeleteUserProps} />
				<AssignRoleModalGen />
				<AssignResourceModalGen />
				<ViewResourceModalGen />
			</div>);
		}
	}

	return (
		<div className="content-inner">
			{refreshWidget()}
		</div>
	)
}

User.propTypes = {
	demo1: PropTypes.object,
	location: PropTypes.object,
	dispatch: PropTypes.func,
	showCreate: PropTypes.bool,
	showView: PropTypes.bool,
	searchExpand: PropTypes.bool,
}

function mapStateToProps({ user }) {
	return user;
}

export default connect(({ user }) => ({ user }))(User);