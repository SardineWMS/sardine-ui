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

const CategoryModal = ({
  visible,
  item = {},
  upperCategory,
  showUpper,
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
        ...getFieldsValue(),
        upperCategory : upperCategory.uuid,
        uuid : item.uuid,
        version : item.version,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '商品类别',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        {showUpper ? 
        <FormItem label="上级类别：" hasFeedback {...formItemLayout}>
          <span> [{upperCategory.code}]{upperCategory.name} </span>
        </FormItem> : ''
        }
        <FormItem label="类别代码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
                message: '类别代码未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="类别名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '类别名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CategoryModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  upperCategory : PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showUpper : PropTypes.bool,
}

export default Form.create()(CategoryModal);
