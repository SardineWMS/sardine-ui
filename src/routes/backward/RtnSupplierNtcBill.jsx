import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';

import RtnSupplierNtcBillSearchGrid from '../../components/backward/rtnsupplierntc/RtnSupplierNtcBillSearchGrid';
import RtnSupplierNtcBillSearchForm from '../../components/backward/rtnsupplierntc/RtnSupplierNtcBillSearchForm';
import RtnSupplierNtcBillCreateItem from '../../components/backward/rtnsupplierntc/RtnSupplierNtcBillCreateItem';
import RtnSupplierNtcBillCreateForm from '../../components/backward/rtnsupplierntc/RtnSupplierNtcBillCreateForm';
import SupplierSelectModal from '../../components/forward/Order/SupplierSelectModal';
import RtnSupplierNtcBillViewPage from '../../components/backward/rtnsupplierntc/RtnSupplierNtcBillViewPage';
import WMSProgress from '../../components/Widget/WMSProgress';

function RtnSupplierNtcBill({ location, dispatch, rtnSupplierNtcBill }) {
    const { showPage, billItems, wrhs, currentItem,
        showSupplierSelectModal, list, abortBillEntitys, batchAbortProcessModal,
        removeBillEntitys, batchRemoveProcessModal, billNext, pagination,
        batchFinishProcessModal, finishBillEntitys,
        batchGenTaskProcessModal, genTaskBillEntitys, currentSupplier, suppliers }
        = rtnSupplierNtcBill;

    const RtnSupplierNtcBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/backward/rtnsupplierntcbill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'rtnSupplierNtcBill/showCreate',
                payload: {
                    billItems
                }
            })
        },
        onViewItem(record) {
            dispatch({
                type: 'rtnSupplierNtcBill/showView',
                payload: record
            })
        },
        onAbortBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要作废的供应商退货通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnSupplierNtcBill/batchAbortBill',
                payload: {
                    abortBillEntitys: records
                }
            })
        },
        onRemoveBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要删除的供应商退仓通知单！", 2);
                return;
            }
            dispatch({
                type: 'rtnSupplierNtcBill/batchRemoveBill',
                payload: {
                    removeBillEntitys: records
                }
            })
        },
        onFinishBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要完成的供应商退货通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnSupplierNtcBill/batchFinishBill',
                payload: {
                    finishBillEntitys: records
                }
            })
        },
        onGenUnshelveTaskBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要生成下架指令的供应商退货通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnSupplierNtcBill/batchGenTask',
                payload: {
                    genTaskBillEntitys: records
                }
            })
        },
    };

    const RtnSupplierNtcBillCreateFormProps = {
        wrhs: wrhs,
        item: currentItem,
        supplier: currentSupplier,
        onSupplierSelect() {
            dispatch({
                type: 'rtnSupplierNtcBill/querySuppliers'
            })
        },
        onEnterSupplier(supplierCode) {
            dispatch({
                type: 'rtnSupplierNtcBill/getSupplier',
                payload: supplierCode
            })
        },
        handleSave(data, dataSource) {
            for (let i = 0; i < billItems.length; i++) {
                if (billItems[i].article == null || billItems[i].article.uuid == null) {
                    message.warning("第" + i + "明细行中，商品不能为空", 2);
                    return;
                };
                if (billItems[i].qpcStr == null || billItems[i].qpcStr == '') {
                    message.warning("第" + i + "行明细中，商品规格不能为空", 2);
                    return;
                };
                if (billItems[i].qty == null || billItems[i].qty == '') {
                    message.warning("第" + i + "行明细中，数量不能为空", 2);
                    return;
                };
                if (billItems[i].price == null || billItems[i].price == '') {
                    message.warning("第" + i + "行明细中，单价不能为空", 2);
                    return;
                };
                for (let j = i + 1; j < billItems.length; j++) {
                    if (billItems[j].article == null || billItems[j].article.uuid == null) {
                        message.warning("第" + j + "明细行中，商品不能为空", 2);
                        return;
                    };
                    if (billItems[j].qpcStr == null || billItems[j].qpcStr == '') {
                        message.warning("第" + j + "行明细中，商品规格不能为空", 2);
                        return;
                    };
                    if (billItems[j].qty == null || billItems[j].qty == '') {
                        message.warning("第" + j + "行明细中，数量不能为空", 2);
                        return;
                    };
                    if (billItems[j].price == null || billItems[j].price == '') {
                        message.warning("第" + j + "行明细中，单价不能为空", 2);
                        return;
                    };
                    if (billItems[i].article.code == billItems[j].article.code && billItems[i].qpcStr == billItems[j].qpcStr) {
                        message.warning("明细中商品" + billItems[i].article.code + "规格" + billItems[i].qpcStr + "不能重复", 2);
                        return;
                    };
                };
            };

            for (var wrh of wrhs) {
                if (wrh.uuid == data.wrh) {
                    data.wrh = wrh;
                }
            }
            data.items = billItems;
            if (!data.uuid) {
                dispatch({
                    type: 'rtnSupplierNtcBill/saveBill',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'rtnSupplierNtcBill/updateBill',
                    payload: data
                });
            };
        },
        onCancel() {
            dispatch({
                type: 'rtnSupplierNtcBill/query'
            })
        }
    };

    const RtnSupplierNtcBillCreateItemProps = {
        dataSource: billItems,
        getArticleInfo(record, list) {
            dispatch({
                type: 'rtnSupplierNtcBill/getArticleInfo',
                payload: { record, list }
            })
        },
        refreshMunit(record, dataSource) {
            dispatch({
                type: 'rtnSupplierNtcBill/refreshMunit',
                payload: {
                    record, dataSource
                }
            });
        },
        calculateCaseQtyStr(record, dataSource) {
            dispatch({
                type: 'rtnSupplierNtcBill/calculateCaseQtyStr',
                payload: {
                    record, dataSource, currentItem
                }
            })
        },
        onAddItem() {
            dispatch({
                type: 'rtnSupplierNtcBill/addItem',
                payload: {
                    dataSource: billItems
                }
            })
        },
        onRemoveItem(record, dataSource) {
            dispatch({
                type: 'rtnSupplierNtcBill/removeItem',
                payload: {
                    record, dataSource, currentItem
                }
            });
        },
        refreshAmount(record, dataSource) {
            dispatch({
                type: 'rtnSupplierNtcBill/refreshAmount',
                payload: {
                    record, dataSource, currentItem
                }
            })
        },
    };

    const supplierModalProps = {
        visible: showSupplierSelectModal,
        suppliers: suppliers,
        supplierPagination: pagination,
        onOk(suppliers) {
            if (suppliers.length < 1)
                return;
            dispatch({
                type: 'rtnSupplierNtcBill/selectSupplier',
                payload: suppliers[0]
            });
        },
        onCancel() {
            dispatch({
                type: 'rtnSupplierNtcBill/hideSupplierModal'
            });
        }
    };

    const rtnSupplierNtcBillViewPageProps = {
        item: currentItem,
        onEdit(record) {
            dispatch({
                type: 'rtnSupplierNtcBill/showEdit',
                payload: record
            })
        },
        onAbort(record) {
            dispatch({
                type: 'rtnSupplierNtcBill/abort',
                payload: record
            })
        },
        onDelete(record) {
            dispatch({
                type: 'rtnSupplierNtcBill/remove',
                payload: record
            })
        },
        onGenTask(record) {
            dispatch({
                type: 'rtnSupplierNtcBill/genTask',
                payload: record
            })
        }
    };

    const rtnSupplierNtcBillSearchFormProps = {
        onSearch(fieldsValue) {
            if (fieldsValue.dateLessThan != null) {
                fieldsValue.dateLessThan = fieldsValue.dateLessThan.format("YYYY-MM-DD");
            }
            if (fieldsValue.dateMoreThan != null) {
                fieldsValue.dateMoreThan = fieldsValue.dateMoreThan.format("YYYY-MM-DD");
            }
            dispatch({
                type: 'rtnSupplierNtcBill/query',
                payload: fieldsValue
            })
        }
    };

    const batchProcessAbortBillProps = {
        showConfirmModal: batchAbortProcessModal,
        records: abortBillEntitys ? abortBillEntitys : [],
        next: billNext,
        actionText: '作废',
        entityCaption: '供应商退货通知单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnSupplierNtcBill/gridAbort',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnSupplierNtcBill/hideAbortBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnSupplierNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessRemoveBillProps = {
        showConfirmModal: batchRemoveProcessModal,
        records: removeBillEntitys ? removeBillEntitys : [],
        next: billNext,
        actionText: '删除',
        entityCaption: '供应商退货通知单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnSupplierNtcBill/remove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnSupplierNtcBill/hideRemoveBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnSupplierNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessFinishBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishBillEntitys ? finishBillEntitys : [],
        next: billNext,
        actionText: '完成',
        entityCaption: '供应商退货通知单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnSupplierNtcBill/gridFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnSupplierNtcBill/hideFinishBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnSupplierNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessGenTaskProps = {
        showConfirmModal: batchGenTaskProcessModal,
        records: genTaskBillEntitys ? genTaskBillEntitys : [],
        next: billNext,
        actionText: '生成',
        entityCaption: '下架指令',
        batchProcess(entity) {
            dispatch({
                type: 'rtnSupplierNtcBill/gridGenTask',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnSupplierNtcBill/hideGenTaskModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnSupplierNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div>
                                <RtnSupplierNtcBillViewPage {...rtnSupplierNtcBillViewPageProps} />
                            </div>
                        case 'create':
                            return <div>
                                <RtnSupplierNtcBillCreateForm {...RtnSupplierNtcBillCreateFormProps} />
                                <RtnSupplierNtcBillCreateItem {...RtnSupplierNtcBillCreateItemProps} />
                                <SupplierSelectModal {...supplierModalProps} />
                            </div>

                        default:
                            return <div>
                                <RtnSupplierNtcBillSearchForm {...rtnSupplierNtcBillSearchFormProps} />
                                <RtnSupplierNtcBillSearchGrid {...RtnSupplierNtcBillSearchGridProps} />
                                <WMSProgress {...batchProcessAbortBillProps} />
                                <WMSProgress {...batchProcessRemoveBillProps} />
                                <WMSProgress {...batchProcessFinishBillProps} />
                                <WMSProgress {...batchProcessGenTaskProps} />
                            </div>
                    }
                })()
            }
        </div>
    )
}

function mapStateToProps({ rtnSupplierNtcBill }) {
    return {
        rtnSupplierNtcBill
    };
};

export default connect(mapStateToProps)(RtnSupplierNtcBill);
