import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';
import DecIncSearchForm from '../../components/inner/decinc/DecIncSearchForm';
import DecIncSearchGrid from '../../components/inner/decinc/DecIncSearchGrid';
import DecIncCreateForm from '../../components/inner/decinc/DecIncCreate';
import DecIncCreateItem from '../../components/inner/decinc/DecIncCreateItem';
import DecIncView from '../../components/inner/decinc/DecIncView';
import DecIncViewItem from '../../components/inner/decinc/DecIncViewItem';
import WMSProgress from '../../components/Widget/WMSProgress';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function DecInc({ location, dispatch, decinc }) {
    const {
        list, pagination,
        currentBill,
        showCreatePage,
        reasons,
        decIncItem,
        showViewPage,
        deleteDecIncBillEntitys,
        auditDecIncBillEntitys,
        batchDeleteProcessModal,
        batchAuditProcessModal,
        decIncBillNext
    } = decinc;

    const decIncSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'decinc/query',
                payload: fieldsValue
            });
        }
    };

    const decIncSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/inner/decIncBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: sorter.columnKey == undefined ? '' : (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'decinc/showCreate',
                payload: { currentBill }
            });
        },
        onViewItem(record) {
            dispatch({
                type: 'decinc/viewDecInc',
                payload: record
            });
        },
        onEdit(record) {
            dispatch({
                type: 'decinc/edit',
                payload: record
            });
        },
        onDelete(record) {
            dispatch({
                type: 'decinc/gridDelete',
                payload: record
            });
        },
        onAudit(record) {
            dispatch({
                type: 'decinc/gridAudit',
                payload: record
            });
        },
        onRemoveBatch(decIncBills) {
            if (decIncBills.length <= 0) {
                message.warning("请选择要删除的损溢单！", 2, '');
                return;
            };
            dispatch({
                type: 'decinc/batchDeleteDecIncBill',
                payload: {
                    deleteDecIncBillEntitys: decIncBills
                }
            });
        },
        onFinishBatch(decIncBills) {
            if (decIncBills.length <= 0) {
                message.warning("请选择要审核的损溢单！", 2, '');
                return;
            };
            dispatch({
                type: 'decinc/batchAuditDecIncBill',
                payload: {
                    auditDecIncBillEntitys: decIncBills
                }
            });
        }
    };

    const decIncCreateFormProps = {
        itemProps: decIncCreateItemGridProps,
        item: currentBill,
        onSelectType(value) {
            dispatch({
                type: 'decinc/onSelectType',
                payload: value
            });
        },
        handleSave(data) {
            for (let i = 0; i < decIncItem.length; i++) {
                if (decIncItem[i].price == null || decIncItem[i].price == '') {
                    message.error("第" + (i + 1) + "行中的单价不能为空");
                    return;
                } else if (decIncItem[i].price < 0) {
                    message.error("第" + (i + 1) + "行中的单价不能小于零");
                    return;
                }
                else if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(decIncItem[i].price) == false) {
                    message.error("第" + (i + 1) + "行中的单价格式不正确，最大长度12位数字，保留3位小数");
                    return;
                };
                if (decIncItem[i].qty == null || decIncItem[i].qty == '') {
                    message.error("第" + (i + 1) + "行中的数量不能为空");
                    return;
                } else if (data.type == 'Inc' && decIncItem[i].qty < 0) {
                    message.error("第" + (i + 1) + "行中的数量不能小于零");
                    return;
                } else if (data.type == 'Dec' && decIncItem[i].qty > 0) {
                    message.error("第" + (i + 1) + "行中的数量不能大于零");
                    return;
                }
                else if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(decIncItem[i].price) == false) {
                    message.error("第" + (i + 1) + "行中的数量格式不正确，最大长度12位数字，保留3位小数");
                    return;
                };
                if ((decIncItem[i].reason && decIncItem[i].reason.length > 255)) {
                    message.error("第" + (i + 1) + "行中的原因最大长度是255！", 2);
                    return;
                };
            };
            const result = {};
            result.type = data.type;
            result.wrh = data.wrh;
            result.remark = data.remark;
            result.totalCaseQtyStr = currentBill.totalCaseQtyStr;
            result.totalAmount = Math.abs(Number.parseFloat(currentBill.totalAmount));
            result.items = decIncItem;
            if (!data.operator.uuid) {
                result.operator = {};
                result.operator.code = data.operator;
            }
            result.reason = data.reason;
            if (data.uuid) {
                result.uuid = data.uuid;
                result.state = data.state;
                result.createInfo = data.createInfo;
                result.version = data.version;
            };
            if (result.uuid) {
                dispatch({
                    type: 'decinc/update',
                    payload: result,
                });
            } else
                dispatch({
                    type: 'decinc/insert',
                    payload: result,
                });
        },
        onCancel() {
            dispatch({
                type: 'decinc/query',
                payload: {},
            });
        }
    };

    const decIncCreateItemGridProps = {
        dataSource: decIncItem,
        reasons,
        currentBill,
        getArticleInfo(record, dataSource) {
            dispatch({
                type: 'decinc/getArticleInfo',
                payload: {
                    record, dataSource, currentBill
                }
            });
        },
        verifyBin(value) {
            dispatch({
                type: 'decinc/verifyBin',
                payload: value
            });
        },
        calculateCaseQtyStr(record, dataSource) {
            currentBill.items = dataSource;
            dispatch({
                type: 'decinc/calculateCaseQtyStr',
                payload: {
                    record, dataSource, currentBill
                }
            });
        },
        onRemoveItem(record, dataSource) {
            currentBill.items = dataSource;
            dispatch({
                type: 'decinc/removeItem',
                payload: {
                    record, dataSource, currentBill
                }
            });
        },
        onAddItem(dataSource) {
            dispatch({
                type: 'decinc/addItem',
                payload: {
                    dataSource: decIncItem
                }
            });
        },
        refreshSupplier(record, dataSource) {
            dispatch({
                type: 'decinc/refreshSupplier',
                payload: {
                    record, dataSource
                }
            });
        },
        getSupplier(record, dataSource) {
            dispatch({
                type: 'decinc/getSupplier',
                payload: {
                    record, dataSource
                }
            });
        },
        refreshStockQty(record, dataSource) {
            let stockQty = 0;
            record.stocks.map(function (item) {
                if (item.qpcStr == record.qpcStr && item.supplier.uuid == record.supplier.uuid && moment(item.productionDate).format("YYYY-MM-DD") == moment(record.productionDate).format("YYYY-MM-DD")) {
                    stockQty = stockQty + Number.parseInt(item.qty);
                    record.price = item.price;
                }
            })
            record.stockQty = stockQty;
            dispatch({
                type: 'decinc/createSuccess',
                payload: {
                    decIncItem: dataSource
                }
            })
        }
    };

    const decIncViewProps = {
        item: currentBill,
        onDelete(record) {
            dispatch({
                type: 'decinc/gridDelete',
                payload: record
            });
        },
        onEdit(record) {
            dispatch({
                type: 'decinc/edit',
                payload: record
            });
        },
        onFinish(record) {
            dispatch({
                type: 'decinc/gridAudit',
                payload: record
            });
        },
        onBack() {
            dispatch({
                type: 'decinc/query',
                payload: {}
            });
        }
    };

    const decIncViewGridProps = {
        dataSource: decIncItem
    };

    const batchProcessDeleteDecIncBillProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteDecIncBillEntitys ? deleteDecIncBillEntitys : [],
        next: decIncBillNext,
        actionText: '删除',
        entityCaption: '损溢单',
        batchProcess(entity) {
            dispatch({
                type: 'decinc/gridDelete',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'decinc/hideDeleteDecIncBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'decinc/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessAuditDecIncBillProps = {
        showConfirmModal: batchAuditProcessModal,
        records: auditDecIncBillEntitys ? auditDecIncBillEntitys : [],
        next: decIncBillNext,
        actionText: '完成',
        entityCaption: '损溢单',
        batchProcess(entity) {
            dispatch({
                type: 'decinc/gridAudit',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'decinc/hideAuditDecIncBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'decinc/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const DecIncCreateFormGen = () => <DecIncCreateForm {...decIncCreateFormProps} />;



    function RefreshWidget() {
        if (showCreatePage) {
            return (
                <div>
                    <DecIncCreateForm {...decIncCreateFormProps} />
                    <DecIncCreateItem {...decIncCreateItemGridProps} />
                </div>
            );
        }; if (showViewPage) {
            return (
                <div>
                    <DecIncView {...decIncViewProps} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <DecIncSearchForm {...decIncSearchFormProps} />
                    <DecIncSearchGrid {...decIncSearchGridProps} />
                    <WMSProgress {...batchProcessDeleteDecIncBillProps} />
                    <WMSProgress {...batchProcessAuditDecIncBillProps} />
                </div>
            );
        };
    };

    return (<div className="content-inner">{RefreshWidget()}</div>)

};

DecInc.propTypes = {
    decinc: PropTypes.object,
    list: PropTypes.array,
    pagination: PropTypes.object,
    currentBill: PropTypes.object
};

function mapStateToProps({ decinc }) {
    return { decinc };
};

export default connect(mapStateToProps)(DecInc);

