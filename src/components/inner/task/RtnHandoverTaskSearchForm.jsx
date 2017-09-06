import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const RtnHandoverTaskSearchForm = ({
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
    onSearch({...getFieldsValue(),taskType: "RtnHandover"});
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
            <Option value="待退货下架">待退货下架</Option>
            <Option value="退货下架中">退货下架中</Option>
            <Option value="退货下架完成">退货下架完成</Option>
            <Option value="退货下架作废">退货下架作废</Option>
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

RtnHandoverTaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(RtnHandoverTaskSearchForm);