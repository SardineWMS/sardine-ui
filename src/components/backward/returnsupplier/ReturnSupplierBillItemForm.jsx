import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function ReturnSupplierBillItemForm({
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
            title: '商品代码',
            dataIndex: 'article',
            key: 'articleCode',
            render: (text, record) =>  text.code 
        },
        {
            title: '商品名称',
            dataIndex: 'article',
            key: 'articleName',
            render: (text, record) => text.name
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            render: (text, record) =>  record.qpcStr + "，" + record.spec
        },
        {
            title: '单位',
            dataIndex: 'munit',
            key: 'munit'
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
            title: '数量',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: '件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr'
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
        },
        {
            title: '单价',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '退货日期',
            dataIndex: 'returnSupplierDate',
            key: 'returnSupplierDate',
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

ReturnSupplierBillItemForm.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    pagination: PropTypes.any
};

export default ReturnSupplierBillItemForm;