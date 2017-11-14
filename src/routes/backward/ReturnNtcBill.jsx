import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';

import ReturnNtcBillSearchGrid from '../../components/backward/rtnntc/ReturnNtcBillSearchGrid';
import ReturnNtcBillSearchForm from '../../components/backward/rtnntc/ReturnNtcBillSearchForm';
import ReturnNtcBillCreateForm from '../../components/backward/rtnntc/ReturnNtcBillCreateForm';
import ReturnNtcBillCreateItem from '../../components/backward/rtnntc/ReturnNtcBillCreateItem';
import CustomerSelectGrid from '../../components/widget/CustomerSelectGrid';
import ReturnNtcBillViewPage from '../../components/backward/rtnntc/ReturnNtcBillViewPage';
import WMSProgress from '../../components/Widget/WMSProgress';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function ReturnNtcBill({ location, dispatch, rtnNtcBill }) {
    const { showPage, showCustomerSelectModal, currentItem, rtnNtcBillItems, qpcs, list, pagination, batchDeleteProcessModal, deleteRtnNtcBillEntitys, batchAbortProcessModal, abortRtnNtcBillEntitys,
        batchGenRtnBillProcessModal, genRtnBillRtnNtcBillEntitys, batchFinishProcessModal, finishRtnNtcBillEntitys, rtnNtcBillNext, reasons } = rtnNtcBill;

    const returnNtcBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/backward/rtnNtcBill',
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
                type: 'rtnNtcBill/showCreate',
                payload: {
                    rtnNtcBillItems
                }
            });
        },
        onViewItem(record) {
            dispatch({
                type: 'rtnNtcBill/showView',
                payload: record
            })
        },
        onAbortBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要作废的退仓通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnNtcBill/batchAbortRtnNtcBill',
                payload: {
                    abortRtnNtcBillEntitys: records
                }
            })
        },
        onGenRtnBillBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要生成退仓单的退仓通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnNtcBill/batchGenRtnBill',
                payload: {
                    genRtnBillRtnNtcBillEntitys: records
                }
            })
        },
        onFinishBatch(records) {
            if (records.length <= 0) {
                message.error("请选择要完成的退仓通知单！", 2, '');
                return;
            };
            dispatch({
                type: 'rtnNtcBill/batchFinishBill',
                payload: {
                    finishRtnNtcBillEntitys: records
                }
            })
        },
    };

    const rtnNtcBillSearchFormProps = {
        onSearch(fieldsValue) {
            if (fieldsValue.dateLessThan != null) {
                fieldsValue.dateLessThan = moment(fieldsValue.dateLessThan).format("YYYY-MM-DD");
            }
            if (fieldsValue.dateMoreThan != null) {
                fieldsValue.dateMoreThan = fieldsValue.dateMoreThan.format("YYYY-MM-DD");
            }
            dispatch({
                type: 'rtnNtcBill/query',
                payload: fieldsValue
            })
        }
    };

    const returnNtcBillCreateItemProps = {
        dataSource: rtnNtcBillItems,
        qpcStrs: qpcs,
        reasons,
        getArticleInfo(record, list) {
            dispatch({
                type: 'rtnNtcBill/getArticleInfo',
                payload: { record, list }
            })
        },
        refreshMunit(record, dataSource) {
            dispatch({
                type: 'rtnNtcBill/refreshMunit',
                payload: {
                    record, dataSource
                }
            });
        },
        getSupplierInfo(record, dataSource) {
            dispatch({
                type: 'rtnNtcBill/getSupplierInfo',
                payload: { record, dataSource }
            })
        },
        onAddItem() {
            dispatch({
                type: 'rtnNtcBill/addItem',
                payload: {
                    dataSource: rtnNtcBillItems
                }
            })
        },
        calculateCaseQtyStr(record, dataSource) {
            dispatch({
                type: 'rtnNtcBill/calculateCaseQtyStr',
                payload: {
                    record, dataSource, currentItem
                }
            })
        },
        refreshAmount(record, dataSource) {
            dispatch({
                type: 'rtnNtcBill/refreshAmount',
                payload: {
                    record, dataSource, currentItem
                }
            })
        }
    };

    const returnNtcBillCreateFormProps = {
        item: currentItem,
        onCustomerSelect() {
            dispatch({
                type: 'rtnNtcBill/showCustomerModal'
            })
        },
        onEnterCustomer(data) {
            dispatch({
                type: 'rtnNtcBill/getCustomerByCode',
                payload: {
                    code: data.customer,
                    currentItem,
                }
            });
        },
        handleSave(data, dataSource) {
            for (let i = 0; i < rtnNtcBillItems.length; i++) {
                if (rtnNtcBillItems[i].article == null || rtnNtcBillItems[i].article.uuid == null) {
                    message.warning("第" + i + "明细行中，商品不能为空", 2);
                    return;
                };
                if (rtnNtcBillItems[i].qpcStr == null || rtnNtcBillItems[i].qpcStr == '') {
                    message.warning("第" + i + "行明细中，商品规格不能为空", 2);
                    return;
                };
                if (rtnNtcBillItems[i].supplier == null || rtnNtcBillItems[i].supplier.uuid == null) {
                    message.warning("第" + i + "行明细中，供应商不能为空", 2);
                    return;
                };
                if (rtnNtcBillItems[i].qty == null || rtnNtcBillItems[i].qty == '') {
                    message.warning("第" + i + "行明细中，数量不能为空", 2);
                    return;
                };
                if (rtnNtcBillItems[i].price == null || rtnNtcBillItems[i].price == '') {
                    message.warning("第" + i + "行明细中，单价不能为空", 2);
                    return;
                };
                for (let j = i + 1; j < rtnNtcBillItems.length; j++) {
                    if (rtnNtcBillItems[j].article == null || rtnNtcBillItems[j].article.uuid == null) {
                        message.warning("第" + j + "明细行中，商品不能为空", 2);
                        return;
                    };
                    if (rtnNtcBillItems[j].qpcStr == null || rtnNtcBillItems[j].qpcStr == '') {
                        message.warning("第" + j + "行明细中，商品规格不能为空", 2);
                        return;
                    };
                    if (rtnNtcBillItems[j].supplier == null || rtnNtcBillItems[j].supplier.uuid == null) {
                        message.warning("第" + j + "行明细中，供应商不能为空", 2);
                        return;
                    };
                    if (rtnNtcBillItems[j].qty == null || rtnNtcBillItems[j].qty == '') {
                        message.warning("第" + j + "行明细中，数量不能为空", 2);
                        return;
                    };
                    if (rtnNtcBillItems[j].price == null || rtnNtcBillItems[j].price == '') {
                        message.warning("第" + j + "行明细中，单价不能为空", 2);
                        return;
                    };
                    if (rtnNtcBillItems[i].article.code == rtnNtcBillItems[j].article.code && rtnNtcBillItems[i].qpcStr == rtnNtcBillItems[j].qpcStr) {
                        message.warning("明细中商品" + rtnNtcBillItems[i].article.code + "规格" + rtnNtcBillItems[i].qpcStr + "不能重复", 2);
                        return;
                    };
                };
            };
            data.items = rtnNtcBillItems;
            if (!data.uuid) {
                dispatch({
                    type: 'rtnNtcBill/saveRtnNtcBill',
                    payload: data
                });
            } else {
                dispatch({
                    type: 'rtnNtcBill/updateRtnNtcBill',
                    payload: data
                });
            };
        },
        onCancel() {
            dispatch({
                type: 'rtnNtcBill/query'
            })
        },
        returnNtcBillCreateItemProps
    };

    const customerSelectGridProps = {
        visible: showCustomerSelectModal,
        onCancel() {
            dispatch({
                type: 'rtnNtcBill/hideCustomerModal'
            })
        },
        onSelect(data) {
            // const t = currentItem;
            const customer = {};
            customer.uuid = data.uuid;
            customer.code = data.code;
            customer.name = data.name;
            currentItem.customer = customer;
            dispatch({
                type: 'rtnNtcBill/hideCustomerModal',
                payload: { currentItem: currentItem }
            })
        }
    };



    const returnNtcBillViewPageProps = {
        item: currentItem,
        onEdit(record) {
            dispatch({
                type: 'rtnNtcBill/showEdit',
                payload: record
            })
        },
        onFinish(record) {
            dispatch({
                type: 'rtnNtcBill/finish',
                payload: record
            })
        },
        onAbort(record) {
            dispatch({
                type: 'rtnNtcBill/abort',
                payload: record
            })
        },
        onGenRtnBill(record) {
            dispatch({
                type: 'rtnNtcBill/gridGenRtnBill',
                payload: record
            })
        },
        onBack() {
            dispatch({
                type: 'rtnNtcBill/query',
            })
        }
    };

    const batchProcessAbortRtnNtcBillProps = {
        showConfirmModal: batchAbortProcessModal,
        records: abortRtnNtcBillEntitys ? abortRtnNtcBillEntitys : [],
        next: rtnNtcBillNext,
        actionText: '作废',
        entityCaption: '退仓通知单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnNtcBill/gridAbort',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnNtcBill/hideAbortRtnNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessGenRtnBillRtnNtcBillProps = {
        showConfirmModal: batchGenRtnBillProcessModal,
        records: genRtnBillRtnNtcBillEntitys ? genRtnBillRtnNtcBillEntitys : [],
        next: rtnNtcBillNext,
        actionText: '生成',
        entityCaption: '退仓单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnNtcBill/gridGenRtnBill',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnNtcBill/hideGenRtnBillRtnNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnNtcBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessFinishRtnNtcBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishRtnNtcBillEntitys ? finishRtnNtcBillEntitys : [],
        next: rtnNtcBillNext,
        actionText: '完成',
        entityCaption: '退仓通知单',
        batchProcess(entity) {
            dispatch({
                type: 'rtnNtcBill/gridFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'rtnNtcBill/hideFinishRtnNtcBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'rtnNtcBill/query',
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
                            return <div><ReturnNtcBillViewPage {...returnNtcBillViewPageProps} /></div>
                        case 'create':
                            return <div><ReturnNtcBillCreateForm {...returnNtcBillCreateFormProps} />
                                <CustomerSelectGrid {...customerSelectGridProps} />
                            </div>
                        default:
                            return <div>
                                <ReturnNtcBillSearchForm {...rtnNtcBillSearchFormProps} />
                                <ReturnNtcBillSearchGrid {...returnNtcBillSearchGridProps} />
                                <WMSProgress {...batchProcessAbortRtnNtcBillProps} />
                                <WMSProgress {...batchProcessGenRtnBillRtnNtcBillProps} />
                                <WMSProgress {...batchProcessFinishRtnNtcBillProps} />
                            </div>
                    }
                })()
            }
        </div>
    );
};

ReturnNtcBill.propTypes = {

};

function mapStateToProps({ rtnNtcBill }) {
    return {
        rtnNtcBill
    };
};

export default connect(mapStateToProps)(ReturnNtcBill);