import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
import BaseSearchPanel from '../../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../../Widget/BaseTwoCol';
import BaseFormItem from '../../../Widget/BaseFormItem';
const Option = Select.Option;

const CategoryStorageAreaConfigSearchForm = ({
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
    <BaseTwoCol key='articleCode'>
        <BaseFormItem label="类别代码 等于">
          {getFieldDecorator('categoryCode')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='categoryName'>
        <BaseFormItem label="类别名称 等于">
          {getFieldDecorator('categoryName')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='categoryUpperCode'>
        <BaseFormItem label="上级类别代码 等于">
          {getFieldDecorator('categoryUpperCode')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);
  
    return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

CategoryStorageAreaConfigSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(CategoryStorageAreaConfigSearchForm);