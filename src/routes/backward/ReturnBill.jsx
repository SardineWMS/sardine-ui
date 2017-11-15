import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';

import ReturnBillSearchForm from '../../components/backward/customerreturn/ReturnBillSearchForm';
import ReturnBillSearchGrid from '../../components/backward/customerreturn/ReturnBillSearchGrid';
import ReturnBillCreateForm from '../../components/backward/customerreturn/ReturnBillCreateForm';
import ReturnBillCreateItem from '../../components/backward/customerreturn/ReturnBillCreateItem';
import ReturnBillViewPage from '../../components/backward/customerreturn/ReturnBillViewPage';
import ReturnBillViewItem from '../../components/backward/customerreturn/ReturnBillViewItem';
import ReturnNtcBillSelectGrid from '../../components/widget/ReturnNtcBillSelectGrid';
import BatchModifyReturnType from '../../components/backward/customerreturn/BatchModifyReturnType';
import BatchModifyReturnContainer from '../../components/backward/customerreturn/BatchModifyReturnContainer';
import BatchModifyProductionDate from '../../components/backward/customerreturn/BatchModifyProductionDate';
import WMSProgress from '../../components/Widget/WMSProgress';

function ReturnBill({ location, dispatch, rtnBill }) {
    const { showPage, showRtnNtcSelectModal, currentItem, ntcBillItemArticles, treeData, article_qpcStr, billItems, list, pagination, batchModifyReturnTypeVisible, batchModifyReturnContainerVisible, batchModifyProductionDateVisible, modifyReturnTypeEntitys,
        modifyReturnContainerEntitys,
        modifyProductionDateEntitys, batchDeleteProcessModal, deleteRtnBillEntitys, batchAuditProcessModal, auditRtnBillEntitys, rtnBillNext } = rtnBill;

    const returnBillSearchGridProps = {
        dataSource: list,
        pagination,
        onCreate() {
            dispatch({
                type: 'rtnBill/showCreateSuccess'
            })
        },
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/backward/storeRtnBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onViewItem(record) {
            dispatch({
                type: 'rtnBill/showView',
                payload: record
            })
        },
        onRemoveBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要删除的退仓单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnBill/batchDeleteRtnBill',
                payload: {
                    deleteRtnBillEntitys: records
                }
            })
        },
        onAuditBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要审核的退仓单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnBill/batchAuditRtnBill',
                payload: {
                    auditRtnBillEntitys: records
                }
            })
        },
    };

    const returnBillSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'rtnBill/query',
                payload: fieldsValue
            })
        }
    };

    const returnNtcBillSelectGridProps = {
        visible: showRtnNtcSelectModal,
        onCancel() {
            dispatch({
                type: 'rtnBill/hideRtnNtcBillModal'
            })
        },
        onSelect(data) {
            const current = {};
            current.returnNtcBillNumber = data.billNumber;
            dispatch({
                type: 'rtnBill/onReturnNtcBillSelect',
                payload: data.billNumber
            })
        }
    };



    const returnBillCreateItemProps = {
        dataSource: billItems,
        treeData,
        article_qpcStr,
        selectArticle(record, array) {
            dispatch({
                type: 'rtnBill/selectArticle',
                payload: {
                    record, array: billItems,
                    article_qpcStr, ntcBillItemArticles
                }
            })
        },
        selectQpcStr(record, array) {
            dispatch({
                type: 'rtnBill/selectQpcStr',
                payload: { record, array, ntcBillItemArticles, currentItem }
            })
        },
        calculateCaseQtyStr(record, list) {
            dispatch({
                type: 'rtnBill/calculateCaseQtyStr',
                payload: {
                    record, list, currentItem
                }
            });
        },
        calculateValidDate(record, list) {
            dispatch({
                type: 'rtnBill/calculateValidDate',
                payload: {
                    record, list
                }
            });
        },
        onAddItem() {
            dispatch({
                type: 'rtnBill/addItemList',
                payload: billItems
            });
        },
        onRemoveItem(record, dataSource) {
            dispatch({
                type: 'rtnBill/removeItem',
                payload: {
                    record, dataSource, currentItem
                }
            });
        },
        selectSupplier(record, list) {
            dispatch({
                type: 'rtnBill/selectSupplier',
                payload: {
                    record, ntcBillItemArticles, list
                }
            })
        },
        onModifyReturnType(selecteds) {
            dispatch({
                type: 'rtnBill/showVisible',
                payload: {
                    modifyReturnTypeEntitys: selecteds
                }
            })
        },
        onModifyReturnContainer(selecteds) {
            dispatch({
                type: 'rtnBill/showModifyReturnContainer',
                payload: {
                    modifyReturnContainerEntitys: selecteds
                }
            })
        },
        onModifyProductionDate(selecteds) {
            dispatch({
                type: 'rtnBill/showModifyDate',
                payload: {
                    modifyProductionDateEntitys: selecteds
                }
            })
        },
        refreshBin(record, dataSource) {
            dispatch({
                type: 'rtnBill/refreshBin',
                payload: {
                    record, dataSource, currentItem
                }
            })
        }
    };

    const returnBillViewPageProps = {
        item: currentItem,
        onEdit(record) {
            dispatch({
                type: 'rtnBill/showEdit',
                payload: record
            })
        },
        onBack() {
            dispatch({
                type: 'rtnBill/query'
            })
        },
        onDelete(record) {
            dispatch({
                type: 'rtnBill/remove',
                payload: record
            })
        },
        onAudit(record) {
            dispatch({
                type: 'rtnBill/audit',
                payload: record
            })
        }
    };

    const batchModifyReturnTypeProps = {
        visible: batchModifyReturnTypeVisible,
        onCancel() {
            dispatch({
                type: 'rtnBill/hideVisible',
            })
        },
        onOk(data) {
            dispatch({
                type: 'rtnBill/modifyReturnType',
                payload: {
                    selecteds: modifyReturnTypeEntitys,
                    list: billItems,
                    data
                }
            })
        }
    };

    const batchModifyReturnContainerProps = {
        visible: batchModifyReturnContainerVisible,
        onCancel() {
            dispatch({
                type: 'rtnBill/hideModifyContainerVisible',
            })
        },
        onOk(data) {
            dispatch({
                type: 'rtnBill/modifyReturnContainer',
                payload: {
                    selecteds: modifyReturnContainerEntitys,
                    list: billItems,
                    data
                }
            })
        }
    };

    const batchModifyProductionDateProps = {
        visible: batchModifyProductionDateVisible,
        onCancel() {
            dispatch({
                type: 'rtnBill/hideModifyDateVisible',
            })
        },
        onOk(data) {
            dispatch({
                type: 'rtnBill/modifyProductionDate',
                payload: {
                    selecteds: modifyProductionDateEntitys,
                    list: billItems,
                    data
                }
            })
        }
    };

    const batchProcessDeleteRtnBillProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteRtnBillEntitys ? deleteRtnBillEntitys : [],
        next: rtnBillNext,
        actionText: '删除',
        entityCaption: '退仓单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnBill/remove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnBill/hideDeleteRtnBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessAuditRtnBillProps = {
        showConfirmModal: batchAuditProcessModal,
        records: auditRtnBillEntitys ? auditRtnBillEntitys : [],
        next: rtnBillNext,
        actionText: '审核',
        entityCaption: '退仓单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnBill/audit',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnBill/hideAuditRtnBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const returnBillCreateFormProps = {
        item: currentItem,
        onRtnNtcBillSelect() {
            dispatch({
                type: 'rtnBill/showRtnNtcBillModal'
            })
        },
        handleSave(data) {
            data.items = billItems;

            if (data.uuid) {
                dispatch({
                    type: 'rtnBill/update',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'rtnBill/insert',
                    payload: data
                });
            };
        },
        onCancel() {
            dispatch({
                type: 'rtnBill/query'
            })
        },
        returnBillCreateItemProps,
        batchModifyReturnTypeProps,
        batchModifyProductionDateProps,
        batchModifyReturnContainerProps
    };


    const ReturnBillSearchGridGen = () => <ReturnBillSearchGrid {...returnBillSearchGridProps} />;


    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div><ReturnBillViewPage {...returnBillViewPageProps} />
                            </div>
                        case 'create':
                            return <div><ReturnBillCreateForm {...returnBillCreateFormProps} />
                                <ReturnNtcBillSelectGrid {...returnNtcBillSelectGridProps} />
                            </div>
                        default:
                            return <div><ReturnBillSearchForm {...returnBillSearchFormProps} />
                                <ReturnBillSearchGridGen />
                                <WMSProgress {...batchProcessDeleteRtnBillProps} />
                                <WMSProgress {...batchProcessAuditRtnBillProps} />
                            </div>
                    }
                })()
            }
        </div>
    );
};

function mapStateToProps({ rtnBill }) {
    return {
        rtnBill
    };
};

export default connect(mapStateToProps)(ReturnBill);