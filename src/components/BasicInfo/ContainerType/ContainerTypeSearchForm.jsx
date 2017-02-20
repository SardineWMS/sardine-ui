import React, { Component, PropTypes } from 'react';
import {Menu, Form, Row, Col, Input, Button,Card ,Icon,Collapse } from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;

const ContainerTypeSearchForm = ({
  onSearch,
  form: {
    getFieldDecorator,
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
    <Col span={12} key='1'>
      <FormItem {...formItemLayout} label="代码 类似于">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="请输入"/>
          )}
      </FormItem>
      </Col>);

  children.push(
    <Col span={12} key='2'>
      <FormItem  {...formItemLayout} label="名称 类似于">
        {getFieldDecorator('name')(
          <Input type="text" placeholder="请输入"/>
        )}
        </FormItem>
      </Col>);

    return (
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="搜索" key="1">
          <Form
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
     </Panel>
    </Collapse>  
  );
};

ContainerTypeSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
};

export default Form.create()(ContainerTypeSearchForm);