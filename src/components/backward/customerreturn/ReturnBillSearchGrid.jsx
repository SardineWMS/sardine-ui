import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import hasPermission from '../../../utils/PermissionUtil';

function ReturnBillGrid({
  dataSource,
  onPageChange,
  onRemoveBatch,
  onRecoverBatch,
  onAuditBatch,
  onCreate,
  onViewItem,
  pagination,
  selectedRowKeys = []
}) {

  function handleRemoveBatch() {
    onRemoveBatch(selectedRowKeys);
  };
  function handleAuditBatch() {
    onAuditBatch(selectedRowKeys);
  };

  function convertState(text) {
    if (text == "initial")
      return '初始';
    if (text == "inProgress")
      return '进行中';
    if (text == 'finished')
      return '已完成';
  };

  function convertMethod(text) {
    if (text == "ManualBill")
      return '手工单据';
    if (text == 'APP')
      return 'APP';
  };

  const columns = [{
    title: '单号',
    dataIndex: 'billNumber',
    key: 'billNumber',
    render: (text, record) => <a onClick={() => { onViewItem(record) }} disabled={!hasPermission("storeRtnBill:view")}>{text}</a>,
    sorter: true,
    width: 180
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
    width: 100
  },
  {
    title: '退仓通知单',
    dataIndex: 'returnNtcBillNumber',
    key: 'returnNtcBillNumber',
    width: 200
  },
  {
    title: '客户',
    dataIndex: 'customer',
    key: 'customer',
    render: (text, record) => "[" + text.code + "]" + text.name
  },
  {
    title: '仓位',
    dataIndex: 'wrh',
    key: 'wrh',
    render: (text, record) => "[" + text.code + "]" + text.name
  },
  {
    title: '单据类型',
    dataIndex: 'operateMethod',
    key: 'operateMethod',
    render: text => convertMethod(text)
  },
  {
    title: '退仓员',
    dataIndex: 'returnor',
    key: 'returnor',
    render: (text, record) => "[" + text.code + "]" + text.name
  },];

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
        pagination={pagination}
        rowKey={record => record.uuid}
        title={() =>
          <div>
            <Row type="flex">
              <Col><Button onClick={() => onCreate()} disabled={!hasPermission("storeRtnBill:create")}>新建</Button></Col>
              <Col><Button type="ghost" onClick={handleRemoveBatch} disabled={!hasPermission("storeRtnBill:delete")}>删除</Button></Col>
              <Col><Button type="ghost" onClick={handleAuditBatch} disabled={!hasPermission("storeRtnBill:edit")}>审核</Button></Col>
              <Col><span style={{ marginLeft: 8 }}>{selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
            </Row>
          </div>} />
    </div>
  );
};

ReturnBillGrid.propTypes = {
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onRemoveBatch: PropTypes.func,
  onRecoverBatch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRecover: PropTypes.func,
  onCreate: PropTypes.func,
  onViewItem: PropTypes.func,
  pagination: PropTypes.any
};

export default ReturnBillGrid;