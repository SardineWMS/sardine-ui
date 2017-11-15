import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function ReturnBillViewItem({
	dataSource,
    pagination,
    onPageChange,
    onCreate,
    onViewItem,
    onEditItem,
    onRemoveItem,
    onRecoverItem,
    onRemoveBatch,
    onRecoverBatch,
    onCancelEdit,
    onAddItem,
    onSave,
    calculateValidDate
}) {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    };

    function handleRemoveBatch() {
        onRemoveBatch(suppliers);
    };

    function handleRecoverBatch() {
        onRecoverBatch(suppliers);
    };

    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line'
        },
        {
            title: '商品代码',
            dataIndex: 'article.code',
            key: 'articleCode'
        },
        {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName'
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
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            render: (text, record) => "[" + text.code + "]" + text.name
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
            title: '退仓类型',
            dataIndex: 'returnType',
            key: 'returnType',
            render: text => text == 'goodReturn' ? '好退' : '退供应商'
        },
        {
            title: '生产日期',
            dataIndex: 'productionDate',
            key: 'productionDate',
            render: text => moment(text).format("YYYY-MM-DD")
        },
        {
            title: '到效期',
            dataIndex: 'validDate',
            key: 'validDate',
            render: text => moment(text).format("YYYY-MM-DD")
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

ReturnBillViewItem.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onCreate: PropTypes.func,
    onRecoverBatch: PropTypes.func,
    onRemoveBatch: PropTypes.func,
    onViewItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onRemoveItem: PropTypes.func
};

export default ReturnBillViewItem;