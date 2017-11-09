import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col, message } from 'antd';
import { browserHistory } from 'react-router';
import moment from 'moment';
import 'moment/locale/zh-cn';
const EditableCell = require('../../widget/EditableCell');


function ShipBillSearchGrid({
	dataSource,
  pagination,
  onPageChange,
  onAbortBatch,
  onShipBatch,
  selectedRowKeys = []
}) {

  function converDate(text) {
    if (text == null || text == undefined)
      return null;
    return moment(text).format('YYYY-MM-DD');
  }

  const columns = [{
    title: '客户',
    dataIndex: 'customer',
    key: 'customer',
    render: (text) => text ? "[" + text.code + "]" + text.name : text,
    width: 100
  }, {
    title: '配送体系',
    dataIndex: 'deliverySystem',
    key: 'deliverySystem',
    render: (text) => "tradition" == text ? "传统体系" : "电商体系",
    width: 80
  }, {
    title: '配送方式',
    dataIndex: 'deliveryType',
    key: 'deliveryType',
    width: 80,
    //render: (text) => "warehouse"===text?"仓库送":text
  }, {
    title: '线路',
    dataIndex: 'line',
    key: 'line',
    width: 80
  }, {
    title: '容器',
    dataIndex: 'containerBarcode',
    key: 'containerBarcode',
    width: 100
  }, {
    title: '货位',
    dataIndex: 'binCode',
    key: 'binCode',
    width: 100
  }, {
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: (text) => text ? "[" + text.code + "]" + text.name : text,
    width: 150
  }, {
    title: '规格',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    // render: (text, record) => record.article.name + "," + record.qpcStr,
    width: 150
  }, {
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
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    width: 70
  }, {
    title: '生产日期',
    dataIndex: 'productionDate',
    key: 'productionDate',
    render: text => converDate(text),
    width: 80
  }, {
    title: '到校日期',
    dataIndex: 'validDate',
    key: 'validDate',
    render: text => converDate(text),
    width: 80
  }, {
    title: '批次',
    dataIndex: 'stockBatch',
    key: 'stockBatch',
    width: 90
  }, {
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text) => text ? "[" + text.code + "]" + text.name : text,
    width: 150
  }];

  function handlerAbortBatch() {
    onAbortBatch(selectedRowKeys);
  };

  function handlerShipBatch() {
    var json = JSON.stringify(selectedRowKeys);
    window.location.href = `/#/tms/shipBill?type=showEdit&key=${json}`;
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
            <Button onClick={handlerShipBatch}>装车</Button>
            <Button onClick={handlerAbortBatch}>作废</Button>
          </div>}
      />
    </div>
  );
};

ShipBillSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onAbortBatch: PropTypes.func
};

export default ShipBillSearchGrid;

