import React ,{PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import UserSearchForm from '../components/User/UserSearchForm';
import UserSearchGrid from '../components/User/UserSearchGrid';
import UserCreateForm from '../components/User/UserCreateForm';
import UserViewForm from '../components/User/UserViewForm';

function User({location,dispatch,user}){
	const{
		loading,
		list,
		current,
		pagination,
		currentItem,
		showCreate,
		showView,
		searchExpand,
	} = user;

	const userSearchGridProps = {
		dataSource: list,
		loading,
		pagination:pagination,
		onPageChange(page) {
			dispatch(routerRedux.push({
				pathname: '/user',
				query: {
					page:page.current,
					pageSize:page.pageSize
				},
			}))
		},
		onCreate() {
			dispatch({
				type: 'user/showCreatePage'
			})
		},
		onViewItem(item){
			dispatch({
				type: 'user/showViewPage',
				payload: {
					currentItem : item
				}
			})
		},
		onDeleteItem(id) {
			dispatch({
				type: 'user/delete',
				payload: id,
			});
		},
		onEditItem(item) {
  			dispatch({
				type: 'user/showEditPage',
				payload : {
					currentItem : item
				}
			})
		},
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
				payload : {
					searchExpand :!expand,
				}	
			})
    	},

	}

	const createFormProps = {
		item : currentItem,
    	onOk(data) {
    		dispatch({
    			type: 'user/create',
				payload: fieldsValue,
    		});
    	},
    	onCancel() {
    		dispatch({
    			type: 'user/backSearch',
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
				payload : {
					currentItem : item
				}
			})
  		},
  		onBack() {
  			dispatch({
    			type: 'user/backSearch',
    		});
  		},
  	}

  	const CreateFormGen = () =><UserCreateForm {...createFormProps} />;
  	function refreshWidget(){
  		if(showCreate)
  			return (<CreateFormGen />);
  		if(showView)
  			return (<UserViewForm {...viewFormProps} />);
  		else {
  			return (<div>
  					<UserSearchForm {...userSearchFormProps} />
  					<UserSearchGrid {...userSearchGridProps} />
  				</div>);
  		}
  	}

  	return (
  		<div className="content-inner">
  		{ refreshWidget() }	
  		</div>
	)
}

User.propTypes = {
	demo1 : PropTypes.object,
	location : PropTypes.object,
	dispatch : PropTypes.func,
	showCreate : PropTypes.bool,
	showView : PropTypes.bool,
	searchExpand : PropTypes.bool,
}

function mapStateToProps({user}){
	return user;
}

export default connect(({user}) => ({user}))(User);