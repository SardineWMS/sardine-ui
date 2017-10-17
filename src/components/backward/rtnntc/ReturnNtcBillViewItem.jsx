import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function ReturnNtcBillViewItem({
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

    function handleChange(record, value, key) {
        if (key === 'produceDate') {
            record.produceDate = value;
            calculateValidDate();
        };
        if (key === 'receivedQty')
            record.receivedQty = value;

        if (key === 'validDate')
            record.validDate = value;
        if (key === 'containerBarcode')
            record.containerBarcode = value;
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
            key: 'articleCode',
        },
        {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName',
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
            title: '已退数量',
            dataIndex: 'realQty',
            key: 'realQty'
        },
        {
            title: '已退件数',
            dataIndex: 'realCaseQtyStr',
            key: 'realCaseQtyStr'
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
            dataIndex: 'reason',
            key: 'reason'
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

ReturnNtcBillViewItem.propTypes = {
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

export default ReturnNtcBillViewItem;