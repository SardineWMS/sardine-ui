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
    getFieldsValue
  }
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      };
      const data = { ...getFieldsValue(), key: item.key, uuid: item.uuid, version: item.version };
      onOk(data);
    });
  };

  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('年龄未填写'));
    };
    if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    };
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
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
                    { required: true, message: '代码未填写' }, { pattern: /^[a-z0-9]{0,30}$/, message: "用户代码只能是数字和字母，且小于30位" }
                  ],
                })(
                  <Input type="text" disabled={item.code} />
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="姓名：" hasFeedback>
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [{ required: true, message: '名称未填写' }, {
                    max: 100,
                    message: '姓名最大长度是100'
                  }],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系方式：" hasFeedback>
                {getFieldDecorator('phone', {
                  initialValue: item.phone,
                  rules: [{ required: true, message: '联系方式未填写' }, {
                    max: 30,
                    message: '联系方式最大长度是30'
                  }],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="身份证：" hasFeedback>
                {getFieldDecorator('id', {
                  initialValue: item.id,
                  rules: [{ required: false }, {
                    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                    message: '身份证号格式不正确'
                  }],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="email：" hasFeedback>
                {getFieldDecorator('email', {
                  initialValue: item.email,
                  rules: [{ required: false }, {
                    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                    message: '邮箱格式不正确'
                  }],
                })(
                  <Input type="text"></Input>
                  )}
              </FormItem>
              <FormItem {...formItemLayout} label="说明：" hasFeedback>
                {getFieldDecorator('remark', {
                  initialValue: item.remark,
                  rules: [{ required: false }, {
                    max: 255,
                    message: '说明最大长度是255'
                  }],
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
  onCancel: PropTypes.func
};

export default Form.create()(DemoCreateForm);