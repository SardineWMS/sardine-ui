import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function BaseGrid({
  columns,
  dataSource,
  onPageChange,
  rowkey,
  buttons,
  rowSelectioned,
  selectedRowKeys = []
}) {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    },
    onSelect: (record, selected, selectedRows) => {
      selectedRowKeys = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      selectedRowKeys = selectedRows;
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
        rowSelection={rowSelectioned ? rowSelection : null} 
        dataSource={dataSource}
        onChange={onPageChange}
        rowKey={rowkey}
        title={() =>
          <div>
            <Row type="flex">
              {buttons}
            </Row>
          </div>} />
    </div>
  )
}

export default BaseGrid;