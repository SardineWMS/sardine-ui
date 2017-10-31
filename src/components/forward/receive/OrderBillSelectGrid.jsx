import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function OrderBillSelectGrid({
    dataSource,
    onPageChange,
    onSelect
}) {
    function convertState(text) {
        if (text == "Initial")
            return "初始";
        if (text == "PreBookReg")
            return "已预约";
        if (text == "PreChecked")
            return "已预检";
        if (text == "InProgress")
            return "进行中";
        if (text == "Finished")
            return "已完成";
        if (text == "Aborted")
            return "已作废";
    };

    function handleSelect(record) {
        onSelect(record);
    };

    const columns = [{
        title: '单号',
        dataIndex: 'billNumber',
        key: 'billNumber',
        sorter: true
    },
    {
        title: '供应商',
        dataIndex: 'supplierCodeName',
        key: 'supplierCodeName'
    },
    {
        title: '来源单据',
        dataIndex: 'sourceBillNumber',
        key: 'sourceBillNumber'
    },
    {
        title: '仓位',
        dataIndex: 'wrhCodeName',
        key: 'wrhCodeName'
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: text => convertState(text)
    },
    {
        title: '总件数',
        dataIndex: 'totalCaseQtyStr',
        key: 'totalCaseQtyStr'
    },
    {
        title: '到效日期',
        dataIndex: 'expireDateFormat',
        key: 'expireDateFormat'
    }
    ];

    return (
        <div>
            <Table
                size="small"
                bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                rowKey={record => record.uuid}
                filterMultiple={false}
                onRowClick={(record) => handleSelect(record)}
            />
        </div>
    );
};

OrderBillSelectGrid.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    onRemoveBatch: PropTypes.func,
    onRecoverBatch: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onRecover: PropTypes.func,
    onCreate: PropTypes.func,
    onViewItem: PropTypes.func
};

export default OrderBillSelectGrid;