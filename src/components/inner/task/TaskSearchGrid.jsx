import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

function TaskSearch({
	dataSource,
  pagination,
  onPageChange,
  onArticleMove,
  onContainerMove,
  onExecute,
  onAbortBatch,
  onPutAway,
  onRpl,
  selectedRowKeys = []
}) {

  const columns = [{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 80
  },{
    title: '商品代码',
    dataIndex: 'article',
    key: 'article',
    render: (text) => text.code,
    width: 100
  }, {
    title: '名称及规格',
    dataIndex: 'articleSpec',
    key: 'articleSpec',
    render: (text, record) => record.article.name + "," + record.articleSpec,
    width: 150
  },{
    title: '包装',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    render: (text, record) => record.munit + "," + record.qpcStr,
    width: 150
  },{
    title: '数量',
    dataIndex: 'qty',
    key: 'qty',
    width: 100
  }, {
    title: '件数',
    dataIndex: 'caseQtyStr',
    key: 'caseQtyStr',
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
  }, {
    title: '实际数量',
    dataIndex: 'realQty',
    key: 'realQty',
    width: 100
  }, {
    title: '实际件数',
    dataIndex: 'realCaseQtyStr',
    key: 'realCaseQtyStr',
    width: 100
  }, {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    width: 100
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
    fixed: 'right',
    width: 150,
    render: (text) => "[" + text.billNumber + "]" + text.billType
  }];

  const moveMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">商品移库</Menu.Item>
      <Menu.Item key="2">容器移库</Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    if (e.key == "1")
      onArticleMove();
    else
      onContainerMove();
  };

  function handlerAbortBatch() {
      onAbortBatch(selectedRowKeys);
  };

  function handlerPutAway() {
      onPutAway(selectedRowKeys);
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

            <Dropdown overlay={moveMenu}>
              <Button type="ghost" style={{ marginLeft: 8 }}>
                移库 <Icon type="down" />
              </Button>
            </Dropdown>
            <Button onClick={handlerPutAway}>收货上架</Button>
            <Button onClick={handlerRpl}>补货</Button>
            <Button>拣货</Button>
            <Button>装车</Button>
            <Button>退仓上架</Button>
            <Button>退货下架</Button>
            <Button>退货交接</Button>
            <Button onClick={handlerAbortBatch}>批量作废</Button>
          </div>}
      />
    </div>
  );
};

TaskSearch.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onArticleMove: PropTypes.func,
  onContainerMove: PropTypes.func
};

export default TaskSearch;

