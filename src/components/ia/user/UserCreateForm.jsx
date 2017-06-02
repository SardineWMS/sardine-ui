import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm, Card, Select, InputNumber } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
const FormItem = Form.Item;

const DemoCreateForm = ({
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), key: item.key, uuid: item.uuid, version: item.version };
      onOk(data);
    });
  }

  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('年龄未填写'));
    }
    if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <div>
      <div className="ant-table-title">
        <Button onClick={handleOk} disabled={!PermissionUtil("user:create")}> 保存</Button>
        <Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>
      </div>
      <Card title="基本信息">
        <Row gutter={16}>
          <Col span={12}>
            <Form horizontal>
              <FormItem {...formItemLayout} label="代码 :" hasFeedback>
                {getFieldDecorator('code', {
                  initialValue: item.code,
                  rules: [
                    { required: true, message: '代码未填写' },
                  ],
                })(
                  <Input type="text" />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="姓名：" hasFeedback>
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [{ required: true, message: '名称未填写' },],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系方式：" hasFeedback>
                {getFieldDecorator('phone', {
                  initialValue: item.phone,
                  rules: [{ required: true, message: '联系方式未填写' },],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

DemoCreateForm.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(DemoCreateForm);