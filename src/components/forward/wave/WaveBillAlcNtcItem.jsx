import React, { PropTypes } from 'react';
import { Table, Pagination } from 'antd';

function WaveBillAlcNtcItem({
	dataSource
}) {

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
                rowKey={record => record.uuid}
            />
        </div>
    );
};

WaveBillAlcNtcItem.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    pagination: PropTypes.any
};

export default WaveBillAlcNtcItem;