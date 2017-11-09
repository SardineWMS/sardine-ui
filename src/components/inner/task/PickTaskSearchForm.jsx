import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import UserModalForSearch from '../../widget/UserModalForSearch';
import BinModal from '../../widget/BinModal';
import ContainerModal from '../../widget/ContainerModal';

const PickTaskSearchForm = ({
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
    <BaseTwoCol key="billNumber">
      <BaseFormItem label="单号 类似于">
        {getFieldDecorator('billNumber')(
          <Input type="text" placeholder="单号 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );


  children.push(
    <BaseTwoCol key="states">
      <BaseFormItem label="状态 等于">
        {getFieldDecorator('states', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} psize="default" >
            <Option value=''>全部</Option>
            <Option value="inConfirm">待确认</Option>
            <Option value="approved">已批准</Option>
            <Option value="inProgress">进行中</Option>
            <Option value="exception">异常</Option>
            <Option value="audited">已审核</Option>
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
    <BaseTwoCol key="fromBinCode">
      <BaseFormItem label="来源货位 类似于">
        {getFieldDecorator('fromBinCode')(
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
    <BaseTwoCol key="picker">
      <BaseFormItem label="拣货员 类似于">
        {getFieldDecorator('picker')(
          <UserModalForSearch />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="customer">
      <BaseFormItem label="客户 类似于">
        {getFieldDecorator('customer')(
          <Input type="text" placeholder="客户 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="deliveryType">
      <BaseFormItem label="配送方式 等于">
        {getFieldDecorator('deliveryType')(
          <Select placeholder="请选择" showSearch={false} psize="default" >
            <Option value=''>全部</Option>
            <Option value="warehouse">仓库送</Option>
            <Option value="pickByOneSelf">自提</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="method">
      <BaseFormItem label="操作方式 等于">
        {getFieldDecorator('method', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} psize="default" >
            <Option value=''>全部</Option>
            <Option value="ManualBill">手工单据</Option>
            <Option value="APP">APP</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="sourceBillNumber">
      <BaseFormItem label="波次号 等于">
        {getFieldDecorator('sourceBillNumber')(
          <Input type="text" placeholder="波次号 等于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="pickArea">
      <BaseFormItem label="拣货区域 等于">
        {getFieldDecorator('pickArea')(
          <Input type="text" placeholder="拣货区域 等于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="pickType">
      <BaseFormItem label="拣货类型 等于">
        {getFieldDecorator('pickType', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} psize="default" >
            <Option value=''>全部</Option>
            <Option value="WholeContainer">整托</Option>
            <Option value="PartContainer">非整托</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="deliverySystem">
      <BaseFormItem label="配送体系 等于">
        {getFieldDecorator('deliverySystem', { initialValue: '' })(
          <Select placeholder="请选择" showSearch={false} psize="default" >
            <Option value=''>全部</Option>
            <Option value="tradition">传统体系</Option>
            <Option value="eCommerce">电商体系</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );


  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

PickTaskSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(PickTaskSearchForm);