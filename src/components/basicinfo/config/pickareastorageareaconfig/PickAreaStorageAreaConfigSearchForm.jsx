import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
import BaseSearchPanel from '../../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../../Widget/BaseTwoCol';
import BaseFormItem from '../../../Widget/BaseFormItem';
const Option = Select.Option;

const PickAreaStorageAreaConfigSearchForm = ({
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
    <BaseTwoCol key='pickAreaCode'>
        <BaseFormItem label="代码 等于">
          {getFieldDecorator('pickAreaCode')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='pickAreaName'>
        <BaseFormItem label="名称 等于">
          {getFieldDecorator('pickAreaName')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  
    return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

PickAreaStorageAreaConfigSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(PickAreaStorageAreaConfigSearchForm);