import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Icon,Collapse } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const ContainerTypeSearchForm = ({
  onSearch,
  form: {
    getFieldDecorator,
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
          <Input type="text" placeholder="请输入"/>
          )}
      </BaseFormItem>
      </BaseTwoCol>);

  children.push(
    <BaseTwoCol>
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

ContainerTypeSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func
};

export default Form.create()(ContainerTypeSearchForm);