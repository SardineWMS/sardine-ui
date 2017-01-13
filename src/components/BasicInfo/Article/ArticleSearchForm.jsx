import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button,Card ,Collapse,Select } from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

const ArticleSearchForm = ({
  onSearch,
  field,
  keyword,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleSearch(e) {
    e.preventDefault();
    onSearch(getFieldsValue());
  }

  function handleReset(e) {
    e.preventDefault();
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const children = [];
  children.push(<Col span={12} key='code'>
      <FormItem {...formItemLayout} label="代码 类似于">
        {getFieldDecorator('code')(
          <Input type="text" placeholder="代码 类似于"/>
          )}
      </FormItem>
      </Col>);
  children.push(<Col span={12} key='name'>
      <FormItem {...formItemLayout} label="名称 类似于">
        {getFieldDecorator('name')(
          <Input type="text" placeholder="名称 类似于"/>
        )}
        </FormItem>
      </Col>);
    children.push(<Col span={12} key='state'>
      <FormItem {...formItemLayout} label="状态 类似于">
        {getFieldDecorator('state')(
              <Select >
                  <Option value="normal" initialValue>正常</Option>
             </Select>
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
    </Card>
    );
};

ArticleSearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(ArticleSearchForm);