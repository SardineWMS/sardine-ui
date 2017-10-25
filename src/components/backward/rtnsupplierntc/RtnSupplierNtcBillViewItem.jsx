import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function RtnSupplierNtcBillViewItem({
	dataSource,
    pagination,
    onPageChange,
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
            key: 'qpcStr'
        },
        {
            title: '单位',
            dataIndex: 'munit',
            key: 'munit'
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
            title: '已下架数量',
            dataIndex: 'unshelvedQty',
            key: 'unshelvedQty'
        },
        {
            title: '已下架件数',
            dataIndex: 'unshelvedCaseQtyStr',
            key: 'unshelvedCaseQtyStr'
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '退仓原因',
            dataIndex: 'rtnReason',
            key: 'rtnReason'
        },
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

RtnSupplierNtcBillViewItem.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
};

export default RtnSupplierNtcBillViewItem;