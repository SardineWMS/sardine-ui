import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd';

import CustomerGrid from '../../components/basicinfo/Customer/CustomerGrid';
import CustomerForm from '../../components/basicinfo/Customer/CustomerForm';
import CustomerAdd from '../../components/basicinfo/Customer/CustomerAdd';
import CustomerView from '../../components/basicinfo/Customer/CustomerView';
import WMSProgress from '../../components/Widget/NewProgress';
function Customer({ location, dispatch, customer }) {
    const {
        list, showCreatePage, pagination, showViewPage, currentItem, current,
        showEditPage, searchExpand, batchOfflineProcessModal, offlineCustomerEntitys,
        customerNext,
        batchOnlineProcessModal, onlineCustomerEntitys
    } = customer;

    const { field, keyword } = location.query


    const customerListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/basicInfo/customer',
                query: {
                    ...location.query,
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'customer/createSuccess',
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'customer/onViewItem',
                payload: {
                    currentItem: item
                }
            });
        },
        onEdit(item) {
            dispatch({
                type: 'customer/gridEditSuccess',
                payload: { currentItem: item }
            });
        },
        onOffline(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/gridOffline',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token
                }
            });
        },
        onOnline(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/gridOnline',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token
                }
            });
        },
        onOfflineBatch(customers) {
            if (customers.length <= 0) {
                message.warning("请选择要停用的客户！", 2, '');//延时2秒
                return;
            };
            dispatch({
                type: 'customer/batchOfflineCustomer',
                payload: {
                    offlineCustomerEntitys: customers
                }
            });
        },
        onOnlineBatch(customers) {
            if (customers.length <= 0) {
                message.warning("请选择要启用的客户！", 2, '');
                return;
            };
            dispatch({
                type: 'customer/batchOnlineCustomer',
                payload: {
                    onlineCustomerEntitys: customers
                }
            });
        },
    };

    const customerSearchProps = {
        field,
        keyword,
        searchExpand,
        onSearch(fieldsValue) {
            dispatch(routerRedux.push({
                pathname: '/basicInfo/customer',
                query: {
                    ...fieldsValue
                }
            }));
        }
    };

    const customerAddProps = {
        item: currentItem,
        onCancel(data) {
            if (!data) {
                dispatch({
                    type: 'customer/cancelShoWItemSuccess'
                });
            } else {
                if (showViewPage) {
                    dispatch({
                        type: 'customer/cancelShoWItemSuccess'
                    });
                } else {
                    dispatch({
                        type: 'customer/cancelSuccess',
                        payload: {
                            currentItem: {}
                        }
                    });
                };
            };
        },

        handleSave(data) {
            if (data.uuid) {
                dispatch({
                    type: 'customer/update',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'customer/create',
                    payload: data
                });
            };
        }
    };

    const customerViewProps = {
        item: currentItem,
        onBack(data) {
            dispatch({
                type: 'customer/query',
                payload: {
                    currentItem: {}
                }
            });
        },
        backAndRefreshPage() { },
        onOnline(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/online',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token
                }
            });
        },
        onOffline(customer) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'customer/offline',
                payload: {
                    uuid: customer.uuid,
                    version: customer.version,
                    token: token
                }
            });
        },

        showEdit(item) {
            dispatch({
                type: 'customer/itemEditSuccess',
                payload: item
            });
        },
    };

    const batchProcessOfflineCustomerProps = {
        showConfirmModal: batchOfflineProcessModal,
        records: offlineCustomerEntitys ? offlineCustomerEntitys : [],
        next: customerNext,
        actionText: '停用',
        entityCaption: '客户',
        url: '/swms/basicinfo/customer/offline',
        canSkipState: 'offline',
        hideConfirmModal() {
            dispatch({
                type: 'customer/hideOfflineCustomerModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'customer/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessOnlineCustomerProps = {
        showConfirmModal: batchOnlineProcessModal,
        records: onlineCustomerEntitys ? onlineCustomerEntitys : [],
        next: customerNext,
        actionText: '启用',
        entityCaption: '客户',
        url: '/swms/basicinfo/customer/online',
        canSkipState: 'online',
        hideConfirmModal() {
            dispatch({
                type: 'customer/hideOnlineCustomerModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'customer/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };
    const CustomerAddGen = () => <CustomerAdd {...customerAddProps} />;
    const CustomerGridGen = () => <CustomerGrid {...customerListProps} />;

    function RefreshWidget() {
        if (showCreatePage) {
            return (
                <CustomerAddGen />
            );
        } else {
            if (showViewPage) {
                if (showEditPage) {
                    return (<CustomerAddGen />);
                } else {
                    return (
                        <div><CustomerView {...customerViewProps}></CustomerView></div>
                    );
                };
            }
            else {
                if (showEditPage) {
                    return (<CustomerAddGen />);
                }
                else {
                    return (
                        <div>
                            <CustomerForm {...customerSearchProps} />
                            <CustomerGridGen />
                            <WMSProgress {...batchProcessOfflineCustomerProps} />
                            <WMSProgress {...batchProcessOnlineCustomerProps} />
                        </div>
                    );
                };
            };
        };
    };

    return (
        <div className="content-inner">{RefreshWidget()}</div>
    );
};

Customer.propTypes = {
    customer: PropTypes.object
};

function mapStateToProps({ customer }) {
    return {
        customer
    };
};

export default connect(mapStateToProps)(Customer);