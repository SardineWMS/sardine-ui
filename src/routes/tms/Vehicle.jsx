import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';

import VehicleSearchForm from '../../components/tms/vehicle/VehicleSearchForm';
import VehicleSearchGrid from '../../components/tms/vehicle/VehicleSearchGrid';
import VehicleTypeModal from '../../components/tms/vehicle/VehicleTypeModal';
import VehicleCreate from '../../components/tms/vehicle/VehicleCreate';
import VehicleView from '../../components/tms/vehicle/VehicleView';
import WMSProgress from '../../components/Widget/WMSProgress';

function Vehicle({ location, dispatch, vehicle }) {
    const {
        showPage,
        vehicleTypeModalVisible,
        vehicleTypeList,
        currentItem,
        carrierList,
        list,
        batchOnlineProcessModal,
        batchOfflineProcessModal,
        onlineVehicleEntitys,
        offlineVehicleEntitys,
        vehicleNext,
        pagination
    } = vehicle;

    const vehicleSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch(routerRedux.push({
                pathname: '/tms/vehicle',
                query: {
                    ...fieldsValue
                }
            }));
        }
    };

    const vehicleSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/tms/vehicle',
                query: {
                    ...location.query,
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onCreateVehicleType() {
            dispatch({
                type: 'vehicle/queryVehicleType',
                payload: {}
            });
        },
        onCreate() {
            dispatch({
                type: 'vehicle/showCreate',
            });
        },
        onViewItem(record) {
            dispatch({
                type: 'vehicle/onViewItem',
                payload: {
                    currentItem: record
                }
            });
        },
        onOnlineBatch(vehicles) {
            if (vehicles.length <= 0) {
                message.warning("请选择要启用的车辆", 2, '');
                return;
            };
            dispatch({
                type: 'vehicle/batchOnlineVehicle',
                payload: {
                    onlineVehicleEntitys: vehicles
                }
            });
        },
        onOfflineBatch(vehicles) {
            if (vehicles.length <= 0) {
                message.warning("请选择要停用的车辆", 2, '');
                return;
            };
            dispatch({
                type: 'vehicle/batchOfflineVehicle',
                payload: {
                    offlineVehicleEntitys: vehicles
                }
            });
        }
    };

    const vehicleTypeModaProps = {
        dataSource: vehicleTypeList,
        visible: vehicleTypeModalVisible,
        onCancel() {
            dispatch({
                type: 'vehicle/hideVehicleTypeModal'
            });
        },
        onAdd() {
            dispatch({
                type: 'vehicle/addVehicleTypeLine'
            });
        },
        onSave(record) {
            if (record.code == null || record.code == '') {
                message.error("代码不能为空", 2);
                return;
            } else if (record.code.length > 30) {
                message.error("代码最大长度是30！", 2);
                return;
            };
            if (record.name == null || record.name == '') {
                message.error("名称不能为空", 2);
                return;
            } else if (record.name.length > 100) {
                message.error("名称最大长度是100！", 2);
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.bearWeight) == false) {
                message.error("承重输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.weight) == false) {
                message.error("自重输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.length) == false) {
                message.error("长输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.width) == false) {
                message.error("宽输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.height) == false) {
                message.error("高输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.volume) == false) {
                message.error("体积输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (/^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/.test(record.bearVolume) == false) {
                message.error("容积输入不正确，最大长度12，保留三位小数");
                return;
            };
            if (record.uuid === undefined)
                dispatch({
                    type: 'vehicle/insertVehicleType',
                    payload: record
                });
            else
                dispatch({
                    type: 'vehicle/updateVehicleType',
                    payload: record
                });
        },
        onEdit(record) {
            record.editable = true;
            dispatch({
                type: 'vehicle/queryVehicleTypeSuccess',
                payload: record
            });
        },
        onCancelEdit(record) {
            record.editable = false;
            dispatch({
                type: 'vehicle/queryVehicleType',
                payload: record
            });
        },
        onDelete(record) {
            dispatch({
                type: 'vehicle/deleteVehicleType',
                payload: record
            });
        }
    };

    const vehicleCreateProps = {
        item: currentItem,
        carrierList: carrierList,
        vehicleTypeList: vehicleTypeList,
        onCancel() {
            dispatch({
                type: 'vehicle/query',
                payload: {}
            });
        },
        handleSave(data) {
            currentItem.code = data.code;
            currentItem.vehicleNo = data.vehicleNo;
            currentItem.vehicleType = {};
            currentItem.vehicleType.uuid = data.vehicleType;
            currentItem.carrier = {};
            currentItem.carrier.uuid = data.carrier;
            currentItem.remark = data.remark;
            currentItem.driver = data.driver;
            if (currentItem.uuid) {
                dispatch({
                    type: 'vehicle/update',
                    payload: currentItem,
                });
            } else {
                dispatch({
                    type: 'vehicle/insert',
                    payload: currentItem,
                });
            };
        }
    };

    const vehicleViewProps = {
        item: currentItem,
        onBack() {
            dispatch({
                type: 'vehicle/query',
                payload: {}
            });
        },
        showEdit(item) {
            dispatch({
                type: 'vehicle/showEdit',
                payload: item
            });
        },
        onOnline(item) {
            dispatch({
                type: 'vehicle/online',
                payload: item
            });
        },
        onOffline(item) {
            dispatch({
                type: 'vehicle/offline',
                payload: item
            });
        }
    };

    const batchProcessOnlineVehicleProps = {
        showConfirmModal: batchOnlineProcessModal,
        records: onlineVehicleEntitys ? onlineVehicleEntitys : [],
        next: vehicleNext,
        actionText: '启用',
        entityCaption: '车辆',
        batchProcess(entity) {
            dispatch({
                type: 'vehicle/gridOnline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'vehicle/hideOnlineVehicleModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'vehicle/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessOfflineVehicleProps = {
        showConfirmModal: batchOfflineProcessModal,
        records: offlineVehicleEntitys ? offlineVehicleEntitys : [],
        next: vehicleNext,
        actionText: '停用',
        entityCaption: '车辆',
        batchProcess(entity) {
            dispatch({
                type: 'vehicle/gridOffline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'vehicle/hideOfflineVehicleModal',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'vehicle/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const VehicleTypeModalGen = () => <VehicleTypeModal {...vehicleTypeModaProps} />;

    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div><VehicleView {...vehicleViewProps} /></div>;
                        case 'create':
                            return <div><VehicleCreate {...vehicleCreateProps} /></div>
                        default: {
                            return (
                                <div>
                                    <VehicleSearchForm {...vehicleSearchFormProps} />
                                    <VehicleSearchGrid {...vehicleSearchGridProps} />
                                    <VehicleTypeModal {...vehicleTypeModaProps} />
                                    <WMSProgress {...batchProcessOnlineVehicleProps} />
                                    <WMSProgress {...batchProcessOfflineVehicleProps} />
                                </div>
                            )
                        }
                    }
                })()
            }
        </div>
    );
};

Vehicle.propType = {
    vehicle: PropTypes.object
};

function mapStateToProps({ vehicle }) {
    return {
        vehicle
    };
};

export default connect(mapStateToProps)(Vehicle);