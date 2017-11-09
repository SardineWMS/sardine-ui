import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import UserModalForSearch from '../../widget/UserModalForSearch';

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
    onSearch(getFieldsValue());
  };

  function handleReset(e) {
    e.preventDefault();
    resetFields();
  };

  const children = [];

  children.push(
    <BaseTwoCol key="states">
      <BaseFormItem label="状态 等于">
        {getFieldDecorator('states', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} size="default">
            <Option value=''>全部</Option>
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
      <BaseFormItem label="商品条码 类似于">
        {getFieldDecorator('articleCode')(
          <Input type="text" placeholder="商品条码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="fromContainerBarcode">
      <BaseFormItem label="来源容器 类似于">
        {getFieldDecorator('fromContainerBarcode')(
          <Input type="text" placeholder="来源容器 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="toContainerBarcode">
      <BaseFormItem label="目标容器 类似于">
        {getFieldDecorator('toContainerBarcode')(
          <Input type="text" placeholder="目标容器 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="operator">
      <BaseFormItem label="操作人 等于">
        {getFieldDecorator('operator')(
          // <Input type="text" placeholder="操作人 等于" />
          <UserModalForSearch />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="operatorType">
      <BaseFormItem label="操作方式 等于">
        {getFieldDecorator('operatorType', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} size="default">
            <Option value=''>全部</Option>
            <Option value="ManualBill">手工单据</Option>
            <Option value="APP">APP</Option>
          </Select>
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