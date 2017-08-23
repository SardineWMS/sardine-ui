import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function ShipBillContainerStockForm({
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
            title: '商品',
            dataIndex: 'article',
            key: 'article',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            render: (text, record) =>  record.qpcStr + "，" + record.spec
        },
        {
            title: '计量单位',
            dataIndex: 'munit',
            key: 'munit'
        },
        {
            title: '配单/领用单',
            dataIndex: 'sourceBill',
            key: 'sourceBill',
            render: (text, record) =>  text.billNumber
        },
        {
            title: '货位',
            dataIndex: 'binCode',
            key: 'binCode'
        },
        {
            title: '容器',
            dataIndex: 'containerBarcode',
            key: 'containerBarcode'
        },
        {
            title: '生产日期',
            dataIndex: 'productionDate',
            key: 'productionDate',
            render: text => moment(text).format('YYYY-MM-DD')
        },
        {
            title: '到效期',
            dataIndex: 'validDate',
            key: 'validDate',
            render: text => moment(text).format('YYYY-MM-DD')
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

ShipBillContainerStockForm.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    pagination: PropTypes.any
};

export default ShipBillContainerStockForm;