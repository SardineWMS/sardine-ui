import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,Card ,Collapse,Select} from 'antd';
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
    resetFields,
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
    <BaseTwoCol>
      <BaseFormItem label="代码 类似">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="代码 类似"/>
          )}
      </BaseFormItem>
    </BaseTwoCol>);
    children.push(
      <BaseTwoCol>
        <BaseFormItem label="状态 等于">
          {getFieldDecorator('state')(
                <Select size="default">
                    <Option value="free" initialValue>空闲</Option>
               </Select>
          )}
        </BaseFormItem>
      </BaseTwoCol>);

    children.push(
      <BaseTwoCol>
        <BaseFormItem label="用途 等于">
          {getFieldDecorator('usage')(
                <Select size="default">
                    <Option value="StorageBin" initialValue>存储位</Option>
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
  keyword: PropTypes.string,
};

export default Form.create()(BinSearchForm);