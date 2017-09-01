import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';

function WaveBillViewItem({
	dataSource,
    pagination,
    onPageChange
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
    function convertState(text) {
        if (text == "initial")
            return '初始';
        if (text == "aborted")
            return '已作废';
        if (text == "inAlc")
            return '待配送';
        if (text == 'inSorting')
            return '分拣中';
        if (text == 'finished')
            return '已完成';
        if (text == 'inProgress')
            return '配送中';
        if (text == 'handover')
            return '已交接';
        if (text == 'used')
            return '已使用';
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
            key: 'line',
            render: (text, record, index) => index + 1
        },
        {
            title: '出库通知单单号',
            dataIndex: 'ntcBillNumber',
            key: 'ntcBillNumber',
        },
        {
            title: '状态',
            dataIndex: 'ntcBillState',
            key: 'ntcBillState',
            render: (text, record) => convertState(text)
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
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

WaveBillViewItem.propTypes = {
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

export default WaveBillViewItem;