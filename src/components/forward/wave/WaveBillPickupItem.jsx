import React, { PropTypes } from 'react';
import { Table, Pagination } from 'antd';

function WaveBillPickupItem({
    dataSource
}) {
    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            render: (text, record, index) => index + 1
        },
        {
            title: '单号',
            dataIndex: 'billNumber',
            key: 'billNumber'
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state'
        },
        {
            title: '商品',
            dataIndex: 'article',
            key: 'article',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '来源货位',
            dataIndex: 'fromBinCode',
            key: 'fromBinCode'
        },
        {
            title: '来源容器',
            dataIndex: 'fromContainerBarcode',
            dataIndex: 'fromContainerBarcode'
        },
        {
            title: '目标货位',
            dataIndex: 'toBinCode',
            key: 'toBinCode'
        },
        {
            title: '目标容器',
            dataIndex: 'toContainerBarcode',
            key: 'toContainerBarcode'
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr'
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
            title: '实际数量',
            dataIndex: 'realQty',
            key: 'realQty'
        },
        {
            title: '实际件数',
            dataIndex: 'realCaseQtyStr',
            key: 'realCaseQtyStr'
        },
        {
            title: '来源单据',
            dataIndex: 'sourceBill',
            key: 'sourceBill',
            render: (text, record) => "[" + text.billNumber + "]" + text.billType
        }
    ];

    return <Table size='small' bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.uuid}
    />
};

WaveBillPickupItem.propTypes = {
    dataSource: PropTypes.array
};

export default WaveBillPickupItem;