import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import hasPermission from '../../../utils/PermissionUtil';
import {printPreview, print} from '../../../utils/PrintUtil';
import {getLodop} from '../../../LodopFuncs';

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
  pagination,
  selectedRowKeys = []
}) {

  function handleRemoveBatch() {
    onRemoveBatch(selectedRowKeys);
  };
  function handleRecoverBatch() {
    onRecoverBatch(selectedRowKeys);
  };

  function onPrintPreview() {
    // var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
    // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
    // LODOP.SET_PRINT_STYLE("FontSize",18);
    // LODOP.SET_PRINT_STYLE("Bold",1);
    // LODOP.ADD_PRINT_TEXT(50,231,260,39,"打印页面部分内容");
    // LODOP.ADD_PRINT_HTM(88,200,350,600,document.getElementById("test1").innerHTML);
    printPreview("测试.cpt&companyUuid=" + localStorage.getItem("companyUuid"), new Map([["code", 'xxx'], ["name", 'xxx']]));
    // LODOP.PREVIEW();
  };

  function onPrint() {
    print("测试.cpt");
  };

  function convertState(text) {
    if (text == "normal")
      return '正常';
    if (text = "deleted")
      return '已删除';
  };

  const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
    sorter: true,
    width: 180
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    width: 200
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
    width: 100
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
    width: 200
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
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
        pagination={pagination}
        rowKey={record => record.uuid}
        title={() =>
          <div>
            <Row type="flex">
              <Col><Button type="ghost" onClick={handleRemoveBatch} disabled={!hasPermission("customer:delete")}>批量删除</Button></Col>
              <Col><Button type="ghost" onClick={handleRecoverBatch} disabled={!hasPermission("customer:delete")}>批量恢复</Button></Col>
              <Col><Button onClick={onCreate} disabled={!hasPermission("customer:create")}>新建</Button></Col>
              <Col><span style={{ marginLeft: 8 }}>{selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
              <Col><Button onClick={onPrintPreview} >打印预览</Button></Col>
              
            </Row>
          </div>} />
    </div>
  );
};

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
  pagination: PropTypes.any
};

export default CustomerGrid;