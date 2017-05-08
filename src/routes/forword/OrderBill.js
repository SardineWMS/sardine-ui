import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd';

import OrderBillSearchGrid from '../../components/forword/Order/OrderBillSearchGrid';
import OrderBillSearchForm from '../../components/forword/Order/OrderBillSearchForm';
import OrderBillCreateForm from '../../components/forword/Order/OrderBillCreateForm';
import OrderBillView from '../../components/forword/Order/OrderBillView';
import OrderBillItems from '../../components/forword/Order/OrderBillItems';
import DateModal from '../../components/forword/Order/DateModal';

import WMSProgress from '../../components/Widget/WMSProgress';
function OrderBill({ location, dispatch, orderBill }){
   const {
        list, showCreatePage, pagination, showViewPage,
        currentItem, current,articleQpcs,
        batchDeleteProcessModal, deleteOrderBillEntitys,
        batchBookRegProcessModal,bookRegOrderBillEntitys,
        batchCheckProcessModal,checkOrderBillEntitys,
        batchFinishProcessModal,finishOrderBillEntitys,
        batchAbortProcessModal,abortOrderBillEntitys,
        orderBillNext,modalVisible,bookRegType,
        bookRegBills
    } = orderBill;

    const { field, keyword } = location.query;

    const orderBillListProps={
    	dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forword/orderBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    sortDirection: sorter.order,
                }
            }))
        },
        onSearch(fieldsValue) {
            dispatch({
                type: 'orderBill/query',
                payload: fieldsValue
            })
        },
        onCreate() {
            dispatch({
                type: 'orderBill/showCreatePage',
            })
        },
        onViewItem(item) {
            dispatch({
                type: 'orderBill/get',
                payload: {
                    uuid:item.uuid
                }
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'orderBill/getForEdit',
                payload: {
                    uuid:item.uuid
                }
            })
        },
        onDeleteItem(item) {
            dispatch({
                type: 'orderBill/remove',
                payload: {
                    uuid:item.uuid,
                    version:item.version
                }
            })
        },
        onBookRegItem(item) {
            bookRegBills.push(item),
            dispatch({
                type:'orderBill/showModal',
                payload:{
                    bookRegBills:bookRegBills,
                    bookRegType:"single"
                }
            })
            // dispatch({
            //     type: 'orderBill/gridBookReg',
            //     payload: {
            //         uuid:item.uuid,
            //         version:item.version,
            //         bookDate:item.bookDate
            //     }
            // })
        },
        onCheckItem(item) {
            dispatch({
                type: 'orderBill/gridCheck',
                payload: {
                    uuid:item.uuid,
                    version:item.version
                }
            })
        },
        onFinishItem(item) {
            dispatch({
                type: 'orderBill/gridFinish',
                payload: {
                    uuid:item.uuid,
                    version:item.version
                }
            })
        },
        onAbortItem(item) {
            dispatch({
                type: 'orderBill/gridAbort',
                payload: {
                    uuid:item.uuid,
                    version:item.version
                }
            })
        },
        onDeleteBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要删除的订单！", 2, '');
                return;
            }
            dispatch({
                type: 'orderBill/batchRemoveOrderBill',
                payload: {
                    deleteOrderBillEntitys: orderBills
                }
            })
        },
        onBookRegBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要预约的订单！", 2, '');
                return;
            }
            dispatch({
                type:'orderBill/showModal',
                payload:{
                    bookRegBills:orderBills,
                    bookRegType:"group"
                }
            })
            // dispatch({
            //     type: 'orderBill/batchBookRegOrderBill',
            //     payload: {
            //         bookRegOrderBillEntitys: orderBills
            //     }
            // })
        },
        onCheckBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要预检的订单！", 2, '');
                return;
            }
            dispatch({
                type: 'orderBill/batchCheckOrderBill',
                payload: {
                    checkOrderBillEntitys: orderBills
                }
            })
        },
        onFinishBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要完成的订单！", 2, '');
                return;
            }
            dispatch({
                type: 'orderBill/batchFinishOrderBill',
                payload: {
                    finishOrderBillEntitys: orderBills
                }
            })
        },
        onAbortBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要作废的订单！", 2, '');
                return;
            }
            dispatch({
                type: 'orderBill/batchAbortOrderBill',
                payload: {
                    abortOrderBillEntitys: orderBills
                }
            })
        }
    }

    const orderBillSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'orderBill/query',
                payload: fieldsValue,
            })
        }
    }

    const batchProcessDeleteOrderBillsProps = {
	    showConfirmModal: batchDeleteProcessModal,
	    records: deleteOrderBillEntitys ? deleteOrderBillEntitys : [],
	    next: orderBillNext,
	    actionText: '删除',
	    entityCaption: '入库订单',
	    batchProcess(entity) {
	      dispatch({
	        type: 'orderBill/remove',
	        payload: {
	          uuid: entity.uuid,
	          version: entity.version
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'orderBill/hideRemoveOrderBillModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'orderBill/query'
	      })
	    }
    }

   const batchProcessBookRegOrderBillsProps = {
	    showConfirmModal: batchBookRegProcessModal,
	    records: bookRegOrderBillEntitys ? bookRegOrderBillEntitys : [],
	    next: orderBillNext,
	    actionText: '预约',
	    entityCaption: '入库订单',
	    batchProcess(entity) {
	      dispatch({
	        type: 'orderBill/gridBookReg',
	        payload: {
	          uuid: entity.uuid,
	          version: entity.version,
	          bookedDate:entity.bookedDate
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'orderBill/hideBookRegOrderBillModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'orderBill/query'
	      })
	    }
    }

    const batchProcessCheckOrderBillsProps = {
	    showConfirmModal: batchCheckProcessModal,
	    records: checkOrderBillEntitys ? checkOrderBillEntitys : [],
	    next: orderBillNext,
	    actionText: '预检',
	    entityCaption: '入库订单',
	    batchProcess(entity) {
	      dispatch({
	        type: 'orderBill/gridCheck',
	        payload: {
	          uuid: entity.uuid,
	          version: entity.version
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'orderBill/hideCheckOrderBillModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'orderBill/query'
	      })
	    }
    }

    const batchProcessFinishOrderBillsProps = {
	    showConfirmModal: batchFinishProcessModal,
	    records: finishOrderBillEntitys ? finishOrderBillEntitys : [],
	    next: orderBillNext,
	    actionText: '完成',
	    entityCaption: '入库订单',
	    batchProcess(entity) {
	      dispatch({
	        type: 'orderBill/gridFinish',
	        payload: {
	          uuid: entity.uuid,
	          version: entity.version
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'orderBill/hideFinishOrderBillModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'orderBill/query'
	      })
	    }
    }

    const batchProcessAbortOrderBillsProps = {
	    showConfirmModal: batchAbortProcessModal,
	    records: abortOrderBillEntitys ? abortOrderBillEntitys : [],
	    next: orderBillNext,
	    actionText: '作废',
	    entityCaption: '入库订单',
	    batchProcess(entity) {
	      dispatch({
	        type: 'orderBill/gridAbort',
	        payload: {
	          uuid: entity.uuid,
	          version: entity.version
	        }
	      })
	    },
	    hideConfirmModal() {
	      dispatch({
	        type: 'orderBill/hideAbortOrderBillModal',
	      })
	    },
	    refreshGrid() {
	      dispatch({
	        type: 'orderBill/query'
	      })
	    }
    }

    const orderBillCreateProps={
    	item:currentItem,
    	onOk(data){
            data.items=currentItem.items;
    		if(data.uuid){
    			dispatch({
		        	type: 'orderBill/edit',
		          	payload: data,
		        });
    		}else{
				dispatch({
		        	type: 'orderBill/create',
		          	payload: data,
		        });
    		}
    	},
		onCancel(formForm){
    		if('View'.formForm){
    			dispatch({
		        	type: 'orderBill/backViewForm',
		        });
    		}else{
				dispatch({
		        	type: 'orderBill/backSearchForm',
		        });
    		}
    	},
    }

    const orderBillViewFormProps={
    	item:currentItem,
    	onEdit(item){
	   		dispatch({
		        type: 'orderBill/edit',
		        payload: item,
	      	});
    	},
		onDelete(item){
	   		dispatch({
		        type: 'orderBill/remove',
	            payload: {
		        	uuid: item.uuid,
		        	version:item.version
		        }
	      	});
    	},
		onBookReg(item){
	   		dispatch({
		        type: 'orderBill/bookReg',
	            payload: {
		        	uuid: item.uuid,
		        	version:item.version,
		        	bookedDate:item.bookedDate
		        }
	      	});
    	},
		onCheck(item){
	   		dispatch({
		        type: 'orderBill/check',
	            payload: {
		        	uuid: item.uuid,
		        	version:item.version
		        }
	      	});
    	},
		onFinish(item){
	   		dispatch({
		        type: 'orderBill/finish',
	            payload: {
		        	uuid: item.uuid,
		        	version:item.version
		        }
	      	});
    	},
    	onAbort(item){
	   		dispatch({
		        type: 'orderBill/abort',
	            payload: {
		        	uuid: item.uuid,
		        	version:item.version
		        }
	      	});
    	},
        onBack(){
            dispatch({
                type: 'orderBill/backSearchForm',
            });
        }

    }

    const orderBillItemsProps={
        items:currentItem.items,
        editable:showViewPage ? false : true,
        inProgressBill:'InProgress'===currentItem.state,
        articleQpcs:articleQpcs,
        onEdit(items,index) {
            items[index]["editable"] = true;
            dispatch({
                type: 'orderBill/showCreatePage'
            })
        },
        onCancel(items,index) {
            items[index]["editable"] = false;
            dispatch({
                type: 'orderBill/showCreatePage'
            })
        },
        onSaveItems(items,index) {
            items[index]["editable"] = false;
            currentItem.items=items;
            dispatch({
                type: 'orderBill/showCreatePage'
            })
        },
        onDelete(items,index) {
            items.splice(index);
            currentItem.items=items;
            dispatch({
                type: 'orderBill/showCreatePage'
            })
        },
        onAdd(items) {
            const item=new Object();
            item.line= items?items.length+1:1;
            item.editable=true;
            if(items)
                items.push(item)
            else{
                const orderBillItems=[];
                orderBillItems.push(item);
                items=orderBillItems; 
            }
            items[item.line-1]["editable"] = true;
            currentItem.items=items;
            dispatch({
                type: 'orderBill/showEditPage',
                payload: {
                    currentItem: currentItem,
                }
            })
        },
        getArticle(items,index){
            dispatch({
                type: 'orderBill/getArticle',
                payload: {
                    currentBill:currentItem,
                    items: items,
                    index: index
                }
            });
        }
    }

    const dateModalProps={
        orderBills:bookRegBills,
        visible:modalVisible,
        onOk(orderBills){
            if(showViewPage){
                dispatch({
                    type: 'orderBill/bookReg',
                    payload: {
                      uuid: orderBills[0].uuid,
                      version: orderBills[0].version,
                      bookedDate:orderBills[0].bookedDate
                    }
                })
            }else{
                if(bookRegType==="single"){
                    dispatch({
                        type: 'orderBill/gridBookReg',
                        payload: {
                          uuid: orderBills[0].uuid,
                          version: orderBills[0].version,
                          bookedDate:orderBills[0].bookedDate
                        }
                    })
                }else{
                    dispatch({
                        type: 'orderBill/batchBookRegOrderBill',
                        payload: {
                            bookRegOrderBillEntitys: orderBills
                        }
                    })
                }
             
            }
        },
        onCancel(){
            dispatch({
                type: 'orderBill/hideModal'
            })  
        }
    }


    function  RefreshWidget(){
            if(showViewPage){
                return  (
                    <div>
                        <OrderBillView {...orderBillViewFormProps}/>
                        <OrderBillItems {...orderBillItemsProps}/>
                        <DateModal {...dateModalProps}/>
                    </div>
                )
            }else if(showCreatePage){
                return  (
                    <div>
                        <OrderBillCreateForm {...orderBillCreateProps}/>
                        <OrderBillItems {...orderBillItemsProps}/>
                    </div>
                )
            }
            else{
                return(
                        <div>
                            <OrderBillSearchForm {...orderBillSearchProps} />
                            <OrderBillSearchGrid {...orderBillListProps} />
                            <DateModal {...dateModalProps}/>
                            <WMSProgress {...batchProcessBookRegOrderBillsProps} />
                            <WMSProgress {...batchProcessCheckOrderBillsProps} />
                            <WMSProgress {...batchProcessFinishOrderBillsProps} />
                            <WMSProgress {...batchProcessAbortOrderBillsProps} />
                            <WMSProgress {...batchProcessDeleteOrderBillsProps} />
                        </div>
                        );
            }
    }

    return (
        <div className="content-inner">{RefreshWidget()}</div>
    )
}

OrderBill.propTypes = {
    orderBill: PropTypes.object,
}

function mapStateToProps({ orderBill }) {
    return {orderBill};
}

export default connect(mapStateToProps)(OrderBill);