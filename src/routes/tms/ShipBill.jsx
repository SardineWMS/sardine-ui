import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';

import ShipBillSearchForm from '../../components/tms/shipbill/ShipBillSearchForm';
import ShipBillSearchGrid from '../../components/tms/shipbill/ShipBillSearchGrid';
import ShipBillViewForm from '../../components/tms/shipbill/ShipBillViewForm';
import WMSProgress from '../../components/Widget/WMSProgress';

function ShipBill({ location, dispatch, shipBill }) {
    const { list, pagination, currentShipBill, finishShipBillEntitys,
        batchFinishProcessModal,shipBillNext,showPage
} = shipBill;

    const shipBillSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'shipBill/query',
                payload: fieldsValue
            });
        }
    };

    const shipBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch({
                type: 'shipBill/query',
                payload: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
                },
            })
        },
        onFinishBatch(shipBills) {
            if (shipBills.length <= 0) {
                message.warning("请选择要完成的装车单", 2, '');
                return;
            };
            dispatch({
                type: 'shipBill/batchFinishShipBill',
                payload: {
                    finishShipBillEntitys: shipBills
                }
            });
        },
        onViewShipBill(shipBillUuid) {
          dispatch({
            type: 'shipBill/get',
            payload: {
              uuid: shipBillUuid
            }
          });
        },
        onViewVehicle(shipBill) {
          dispatch({
            type: 'shipBill/showViewPage',
            payload: {
              currentShipBill: shipBill
            }
          });
        }
    };


    const batchProcessFinishShipBillProps = {
        showConfirmModal: batchFinishProcessModal,
        records: finishShipBillEntitys ? finishShipBillEntitys : [],
        next: shipBillNext,
        actionText: '完成',
        entityCaption: '装车单',
        batchProcess(entity) {
            dispatch({
                type: 'shipBill/gridFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'shipBill/hideFinishShipBillModal',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'shipBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const shipBillViewFormProps = {
        shipBill:currentShipBill,
        onBack() {
            dispatch({
                type: 'shipBill/backSearchForm'
            });
        },
        onFinish(entity) {
            dispatch({
                type: 'shipBill/itemFinish',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version
                }
            });
        }
    };

    function refreshWidget() {
        if(showPage==="view"){
           return (<div> <ShipBillViewForm {...shipBillViewFormProps} /> </div>)
        }else{
            return(<div>
                <ShipBillSearchForm {...shipBillSearchFormProps} />
                <ShipBillSearchGrid {...shipBillSearchGridProps} />
                <WMSProgress {...batchProcessFinishShipBillProps} />
            </div>);
        }
    };

    return (
        <div className="content-inner">
            {refreshWidget()}
        </div>
    );
};

ShipBill.propType = {
    shipBill: PropTypes.object
};

function mapStateToProps({ shipBill }) {
    return {
        shipBill
    };
};

export default connect(mapStateToProps)(ShipBill);