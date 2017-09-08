import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col,message} from 'antd';
const EditableCell = require('../../widget/EditableCell');

function RplTaskSearchGrid({
	dataSource,
  pagination,
  onPageChange,
  onAbortBatch,
  onRpl,
  refresRealCaseQtyStr,
  selectedRowKeys = []
}) {

   const columns = [{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 80
  },{
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: (text,record) => "["+text.code+"]"+text.name+"," + record.articleSpec,
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
    width: 100,
    render: (text, record, index) => renderColumns(record,"realQty", text,index)
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
    render: (text) => "[" + text.billNumber + "]" + text.billType
  }];

  function renderColumns(record, key, text,index) {
    // if(key==="toBinCode")
    //   return text;
    return (<EditableCell
      editable= {false}
      value={text}
      status={status}
      onChange={value => handleChange(record,key,value,index)}
    />);
  };

  function handleChange(record,key,value,index){
    var reg = /^\d+(\.{0,1}\d+){0,1}$/;
    if(!reg.test(value)){
      message.error("请输入大于0的数字", 2, '');
      return;
    }
    if(value> record.qty){
      message.error("实际数量不能大于计划数量", 2, '');
      return;
    }
    record.realQty=value;
    dataSource[index]=record;
    refresRealCaseQtyStr(index,record.realQty,record.qpcStr);
  };

  function handlerAbortBatch() {
      onAbortBatch(selectedRowKeys);
  };

  function handlerRpl() {
      onRpl(selectedRowKeys);
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
            <Button onClick={handlerRpl}>补货</Button>
            <Button onClick={handlerAbortBatch}>批量作废</Button>
          </div>}
      />
    </div>
  );
};

RplTaskSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onRpl: PropTypes.func
};

export default RplTaskSearchGrid;

