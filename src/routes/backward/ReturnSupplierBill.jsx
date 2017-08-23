import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import ReturnSupplierBillSearchForm from '../../components/backward/returnsupplier/ReturnSupplierBillSearchForm';
import ReturnSupplierBillSearchGrid from '../../components/backward/returnsupplier/ReturnSupplierBillSearchGrid';
import ReturnSupplierBillViewForm from '../../components/backward/returnsupplier/ReturnSupplierBillViewForm';
import WMSProgress from '../../components/Widget/WMSProgress';

function ReturnSupplierBill({ location, dispatch, returnSupplierBill }) {
    const { list, pagination, currentReturnSupplierBill, finishReturnSupplierBillEntitys,
        batchFinishProcessModal,returnSupplierBillNext,showPage,wrhs
} = returnSupplierBill;

    const returnSupplierBillSearchFormProps = {
        wrhs:wrhs,
        queryWrhs() {
            dispatch({
                type: 'returnSupplierBill/queryWrhs'
            });
        },
        onSearch(fieldsValue) {
         if (fieldsValue.returnSupplierDateGreaterThanOrEqualStr != null) {
                fieldsValue.returnSupplierDateGreaterThanOrEqualStr = moment(fieldsValue.returnSupplierDateGreaterThanOrEqualStr).format("YYYY-MM-DD");
            }
            if (fieldsValue.returnSupplierDateLessThanOrEqualStr != null) {
                fieldsValue.returnSupplierDateLessThanOrEqualStr = moment(fieldsValue.returnSupplierDateLessThanOrEqualStr).format("YYYY-MM-DD");
            }
            dispatch({
                type: 'returnSupplierBill/query',
                payload: fieldsValue
            });
        }
    };

    const returnSupplierBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch({
                type: 'returnSupplierBill/query',
                payload: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
                },
            })
        },
        onFinishBatch(returnSupplierBills) {
            if (returnSupplierBills.length <= 0) {
                message.warning("请选择要完成的供应商退货单", 2, '');
                return;
            };
            dispatch({
                type: 'returnSupplierBill/batchFinishReturnSupplierBill',
                payload: {
                    finishReturnSupplierBillEntitys: returnSupplierBills
                }
            });
        },
        onViewReturnSupplierBill(returnSupplierBillUuid) {
          dispatch({
            type: 'returnSupplierBill/get',
            payload: {
              uuid: returnSupplierBillUuid
            }
          });
        }
    };


    const batchProcessFinishReturnSupplierBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishReturnSupplierBillEntitys ? finishReturnSupplierBillEntitys : [],
        next: returnSupplierBillNext,
        actionText: '完成',
        entityCaption: '供应商退货单',
        batchProcess(entity) {
            dispatch({
                type: 'returnSupplierBill/gridFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'returnSupplierBill/hideFinishReturnSupplierBillModal',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'returnSupplierBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const returnSupplierBillViewFormProps = {
        returnSupplierBill:currentReturnSupplierBill,
        onBack() {
            dispatch({
                type: 'returnSupplierBill/backSearchForm'
            });
        },
        onFinish(entity) {
            dispatch({
                type: 'returnSupplierBill/itemFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version
                }
            });
        }
    };

    function refreshWidget() {
        if(showPage==="view"){
           return (<div> <ReturnSupplierBillViewForm {...returnSupplierBillViewFormProps} /> </div>)
        }else{
            return(<div>
                <ReturnSupplierBillSearchForm {...returnSupplierBillSearchFormProps} />
                <ReturnSupplierBillSearchGrid {...returnSupplierBillSearchGridProps} />
                <WMSProgress {...batchProcessFinishReturnSupplierBillProps} />
            </div>);
        }
    };

    return (
        <div className="content-inner">
            {refreshWidget()}
        </div>
    );
};

ReturnSupplierBill.propType = {
    returnSupplierBill: PropTypes.object
};

function mapStateToProps({ returnSupplierBill }) {
    return {
        returnSupplierBill
    };
};

export default connect(mapStateToProps)(ReturnSupplierBill);