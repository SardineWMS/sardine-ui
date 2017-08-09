import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';

function SupplierSerachGrid({
	onSelect,
    dataSource,
    onPageChange,
    suppliers = []
}) {

    function handleSelect() {
        onSelect(suppliers);
    };

    const columns = [
        {
            title: '代码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
        },
        onSelect: (record, selected, selectedRows) => {
            suppliers = selectedRows;
            handleSelect();
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            suppliers = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
        })
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
    );
}

SupplierSerachGrid.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any
};

export default SupplierSerachGrid;