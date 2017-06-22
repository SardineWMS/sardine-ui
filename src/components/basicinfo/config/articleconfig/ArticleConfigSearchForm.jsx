import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
import BaseSearchPanel from '../../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../../Widget/BaseTwoCol';
import BaseFormItem from '../../../Widget/BaseFormItem';
const Option = Select.Option;

const ArticleConfigSearchForm = ({
  onSearch,
  field,
  keyword,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
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
    <BaseTwoCol key='articleCode'>
        <BaseFormItem label="商品代码 等于">
          {getFieldDecorator('articleCode')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  children.push(
    <BaseTwoCol key='fixedPickBin'>
        <BaseFormItem label="固定拣货位 等于">
          {getFieldDecorator('fixedPickBin')(
            <Input type="text" placeholder="请输入"/>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

  
    return (
      <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

ArticleConfigSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(ArticleConfigSearchForm);