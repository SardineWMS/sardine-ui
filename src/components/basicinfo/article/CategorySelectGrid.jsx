import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function CategorySelectGrid({
    dataSource,
    onPageChange,
    selectedRecord,
    onSelect,
    pagination
}) {
    function handleSelect() {
        onSelect(selectedRecord);
    }

    const columns = [{
        title: '代码',
        dataIndex: 'code',
        key: 'code',
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
            if (selected)
              selectedRecord = record;
            else 
              selectedRecord = {};
            handleSelect();
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            if (selectedRows.length > 1) {
                message.error('最多只能选择一条！');
                return;
            }
            if (selectedRows.length == 0) {
                message.error('没有可用的商品类别！');
                return;
            }
            selectedRecord = selectedRows[0];
            handleSelect();
        },
        getCheckboxProps: record => ({
            
        }),
    };

    const onRowClick = function (record, index) {
      selectedRecord = record;
      handleSelect();
    } 

    return (
        <div>
            <Table
                size="small"
                bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                pagination={false}
                rowKey={record => record.uuid}
                filterMultiple={false}
                scroll={{ x: 400, y: 300 }}
                onRowClick={onRowClick}
            />
        </div>
    )
}

CategorySelectGrid.propTypes = {
    dataSource: PropTypes.array,
    onPageChange: PropTypes.func,
    pagination: PropTypes.any
}

export default CategorySelectGrid;