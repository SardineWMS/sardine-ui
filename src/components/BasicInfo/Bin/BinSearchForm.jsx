import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,Card ,Collapse,Select} from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

const BinSearchForm = ({
  onSearch,
  field,
  keyword,
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
    wrapperCol: { span: 12 },
  };

  const children = [];
  children.push(<Col span={12} key='code'>
      <FormItem {...formItemLayout} label="代码 类似">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="代码 类似"/>
          )}
      </FormItem>
      </Col>);
    children.push(<Col span={12} key='state'>
      <FormItem {...formItemLayout} label="状态 等于">
        {getFieldDecorator('state')(
              <Select >
                  <Option value="free" initialValue>空闲</Option>
             </Select>
        )}
        </FormItem>
      </Col>);

        children.push(<Col span={12} key='usage'>
      <FormItem {...formItemLayout} label="用途 等于">
        {getFieldDecorator('usage')(
              <Select >
                  <Option value="StorageBin" initialValue>存储位</Option>
             </Select>
        )}
        </FormItem>
      </Col>);

    return (
   <Collapse defaultActiveKey={["1"]}>
    <Panel header="搜索" key="1">
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, 2)}
        </Row>
        <Row gutter={40}>
          {children.slice(2, 6)}
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
    </Panel>
  </Collapse>
    );
};

BinSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(BinSearchForm);