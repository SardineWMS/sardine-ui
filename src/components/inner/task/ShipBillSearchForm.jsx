import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const ShipBillSearchForm = ({
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
    <BaseTwoCol key="supplierCodeLike">
      <BaseFormItem  label="供应商代码 类似于">
        {getFieldDecorator('supplierCodeLike')(
          <Input type="text" placeholder="供应商代码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="binCodeLike">
      <BaseFormItem  label="货位代码 类似于">
        {getFieldDecorator('binCodeLike')(
          <Input type="text" placeholder="货位代码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="containerBarcodeLike">
      <BaseFormItem  label="容器条码 类似于">
        {getFieldDecorator('containerBarcodeLike')(
          <Input type="text" placeholder="容器条码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="articleCodeLike">
      <BaseFormItem  label="商品条码 类似于">
        {getFieldDecorator('articleCodeLike')(
          <Input type="text" placeholder="商品条码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );

  children.push(
    <BaseTwoCol key="customerCodeLike">
      <BaseFormItem  label="客户代码 类似于">
        {getFieldDecorator('customerCodeLike')(
          <Input type="text" placeholder="客户代码 类似于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );


  return (
    <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
  );
};

ShipBillSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
};

export default Form.create()(ShipBillSearchForm);