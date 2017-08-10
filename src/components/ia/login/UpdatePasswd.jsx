import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import BaseForm from '../../Widget/BaseForm';
import SInput from '../../Widget/SInput';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const UpdatePasswd = ({
  visible,
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

      const data = { ...getFieldsValue() };
      data.token = localStorage.getItem("token");
      if (data.newPasswd != data.confirmPasswd) {
        alert("新密码与确认密码不一致");
        return;
      };
      onOk(data)
    });
  };

  const modalOpts = {
    title: <b>修改密码</b>,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  const items = [];
  items.push(<SInput key="oldPasswd" type="password" label="原密码" fieldName="oldPasswd" getFieldDecorator={getFieldDecorator} isTop rules="[{
              required: true, message: '原密码不能为空！'}]" />);
  items.push(<SInput key="newPasswd" type="password" label="新密码" fieldName="newPasswd" getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '新密码不能为空！'}, {
                max: 30,
                message: '密码最大长度是30'
              }]" />);
  items.push(<SInput key="confirmPasswd" type="password" label="确认密码" fieldName="confirmPasswd" isBottom getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '确认密码不能为空！'}]" />);

  return (
    <Modal {...modalOpts}>
      <BaseForm items={items} />
    </Modal>
  );
};

UpdatePasswd.propTypes = {

};

export default Form.create()(UpdatePasswd);