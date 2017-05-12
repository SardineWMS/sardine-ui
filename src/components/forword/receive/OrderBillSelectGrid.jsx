import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function OrderBillSelectGrid({
  dataSource,
    onPageChange,
    selectedRowKeys = [],
    onSelect,
}) {

    function handleSelect() {
        onSelect(selectedRowKeys);
    }

    const columns = [{
        title: '单号',
        dataIndex: 'billNumber',
        key: 'billNumber',
        sorter: true,
    },
    {
        title: '供应商',
        dataIndex: 'supplierCodeName',
        key: 'supplierCodeName',
    },
    {
        title: '来源单据',
        dataIndex: 'sourceBillNumber',
        key: 'sourceBillNumber',
    },
    {
        title: '仓位',
        dataIndex: 'wrhCodeName',
        key: 'wrhCodeName',
    },
    {
        title: '状态',
        dataIndex: 'stateName',
        key: 'stateName',
    },
    {
        title: '总件数',
        dataIndex: 'totalCaseQtyStr',
        key: 'totalCaseQtyStr',
    },
    {
        title: '到效日期',
        dataIndex: 'expireDateFormat',
        key: 'expireDateFormat',
    },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log("onChange...");
            console.dir(selectedRowKeys);
            console.dir(selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log("onSelect...");
            selectedRowKeys = selectedRows;
            console.dir(selectedRowKeys);
            console.dir(selectedRows);
            handleSelect();
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log("onSelectAll...");
            selectedRowKeys = selectedRows;
            console.dir(selectedRowKeys);
            console.dir(selectedRows);
        },
        getCheckboxProps: record => ({

        }),
    };

    return (
        <div>
            <Table
                size="small"
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={dataSource}
                onChange={onPageChange}
                rowKey={record => record.uuid} />
        </div>
    )
}

OrderBillSelectGrid.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    onRemoveBatch: PropTypes.func,
    onRecoverBatch: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onRecover: PropTypes.func,
    onCreate: PropTypes.func,
    onViewItem: PropTypes.func,
}

export default OrderBillSelectGrid;