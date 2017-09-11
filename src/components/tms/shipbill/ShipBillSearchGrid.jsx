import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

function ShipBillSearchGrid({
  loading,
    dataSource,
    pagination,
    onPageChange,
    onViewShipBill,
    onViewVehicle,
    onFinishBatch,
    selectedRowKeys = [],
    onCreate
}) {

    function handlerFinishBatch() {
        onFinishBatch(selectedRowKeys);
    };

    function converState(text) {
        if (text == "Initial")
            return "初始";
        if (text == "InProgress")
            return "装车中";
        if (text == "Finished")
            return "已完成";
    };

    const columns =
        [
            {
                title: '单号',
                dataIndex: 'billNumber',
                key: 'billNumber',
                render: (text, record) => <a onClick={() => { onViewShipBill(record.uuid) }}>{text}</a>,
                sorter: true
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: text => converState(text),
                sorter: true
            },
            {
                title: '车牌号',
                dataIndex: 'vehicleNum',
                key: 'vehicleNum',
                render: (text, record) => <a onClick={() => { onViewVehicle(record) }}>{text}</a>,
                sorter: true
            },
            {
                title: '单据类型',
                dataIndex: 'method',
                key: 'method',
                render: text => 'ManualBill' ? "手持终端" : "APP"
            },
            {
                title: '配送方式',
                dataIndex: 'type',
                key: 'type',
                render: text => 'warehouse' ? "仓库送" : "自提"
            },
            {
                title: '司机',
                dataIndex: 'driver',
                key: 'driver',
                render: text => ("[" + text.code + "]" + text.name)
            },
            {
                title: '客户数',
                dataIndex: 'customerCount',
                key: 'customerCount'
            },
            {
                title: '总件数',
                dataIndex: 'totalCaseQty',
                key: 'totalCaseQty'
            },
            {
                title: '容器数',
                dataIndex: 'containerCount',
                key: 'containerCount'
            }
        ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        },
        onSelect: (record, selected, selectedRows) => {
            selectedRowKeys = selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            selectedRowKeys = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
        })
    };

    return (
        <div>
            <Table size="small" bordered rowSelection={rowSelection}
                columns={columns}
                title={
                    () =>
                        <div>
                            <Button onClick={handlerFinishBatch} disabled={(!PermissionUtil("shipBill:finish"))}> 批量完成</Button>
                            &nbsp;
                            <Button onClick={() => onCreate()}>新建</Button>
                        </div>
                }
                dataSource={dataSource}
                loading={loading}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={record => record.uuid}
            />
        </div>
    );
};

ShipBillSearchGrid.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onViewShipBill: PropTypes.func,
    onViewVehicle: PropTypes.func,
    onFinishBatch: PropTypes.func,
};

export default ShipBillSearchGrid;