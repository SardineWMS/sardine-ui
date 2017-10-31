import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const BinSearchForm = ({
  onSearch,
  field,
  keyword,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    }
  }) => {
  function handleSearch(e) {
    e.preventDefault();
    onSearch(getFieldsValue());
  };

  function handleReset(e) {
    e.preventDefault();
    resetFields();
  };

  const children = [];
  children.push(
    <BaseTwoCol>
      <BaseFormItem label="代码 类似于">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="" />
        )}
      </BaseFormItem>
    </BaseTwoCol>);
  children.push(
    <BaseTwoCol>
      <BaseFormItem label="状态 等于">
        {getFieldDecorator('state', { initialValue: '' })(
          <Select size="large">
            <Option value=''> 全部</Option>
            <Option value="free">空闲</Option>
            <Option value="using" initialValue>已使用</Option>
            <Option value="closeLock">异常锁定</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol>
      <BaseFormItem label="用途 等于">
        {getFieldDecorator('usage', { initialValue: '' })(
          <Select size="large">
            <Option value=''>全部</Option>
            <Option value="ReceiveStorageBin">收货暂存位</Option>
            <Option value="PickUpStorageBin">拣货存储位</Option>
            <Option value="StorageBin">存储位</Option>
            <Option value="CollectBin">集货位</Option>
            <Option value="RtnReceiveTempBin">退仓收货暂存位</Option>
            <Option value="SupplierStorageBin">供应商退货位</Option>
            <Option value="SupplierCollectBin">供应商集货位</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>);

  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

BinSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(BinSearchForm);