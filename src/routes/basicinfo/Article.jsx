import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ArticleSearchForm from '../../components/basicinfo/Article/ArticleSearchForm';
import ArticleSearchGrid from '../../components/basicinfo/Article/ArticleSearchGrid';
import ArticleCreateForm from '../../components/basicinfo/Article/ArticleCreateForm';
import ArticleViewForm from '../../components/basicinfo/Article/ArticleViewForm';
import ArticleEditableSupplier from '../../components/basicinfo/Article/ArticleEditableSupplier';
import ArticleEditableQpcStr from '../../components/basicinfo/Article/ArticleEditableQpcStr';
import ArticleEditableBarcode from '../../components/basicinfo/Article/ArticleEditableBarcode';
import SetFixedPickBinModal from '../../components/basicinfo/Article/SetFixedPickBinModal';
import WMSProgress from '../../components/Widget/WMSProgress';
import { message } from 'antd';

function Article({ location, dispatch, article }) {
	const {
		list,
		total,
		current,
		pagination,
		currentArticle,
		showCreate,
		showView,
		batchSetBinProcessModal,
		setFixedPickBinEntitys,
		articleNext,
		modalType,
		articles,
		modalVisible
	} = article;

	const { field, keyword } = location.query;
	const articleSearchGridProps = {
		dataSource: list,
		pagination: pagination,
		onPageChange(page, filters, sorter) {
			dispatch({
				type: 'article/query',
				payload: {
					page: page.current,
					pageSize: page.pageSize,
					sort: sorter.columnKey,
					order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
				},
			})
		},
		onCreate() {
			dispatch({
				type: 'article/showCreatePage'
			})
		},
		onView(article) {
			dispatch({
				type: 'article/getAndView',
				payload: {
					articleUuid: article.uuid
				}
			})
		},
		onEdit(article) {
			dispatch({
				type: 'article/getAndShowEditPage',
				payload: {
					articleUuid: article.uuid
				}
			})
		},
        onSetFixedPickBinItem(article) {
            articles.push(article),
            dispatch({
                type:'article/showSetBinModal',
                payload:{
                    articles:articles,
                    modalType:"single"
                }
            })
        },
	   	onSetFixedPickBinBatch(articles) {
            if (articles.length <= 0) {
                message.warning("请选择要设置的商品！", 2, '');
                return;
            }
            dispatch({
                type:'article/showSetBinModal',
                payload:{
                    articles:articles,
                    modalType:"group"
                }
            })
        },
	}

    const setFixedPickBinModalProps={
        articles:articles,
        visible:modalVisible,
        onOk(articles){
            if(modalType==="single"){
           		dispatch({
			        type: 'article/setArticleFixedPickBin',
			        payload: {
			        	articleUuid: articles[0].uuid,
			        	fixedPickBin: articles[0].fixedPickBin
			        }
		        })
            }else{
                dispatch({
                    type: 'article/batchSetBinModal',
                    payload: {
                        setFixedPickBinEntitys: articles
                    }
                })
            }
        },
        onCancel(){
            dispatch({
                type: 'article/hideSetBinModal'
            })  
        }
    }

    const batchProcesssetFixedPickBinProps = {
	    showConfirmModal: batchSetBinProcessModal,
	    records: setFixedPickBinEntitys ? setFixedPickBinEntitys : [],
	    next: articleNext,
	    actionText: '设置',
	    entityCaption: '固定拣货位',
	    batchProcess(entity) {
	      dispatch({
	        type: 'article/setArticleFixedPickBin',
	        payload: {
	        	articleUuid: entity.uuid,
	        	fixedPickBin:entity.fixedPickBin
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'article/hideBatchSetBinModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'article/query'
	      })
	    }
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
		article: currentArticle,
		onOk(data) {
			let token = localStorage.getItem("token");
			data.token = token;
			data.category = new Object();
			data.category.code = data.categoryCode;
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
				payload: {
					currentArticle: item
				}
			})
		},
		onBack() {
			dispatch({
				type: 'article/backSearch',
			});
		},
	}

	const viewArticleBarcodeProps = {
		dataSource: currentArticle.barcodes,
		articleUuid: currentArticle.uuid,
		count: currentArticle.barcodes ? currentArticle.barcodes.length : 0,
		onEdit(ds, index) {
			currentArticle.barcodes[index]["editable"] = true;
			dispatch({
				type: 'article/showViewPage',
			});
		},
		onCancel(index) {
			currentArticle.barcodes[index]["editable"] = false;
			dispatch({
				type: 'article/showViewPage',
			});
		},
		onSaveBarcode(ds, articleUuid, index) {
			dispatch({
				type: 'article/saveArticleBarcode',
				payload: {
					articleUuid: articleUuid,
					uuid: ds[index].uuid,
					qpcStr: ds[index].newqpcStr ? ds[index].newqpcStr : ds[index].qpcStr,
					barcode: ds[index].newbarcode ? ds[index].newbarcode : ds[index].barcode,
					token: localStorage.getItem("token")
				}
			});
		},
		onDelete(articleUuid, uuid) {
			dispatch({
				type: 'article/deleteArticleBarcode',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token"),
					uuid: uuid
				}
			});
		},
		onAdd(articleUuid) {
			dispatch({
				type: 'article/addArticleBarcode',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token")
				}
			});
		},
	}

	const viewArticleQpcStrProps = {
		dataSource: currentArticle.qpcs,
		articleUuid: currentArticle.uuid,
		count: currentArticle.qpcs ? currentArticle.qpcs.length : 0,
		onEdit(ds, index) {
			currentArticle.qpcs[index]["editable"] = true;
			dispatch({
				type: 'article/showViewPage',
			});
		},
		onCancel(index) {
			currentArticle.qpcs[index]["editable"] = false;
			dispatch({
				type: 'article/showViewPage',
			});
		},
		onSaveQpcStr(ds, articleUuid, index) {
			dispatch({
				type: 'article/saveArticleQpc',
				payload: {
					articleUuid: articleUuid,
					uuid: ds[index].uuid,
					qpcStr: ds[index].newqpcStr ? ds[index].newqpcStr : ds[index].qpcStr,
					munit: ds[index].newmunit ? ds[index].newmunit : ds[index].munit,
					length: ds[index].newlength ? ds[index].newlength : ds[index].length,
					width: ds[index].newwidth ? ds[index].newwidth : ds[index].width,
					height: ds[index].newheight ? ds[index].newheight : ds[index].height,
					weight: ds[index].newweight ? ds[index].newweight : ds[index].weight,
					token: localStorage.getItem("token")
				}
			});
		},
		onDelete(articleUuid, uuid) {
			dispatch({
				type: 'article/deleteArticleQpc',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token"),
					uuid: uuid
				}
			});
		},
		onSetDefaultQpcStr(articleUuid, uuid) {
			dispatch({
				type: 'article/setDefaultQpcStr',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token"),
					uuid: uuid
				}
			});
		},
		onAdd(articleUuid) {
			dispatch({
				type: 'article/addArticleQpc',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token")
				}
			});
		},
	}

	const viewArticleSupplierProps = {
		dataSource: currentArticle.articleSuppliers,
		articleUuid: currentArticle.uuid,
		count: currentArticle.articleSuppliers ? currentArticle.articleSuppliers.length : 0,
		onSaveSupplier(articleUuid, uuid, supplierCode) {
			dispatch({
				type: 'article/getAndSaveSupplier',
				payload: {
					articleUuid: articleUuid,
					uuid: uuid,
					supplierCode: supplierCode,
					token: localStorage.getItem("token")
				}
			});
		},
		onAdd(articleUuid) {
			dispatch({
				type: 'article/addArticleSupplier',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token")
				}
			});
		},
		onDelete(articleUuid, uuid) {
			dispatch({
				type: 'article/deleteArticleSupplier',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token"),
					uuid: uuid
				}
			});
		},
		onSetDefaultSupplier(articleUuid, uuid) {
			dispatch({
				type: 'article/setDefaultSupplier',
				payload: {
					articleUuid: articleUuid,
					token: localStorage.getItem("token"),
					uuid: uuid
				}
			});
		}
	}

	const CreateFormGen = () => <ArticleCreateForm {...createFormProps} />;
	function refreshWidget() {
		if (showCreate)
			return (<CreateFormGen />);
		if (showView)
			return (
				<div>
					<ArticleViewForm {...viewFormProps} />
					<ArticleEditableSupplier {...viewArticleSupplierProps} />
					<ArticleEditableQpcStr {...viewArticleQpcStrProps} />
					<ArticleEditableBarcode {...viewArticleBarcodeProps} />
				</div>
			);
		else {
			return (<div>
				<ArticleSearchForm {...articleSearchFormProps} />
				<ArticleSearchGrid {...articleSearchGridProps} />
				<SetFixedPickBinModal {...setFixedPickBinModalProps} />
				<WMSProgress {...batchProcesssetFixedPickBinProps} />
			</div>);
		}
	}

	return (
		<div className="content-inner">
			{refreshWidget()}
		</div>
	)
}

Article.propTypes = {
	article: PropTypes.object,
	location: PropTypes.object,
	dispatch: PropTypes.func,
	showCreate: PropTypes.bool,
	showView: PropTypes.bool,
}

function mapStateToProps({ article }) {
	return article;
}

export default connect(({ article }) => ({ article }))(Article);