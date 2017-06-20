import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon } from 'antd';
import styles from '../../less/common.less';
import PermissionUtil from '../../../utils/PermissionUtil';

function BinSearch({
	dataSource,
  onCreateWrh,
  onCreateZone,
  onCreatePath,
  onCreateShelf,
  onCreateBin,
  onDeleteBin,
  onPageChange,
  onShowStock,
  onCreateBinType,
  selectBins = []
}) {

  function handleCreateWrh(e) {
    e.preventDefault();
    onCreateWrh();
  };

  function handleCreateZone(e) {
    e.preventDefault();
    onCreateZone();
  };

  function handleCreatePath(e) {
    e.preventDefault();
    onCreatePath();
  };

  function handleCreateShelf(e) {
    e.preventDefault();
    onCreateShelf();
  };

  function handleCreateBin(e) {
    e.preventDefault();
    onCreateBin();
  };

  function handleDeleteBin() {
    onDeleteBin(selectBins);
  };

  function handleShowStock(e) {
    e.preventDefault();
    onShowStock();
  };

  function handleCreateBinType(e) {
    e.preventDefault();
    onCreateBinType();
  };

  const onClick = function ({ key, e }) {
    // e.preventDefault();
    if (key == 1) {
      onCreateBin();
    } else if (key == 2) {
      onCreateShelf();
    } else if (key == 3) {
      onCreatePath();
    } else if (key == 4) {
      onCreateZone();
    } else if (key == 5) {
      onCreateWrh();
    };
  };

  function convertState(text) {
    if (text == "initial")
      return '初始';
    if (text == "aborted")
      return '已作废';
    if (text == "inAlc")
      return '待配送';
    if (text == 'inSorting')
      return '分拣中';
    if (text == 'finished')
      return '已完成';
    if (text == 'inProgress')
      return '配送中';
    if (text == 'handover')
      return '已交接';
  };

  const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    sorter: true
  }, {
    title: '货位状态',
    dataIndex: 'state',
    key: 'state',
    render: text => (text == "free" ? '空闲' : '使用中')
  }, {
    title: '货位用途',
    dataIndex: 'usage',
    key: 'usage',
    render: text => (text == "StorageBin" ? '存储位' : text)
  }, {
    title: '货位类型',
    dataIndex: 'binType',
    key: 'binType',
    render: (text, record) => (text ? (<a href=""> {"[" + record.binType.code + "]" + record.binType.name} </a>) : "")
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onShowStock(record.code)}> 库存详细信息 </a>
      </p>
    )
  }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    },
    onSelect: (record, selected, selectedRows) => {
      selectBins = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      selectBins = selectedRows;
    },
    getCheckboxProps: record => ({

    }),
  };

  const createMenu = (
    <Menu onClick={onClick} visible={PermissionUtil("bin:create")}>
      <Menu.Item key="1">新增货位</Menu.Item>
      <Menu.Item key="2">新增货架</Menu.Item>
      <Menu.Item key="3">新增货道</Menu.Item>
      <Menu.Item key="4">新增货区</Menu.Item>
      <Menu.Item key="5">新增仓位</Menu.Item>
    </Menu >
  );

  return (
    <div>
      <Table className={styles.table}
        size="small"
        bordered
        columns={columns}
        title={() =>
          <div >
            <Dropdown overlay={createMenu}>
              <Button type="ghost" style={{ marginLeft: 8 }} disabled={!PermissionUtil("bin:create")}>
                新增 <Icon type="down" />
              </Button>
            </Dropdown>
            <Button onClick={handleDeleteBin} disabled={!PermissionUtil("bin:delete")}>删除</Button>
            <Button onClick={handleCreateBinType} disabled={!PermissionUtil("bintype:create")}>新建货位类型</Button>
          </div>
        }
        dataSource={dataSource}
        onChange={onPageChange}
        rowSelection={rowSelection}
        rowKey={record => record.uuid}
      />
    </div>
  );
};

BinSearch.propTypes = {
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onCreateWrh: PropTypes.func,
  onCreateZone: PropTypes.func,
  onCreatePath: PropTypes.func,
  onCreateShelf: PropTypes.func,
  onCreateBin: PropTypes.func,
  onDeleteBin: PropTypes.func,
  onShowStock: PropTypes.func
};

export default BinSearch;

