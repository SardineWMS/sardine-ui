import React, { PropTypes } from 'react';
import {Form, Table, message, Popconfirm, Button, Row, Col, Card, Spin, Input, Select } from 'antd';
import hasPermission from '../../../utils/PermissionUtil';
import BaseSearchForm from '../../widget/BaseSearchForm';
import BaseGrid from '../../widget/BaseGrid';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';

function CustomerSearch({
  dataSource,
  onPageChange,
  onRemoveBatch,
  onRecoverBatch,
  onEdit,
  onDelete,
  onRecover,
  onCreate,
  onViewItem,
  onSearch,
  form,
  selectedRowKeys = []
}) {

  function handleRemoveBatch() {
    onRemoveBatch(selectedRowKeys);
  };
  function handleRecoverBatch() {
    onRecoverBatch(selectedRowKeys);
  };

  function convertState(text) {
    if (text == "normal")
      return '正常';
    if (text = "deleted")
      return '已删除';
  };

    const children = [];
    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"代码 类似于"} >
                {form.getFieldDecorator("code")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"状态 等于"}>
                {form.getFieldDecorator("state", { initialValue: "normal" })(
                    <Select placeholder="请选择" showSearch={false} size="large">
                        <Option value="normal" >正常</Option>
                        <Option value="deleted">已删除</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={Guid()}>
            <BaseFormItem label={"名称 类似于"}>
                {form.getFieldDecorator("name")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    function handleSearch(e) {
        onSearch(form.getFieldsValue());
    }

  const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
    sorter: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
  },
  {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => { onEdit(record) }} disabled={!hasPermission("customer:edit")}>编辑</a>
        &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record)} >
          <a disabled={(record.state === "deleted") && (!hasPermission("customer:edit"))}>删除</a>
        </Popconfirm>
        &nbsp;
        <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(record)}>
          <a disabled={(record.state === "normal") && (!hasPermission("customer:edit"))}>恢复</a>
        </Popconfirm>
      </p>
    )
  }];

  const buttons = [];

  buttons.push(<Col><Button type="ghost" onClick={handleRemoveBatch} disabled={!hasPermission("customer:edit")}>批量删除</Button></Col>);
  buttons.push(<Col><Button type="ghost" onClick={handleRecoverBatch} disabled={!hasPermission("customer:edit")}>批量恢复</Button></Col>);
  buttons.push(<Col><Button onClick={onCreate} disabled={!hasPermission("customer:create")}>新建</Button></Col>);
  buttons.push(<Col><span style={{ marginLeft: 8 }}>{selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>);

  return (
    <div>
      <BaseSearchForm children={children} onSearch={handleSearch} form={form} />
      <BaseGrid
        columns={columns}
        dataSource={dataSource}
        onPageChange={onPageChange}
        rowKey={record => record.uuid}
        buttons={buttons} />
    </div>
  )
}

CustomerSearch.propTypes = {
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onRemoveBatch: PropTypes.func,
  onRecoverBatch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRecover: PropTypes.func,
  onCreate: PropTypes.func,
  onViewItem: PropTypes.func,
  onSearch: PropTypes.func
}

export default Form.create()(CustomerSearch);