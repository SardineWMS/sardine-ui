import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import styles from '../../Widget/EditTable.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function OrderBillViewItem({
	dataSource,
    pagination,
    onPageChange
}) {
    function converDate(text) {
		if (text == null || text == undefined)
			return null;
		return moment(text).format('YYYY-MM-DD');
	}

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
        },{
            title: '价格',
            dataIndex: 'price',
            key: 'price'
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
            title: '件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr'
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

OrderBillViewItem.propTypes = {
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

export default OrderBillViewItem;