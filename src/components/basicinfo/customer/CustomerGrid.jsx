import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import hasPermission from '../../../utils/PermissionUtil';
import {printPreview, print} from '../../../utils/PrintUtil';
import {createInfo2String,lastModifyInfo2String}from '../../../utils/OperatorInfoUtils';

function CustomerGrid({
  dataSource,
  onPageChange,
  onOfflineBatch,
  onOnlineBatch,
  onEdit,
  onOffline,
  ononline,
  onCreate,
  onViewItem,
  pagination,
  selectedRowKeys = []
}) {

  function handleOfflineBatch() {
    onOfflineBatch(selectedRowKeys);
  };
  function handleOnlineBatch() {
    onOnlineBatch(selectedRowKeys);
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
    if (text == "online")
      return '正常';
    if (text == "offline")
      return '停用';
  };

  const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
    sorter: true,
    width: 80
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    width: 180
  },
  {
    title:'简称',
    dataIndex:'simpleName',
    key:'simpleName',
    width:80
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
    width: 80
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
    width: 100
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 170
  },
  {
    title: '创建人信息',
    dataIndex: 'createInfo',
    key: 'createInfo',
    width:200,
    render:(text,record)=>createInfo2String(record),
  },{
    title: '最后修改人信息',
    dataIndex: 'lastModifyInfo',
    key: 'lastModifyInfo',
    width:200,
    render: (text, record) => lastModifyInfo2String(record),
  }
];

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
              <Col><Button type="primary" onClick={onCreate} disabled={!hasPermission("customer:create")}>新建</Button></Col>
              <Col><Button type="ghost" onClick={handleOnlineBatch} disabled={!hasPermission("customer:edit")}>启用</Button></Col>
              <Col><Button type="ghost" onClick={handleOfflineBatch} disabled={!hasPermission("customer:edit")}>停用</Button></Col>            
              <Col><span style={{ marginLeft: 8 }}>{selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>             
            </Row>
          </div>} />
    </div>
  );
};

CustomerGrid.propTypes = {
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onOfflineBatch: PropTypes.func,
  onOnlineBatch: PropTypes.func,
  onEdit: PropTypes.func,
  onOffline: PropTypes.func,
  onOnline: PropTypes.func,
  onCreate: PropTypes.func,
  onViewItem: PropTypes.func,
  pagination: PropTypes.any
};

export default CustomerGrid;