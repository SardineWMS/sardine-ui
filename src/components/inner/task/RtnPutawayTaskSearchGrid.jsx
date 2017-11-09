import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
const EditableCell = require('../../widget/EditableCell');
import ContainerModal from '../../widget/ContainerModal';
import BinModal from '../../widget/BinModal';

function RtnPutawayTaskSearchGrid({
	dataSource,
  pagination,
  onPageChange,
  onPutAway,
  selectedRowKeys = []
}) {

  function convertType(text) {
    if (text == "ManualBill")
      return '手工单据';
    if (text == "APP")
      return 'APP';
  };
  function convertState(text) {
    if (text == "待退仓上架")
      return '待上架';
    if (text == "退仓上架中")
      return '上架中';
    if (text == "退仓上架完成")
      return '上架完成';
    if (text == "退仓上架作废")
      return '上架作废';
  };

  const columns = [{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
    width: 80
  }, {
    title: '操作方式',
    dataIndex: 'type',
    key: 'type',
    render: text => convertType(text),
    width: 80
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
    title: '供应商',
    dataIndex: 'owner',
    key: 'owner',
    width: 150
  }, {
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: (text, record) => text ? "[" + text.code + "]" + text.name + "," + record.articleSpec : text,
    width: 150
  }, {
    title: '包装',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    render: (text, record) => record.munit + "," + record.qpcStr,
    width: 100
  }, {
    title: '目标货位',
    dataIndex: 'toBinCode',
    key: 'toBinCode',
    width: 100,
    render: (text, record, index) => renderColumns(record, "toBinCode", text)
  }, {
    title: '目标容器',
    dataIndex: 'toContainerBarcode',
    key: 'toContainerBarcode',
    width: 100,
    render: (text, record, index) => renderColumns(record, "toContainerBarcode", text)
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
    render: (text) => text ? "[" + text.billNumber + "]" + text.billType : text
  }];

  function renderColumns(record, key, text) {
    // if(key==="toBinCode")
    //   return text;

    if (record.state === "退仓上架完成") {
      return text;
    } else if (record.state === "待退仓上架") {
      if (key === "toBinCode")
        return (
          <BinModal
            value={text}
            onChange={value => handleChange(record, key, value)}
          />
        );
      if (key === "toContainerBarcode")
        return (<ContainerModal
          value={text}
          onChange={value => handleChange(record, key, value)}
        />);
    } else {
      return (<EditableCell
        editable={false}
        value={text}
        status={status}
        onChange={value => handleChange(record, key, value)}
      />);
    }
    // return (<EditableCell
    //   editable={false}
    //   value={text}
    //   status={status}
    //   onChange={value => handleChange(record, key, value)}
    // />);
  };

  function handleChange(record, key, value) {
    if ("toBinCode" === key)
      record.toBinCode = value;
    else
      record.toContainerBarcode = value;
  };

  function handlerPutAway() {
    onPutAway(selectedRowKeys);
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
            <Button onClick={handlerPutAway}>退仓上架</Button>
          </div>}
      />
    </div>
  );
};

RtnPutawayTaskSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onPutAway: PropTypes.func
};

export default RtnPutawayTaskSearchGrid;

