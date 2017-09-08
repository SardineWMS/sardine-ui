import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

function RtnHandoverTaskSearchGrid({
	dataSource,
  pagination,
  onPageChange,
  onPutAway,
  onAbortBatch,
  selectedRowKeys = []
}) {

  const columns = [{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 80
  },{
    title: '对象',
    dataIndex: 'owner',
    key: 'owner',
    width: 150
  },{
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: (text,record) =>text? "["+text.code+"]"+text.name+"," + record.articleSpec:text,
    width: 150
  },{
    title: '包装',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    render: (text, record) => record.munit + "," + record.qpcStr,
    width: 100
  }, {
    title: '来源货位',
    dataIndex: 'fromBinCode',
    key: 'fromBinCode',
    width: 100
  }, {
    title: '来源容器',
    dataIndex: 'fromContainerBarcode',
    key: 'fromContainerBarcode',
    width: 100
  }, {
    title: '目标货位',
    dataIndex: 'toBinCode',
    key: 'toBinCode',
    width: 100
  }, {
    title: '目标容器',
    dataIndex: 'toContainerBarcode',
    key: 'toContainerBarcode',
    width: 100
  },{
    title: '数量',
    dataIndex: 'qty',
    key: 'qty',
    width: 50
  }, {
    title: '件数',
    dataIndex: 'caseQtyStr',
    key: 'caseQtyStr',
    width: 70
  }, {
    title: '实际数量',
    dataIndex: 'realQty',
    key: 'realQty',
    width: 70
  }, {
    title: '实际件数',
    dataIndex: 'realCaseQtyStr',
    key: 'realCaseQtyStr',
    width: 70
  }, {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    width: 70
  }, {
    title: '操作时间',
    dataIndex: 'operateTime',
    key: 'operateTime',
    width: 100
  },
  {
    title: '来源单据',
    dataIndex: 'sourceBill',
    key: 'sourceBill',
    width: 150,
    render: (text) =>text? "[" + text.billNumber + "]" + text.billType :text
  }];

  function handlerPutAway() {
      onPutAway(selectedRowKeys);
  };

  function handlerAbortBatch() {
      onAbortBatch(selectedRowKeys);
  };
  
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
          disabled: record.name === 'Disabled User',
      })
  };

  return (
    <div>
      <Table size="small"
        bordered
        columns={columns}
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        scroll={{ x: 1500, y: 300 }}
        rowKey={record => record.uuid}
        rowSelection={rowSelection}
        title={() =>
          <div>
            <Button onClick={handlerPutAway}>退货交接</Button>
            <Button onClick={handlerAbortBatch}>批量作废</Button>
          </div>}
      />
    </div>
  );
};

RtnHandoverTaskSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onPutAway: PropTypes.func,
  onAbortBatch: PropTypes.func
};

export default RtnHandoverTaskSearchGrid;

