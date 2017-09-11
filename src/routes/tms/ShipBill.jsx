import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';

import ShipBillSearchForm from '../../components/tms/shipbill/ShipBillSearchForm';
import ShipBillSearchGrid from '../../components/tms/shipbill/ShipBillSearchGrid';
import ShipBillViewForm from '../../components/tms/shipbill/ShipBillViewForm';
import ShipBillCreateForm from '../../components/tms/shipbill/ShipBillCreateForm';
import ShipBillCreateItem from '../../components/tms/shipbill/ShipBillCreateItem';
import ShipBillCreateItemModal from '../../components/tms/shipbill/ShipBillCreateItemModal';
import WMSProgress from '../../components/Widget/WMSProgress';
import DriverSelectGrid from '../../components/widget/DriverSelectGrid';
import VehicleSelectGrid from '../../components/widget/VehicleSelectGrid';

function ShipBill({ location, dispatch, shipBill }) {
    const { list, pagination, currentShipBill, finishShipBillEntitys,
        batchFinishProcessModal, shipBillNext, showPage, showCarrierModal, showDriverModal, billItems, showVehicleModal, showCreateItemModal
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
        },
        onCreate() {
            dispatch({
                type: 'shipBill/showCreate',
                payload: { billItems }
            })
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
        shipBill: currentShipBill,
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
        },
        onEdit() {
            dispatch({
                type: 'shipBill/showEdit',
                payload: currentShipBill
            })
        }
    };

    const shipBillCreateFormProps = {
        item: currentShipBill,
        onCarrierSelect() {
            dispatch({
                type: 'shipBill/showCarrierModal'
            })
        },
        onDriverSelect() {
            dispatch({
                type: 'shipBill/showDriverModal'
            })
        },
        onVehicleSelect() {
            dispatch({
                type: 'shipBill/showVehicleModal'
            })
        },
        handleSave(data) {
            data.containerStocks = billItems;
            data.customerItems = [];
            if (data.uuid)
                dispatch({
                    type: 'shipBill/saveModify',
                    payload: data
                })
            else
                dispatch({
                    type: 'shipBill/saveNew',
                    payload: data
                })
        },
        onCancel() {
            dispatch({
                type: 'shipBill/query'
            })
        }
    };

    const driverSelectGridProps = {
        visible: showDriverModal,
        onCancel() {
            dispatch({
                type: 'shipBill/hideDriverModal'
            })
        },
        onSelect(data) {
            const driver = {};
            driver.uuid = data.uuid;
            driver.code = data.code;
            driver.name = data.name;
            currentShipBill.driver = driver;
            dispatch({
                type: 'shipBill/hideDriverModal',
                payload: { currentShipBill: currentShipBill }
            })
        }
    };

    const vehicleSelectGridProps = {
        visible: showVehicleModal,
        onCancel() {
            dispatch({
                type: 'shipBill/hideVehicleModal'
            })
        },
        onSelect(data) {
            let vehicleNum = "";
            vehicleNum = data.vehicleNo;
            const carrier = data.carrier;
            currentShipBill.carrier = carrier;
            currentShipBill.vehicleNum = vehicleNum
            dispatch({
                type: 'shipBill/hideVehicleModal',
                payload: { currentShipBill: currentShipBill }
            })
        }
    };

    const shipBillCreateItemProps = {
        dataSource: billItems,
        onAddItem() {
            dispatch({
                type: 'shipBill/showAddItem',
                payload: billItems
            })
        },
        calculateCaseQtyStr(record, list) {
            dispatch({
                type: 'shipBill/calculateCaseQtyStr',
                payload: {
                    record, list, currentShipBill
                }
            })
        },
        onRemoveBatch(lists) {
            dispatch({
                type: 'shipBill/removeBatch',
                payload: { lists, billItems, currentShipBill }
            })
        }
    };

    const shipBillCreateItemModalProps = {
        visible: showCreateItemModal,
        onCancel() {
            dispatch({
                type: 'shipBill/hideAddItemModal'
            })
        },
        onOk(records) {
            dispatch({
                type: 'shipBill/selectItems',
                payload: {
                    list: records,
                    currentShipBill,
                    billItems
                }
            })
        }
    }

    function refreshWidget() {
        if (showPage === "view") {
            return (<div> <ShipBillViewForm {...shipBillViewFormProps} /> </div>)
        } else {
            return (<div>
                <ShipBillSearchForm {...shipBillSearchFormProps} />
                <ShipBillSearchGrid {...shipBillSearchGridProps} />
                <WMSProgress {...batchProcessFinishShipBillProps} />
            </div>);
        }
    };

    const ShipBillCreateItemGen = () => <ShipBillCreateItem {...shipBillCreateItemProps} />;

    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div><ShipBillViewForm {...shipBillViewFormProps} /></div>
                        case 'create':
                            return <div>
                                <ShipBillCreateForm {...shipBillCreateFormProps} />
                                <ShipBillCreateItemGen />
                                <DriverSelectGrid {...driverSelectGridProps} />
                                <VehicleSelectGrid {...vehicleSelectGridProps} />
                                <ShipBillCreateItemModal {...shipBillCreateItemModalProps} />
                            </div>

                        default:
                            return <div>
                                <ShipBillSearchForm {...shipBillSearchFormProps} />
                                <ShipBillSearchGrid {...shipBillSearchGridProps} />
                                <WMSProgress {...batchProcessFinishShipBillProps} />
                            </div>
                    }
                })()
            }
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