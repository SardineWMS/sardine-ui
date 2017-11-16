import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

import AlcNtcBillSearchGrid from '../../components/forward/alcntc/AlcNtcBillSearchGrid';
import AlcNtcBillSearchForm from '../../components/forward/alcntc/AlcNtcBillSearchForm';
import AlcNtcBillCreateForm from '../../components/forward/alcntc/AlcNtcBillCreateForm';
import AlcNtcBillCreateItem from '../../components/forward/alcntc/AlcNtcBillCreateItem';
import AlcNtcBillView from '../../components/forward/alcntc/AlcNtcBillView';
import AlcNtcBillViewItem from '../../components/forward/alcntc/AlcNtcBillViewItem';
import WMSProgress from '../../components/Widget/NewProgress';

function AlcNtcBill({ location, dispatch, alcNtc }) {
    const { list, pagination, showPage, billItems, currentItem,
        deleteAlcNtcBillEntitys,
        finishAlcNtcBillEntitys,
        abortAlcNtcBillEntitys,
        batchDeleteProcessModal,
        batchFinishProcessModal,
        batchAbortProcessModal,
        alcNtcBillNext
 } = alcNtc;

    const alcNtcBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forward/alcNtcBill',
                query: {
                    ...location.query,
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'alcNtc/showCreate'
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'alcNtc/viewAlcNtc',
                payload: item
            });
        },
        onRemoveBatch(alcNtcBills) {
            if (alcNtcBills.length <= 0) {
                message.warning("请选择要删除的配单！", 2, '');
                return;
            };
            dispatch({
                type: 'alcNtc/batchDeleteAlcNtcBill',
                payload: {
                    deleteAlcNtcBillEntitys: alcNtcBills
                }
            });
        },
        onFinishBatch(alcNtcBills) {
            if (alcNtcBills.length <= 0) {
                message.error("请选择要审核的配单！", 2, '');
                return;
            };
            dispatch({
                type: 'alcNtc/batchAuditAlcNtcBill',
                payload: {
                    finishAlcNtcBillEntitys: alcNtcBills
                }
            });
        },
        onAbortBatch(alcNtcBills) {
            if (alcNtcBills.length <= 0) {
                message.error("请选择要作废的配单！", 2, '');
                return;
            };
            dispatch({
                type: 'alcNtc/batchAbortAlcNtcBill',
                payload: {
                    abortAlcNtcBillEntitys: alcNtcBills
                }
            });
        }
    };

    const alcNtcBillSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch(routerRedux.push({
                pathname: '/forward/alcNtcBill',
                query: {
                    ...fieldsValue
                }
            }));
        }
    };

    const alcNtcBillCreateFormProps = {
        item: currentItem,
        onSelectWrh() { },
        handleSave(data) {
            data.items = billItems;
            if (data.items.length > 1) {
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].article == null) {
                        message.error("第" + parseInt(i + 1) + "行明细中，商品不能为空", 2, '');
                        return;
                    };
                    if (data.items[i].qty == null) {
                        message.error("第" + parseInt(i + 1) + "行明细中，数量不能为空", 2, '');
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
            if (data.uuid) {
                dispatch({
                    type: 'alcNtc/update',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'alcNtc/insert',
                    payload: data
                });
            };
        },
        onCancel() {
            dispatch({
                type: 'alcNtc/query',
                payload: {}
            });
        }
    };

    const alcNtcBillCreateItemProps = {
        dataSource: billItems,
        getArticleInfo(record, dataSource) {
            dispatch({
                type: 'alcNtc/getArticleInfo',
                payload: {
                    record, dataSource
                }
            });
        },
        refreshMunit(record, dataSource) {
            dispatch({
                type: 'alcNtc/refreshMunit',
                payload: {
                    record, dataSource
                }
            });
        },
        calculateCaseQtyStr(record, dataSource) {
            dispatch({
                type: 'alcNtc/calculateCaseQtyStr',
                payload: {
                    record, dataSource, currentItem
                }
            });
        },
        onAddItem() {
            dispatch({
                type: 'alcNtc/addItem',
                payload: {
                    dataSource: billItems
                }
            });
        },
        onRemoveItem(record, dataSource) {
            dispatch({
                type: 'alcNtc/removeItem',
                payload: {
                    record, dataSource, currentItem
                }
            });
        },
        refreshAmount(record, dataSource) {
            dispatch({
                type: 'alcNtc/refreshAmount',
                payload: {
                    record, dataSource, currentItem
                }
            })
        }
    };

    const alcNtcBillViewProps = {
        item: currentItem,
        onEdit(item) {
            dispatch({
                type: 'alcNtc/edit',
                payload: item
            });
        },
        onDelete(item) {
            dispatch({
                type: 'alcNtc/gridRemove',
                payload: item
            });
        },
        onAudit(item) {
            dispatch({
                type: 'alcNtc/gridAudit',
                payload: item
            });
        },
        onBack() {
            dispatch({
                type: 'alcNtc/query'
            })
        },
        onAbort(item) {
            dispatch({
                type: 'alcNtc/abort',
                payload: item
            })
        }
    };

    const alcNtcBillViewItemProps = {
        dataSource: billItems
    };

    const batchProcessDeleteAlcNtcBillProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteAlcNtcBillEntitys ? deleteAlcNtcBillEntitys : [],
        next: alcNtcBillNext,
        actionText: '删除',
        entityCaption: '配单',
        batchProcess(entity) {
            dispatch({
                type: 'alcNtc/gridRemove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'alcNtc/hideDeleteAlcNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'alcNtc/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessFinishAlcNtcBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishAlcNtcBillEntitys ? finishAlcNtcBillEntitys : [],
        next: alcNtcBillNext,
        actionText: '完成',
        entityCaption: '配单',
        batchProcess(entity) {
            dispatch({
                type: 'alcNtc/gridAudit',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'alcNtc/hideFinishAlcNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'alcNtc/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessAbortAlcNtcBillProps = {
        showConfirmModal: batchAbortProcessModal,
        records: abortAlcNtcBillEntitys ? abortAlcNtcBillEntitys : [],
        next: alcNtcBillNext,
        actionText: '作废',
        entityCaption: '配单',
        url: '/swms/out/alcNtc/abort',
        canSkipState: 'aborted',
        hideConfirmModal() {
            dispatch({
                type: 'alcNtc/hideAbortAlcNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'alcNtc/query',
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
                            return <div><AlcNtcBillView {...alcNtcBillViewProps} /></div>;
                        case 'create':
                            return <div><AlcNtcBillCreateForm {...alcNtcBillCreateFormProps} /><AlcNtcBillCreateItem {...alcNtcBillCreateItemProps} /></div>;
                        default: {
                            return (
                                <div>
                                    <AlcNtcBillSearchForm {...alcNtcBillSearchFormProps} />
                                    <AlcNtcBillSearchGrid {...alcNtcBillSearchGridProps} />
                                    <WMSProgress {...batchProcessDeleteAlcNtcBillProps} />
                                    <WMSProgress {...batchProcessFinishAlcNtcBillProps} />
                                    <WMSProgress {...batchProcessAbortAlcNtcBillProps} />
                                </div>
                            )
                        }
                    }
                })()

            }
        </div>
    );
};

AlcNtcBill.propType = {
    alcNtc: PropTypes.object
};

function mapStateToProps({ alcNtc }) {
    return {
        alcNtc
    };
};

export default connect(mapStateToProps)(AlcNtcBill);
