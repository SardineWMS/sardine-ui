import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import UserSearchForm from '../components/User/UserSearchForm';
import UserSearchGrid from '../components/User/UserSearchGrid';
import UserCreateForm from '../components/User/UserCreateForm';
import UserViewForm from '../components/User/UserViewForm';
import WMSProgress from '../components/Widget/WMSProgress';

function User({location, dispatch, user}) {
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
				type: 'user/showViewPage',
				payload: {
					currentItem: item
				}
			})
		},
		onDeleteUsers(items) {
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
			dispatch({
				type: 'user/batchOnlineUser',
				payload: {
					onlineUserEntitys: users,
				}
			})
		},

		onBatchOffline(users) {
			console.log('选中的users');
			console.dir(users);
			dispatch({
				type: 'user/batchOfflineUser',
				payload: {
					offlineUserEntitys: users,
				}
			})
		}
	}

	const userSearchFormProps = {
		searchExpand,
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
				console.log("data的uuid");
				console.dir(data);
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

	const CreateFormGen = () => <UserCreateForm {...createFormProps} />;
	const UserViewGen = () => <UserViewForm {...viewFormProps} />;
	const UserGridGen = () => <UserSearchGrid {...userSearchGridProps} />
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

function mapStateToProps({user}) {
	return user;
}

export default connect(({user}) => ({ user }))(User);