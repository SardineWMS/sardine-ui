import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
const Option = Select.Option;

const SupplierSearchForm = ({
  onSearch,
  field,
  keyword,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
    },
  }) => {
  function handleSearch(e) {
    e.preventDefault();
    onSearch(getFieldsValue());
  }

  function handleReset(e) {
    e.preventDefault();
    resetFields();
  }

  const children = [];
  children.push(
    <BaseTwoCol key='code'>
        <BaseFormItem label="代码 类似于">
          {getFieldDecorator('code')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='state'>
        <BaseFormItem label="状态 类似于">
          {getFieldDecorator('state',{
            initialValue:"all"
          })(
            <Select showSearch={false} size="default" 
            style={{ width: 400 }} >
              <Option value="all">全部</Option>
              <Option value="normal">正常</Option>
              <Option value="deleted">已删除</Option>
            </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='name'>
      <BaseFormItem label="名称 类似于">
        {getFieldDecorator('name')(
          <Input type="text" placeholder="请输入"/>
        )}
      </BaseFormItem>
    </BaseTwoCol>);
  
    return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

SupplierSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  onToggle: PropTypes.func,
  keyword: PropTypes.string,
};

export default Form.create()(SupplierSearchForm);