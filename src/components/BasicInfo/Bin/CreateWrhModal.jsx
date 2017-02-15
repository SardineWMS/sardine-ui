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

const CreateWrhModal = ({
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
      const data = {
        ...getFieldsValue()
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '仓位新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="代码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '仓位代码未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '仓位名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CreateWrhModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(CreateWrhModal);
