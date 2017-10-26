import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd';

import AcceptanceBillSearchForm from '../../components/forward/acceptance/AcceptanceBillSearchForm';
import AcceptanceBillSearchGrid from '../../components/forward/acceptance/AcceptanceBillSearchGrid';
import AcceptanceBillCreateForm from '../../components/forward/acceptance/AcceptanceBillCreateForm';
import AcceptanceBillViewForm from '../../components/forward/acceptance/AcceptanceBillViewForm';
import CustomerSelectModal from '../../components/forward/acceptance/CustomerSelectModal';
import AcceptanceBillItemForm from '../../components/forward/acceptance/AcceptanceBillItemForm';
import WMSProgress from '../../components/Widget/WMSProgress';

function AcceptanceBill({ location, dispatch, acceptanceBill }){
   const {
        list,pagination, showPage,
        currentAcceptanceBill, current,
        batchApproveProcessModal,approveAcceptanceBillEntitys,
        batchAlcProcessModal,alcAcceptanceBillEntitys,
        batchAbortProcessModal,abortAcceptanceBillEntitys,
        acceptanceBillNext,wrhs,customers,customerModalVisible,
        customerPagination,stocks,customer
    } = acceptanceBill;

    const { field, keyword } = location.query;
    const acceptanceBillListProps={
    	dataSource: list,
        pagination: pagination,
        wrhs: wrhs,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forward/acceptanceBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    sortDirection: sorter.order
                }
            }));
        },
        onSearch(fieldsValue) {
            dispatch({
                type: 'acceptanceBill/query',
                payload: fieldsValue
            });
        },
        onCreate() {
            dispatch({
                type: 'acceptanceBill/onCreate'
            });
        },
        onViewAcceptanceBill(acceptanceBill) {
            dispatch({
                type: 'acceptanceBill/get',
                payload: {
                    uuid:acceptanceBill.uuid
                }
            });
        },
        onAbortBatch(acceptanceBills) {
            if (acceptanceBills.length <= 0) {
                message.warning("请选择要作废的领用单！", 2, '');
                return;
            };
            dispatch({
                type: 'acceptanceBill/batchAbortAcceptanceBill',
                payload: {
                    abortAcceptanceBillEntitys: acceptanceBills
                }
            });
        },
        onApproveBatch(acceptanceBills) {
            if (acceptanceBills.length <= 0) {
                message.warning("请选择要批准的领用单！", 2, '');
                return;
            };
            dispatch({
                type: 'acceptanceBill/batchApproveAcceptanceBill',
                payload: {
                    approveAcceptanceBillEntitys: acceptanceBills
                }
            });
        },
        onAlcBatch(acceptanceBills) {
            if (acceptanceBills.length <= 0) {
                message.warning("请选择要配货的领用单！", 2, '');
                return;
            };
            dispatch({
                type: 'acceptanceBill/batchAlcAcceptanceBill',
                payload: {
                    alcAcceptanceBillEntitys: acceptanceBills
                }
            });
        }
    };

    const acceptanceBillSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'acceptanceBill/query',
                payload: fieldsValue
            });
        }
    };

    const acceptanceBillCreateProps={
        acceptanceBill:currentAcceptanceBill,
        wrhs:wrhs,
        customer:customer,
        onSave(acceptanceBill){
            acceptanceBill.items=currentAcceptanceBill.items;
            if(acceptanceBill.uuid){
                dispatch({
                    type: 'acceptanceBill/editItem',
                    payload: acceptanceBill
                });
            }else{
                dispatch({
                    type: 'acceptanceBill/create',
                    payload: acceptanceBill
                });
            };
        },
        onCancel(){
            dispatch({
                type: 'acceptanceBill/backSearchForm'
            });
        },
        getCustomer(customerCode){
            dispatch({
                type: 'acceptanceBill/getCustomer',
                payload: {
                    customerCode:customerCode
                }
            }); 
        },
        queryCustomers(){
            dispatch({
                type: 'acceptanceBill/queryCustomers'
            }); 
        },
        queryWrhs(){
            dispatch({
                type: 'acceptanceBill/queryWrhs'
            }); 
        }
    };

    const customerModalProps={
        visible:customerModalVisible,
        customers: customers,
        customerPagination: customerPagination,
        onOk(customers){
            dispatch({
                type: 'acceptanceBill/selectCustomer',
                payload: {
                    customer: customers[0]
                }
            });  
        },
        onCancel(){
            dispatch({
                type: 'acceptanceBill/hideCustomerModal'
            });  
        }
    };

    let items=[];
    if(currentAcceptanceBill && currentAcceptanceBill.items)
        items=currentAcceptanceBill.items;
    else
    {
        const item=new Object();
        item.line=1;
        items.push(item);
        currentAcceptanceBill.items=items;
    };
    const acceptanceBillItemProps={ 
        acceptanceBillItems:items,
        stocks:stocks,
        editable:showPage==="view"? false:true,
        inAlc:currentAcceptanceBill.state==="InAlc"?true:(currentAcceptanceBill.state==="Finished"?true:false),
        onAdd(acceptanceBillItems){
            const acceptanceBillItem=new Object();
            acceptanceBillItem.line=acceptanceBillItems.length+1;
            acceptanceBillItems.push(acceptanceBillItem);
            acceptanceBill.items=acceptanceBillItems;
            dispatch({
                type: 'acceptanceBill/showEditPage',
                payload: {
                    acceptanceBill: acceptanceBill
                }
            });
        },
        onDelete(index){
            currentAcceptanceBill.items.splice(index);
            dispatch({
                type: 'acceptanceBill/refreshCaseQtyAndAmount',
                payload: {
                    acceptanceBill:currentAcceptanceBill,
                    line: index+1
                }
            }); 
        },
        queryStocks(articleCode,index){
            dispatch({
                type: 'acceptanceBill/queryStocks',
                payload: {
                    articleCode:articleCode,
                    index:index,
                    acceptanceBill:currentAcceptanceBill
                }
            });
        },
        refreshStockInfo(currentAcceptanceBillItem){
            currentAcceptanceBill.items[currentAcceptanceBillItem.line-1]=currentAcceptanceBillItem;
            dispatch({
                type: 'acceptanceBill/showEditPage',
                payload: currentAcceptanceBill
            });
        },
        refreshCaseQtyAndAmount(currentAcceptanceBillItem){
            currentAcceptanceBill.items[currentAcceptanceBillItem.line-1]=currentAcceptanceBillItem;
            dispatch({
                type: 'acceptanceBill/refreshCaseQtyAndAmount',
                payload: {
                    acceptanceBill:currentAcceptanceBill,
                    line:currentAcceptanceBillItem.line
                }
            });
        }
    };

    const acceptanceBillViewFormProps={
        acceptanceBill:currentAcceptanceBill,
        onEdit(acceptanceBill){
            dispatch({
                type: 'acceptanceBill/getForEdit',
                payload: {
                    uuid:acceptanceBill.uuid
                }
            });
        },
        onApprove(acceptanceBill){
            dispatch({
                type: 'acceptanceBill/approveItem',
                payload: {
                    uuid: acceptanceBill.uuid,
                    version:acceptanceBill.version
                }
            });
        },
         onBeginAlc(acceptanceBill){
            dispatch({
                type: 'acceptanceBill/beginAlcItem',
                payload: {
                    uuid: acceptanceBill.uuid,
                    version:acceptanceBill.version
                }
            });
        },
        onAbort(acceptanceBill){
            dispatch({
                type: 'acceptanceBill/abortItem',
                payload: {
                    uuid: acceptanceBill.uuid,
                    version:acceptanceBill.version
                }
            });
        },
        onBack(){
            dispatch({
                type: 'acceptanceBill/backSearchForm',
            });
        }
    };


    const batchApproveAcceptanceBillsProps = {
        showConfirmModal: batchApproveProcessModal,
        records: approveAcceptanceBillEntitys ? approveAcceptanceBillEntitys : [],
        next: acceptanceBillNext,
        actionText: '批准',
        entityCaption: '领用单',
        batchProcess(acceptanceBill) {
          dispatch({
            type: 'acceptanceBill/approveGrid',
            payload: {
              uuid: acceptanceBill.uuid,
              version: acceptanceBill.version
            }
          });
        },
        hideConfirmModal() {
          dispatch({
            type: 'acceptanceBill/hideApproveAcceptanceBillModal'
          })
        },
        refreshGrid() {
          dispatch({
            type: 'acceptanceBill/query'
          });
        }
    };

    const batchBeginAlcAcceptanceBillsProps = {
        showConfirmModal: batchAlcProcessModal,
        records: alcAcceptanceBillEntitys ? alcAcceptanceBillEntitys : [],
        next: acceptanceBillNext,
        actionText: '配货',
        entityCaption: '领用单',
        batchProcess(acceptanceBill) {
          dispatch({
            type: 'acceptanceBill/beginAlcGrid',
            payload: {
              uuid: acceptanceBill.uuid,
              version: acceptanceBill.version
            }
          });
        },
        hideConfirmModal() {
          dispatch({
            type: 'acceptanceBill/hideAlcAcceptanceBillModal'
          });
        },
        refreshGrid() {
          dispatch({
            type: 'acceptanceBill/query'
          });
        }
    };

    const batchAbortAcceptanceBillsProps = {
        showConfirmModal: batchAbortProcessModal,
        records: abortAcceptanceBillEntitys ? abortAcceptanceBillEntitys : [],
        next: acceptanceBillNext,
        actionText: '作废',
        entityCaption: '领用单',
        batchProcess(acceptanceBill) {
          dispatch({
            type: 'acceptanceBill/abortGrid',
            payload: {
              uuid: acceptanceBill.uuid,
              version: acceptanceBill.version
            }
          });
        },
        hideConfirmModal() {
          dispatch({
            type: 'acceptanceBill/hideAbortAcceptanceBillModal'
          });
        },
        refreshGrid() {
          dispatch({
            type: 'acceptanceBill/query'
          });
        }
    };



    return (
        <div className="content-inner">
        {
            (() => {
                switch (showPage) {
                    case 'create':
                     return (
                         <div>
                            <AcceptanceBillCreateForm {...acceptanceBillCreateProps} />
                            <CustomerSelectModal {...customerModalProps} />
                            <AcceptanceBillItemForm {...acceptanceBillItemProps}/>
                         </div>
                     )
                     case 'view':
                     return (
                         <div>
                            <AcceptanceBillViewForm {...acceptanceBillViewFormProps} /> 
                            <AcceptanceBillItemForm {...acceptanceBillItemProps}/>
                         </div>
                     )
                    default :
                          return (
                                <div>
                                    <AcceptanceBillSearchForm {...acceptanceBillSearchProps} />
                                    <AcceptanceBillSearchGrid {...acceptanceBillListProps} />
                                    <WMSProgress {...batchBeginAlcAcceptanceBillsProps} />
                                    <WMSProgress {...batchAbortAcceptanceBillsProps} />
                                </div>
                            )
                }
            })()
        }
         
        </div>
    );
};

AcceptanceBill.propTypes = {
    AcceptanceBill: PropTypes.object
};

function mapStateToProps({ acceptanceBill }) {
    return {acceptanceBill};
};

export default connect(mapStateToProps)(AcceptanceBill);