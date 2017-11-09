import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import UserModalForSearch from '../../widget/UserModalForSearch';

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
    onSearch({ ...getFieldsValue(), taskType: "RtnPutaway" });
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
          <Select placeholder="请选择" showSearch={false} size="default" >
            <Option value=''>全部</Option>
            <Option value="待退仓上架">待上架</Option>
            <Option value="退仓上架中">上架中</Option>
            <Option value="退仓上架完成">上架完成</Option>
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
    <BaseTwoCol key="owner">
      <BaseFormItem label="供应商 类似于">
        {getFieldDecorator('owner')(
          <Input type="text" placeholder="供应商 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="toBincode">
      <BaseFormItem label="目标货位 类似于">
        {getFieldDecorator('toBincode')(
          <Input type="text" placeholder="目标货位 类似于" />
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
      <BaseFormItem label="操作人 类似于">
        {getFieldDecorator('operator')(
          <UserModalForSearch />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="operatorType">
      <BaseFormItem label="操作方式 类似于">
        {getFieldDecorator('operatorType', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} size="default" >
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

RtnPutawayTaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(RtnPutawayTaskSearchForm);