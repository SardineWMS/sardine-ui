import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function ReceiveBillItemGrid_View({
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
            title: '商品代码',
            dataIndex: 'article.code',
            key: 'articleCode',
            render: (text, record) => <p><a onClick={() => onViewItem(record)}>{text}</a></p>,
        },
        {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName',
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
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
            title: '容器',
            dataIndex: 'containerBarCode',
            key: 'containerBarCode',
        },
        {
            title: '货位',
            dataIndex: 'binCode',
            key: 'binCode',
        },
        {
            title: '生产日期',
            dataIndex: 'produceDate',
            key: 'produceDate',
            render: text => moment(text).format('YYYY-MM-DD')
        },
        {
            title: '到效期',
            dataIndex: 'validDate',
            key: 'validDate',
            render: text => moment(text).format("YYYY-MM-DD")
        },
        {
            title: '批次',
            dataIndex: 'stockBatch',
            key: 'stockBatch',
        },
        {
            title: '损溢原因',
            dataIndex: 'reason',
            key: 'reason',
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

ReceiveBillItemGrid_View.propTypes = {
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

export default ReceiveBillItemGrid_View;