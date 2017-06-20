import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm, Card, Select, InputNumber } from 'antd';
import BaseCard from '../Widget/BaseCard';
import BaseFormItem from '../Widget/BaseFormItem';
import ToolbarPanel from '../Widget/ToolbarPanel';
import BaseForm from '../Widget/BaseForm';

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

  const children = [];
  children.push(
    <BaseFormItem label="代码 :" >
      {getFieldDecorator('code', {
        initialValue: item.code,
        rules: [
          { required: true, message: '代码未填写' },
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="姓名 :" >
      {getFieldDecorator('name', {
        initialValue: item.name,
        rules: [{ required: true, message: '名称未填写' },],
      })(
        <Input type="text"></Input>
        )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="联系方式 :" >
      {getFieldDecorator('phone', {
        initialValue: item.phone,
      })(
        <Input type="text"></Input>
        )}
    </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push(<Button onClick={handleOk}> 保存</Button>);
  toolbar.push(<Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>);
  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息" single={true}>
        <BaseForm items={children} />
      </BaseCard>
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