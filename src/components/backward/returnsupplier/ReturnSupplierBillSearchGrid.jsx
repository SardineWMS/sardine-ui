import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function ReturnSupplierBillSearchGrid({
    loading,
    dataSource,
    pagination,
    onPageChange,
    onViewReturnSupplierBill,
    onFinishBatch,
    selectedRowKeys = []
}) {

    function handlerFinishBatch() {
        onFinishBatch(selectedRowKeys);
    };

    function converState(text) {
        if (text == "Initial")
            return "初始";
        if (text == "InProgress")
            return "进行中";
        if (text == "Finished")
            return "已完成";
    };

    const columns =
        [
            {
                title: '单号',
                dataIndex: 'billNumber',
                key: 'billNumber',
                render: (text, record) => <a onClick={() => { onViewReturnSupplierBill(record.uuid) }}>{text}</a>,
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
                title: '退货通知单',
                dataIndex: 'rtnSupplierNtcBillNumber',
                key: 'rtnSupplierNtcBillNumber',
                render: (text, record) => <a onClick={() => { onViewReturnSupplierBill(record) }}>{text}</a>,
                sorter: true
            },
            {
                title: '供应商',
                dataIndex: 'supplier',
                key: 'supplier',
                render: text => ("["+text.code+"]"+text.name)
            },
            {
                title: '仓位',
                dataIndex: 'wrh',
                key: 'wrh',
                render: text => ("["+text.code+"]"+text.name)
            },
            {
                title: '单据类型',
                dataIndex: 'method',
                key: 'method',
                render: text => 'ManualBill' ? "手持终端" : "APP"
            },
            {
                title: '退货日期',
                dataIndex: 'returnSupplierDate',
                key: 'returnSupplierDate',
                render: text => moment(text).format('YYYY-MM-DD')
            },
            {
                title: '退货员',
                dataIndex: 'returner',
                key: 'returner',
                render: text => ("["+text.code+"]"+text.name)
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
                            <Button onClick={handlerFinishBatch} disabled={(!PermissionUtil("returnSupplierBill:finish"))}> 完成</Button>
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

ReturnSupplierBillSearchGrid.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onViewReturnSupplierBill: PropTypes.func,
    onFinishBatch: PropTypes.func,
};

export default ReturnSupplierBillSearchGrid;