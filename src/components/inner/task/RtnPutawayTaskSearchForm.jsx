import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const RtnPutawayTaskSearchForm = ({
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
    onSearch({...getFieldsValue(),taskType: "RtnPutaway"});
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
            <Option value="待退仓上架">待退仓上架</Option>
            <Option value="退仓上架中">退仓上架中</Option>
            <Option value="退仓上架完成">退仓上架完成</Option>
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

RtnPutawayTaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(RtnPutawayTaskSearchForm);