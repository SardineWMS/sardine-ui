import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';

function UserSearchGrid({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onCreate,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onOnline,
  onOffline,
  onBatchOnline,
  onBatchOffline,
  users = [],
}) {

  const admin = localStorage.getItem("admin");//当前登录用户是否是管理员权限
  const loginId = localStorage.getItem("loginId");

  function handleCreate(e) {
    e.preventDefault();
    onCreate();
  }

  const columns = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => onViewItem(record)}>{text}</a>,
    }, {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '是否为管理员',
      dataIndex: 'administrator',
      key: 'administrator',
    }, {
      title: '用户状态',
      dataIndex: 'userState',
      key: 'userState',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <p>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
            <a disabled={!admin && loginId !== record.code}>删除</a>
          </Popconfirm>
          &nbsp;
          <a onClick={() => onEditItem(record)}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要停用吗？" onConfirm={() => { onOffline(record) }}>
            <a disabled={record.userState === '已停用'}>停用</a>
          </Popconfirm>
          &nbsp;
          <Popconfirm title="确定要启用吗？" onConfirm={() => { onOnline(record) }}>
            <a disabled={record.userState === '已启用'}>启用</a>
          </Popconfirm>
        </p>
      )
    }
  ]

  const rowSelection = {
    onChange: (selectedRowkeys, selectedRows) => {
      console.log("...测试行选择器oncChange");
    },
    onSelect: (record, selected, selectedRows) => {
      console.log('...测试行选择器onselect');
      if (users.length === 0) {
        users = selectedRows;
      } else {
        selected = false;
        selectedRows = null;
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log('...测试行选择器onselectall');
      if (users.length === 0) {
        users = selectedRows;
      } else {
        selected = false;
      }
    },
  }

  function handleOnlineBatch() {
    onBatchOnline(users);
  }

  function handleOfflineBatch() {
    onBatchOffline(users);
  }

  function handleRemoveBatch() {

  }

  return (
    <div>
      <Table size="small"
        bordered
        rowSelection={rowSelection}
        columns={columns}
        title={() =>
          <div>
            <Button onClick={handleCreate}>新建</Button>
            <Button onClick={handleOfflineBatch}>停用</Button>
            <Button onClick={handleOnlineBatch}>启用</Button>
            <Button>删除</Button>
          </div>
        }
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.uuid}
      />
    </div>
  )
}

UserSearchGrid.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
  onCreate: PropTypes.func,
  onViewItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
}

export default UserSearchGrid;

