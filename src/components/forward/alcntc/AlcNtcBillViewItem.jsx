import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function AlcNtcBillViewItem({
	dataSource,
    pagination,
    onPageChange,
}) {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    }

    function handleRemoveBatch() {
        onRemoveBatch(suppliers);
    }

    function handleRecoverBatch() {
        onRecoverBatch(suppliers);
    }

    function handleChange(record, value, key) {
        if (key === 'produceDate') {
            record.produceDate = value;
            calculateValidDate();
        }
        if (key === 'receivedQty')
            record.receivedQty = value;

        if (key === 'validDate')
            record.validDate = value;
        if (key === 'containerBarcode')
            record.containerBarcode = value;
    }

    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line',
        },
        {
            title: '商品',
            dataIndex: 'article',
            key: 'article',
            render: (text, record) => "[" + text.code + "]" + text.name,
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
        },
        {
            title: '单位',
            dataIndex: 'munit',
            key: 'munit',
        },
        {
            title: '数量',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: '件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr',
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '计划数量',
            dataIndex: 'planQty',
            key: 'planQty',
        },
        {
            title: '计划件数',
            dataIndex: 'planCaseQtyStr',
            key: 'planCaseQtyStr',
        },
        {
            title: '实际数量',
            dataIndex: 'realQty',
            key: 'realQty',
        },
        {
            title: '实际件数',
            dataIndex: 'realCaseQtyStr',
            key: 'realCaseQtyStr',
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
    )
}

AlcNtcBillViewItem.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onCreate: PropTypes.func,
    onRecoverBatch: PropTypes.func,
    onRemoveBatch: PropTypes.func,
    onViewItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
}

export default AlcNtcBillViewItem;