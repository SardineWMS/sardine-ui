import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button, message, Row, Col, Card, Spin } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';
import Guid from '../../../utils/Guid';


class UserGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selectedRowKeys: [],
      selectedRows: []
    };
    this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
    this.handleOnlineBatch = this.handleOnlineBatch.bind(this);
    this.handleOfflineBatch = this.handleOfflineBatch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleOnlineOrOffline = this.handleOnlineOrOffline.bind(this, record);
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps,
      selectedRowKeys: [],
      selectedRows: []
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };
  handleRemoveBatch() {
    this.state.onBatchRemove(this.state.selectedRows);
  };
  handleOnlineBatch() {
    this.state.onBatchOnline(this.state.selectedRows);
  };
  handleOfflineBatch() {
    this.state.onBatchOffline(this.state.selectedRows);
  };
  handleCreate(e) {
    e.preventDefault();
    this.state.onCreate();
  };
  handleOnlineOrOffline(record, e) {
    record.userState === 'online' ? this.state.onOffline(record) : this.state.onOnline(record);
  };
  render() {
    const admin = localStorage.getItem("admin");//当前登录用户是否是管理员权限
    const loginId = localStorage.getItem("loginId");

    function convertState(text) {
      if (text == "online")
        return '已启用';
      if (text = "offline")
        return '已停用';
    };

    function convertAdmin(text) {
      if (text == false)
        return '否';
      if (text == true)
        return '是';
    };

    const columns = [
      {
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }}>{text}</a>
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a onClick={() => this.state.onViewItem(record)}>{text}</a>
      }, {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone'
      }, {
        title: '是否为管理员',
        dataIndex: 'administrator',
        key: 'administrator',
        render: text => convertAdmin(text)
      }, {
        title: '用户状态',
        dataIndex: 'userState',
        key: 'userState',
        render: text => convertState(text)
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.state.onDeleteItem(record)}>
              <a disabled={!PermissionUtil('user:delete')}>删除</a>
            </Popconfirm>
            &nbsp;
          <a onClick={() => this.state.onEditItem(record)} disabled={record.userState == 'offline' || !PermissionUtil("user:edit")}>编辑</a>
            &nbsp;
          <Popconfirm title={`确定要${record.userState === 'online' ? '停用' : '启用'}吗？`} onConfirm={this.handleOnlineOrOffline.bind(this, record)}>
              <a disabled={record.userState == 'online' ? !PermissionUtil("user:offline") : !PermissionUtil("user:online")}>{record.userState === 'online' ? '停用' : '启用'}</a>
            </Popconfirm>
            &nbsp;
            <a onClick={() => this.state.onAssignRole(record)} disabled={record.userState == 'offline' || !PermissionUtil("user:edit")}>分配角色</a>
            &nbsp;
            <a onClick={() => this.state.onAssignResource(record)} disabled={record.userState == 'offline' || !PermissionUtil("user:edit")}>分配权限</a>
          </p>
        )
      }
    ];

    function renderCodeColumns(record, key, text) {

      if (!record.editable) {
        return (<a onClick={() => { this.state.onViewItem(record) }}>{text}</a>);
      };

      return (<RowEditCell
        editable={record.editable}
        value={text}
        status={status}
        onChange={value => handleChange(record, value, key)}
      />);
    };

    function renderNameColumns(record, key, text) {
      if (typeof record.editable === undefined)
        return text;

      return (<RowEditCell
        editable={record.editable}
        value={text}
        status={status}
        onChange={value => handleChange(record, value, key)}
      />);
    };

    function handleChange(record, value, key) {
      if ("code" == key)
        record.code = value;
      if ("name" == key)
        record.name = value;
    };

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table
          size="small"
          columns={columns}
          dataSource={this.state.dataSource}
          rowKey={Guid()}
          onChange={this.state.onPageChange}
          pagination={this.state.pagination}
          bordered
          rowSelection={rowSelection}
          title={
            () =>
              <div>
                <Row type="flex">
                  <Col><Button type="ghost" onClick={this.handleRemoveBatch} disabled={!PermissionUtil("user:delete")}>批量删除</Button></Col>
                  <Col><Button type="ghost" onClick={this.handleOnlineBatch} disabled={!PermissionUtil("user:online")}>批量启用</Button></Col>
                  <Col><Button type="ghost" onClick={this.handleOfflineBatch} disabled={!PermissionUtil("user:offline")}>批量停用</Button></Col>
                  <Col><Button onClick={this.handleCreate} disabled={!PermissionUtil("user:create")}>新建</Button></Col>
                  <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                </Row>
              </div>

          }
        />
      </div>
    );
  };
};

export default UserGrid;

