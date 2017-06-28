import React, { PropTypes } from 'react'
import { Form, Modal, Input } from 'antd';
import moment from 'moment';
import BaseFormItem from '../../../Widget/BaseFormItem';

const PickBinStockLimitModal = ({
	visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {

  const modalOpts = {
    title: "商品最高最低库存",
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  function handleOk() {
    const data = {
      ...getFieldsValue()
    }
    onOk(data);
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <BaseFormItem label="拣货规格">
          {getFieldDecorator('pickUpQpcStr', {
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="最高库存">
          {getFieldDecorator('highQty', {
            rules: [{ pattern: /^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/, message: '最高库存输入不正确，最大长度12，保留3位小数' }]
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="最低库存">
          {getFieldDecorator('lowQty', {
            rules: [{ pattern: /^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/, message: '最低库存输入不正确，最大长度12，保留3位小数' }]
          })(<Input />)}
        </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(PickBinStockLimitModal);
