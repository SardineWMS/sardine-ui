import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import hasPermission from '../../../utils/PermissionUtil';

function CustomerGrid({
  dataSource,
  onPageChange,
  onRemoveBatch,
  onRecoverBatch,
  onEdit,
  onDelete,
  onRecover,
  onCreate,
  onViewItem,
  selectedRowKeys = []
}) {
  
  function handleRemoveBatch() {
    onRemoveBatch(selectedRowKeys);
  };
  function handleRecoverBatch() {
    onRecoverBatch(selectedRowKeys);
  };

  const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
            sorter: true,
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <p>
                    <a onClick={() => { onEdit(record) }}>编辑</a>
                    &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record)} >
                        <a disabled={record.state === "已删除"}>删除</a>
                    </Popconfirm>
                    <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(record)}>
                        <a disabled={record.state === "正常"}>恢复</a>
                    </Popconfirm>
                </p>
            )
        }];

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
        rowSelection={rowSelection}
        dataSource={dataSource}
        onChange={onPageChange}
        rowKey={record => record.uuid}
        title={() =>
                <div>
                    <Row type="flex">
                       <Col><Button type="ghost" onClick={handleRemoveBatch} disabled={!hasPermission("customer:delete")}>批量删除</Button></Col>
                       <Col><Button type="ghost" onClick={handleRecoverBatch}>批量恢复</Button></Col>
                       <Col><Button onClick={onCreate}>新建</Button></Col>
                       <Col><span style={{ marginLeft: 8 }}>{selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                    </Row>
                </div>} />
    </div>
  )
}

CustomerGrid.propTypes = {
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onRemoveBatch: PropTypes.func,
  onRecoverBatch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRecover: PropTypes.func,
  onCreate: PropTypes.func,
  onViewItem: PropTypes.func,
}

export default CustomerGrid;