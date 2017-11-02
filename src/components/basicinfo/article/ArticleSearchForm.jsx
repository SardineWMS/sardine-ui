import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const ArticleSearchForm = ({
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
    <BaseTwoCol key="code">
      <BaseFormItem label="代码 类似于">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="请输入：" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="secondCode">
      <BaseFormItem label="第二代码 类似于">
        {getFieldDecorator('secondCode')(
          <Input type="text" placeholder="请输入：" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="name">
      <BaseFormItem label="名称 类似于">
        {getFieldDecorator('name')(
          <Input type="text" placeholder="请输入：" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="state">
      <BaseFormItem label="状态 等于">
        {getFieldDecorator('state')(
          <Select size="default" placeholder="请选择：">
            <Option value="normal" initialValue>正常</Option>
            <Option value="offline" initialValue>停用</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

ArticleSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(ArticleSearchForm);