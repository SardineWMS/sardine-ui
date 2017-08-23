import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';

function ShipBillCustomerItemForm({
	dataSource,
    onPageChange,
    pagination
}) {

    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line'
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '顺序',
            dataIndex: 'orderNo',
            key: 'orderNo'
        },
        {
            title: '装车员',
            dataIndex: 'shiper',
            key: 'shiper',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '总体积',
            dataIndex: 'totalVolume',
            key: 'totalVolume'
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

    return (
        <div>
            <Table size="small" bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={record => record.uuid}
            />
        </div>
    );
};

ShipBillCustomerItemForm.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    pagination: PropTypes.any
};

export default ShipBillCustomerItemForm;