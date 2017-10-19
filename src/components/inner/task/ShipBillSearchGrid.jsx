import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col,message } from 'antd';
import { browserHistory } from 'react-router'
const EditableCell = require('../../widget/EditableCell');


function ShipBillSearchGrid({
	dataSource,
	pagination,
	onPageChange,
	onAbortBatch,
  onShipBatch,
	selectedRowKeys = []
}) {

  const columns = [{
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: (text) =>text? "["+text.code+"]"+text.name:text,
    width: 150
  },{
    title: '客户',
    dataIndex: 'customer',
    key: 'customer',
    render: (text) =>text? "["+text.code+"]"+text.name:text,
    width: 150
  },{
    title: '包装',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    render: (text, record) => record.munit + "," + record.qpcStr,
    width: 100
  }, {
    title: '货位',
    dataIndex: 'binCode',
    key: 'binCode',
    width: 100
  }, {
    title: '容器',
    dataIndex: 'containerBarcode',
    key: 'containerBarcode',
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
  },{
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text) =>text? "["+text.code+"]"+text.name:text,
    width: 150
  }, {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    width: 70
  }];

	function handlerAbortBatch() {
	      onAbortBatch(selectedRowKeys);
	};

  function handlerShipBatch(){
    var json=JSON.stringify(selectedRowKeys);
    window.location.href=`/#/tms/shipBill?type=showEdit&key=${json}`;
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
          <Button onClick={handlerShipBatch}>批量装车</Button>
	        <Button onClick={handlerAbortBatch}>批量作废</Button>
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

