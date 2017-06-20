import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';

function CustomerSelectGrid({
	onSelect,
  dataSource,
  onPageChange,
  customers = []
}) {

  function handleSelect() {
    onSelect(customers);
  };

  const columns = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    onSelect: (record, selected, selectedRows) => {
      customers = selectedRows;
      handleSelect();
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      customers = selectedRows;
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
};

CustomerSelectGrid.propTypes = {
  onPageChange: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
};

export default CustomerSelectGrid;