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
    <BaseTwoCol key="taskNo">
      <BaseFormItem  label="指令号 等于">
        {getFieldDecorator('taskNo')(
          <Input type="text" placeholder="指令号 等于" />
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="taskType">
      <BaseFormItem label="指令类型 等于">
        {getFieldDecorator('taskType')(
          <Select size="large">
            <Option value="Putaway">上架指令</Option>
            <Option value="Pickup">拣货指令</Option>
            <Option value="Rpl">补货指令</Option>
            <Option value="RtnPutaway">退仓上架指令</Option>
            <Option value="RtnShelf">退货下架指令</Option>
            <Option value="RtnHandover">退货交接指令</Option>
            <Option value="Move">移库指令</Option>
            <Option value="Ship">装车指令</Option>
          </Select>
        )}
      </BaseFormItem>
    </BaseTwoCol>
  );
  children.push(
    <BaseTwoCol key="state">
      <BaseFormItem  label="状态 等于">
        {getFieldDecorator('state')(
          <Select size="large">
            <Option value="Initial">初始</Option>
            <Option value="InProgress">进行中</Option>
            <Option value="Finished">已完成</Option>
            <Option value="Aborted">已作废</Option>
          </Select>
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