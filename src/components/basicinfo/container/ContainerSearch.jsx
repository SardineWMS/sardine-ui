import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Icon, Table, Spin, Select } from 'antd';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import PermissionUtil from '../../../utils/PermissionUtil';
import { lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';

const Option = Select.Option;

const ContainerSearch = ({
	dataSource,
  onCreate,
  onPageChange,
  pagination,
  onSearch,
  onToggle,
  onQueryStock,
  searchExpand,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
  },
  onCreateContainerType,
}) => {

  function handleSearch(e) {
    e.preventDefault();
    onSearch(getFieldsValue());
  }

  function handleReset(e) {
    e.preventDefault();
    resetFields();
  }

  function handleCreate(e) {
    e.preventDefault();
    onCreate();
  }

  function handleCreateContainerType(e) {
    e.preventDefault();
    onCreateContainerType();
  }

  const children = [];
  children.push(
    <BaseTwoCol>
      <BaseFormItem label="条码 类似于">
        {getFieldDecorator('barcode')(
          <Input type="text" placeholder="条码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>);
  children.push(<BaseTwoCol>
    <BaseFormItem label="状态 等于">
      {getFieldDecorator('state')(
        <Select placeholder="请选择" showSearch={false} size="default">
          <Option value="STACONTAINERIDLE">空闲</Option>
          <Option value="STACONTAINERSTKINING">收货中</Option>
          <Option value="STACONTAINERUSEING">已使用</Option>
          <Option value="STACONTAINERPICKING">拣货中</Option>
          <Option value="STACONTAINERMOVING">平移中</Option>
          <Option value="STACONTAINERPUTAWAYING">上架中</Option>
        </Select>
      )}
    </BaseFormItem>
  </BaseTwoCol>);
  children.push(<BaseTwoCol>
    <BaseFormItem label="当前位置 等于">
      {getFieldDecorator('position')(
        <Input type="text" placeholder="当前位置 等于" />
      )}
    </BaseFormItem>
  </BaseTwoCol>);
  children.push(<BaseTwoCol>
    <BaseFormItem label="目标位置 等于">
      {getFieldDecorator('toPosition')(
        <Input type="text" placeholder="目标位置 等于" />
      )}
    </BaseFormItem>
  </BaseTwoCol>);

  const shownCount = searchExpand ? children.length : 2;

  function convertState(text) {
    if (text == "STACONTAINERIDLE")
      return '空闲';
    else if (text == "STACONTAINERSTKINING")
      return '收货中';
    else if (text == "STACONTAINERUSEING")
      return '已使用';
    else if (text == "STACONTAINERPICKING")
      return '拣货中';
    else if (text == "STACONTAINERMOVING")
      return '平移中';
    else if (text == "STACONTAINERPUTAWAYING")
      return '上架中'
  }

  const columns = [{
    title: '条码',
    dataIndex: 'barcode',
    key: 'barcode'
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text),
  }, {
    title: '当前位置',
    dataIndex: 'position',
    key: 'position',
  }, {
    title: '目标位置',
    dataIndex: 'toPosition',
    key: 'toPosition',
  }, {
    title: '操作信息',
    dataIndex: 'lastModifyInfo',
    key: 'lastModifyInfo',
    render: (text, record) => lastModifyInfo2String(record),
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onQueryStock(record)}> 库存详细信息 </a>
      </p>
    ),
  }
  ]

  return (
    <div>
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
      <Table size="small"
        bordered
        columns={columns}
        title={() =>
          <div>
            <Button onClick={handleCreate} disabled={!PermissionUtil("container:create")}>新建</Button>
            <Button type="primary" onClick={handleCreateContainerType} disabled={!PermissionUtil("containertype:create")}>新建容器类型</Button>
          </div>
        }
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.barcode}
      />
    </div>
  )
}

ContainerSearch.propTypes = {
  form: PropTypes.object.isRequired,
  dataSource: PropTypes.array,
  onCreate: PropTypes.func,
  onPageChange: PropTypes.func,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  searchExpand: PropTypes.bool,
  onQueryStock: PropTypes.func,
}

export default Form.create()(ContainerSearch);

