import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
import BaseSearchPanel from '../../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../../Widget/BaseTwoCol';
import BaseFormItem from '../../../Widget/BaseFormItem';
const Option = Select.Option;

const TaskAreaConfigSearchForm = ({
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
    <BaseTwoCol key='operatorCode'>
        <BaseFormItem label="员工代码 等于">
          {getFieldDecorator('operatorCode')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='operatorName'>
        <BaseFormItem label="员工名称 等于">
          {getFieldDecorator('operatorName')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  
    return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

TaskAreaConfigSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(TaskAreaConfigSearchForm);