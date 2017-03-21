import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Modal } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const UpdatePasswd = ({
  visible,
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
        return
      }

      const data={...getFieldsValue()}
      data.token=localStorage.getItem("token");
      if(data.newPasswd!=data.confirmPasswd){
        alert("新密码与确认密码不一致");
        return;
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '修改密码',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="原始密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('oldPasswd', {
            rules: [
              {
                required: true,
                message: '原始密码未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="新密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('newPasswd', {
            rules: [
              {
                required: true,
                message: '新密码未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
       <FormItem label="确认密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('confirmPasswd', {
            rules: [
              {
                required: true,
                message: '确认密码未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

UpdatePasswd.propTypes = {
  
}

export default Form.create()(UpdatePasswd);