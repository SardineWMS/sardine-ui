import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Collapse,Select,Icon} from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

const SupplierSearchForm = ({
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

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const children = [];
  children.push(
    <Col span={12} key='code'>
      <FormItem {...formItemLayout} label="代码 类似于">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="请输入"/>
          )}
      </FormItem>
      </Col>);

  children.push(
    <Col span={12} key='state'>
      <FormItem {...formItemLayout} label="状态 类似于">
        {getFieldDecorator('state',{
          initialValue:"all"
        })(
          <Select showSearch={false} size="default" 
          style={{ width: 400 }} >
            <Option value="all">全部</Option>
            <Option value="normal">正常</Option>
            <Option value="deleted">已删除</Option>
          </Select>
          )}
      </FormItem>
      </Col>);

  children.push(<Col span={12} key='name'>
      <FormItem  {...formItemLayout} label="名称 类似于">
        {getFieldDecorator('name')(
          <Input type="text" placeholder="请输入"/>
        )}
        </FormItem>
      </Col>);

    return (
      <Card title="搜索条件">
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, children.length)}
        </Row>

        <Row>
          <Col span={22} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              清除
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
    );
};

SupplierSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  onToggle: PropTypes.func,
  keyword: PropTypes.string,
};

export default Form.create()(SupplierSearchForm);