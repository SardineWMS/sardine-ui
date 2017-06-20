import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Icon, Select } from 'antd';
import BaseSearchPanel from '../Widget/BaseSearchPanel';
import BaseTwoCol from '../Widget/BaseTwoCol';
import BaseFormItem from '../Widget/BaseFormItem';
const Option = Select.Option;

const DemoSearchForm = ({
  onSearch,
  onToggle,
  searchExpand,
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
    <BaseTwoCol key='code'>
      <BaseFormItem label="代码 类似于">
        {getFieldDecorator("code")(
          <Input key="codeInput" placeholder="代码 类似于" style={{ border: '1px solid #B5B5B5', 'font-family': 'Verdana' }} />
        )}
      </BaseFormItem>
    </BaseTwoCol>);
  children.push(
    <BaseTwoCol key='name'>
      <BaseFormItem label="姓名 类似于">
        {getFieldDecorator("name")(
          <Input key="nameInput" placeholder="姓名 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>);
  children.push(
    <BaseTwoCol key='state'>
      <BaseFormItem label="状态 等于">
        {getFieldDecorator('userState')(
          <Select size="default" placeholder="请选择" showSearch={false} key="stateSelecter">
            <Option value="online">已启用</Option>
            <Option value="offline">已停用</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>);

  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

DemoSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  searchExpand: PropTypes.bool
};

export default Form.create()(DemoSearchForm);