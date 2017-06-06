import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function CategorySelectGrid({
    dataSource,
    onPageChange,
    selectedRowKeys = [],
    onSelect,
}) {
    function handleSelect() {
        onSelect(selectedRowKeys);
    }

    const columns = [{
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        sorter: true,
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        },
        onSelect: (record, selected, selectedRows) => {
            selectedRowKeys = selectedRows;
            handleSelect();
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            selectedRowKeys = selectedRows;
            if (selectedRowKeys.length > 1)
                message.error('最多只能选择一条！');
        },
        getCheckboxProps: record => ({

        }),
    };

    return (
        <div>
            <Table
                size="small"
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={dataSource}
                onChange={onPageChange}
                rowKey={record => record.uuid}
                filterMultiple={false}
            />
        </div>
    )
}

CategorySelectGrid.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func
}

export default CategorySelectGrid;