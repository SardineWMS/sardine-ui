import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const TaskSearchForm = ({
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
    <BaseTwoCol key="states">
      <BaseFormItem  label="状态 等于">
        {getFieldDecorator('states')(
          <Select  mode="multiple" >
            <Option value="待上架">待上架</Option>
            <Option value="待退仓上架">待退仓上架</Option>
            <Option value="待退货下架">待退货下架</Option>
            <Option value="待移库">待移库</Option>
            <Option value="上架中">上架中</Option>
            <Option value="退仓上架中">退仓上架中</Option>
            <Option value="退货下架中">退货下架中</Option>
            <Option value="移库中">移库中</Option>
            <Option value="上架完成">上架完成</Option>
            <Option value="退仓上架完成">退仓上架完成</Option>
            <Option value="退货下架完成">退货下架完成</Option>
            <Option value="移库完成">移库完成</Option>
            <Option value="上架作废">上架作废</Option>
            <Option value="退仓上架作废">退仓上架作废</Option>
            <Option value="退货下架作废">退货下架作废</Option>
            <Option value="移库作废">移库作废</Option>
            <Option value="待拣货">待拣货</Option>
            <Option value="拣货中">拣货中</Option>
            <Option value="拣货完成">拣货完成</Option>
            <Option value="拣货异常">拣货异常</Option>
            <Option value="拣货跳过">拣货跳过</Option>
            <Option value="拣货缺货">拣货缺货</Option>
            <Option value="待补货">待补货</Option>
            <Option value="补货中">补货中</Option>
            <Option value="补货异常">补货异常</Option>
            <Option value="补货完成">补货完成</Option>
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

TaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(TaskSearchForm);