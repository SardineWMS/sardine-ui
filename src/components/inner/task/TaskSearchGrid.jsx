import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

function TaskSearch({
	dataSource,
  pagination,
  onPageChange,
  onArticleMove,
  onContainerMove
}) {
  const columns = [{
    title: '指令号',
    dataIndex: 'taskNo',
    key: 'taskNo',
    sorter: true,
    width: 150
  }, {
    title: '指令类型',
    dataIndex: 'taskType',
    key: 'taskType',
    sorter: true,
    width: 100
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => (text == "normal" ? '正常' : text),
    width: 100
  }, {
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    width: 150
  }, {
    title: '规格',
    dataIndex: 'qpcStr',
    key: 'qpcStr',
    width: 100
  }, {
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
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: (text, record) => (
      <p>
        <a onClick={() => onEdit(record)}>执行</a>
        <a onClick={() => onEdit(record)}>编辑</a>
        <a onClick={() => onEdit(record)}>删除</a>
        <a onClick={() => onEdit(record)}>作废</a>
      </p>
    )
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    },
    onSelect: (record, selected, selectedRows) => {

    },
    onSelectAll: (selected, selectedRows, changeRows) => {

    },
    getCheckboxProps: record => ({

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
              <Button>收货上架</Button>
              <Button>补货</Button>
              <Button>拣货</Button>
              <Button>装车</Button>
              <Button>退仓上架</Button>
              <Button>退货下架</Button>
              <Button>退货交接</Button>
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

