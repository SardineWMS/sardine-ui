import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

import ReceiveGrid from '../../components/forward/receive/ReceiveBillGrid.jsx';
import ReceiveCreate from '../../components/forward/receive/ReceiveBillAdd.jsx';
import OrderBillSelectModal from '../../components/forward/receive/OrderBillSelectModal.jsx';
import ReceiveBillItemGrid from '../../components/forward/receive/ReceiveBillItemGrid.jsx';
import ReceiveBillView from '../../components/forward/receive/ReceiveBillView.jsx';
import ReceiveBillSearch from '../../components/forward/receive/ReceiveBillSearchForm.jsx';
import { removeByValue } from '../../utils/ArrayUtils.js';
import WMSProgress from '../../components/Widget/WMSProgress';

function Receive({ location, dispatch, receive }) {
    const {
        list, showCreatePage, pagination, showViewPage, currentItem, showOrderBillSelectModal, canReceiveOrderBillLists,
        orderBillPagination,
        orderBillNo,
        orderItems,
        supplierMsg,
        wrhMsg,
        deleteReceiveBillEntitys,
        finishReceiveBillEntitys,
        batchDeleteProcessModal,
        batchFinishProcessModal,
        receiveBillNext,
        treeData,
        qpcStrTreeData,
        article_qpcStr,
        receiveStorageBin,
        orderBillItemArticles,
    } = receive;

    const receiveListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forward/receiveBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onSearch() {
            dispatch({
                type: 'receive/query',
                payload: {

                }
            });
        },
        onCreate() {
            dispatch({
                type: 'receive/createSuccess'
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'receive/getReceiveBillByBillNumber',
                payload: {
                    billNumber: item.billNumber
                }
            });
        },
        onDelete(receiveBill) {
            dispatch({
                type: 'receive/gridRemove',
                payload: {
                    uuid: receiveBill.uuid,
                    version: receiveBill.version
                }
            });
        },
        onFinish(receiveBill) {
            dispatch({
                type: 'receive/gridAudit',
                payload: {
                    uuid: receiveBill.uuid,
                    version: receiveBill.version
                }
            });
        },
        onRemoveBatch(receiveBills) {
            if (receiveBills.length <= 0) {
                message.warning("请选择要删除的收货单！", 2, '');
                return;
            };
            dispatch({
                type: 'receive/batchDeleteReceiveBill',
                payload: {
                    deleteReceiveBillEntitys: receiveBills
                }
            });
        },
        onFinishBatch(receiveBills) {
            if (receiveBills.length <= 0) {
                message.error("请选择要审核的收货单！", 2, '');
                return;
            };
            dispatch({
                type: 'receive/batchAuditReceiveBill',
                payload: {
                    finishReceiveBillEntitys: receiveBills
                }
            });
        },
        onEdit(item) {
            dispatch({
                type: 'receive/showEditPage',
                payload: {
                    billNumber: item.billNumber
                }
            });
        },
        onViewOrderBill(item) {
            dispatch({
                type: 'receive/toViewOrderBill',
                payload: item
            });
        }
    };

    const receiveAddProps = {
        item: currentItem,
        showOrderBillSelectModal: showOrderBillSelectModal,
        orderBillNo: orderBillNo,
        orderItems: orderItems,
        supplierMsg: supplierMsg,
        wrhMsg: wrhMsg,
        onCancel(data) {
            dispatch({
                type: 'receive/query',
                payload: {
                    currentItem: {}
                }
            });
        },
        onOrderBillSelect() {
            dispatch({
                type: 'receive/onOrderBillSelect',
                payload: {}
            });
        },
        onEnterOrderBill(data) {
            dispatch({
                type: 'receive/getOrderBillByBillNo',
                payload: {
                    billNumber: data.orderBillNo
                }
            });
        },
        handleSave(data) {
            data.items = orderItems;
            data.totalAmount = currentItem.totalAmount;
            for (var item of data.items) {
                item.qty = item.receiveQty;
            };
            data.receiver = new Object();
            data.receiver.uuid = localStorage.getItem("loginId");
            data.receiver.code = localStorage.getItem("loginCode");
            data.receiver.name = localStorage.getItem("loginName");
            data.method = "ManualBill";
            if (data.items.length > 1) {
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].article == null) {
                        message.error("第" + parseInt(i + 1) + "行明细中，商品不能为空", 2, '');
                        return;
                    };
                    if (data.items[i].receiveQty == null) {
                        message.error("第" + parseInt(i + 1) + "行明细中，收货数量不能为空", 2, '');
                        return;
                    };
                    if (data.items[i].produceDate == null) {
                        message.error("第" + parseInt(i + 1) + "行明细中，生产日期不能为空", 2, '');
                        return;
                    };
                    for (let j = i + 1; j < data.items.length; j++) {
                        if (data.items[j].article == null) {
                            message.error("第" + parseInt(j + 1) + "行明细中，商品不能为空", 2, '');
                            return;
                        };
                        if (data.items[i].article.code == data.items[j].article.code && data.items[i].qpcStr == data.items[j].qpcStr) {
                            message.warning("商品明细中商品：" + data.items[i].article.code + "规格：" + data.items[j].qpcStr + "不能重复", 2, '');
                            return;
                        };
                    };
                };
            };
            if (!data.uuid) {
                dispatch({
                    type: 'receive/saveReceiveBill',
                    payload: data
                });
            } else {
                if (data.type == '订单')
                    dispatch({
                        type: 'receive/saveReceiveBill',
                        payload: data
                    });
                else
                    dispatch({
                        type: 'receive/updateReceiveBill',
                        payload: data
                    });
            };
        }
    };

    const orderBillSelectModalProps = {
        visible: showOrderBillSelectModal,
        item: {},
        orderBillLists: canReceiveOrderBillLists,
        orderBillorderBillPagination: orderBillPagination,
        onOk(data) {
            dispatch({
                type: 'receive/selectOderBill',
                payload: { uuid: data[0].uuid }
            });
        },
        onCancel() {
            dispatch({
                type: 'receive/hideOrderBillSelectModal'
            });
        }
    };

    const orderBillItemGridProps = {
        dataSource: orderItems,
        treeData,
        article_qpcStr,
        onEditItem(record) {
            record.editable = true;
            dispatch({
                type: 'receive/orderBillSelectSuccess'
            });
        },
        onCancelEdit(record) {
            record.editable = false;
            if (!record.uuid) {
                removeByValue(orderItems, record);
                dispatch({
                    type: 'receive/queryOrderBillItem',
                    payload: orderItems
                });
            }
            else {
                dispatch({
                    type: 'receive/orderBillSelectSuccess',
                    payload: record
                });
            };
        },
        onAddItem() {
            dispatch({
                type: 'receive/addReceiveArticle',
                payload: orderItems
            });
        },
        onSave(record) {
            record.editable = false;
            let i = 0;
            for (var orderItem of orderItems) {
                if (orderItem.uuid === record.uuid) {
                    removeByValue(orderItems, orderItem);
                    orderItems.push(record);
                    i++;
                    break;
                };
            };
            if (i !== 1) {
                orderItems.push(record);
            };
            dispatch({
                type: 'receive/orderBillSelectSuccess',
                payload: orderItems
            });
        },

        calculateValidDate(record, list) {
            dispatch({
                type: 'receive/calculateValidDate',
                payload: {
                    record, list
                }
            });
        },

        calculateCaseQtyStr(record, list) {
            dispatch({
                type: 'receive/calculateCaseQtyStr',
                payload: {
                    record, list, currentItem
                }
            });
        },

        onRemoveItem(data) {
            dispatch({
                type: 'receive/removeItemLists',
                payload: {
                    data, orderItems, orderBillItemArticles, currentItem
                }
            });
        },

        selectArticle(record, array) {
            dispatch({
                type: 'receive/selectArticle',
                payload: {
                    record, array: orderItems, article_qpcStr, orderBillItemArticles
                }
            });
        },

        selectQpcStr(record, array) {
            dispatch({
                type: 'receive/selectQpcStr',
                payload: {
                    record, array, orderBillItemArticles, currentItem
                }
            });
        }
    };

    const receiveViewProps = {
        item: currentItem,
        onEdit(item) {
            dispatch({
                type: 'receive/showEditPage',
                payload: {
                    billNumber: item.billNumber
                }
            });
        },
        onDelete(receiveBill) {
            dispatch({
                type: 'receive/gridRemove',
                payload: {
                    uuid: receiveBill.uuid,
                    version: receiveBill.version
                }
            });
        },
        onFinish(receiveBill) {
            dispatch({
                type: 'receive/gridAudit',
                payload: {
                    uuid: receiveBill.uuid,
                    version: receiveBill.version
                }
            });
        }
    };

    const receiveBillSearchProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'receive/query',
                payload: fieldsValue
            });
        }
    };

    const batchProcessDeleteReceiveBillProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteReceiveBillEntitys ? deleteReceiveBillEntitys : [],
        next: receiveBillNext,
        actionText: '删除',
        entityCaption: '收货单',
        batchProcess(entity) {
            dispatch({
                type: 'receive/gridRemove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'receive/hideDeleteReceiveBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'receive/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessFinishReceiveBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishReceiveBillEntitys ? finishReceiveBillEntitys : [],
        next: receiveBillNext,
        actionText: '完成',
        entityCaption: '收货单',
        batchProcess(entity) {
            dispatch({
                type: 'receive/gridAudit',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'receive/hideFinishReceiveBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'receive/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };


    const OrderBillselectModalGen = () => <OrderBillSelectModal {...orderBillSelectModalProps} />;

    const ReceiveBillAddGen = () => <ReceiveCreate {...receiveAddProps} />;

    const ReceiveBillItemGridGen = () => <ReceiveBillItemGrid {...orderBillItemGridProps} />;

    function RefreshWidget() {
        if (showCreatePage) {
            if (showOrderBillSelectModal)
                return (<OrderBillselectModalGen />)
            else
                return (<div><ReceiveBillAddGen />
                    <ReceiveBillItemGrid {...orderBillItemGridProps} />
                </div>)
        } if (showViewPage) {
            return (<ReceiveBillView {...receiveViewProps} />)
        }
        else
            return <div>
                <ReceiveBillSearch {...receiveBillSearchProps} />
                <ReceiveGrid {...receiveListProps} />
                <WMSProgress {...batchProcessDeleteReceiveBillProps} />
                <WMSProgress {...batchProcessFinishReceiveBillProps} />
            </div>
    };

    return (<div>{RefreshWidget()}</div>)
};

Receive.propType = {
    receive: PropTypes.object
};

function mapStateToProps({ receive }) {
    return {
        receive
    };
};

export default connect(mapStateToProps)(Receive);