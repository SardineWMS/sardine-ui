import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import CustomerGrid from '../../components/BasicInfo/Customer/CustomerGrid';
import CustomerForm from '../../components/BasicInfo/Customer/CustomerForm';
import CustomerAdd from '../../components/BasicInfo/Customer/CustomerAdd';
import CustomerView from '../../components/BasicInfo/Customer/CustomerView';
import WMSProgress from '../../components/Widget/WMSProgress';
function Customer({location, dispatch, customer}) {
    const {
        loading, list, showCreatePage, pagination, showViewPage, currentItem, current,
        showEditPage, searchExpand, batchDeleteProcessModal, deleteCustomerEntitys,
        customerNext,
        batchRecoverProcessModal, recoverCustomerEntitys,
    } = customer;

    const {field, keyword} = location.query


    const customerListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/wms/basicInfo/customer',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    token: localStorage.getItem("token"),
                    sort: sorter.field,
                    sortDirection: sorter.order,
                }
            }))
        },
        onSearch() {
            dispatch({
                type: 'customer/query',
                payload: {

                }
            })
        },
        onCreate() {
            dispatch({
                type: 'customer/createSuccess',
            })
        },
        onViewItem(item) {
            dispatch({
                type: 'customer/onViewItem',
                payload: {
                    currentItem: item,
                }
            })
        },
        onEdit(item) {
            dispatch({
                type: 'customer/gridEditSuccess',
                payload: { currentItem: item, },
            })
        },
        onDelete(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/gridRemove',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token,
                },
            })
        },
        onRecover(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/gridRecover',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token,
                },
            })
        },
        onRemoveBatch(customers) {
            dispatch({
                type: 'customer/batchDeleteCustomer',
                payload: {
                    deleteCustomerEntitys: customers
                }
            })
        },
        onRecoverBatch(customers) {
            dispatch({
                type: 'customer/batchRecoverCustomer',
                payload: {
                    recoverCustomerEntitys: customers
                }
            })
        },
    }

    const customerSearchProps = {
        field,
        keyword,
        searchExpand,
        onSearch(fieldsValue) {
            dispatch({
                type: 'customer/query',
                payload: fieldsValue,
            })
        },
        onToggle(expand) {
            dispatch({
                type: 'customer/toggle',
                payload: {
                    searchExpand: !expand,
                }
            })
        }
    }

    const customerAddProps = {
        item: currentItem,
        onCancel(data) {
            if (!data) {
                dispatch({
                    type: 'customer/cancelShoWItemSuccess',
                })
            } else {
                if (showViewPage) {
                    dispatch({
                        type: 'customer/cancelShoWItemSuccess',
                    })
                } else {
                    dispatch({
                        type: 'customer/cancelSuccess',
                        payload: {
                            currentItem: {},
                        }
                    })
                }
            }
        },

        handleSave(data) {
            let token = localStorage.getItem("token");
            data.token = token;
            if (data.uuid) {
                dispatch({
                    type: 'customer/update',
                    payload: data,
                })
            } else {
                dispatch({
                    type: 'customer/create',
                    payload: data,
                })
            }
        }
    }

    const customerViewProps = {
        item: currentItem,
        onBack(data) {
            dispatch({
                type: 'customer/backSuccess',
                payload: {
                    currentItem: {},
                }
            })
        },
        backAndRefreshPage() { },
        onRemove(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/remove',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token,
                },
            })
        },
        onRecover(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/recover',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token,
                },
            })
        },

        showEdit(item) {
            dispatch({
                type: 'customer/itemEditSuccess',
                payload: item,
            })
        },

    }

    const batchProcessDeleteCustomerProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteCustomerEntitys ? deleteCustomerEntitys : [],
        next: customerNext,
        actionText: '删除',
        entityCaption: '客户',
        batchProcess(entity) {
            dispatch({
                type: 'customer/gridRemove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            })
        },
        hideConfirmModal() {
            dispatch({
                type: 'customer/hideDeleteCustomerModal',
            })
        },
        refreshGrid() {
            dispatch({
                type: 'customer/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            })
        }
    }

    const batchProcessRecoverCustomerProps = {
        showConfirmModal: batchRecoverProcessModal,
        records: recoverCustomerEntitys ? recoverCustomerEntitys : [],
        next: customerNext,
        actionText: '恢复',
        entityCaption: '客户',
        batchProcess(entity) {
            dispatch({
                type: 'customer/gridRecover',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            })
        },
        hideConfirmModal() {
            dispatch({
                type: 'customer/hideRecoverCustomerModal',
            })
        },
        refreshGrid() {
            dispatch({
                type: 'customer/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            })
        }
    }

    const CustomerGridGen = () => <CustomerGrid {...customerListProps} />;
    const CustomerAddGen = () => <CustomerAdd {...customerAddProps} />;

    function RefreshWidget() {
        if (showCreatePage) {
            return (
                <CustomerAddGen />
            )
        } else {
            if (showViewPage) {
                if (showEditPage) {
                    return (<CustomerAddGen />)
                } else {
                    return (
                        <div><CustomerView {...customerViewProps}></CustomerView></div>
                    )
                }
            }
            else {
                if (showEditPage) {
                    return (<CustomerAddGen />)
                }
                else {
                    return (
                        <div>
                            <CustomerForm {...customerSearchProps} />
                            <CustomerGridGen />
                            <WMSProgress {...batchProcessDeleteCustomerProps} />
                            <WMSProgress {...batchProcessRecoverCustomerProps} />
                        </div>
                    )
                }
            }
        }
    }

    return (
        <div className="content-inner">{RefreshWidget()}</div>
    )
}

Customer.propTypes = {
    customer: PropTypes.object,
}

function mapStateToProps({customer}) {
    return { customer }
}

export default connect(mapStateToProps)(Customer);