import React ,{PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ArticleSearchForm from '../../components/BasicInfo/Article/ArticleSearchForm';
import ArticleSearchGrid from '../../components/BasicInfo/Article/ArticleSearchGrid';
import ArticleCreateForm from '../../components/BasicInfo/Article/ArticleCreateForm';
import ArticleViewForm from '../../components/BasicInfo/Article/ArticleViewForm';

function Article({location,dispatch,article}){
	const{
		loading,
		list,
		total,
		current,
		pagination,
		currentArticle,
		showCreate,
		showView,
	} = article;

	const { field, keyword} = location.query;
	const articleSearchGridProps = {
		dataSource: list,
		loading,
		pagination:pagination,
		onPageChange(page) {
			dispatch({
				type: 'article/query',
				payload: {
				   page:page.current,
			       pageSize:page.pageSize,
			       token: localStorage.getItem("token")
				},
			})
		},
		onCreate() {
			dispatch({
				type: 'article/showCreatePage'
			})
		},
		onView(article){
			dispatch({
				type: 'article/getAndView',
				payload: {
					articleUuid : article.uuid
				}
			})
		},
		onEdit(article) {
  			dispatch({
				type: 'article/getAndShowEditPage',
				payload : {
					articleUuid : article.uuid
				}
			})
		},
	}

	const articleSearchFormProps = {
		field,
		keyword,
		onSearch(fieldsValue) {
			dispatch({
				type: 'article/query',
				payload: fieldsValue,
			})
    	},
	}

	const createFormProps = {
		article : currentArticle,
    	onOk(data) {
    		let token = localStorage.getItem("token");
    		data.token = token;
    		dispatch({
    			type: 'article/create',
				payload: data,
    		});
    	},
    	onCancel() {
    		dispatch({
    			type: 'article/backSearch',
    		});
    	},
  	}

  	const viewFormProps = {
  		article: currentArticle,
  		onCreate() {
			dispatch({
				type: 'article/showCreatePage'
			})
  		},
  		onEdit(item) {
  			dispatch({
				type: 'article/showEditPage',
				payload : {
					currentArticle : item
				}
			})
  		},
  		onBack() {
  			dispatch({
    			type: 'article/backSearch',
    		});
  		},
  	}

  	const CreateFormGen = () =><ArticleCreateForm {...createFormProps} />;
  	function refreshWidget(){
  		if(showCreate)
  			return (<CreateFormGen />);
  		if(showView)
  			return (<ArticleViewForm {...viewFormProps} />);
  		else {
  			return (<div>
  					<ArticleSearchForm {...articleSearchFormProps} />
  					<ArticleSearchGrid {...articleSearchGridProps} />
  				</div>);
  		}
  	}

  	return (
  		<div className="content-inner">
  		{ refreshWidget() }	
  		</div>
	)
}

Article.propTypes = {
	article : PropTypes.object,
	location : PropTypes.object,
	dispatch : PropTypes.func,
	showCreate : PropTypes.bool,
	showView : PropTypes.bool,
}

function mapStateToProps({article}){
	return article;
}

export default connect(({article}) => ({article}))(Article);