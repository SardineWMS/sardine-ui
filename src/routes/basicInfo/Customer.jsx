import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import CustomerGrid from '../../components/BasicInfo/Customer/CustomerGrid';
import CustomerForm from '../../components/BasicInfo/Customer/CustomerForm';
import CustomerAdd from '../../components/BasicInfo/Customer/CustomerAdd';
import CustomerView from '../../components/BasicInfo/Customer/CustomerView';
function Customer({location, dispatch, customer}) {
    const {
        loading, list, showCreatePage, pagination, showViewPage, currentItem, current,
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
                    pageSize: page.pageSize
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
        }
    }

    const customerSearchProps = {

    }

    const customerAddProps = {
        onCancel() {
            dispatch({
                type: 'customer/cancelSuccess',

            })
        },
    }

    const customerViewProps = {
        item: currentItem,
    }

    function refreshWidget() {
        if (showCreatePage) {
            return (
                <div><CustomerAdd {...customerAddProps} />
                </div>
            )
        } else {
            if (showViewPage) {
                return (
                    <div><CustomerView {...customerViewProps}></CustomerView></div>
                )
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