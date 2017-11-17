import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd';

import OrderBillSearchGrid from '../../components/forward/Order/OrderBillSearchGrid';
import OrderBillSearchForm from '../../components/forward/Order/OrderBillSearchForm';
import OrderBillCreateForm from '../../components/forward/Order/OrderBillCreateForm';
import OrderBillView from '../../components/forward/Order/OrderBillView';
import OrderBillItems from '../../components/forward/Order/OrderBillItems';
import DateModal from '../../components/forward/Order/DateModal';
import SupplierSelectModal from '../../components/forward/Order/SupplierSelectModal';

import WMSProgress from '../../components/Widget/NewProgress';
import ProgressForBookReg from '../../components/forward/order/ProgressForBookReg';
function OrderBill({ location, dispatch, orderBill }) {
    const {
        list, showCreatePage, pagination, showViewPage,
        currentItem, current, articleQpcs, wrhs, suppliers,
        supplierPagination,
        batchBookRegProcessModal, bookRegOrderBillEntitys,
        batchCheckProcessModal, checkOrderBillEntitys,
        batchFinishProcessModal, finishOrderBillEntitys,
        batchAbortProcessModal, abortOrderBillEntitys,
        orderBillNext, dateModalVisible, supplierModalVisible, bookRegType,
        bookRegBills
    } = orderBill;

    const { field, keyword } = location.query;

    const orderBillListProps = {
        dataSource: list,
        pagination: pagination,
        wrhs: wrhs,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forward/order',
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
                type: 'orderBill/query',
                payload: fieldsValue
            });
        },
        onCreate() {
            dispatch({
                type: 'orderBill/onCreate',
                // payload: {
                //     currentItem: {}
                // }
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'orderBill/get',
                payload: {
                    uuid: item.uuid
                }
            });
        },
        onBookRegBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要预约的订单！", 2, '');
                return;
            };
            dispatch({
                type: 'orderBill/showDateModal',
                payload: {
                    bookRegBills: orderBills,
                    bookRegType: "group"
                }
            });
        },
        onCheckBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要预检的订单！", 2, '');
                return;
            };
            dispatch({
                type: 'orderBill/batchCheckOrderBill',
                payload: {
                    checkOrderBillEntitys: orderBills
                }
            });
        },
        onFinishBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要完成的订单！", 2, '');
                return;
            };
            dispatch({
                type: 'orderBill/batchFinishOrderBill',
                payload: {
                    finishOrderBillEntitys: orderBills
                }
            });
        },
        onAbortBatch(orderBills) {
            if (orderBills.length <= 0) {
                message.warning("请选择要作废的订单！", 2, '');
                return;
            };
            dispatch({
                type: 'orderBill/batchAbortOrderBill',
                payload: {
                    abortOrderBillEntitys: orderBills
                }
            });
        }
    };

    const orderBillSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'orderBill/query',
                payload: fieldsValue
            });
        }
    };


    const batchProcessBookRegOrderBillsProps = {
        showConfirmModal: batchBookRegProcessModal,
        records: bookRegOrderBillEntitys ? bookRegOrderBillEntitys : [],
        next: orderBillNext,
        actionText: '预约',
        entityCaption: '入库订单',
        url: '/swms/in/order/bookreg',
        canSkipState: 'PreBookReg',
        hideConfirmModal() {
            dispatch({
                type: 'orderBill/hideBookRegOrderBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'orderBill/query'
            });
        }
    };

    const batchProcessCheckOrderBillsProps = {
        showConfirmModal: batchCheckProcessModal,
        records: checkOrderBillEntitys ? checkOrderBillEntitys : [],
        next: orderBillNext,
        actionText: '预检',
        entityCaption: '入库订单',
        url: '/swms/in/order/check',
        canSkipState: 'PreChecked',
        hideConfirmModal() {
            dispatch({
                type: 'orderBill/hideCheckOrderBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'orderBill/query'
            });
        }
    };

    const batchProcessFinishOrderBillsProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishOrderBillEntitys ? finishOrderBillEntitys : [],
        next: orderBillNext,
        actionText: '完成',
        entityCaption: '入库订单',
        url: '/swms/in/order/finish',
        canSkipState: 'Finished',
        hideConfirmModal() {
            dispatch({
                type: 'orderBill/hideFinishOrderBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'orderBill/query'
            });
        }
    };

    const batchProcessAbortOrderBillsProps = {
        showConfirmModal: batchAbortProcessModal,
        records: abortOrderBillEntitys ? abortOrderBillEntitys : [],
        next: orderBillNext,
        actionText: '作废',
        entityCaption: '入库订单',
        url: '/swms/in/order/abort',
        canSkipState: 'Aborted',
        hideConfirmModal() {
            dispatch({
                type: 'orderBill/hideAbortOrderBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'orderBill/query'
            });
        }
    };

    const orderBillCreateProps = {
        item: currentItem,
        wrhs: wrhs,
        suppliers: suppliers,
        onOk(data) {
            data.items = currentItem.items;
            if (data.uuid) {
                dispatch({
                    type: 'orderBill/edit',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'orderBill/create',
                    payload: data
                });
            };
        },
        onCancel(formForm) {
            if ('View'.formForm) {
                dispatch({
                    type: 'orderBill/backViewForm'
                });
            } else {
                dispatch({
                    type: 'orderBill/backSearchForm'
                });
            };
        },
        queryWrhs() {
            dispatch({
                type: 'orderBill/queryWrhs'
            });
        },
        querySuppliers() {
            dispatch({
                type: 'orderBill/querySuppliers'
            });
        },
        getSupplier(supplierCode) {
            dispatch({
                type: 'orderBill/getSupplier',
                payload: {
                    supplierCode: supplierCode,
                    currentBill: currentItem
                }
            });
        }
    };

    const orderBillViewFormProps = {
        item: currentItem,
        onEditItem(item) {
            dispatch({
                type: 'orderBill/getForEdit',
                payload: {
                    uuid: item.uuid
                }
            });
        },
        onDeleteItem(item) {
            dispatch({
                type: 'orderBill/remove',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onBookRegItem(item) {
            bookRegBills.push(item),
                dispatch({
                    type: 'orderBill/showDateModal',
                    payload: {
                        bookRegBills: bookRegBills,
                        bookRegType: "single"
                    }
                });
        },
        onCheckItem(item) {
            dispatch({
                type: 'orderBill/gridCheck',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onFinishItem(item) {
            dispatch({
                type: 'orderBill/gridFinish',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onAbortItem(item) {
            dispatch({
                type: 'orderBill/gridAbort',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onBack() {
            dispatch({
                type: 'orderBill/query'
            });
        }
    };

    const orderBillItemsProps = {
        items: currentItem.items,
        editable: showViewPage ? false : true,
        inProgressBill: 'InProgress' === currentItem.state,
        articleQpcs: articleQpcs,
        onDelete(record, items, index) {
            // items.splice(index);
            // currentItem.items = items;
            dispatch({
                type: 'orderBill/removeItem',
                payload: {
                    orderBill: currentItem,
                    line: index + 1,
                    items: items
                }
            });
        },
        onAdd(items) {
            const item = new Object();
            item.line = items ? items.length + 1 : 1;
            if (items)
                items.push(item);
            else {
                const orderBillItems = [];
                orderBillItems.push(item);
                items = orderBillItems;
            };
            currentItem.items = items;
            dispatch({
                type: 'orderBill/showEditPage',
                payload: {
                    currentItem: currentItem
                }
            });
        },
        getArticle(items, index) {
            dispatch({
                type: 'orderBill/getArticle',
                payload: {
                    currentBill: currentItem,
                    items: items,
                    index: index
                }
            });
        },
        refreshCaseQtyAndAmount(items, line) {
            dispatch({
                type: 'orderBill/refreshCaseQtyAndAmount',
                payload: {
                    orderBill: currentItem,
                    line: line,
                    items: items
                }
            });
        }
    };

    const dateModalProps = {
        orderBills: bookRegBills,
        visible: dateModalVisible,
        onOk(orderBills) {
            if (showViewPage) {
                dispatch({
                    type: 'orderBill/bookReg',
                    payload: {
                        uuid: orderBills[0].uuid,
                        version: orderBills[0].version,
                        bookedDate: orderBills[0].bookedDate
                    }
                });
            } else {
                if (bookRegType === "single") {
                    dispatch({
                        type: 'orderBill/gridBookReg',
                        payload: {
                            uuid: orderBills[0].uuid,
                            version: orderBills[0].version,
                            bookedDate: orderBills[0].bookedDate
                        }
                    });
                } else {
                    dispatch({
                        type: 'orderBill/batchBookRegOrderBill',
                        payload: {
                            bookRegOrderBillEntitys: orderBills
                        }
                    });
                };
            };
        },
        onCancel() {
            dispatch({
                type: 'orderBill/hideDateModal'
            });
        }
    };

    const supplierModalProps = {
        visible: supplierModalVisible,
        suppliers: suppliers,
        supplierPagination: supplierPagination,
        onOk(suppliers) {
            currentItem.supplier = suppliers[0];
            dispatch({
                type: 'orderBill/hideSupplierModal'
            });
        },
        onCancel() {
            dispatch({
                type: 'orderBill/hideSupplierModal'
            });
        }
    };

    const OrderBillSearchGridGen = () => <OrderBillSearchGrid {...orderBillListProps} />;


    function RefreshWidget() {
        if (showViewPage) {
            return (
                <div>
                    <OrderBillView {...orderBillViewFormProps} />
                    <DateModal {...dateModalProps} />
                </div>
            );
        } else if (showCreatePage) {
            return (
                <div>
                    <OrderBillCreateForm {...orderBillCreateProps} />
                    <OrderBillItems {...orderBillItemsProps} />
                    <SupplierSelectModal {...supplierModalProps} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <OrderBillSearchForm {...orderBillSearchProps} />
                    <OrderBillSearchGridGen />
                    <DateModal {...dateModalProps} />
                    <ProgressForBookReg {...batchProcessBookRegOrderBillsProps} />
                    <WMSProgress {...batchProcessCheckOrderBillsProps} />
                    <WMSProgress {...batchProcessFinishOrderBillsProps} />
                    <WMSProgress {...batchProcessAbortOrderBillsProps} />
                </div>
            );
        };
    };

    return (
        <div className="content-inner">{RefreshWidget()}</div>
    );
};

OrderBill.propTypes = {
    orderBill: PropTypes.object
};

function mapStateToProps({ orderBill }) {
    return { orderBill };
};

export default connect(mapStateToProps)(OrderBill);