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
}) {

  const admin = localStorage.getItem("admin");//当前登录用户是否是管理员权限

  function handleCreate(e) {
    e.preventDefault();
    onCreate();
  }

  const columns = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      render: () => { },
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
      key: 'administrator',
      dataIndex: 'administrator',
    }, {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <p>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
            <a>删除</a>
          </Popconfirm>
          &nbsp;
          <a onClick={() => onEditItem(record)}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要停用吗？" onConfirm={() => { }}>
            <a>停用</a>
          </Popconfirm>
          &nbsp;
          <Popconfirm title="确定要启用吗？" onConfirm={() => { }}>
            <a>启用</a>
          </Popconfirm>
        </p>
      )
    }
  ]

  const rowSelection = {
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
            <Button>禁用</Button>
            <Button>启用</Button>
            <Button>删除</Button>
          </div>
        }
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.id}
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

