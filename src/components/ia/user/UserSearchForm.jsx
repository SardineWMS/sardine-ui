import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Icon, Select } from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

const DemoSearchForm = ({
  onSearch,
  onToggle,
  searchExpand,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
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
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const children = [];
  children.push(<Col span={12} key='code'>
    <FormItem {...formItemLayout} label="代码 类似于" style={{'font-family':'Verdana'}}>
      {getFieldDecorator("code")(
        <Input key="codeInput" placeholder="代码 类似于" style={{border:'1px solid #B5B5B5', 'font-family':'Verdana'}}  />
      )}
    </FormItem>
  </Col>);
  children.push(
    <Col span={12} key='name'>
      <FormItem {...formItemLayout} label="姓名 类似于">
        {getFieldDecorator("name")(
          <Input key="nameInput" placeholder="姓名 类似于" />
        )}
      </FormItem>
    </Col>);
  children.push(<Col span={12} key='state'>
    <FormItem {...formItemLayout} label="状态 等于">
      {getFieldDecorator('userState')(
        <Select size="default" placeholder="请选择" showSearch={false} key="stateSelecter">
          <Option value="online">已启用</Option>
          <Option value="offline">已停用</Option>
        </Select>
      )}
    </FormItem>
  </Col>);
  children.push(<Col span={12} key='role'>
    <FormItem {...formItemLayout} label="角色 包含">
      {getFieldDecorator('role')(
        <Select size="default" placeholder="请选择" showSearch={false} key="stateSelecter">
          <Option value="online">已启用</Option>
          <Option value="offline">已停用</Option>
        </Select>
      )}
    </FormItem>
  </Col>);

  const shownCount = searchExpand ? children.length : 4;
  return (
    <Card title="搜索条件" style={{border:'1px solid #71C671'}}>
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Row gutter={2}>
          {children.slice(0, shownCount)}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" icon="search">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              清除
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

DemoSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  searchExpand: PropTypes.bool,
};

export default Form.create()(DemoSearchForm);