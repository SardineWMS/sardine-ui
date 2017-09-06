import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const PutawayTaskSearchForm = ({
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
    onSearch({...getFieldsValue(),taskType: "Putaway"});
  };

  function handleReset(e) {
    e.preventDefault();
    resetFields();
  };

  const children = [];

  children.push(
    <BaseTwoCol key="states">
      <BaseFormItem  label="状态 等于">
        {getFieldDecorator('states')(
          <Select  mode="multiple" >
            <Option value="待上架">待上架</Option>
            <Option value="上架中">上架中</Option>
            <Option value="上架完成">上架完成</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="articleCode">
      <BaseFormItem  label="商品条码 类似于">
        {getFieldDecorator('articleCode')(
          <Input type="text" placeholder="商品条码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

PutawayTaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(PutawayTaskSearchForm);