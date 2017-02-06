import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import CustomerGrid from '../../components/BasicInfo/Customer/CustomerGrid';
import CustomerForm from '../../components/BasicInfo/Customer/CustomerForm';
import CustomerAdd from '../../components/BasicInfo/Customer/CustomerAdd';
import CustomerView from '../../components/BasicInfo/Customer/CustomerView';
import CustomerEdit from '../../components/BasicInfo/Customer/CustomerEdit';
function Customer({location, dispatch, customer}) {
    const {
        loading, list, showCreatePage, pagination, showViewPage, currentItem, current,
        showEditPage, searchExpand,
    } = customer;

    const {field, keyword} = location.query


    const customerListProps = {
        current: current,
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            dispatch(routerRedux.push({
                pathname: '/wms/basicInfo/customer',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    token: localStorage.getItem("token")
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
                type: 'customer/editSuccess',
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
            for (const customer of customers) {
                let token = localStorage.getItem("token");
                dispatch({
                    type: 'customer/gridRemove',
                    payload: {
                        uuid: customer.uuid,
                        version: customer.version,
                        token: token,
                    },
                })
            }
        },
        onRecoverBatch(customers) {
            console.dir(customers);
            for (const customer of customers) {
                let token = localStorage.getItem("token");
                dispatch({
                    type: 'customer/gridRecover',
                    payload: {
                        uuid: customer.uuid,
                        version: customer.version,
                        token: token,
                    },
                })
            }
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
        onCancel() {
            dispatch({
                type: 'customer/cancelSuccess',

            })
        },
        handleSave(data) {
            let token = localStorage.getItem("token");
            data.token = token;
            dispatch({
                type: 'customer/create',
                payload: data,
            })
        }
    }

    const customerViewProps = {
        item: currentItem,
        onBack(data) {
            dispatch({
                type: 'customer/backSuccess',
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
                type: 'customer/editSuccess',
                payload: item,
            })
        },

    }

    const customerEditProps = {
        item: currentItem,
        onCancel() {
            dispatch({
                type: 'customer/cancelShoWItemSuccess',

            })
        },
        handleSave(data) {
            let token = localStorage.getItem("token");
            data.token = token;
            dispatch({
                type: 'customer/update',
                payload: data,
            })
        }
    }

    function refreshWidget() {
        if (showCreatePage) {
            return (
                <div><CustomerAdd {...customerAddProps} />
                </div>
            )
        } else {
            if (showViewPage) {
                if (showEditPage) {
                    return (<div><CustomerEdit {...customerEditProps}></CustomerEdit></div>)
                } else {
                    return (
                        <div><CustomerView {...customerViewProps}></CustomerView></div>
                    )
                }
            }
            else {
                if (showEditPage) {
                    return (<div><CustomerEdit {...customerEditProps}></CustomerEdit></div>)
                }
                else {
                    return (
                        <div>
                            <CustomerForm {...customerSearchProps} />
                            <CustomerGrid {...customerListProps} />
                        </div>
                    )
                }
            }
        }
    }

    return (
        <div>{refreshWidget()}</div>
    )
}

Customer.propTypes = {
    customer: PropTypes.object,
}

function mapStateToProps({customer}) {
    return { customer }
}

export default connect(mapStateToProps)(Customer)