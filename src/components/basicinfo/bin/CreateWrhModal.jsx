import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Modal } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';

const CreateWrhModal = ({
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
      const data = {
        ...getFieldsValue()
      };
      onOk(data);
    });
  };

  const modalOpts = {
    title: '仓位新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <BaseFormItem label="代码：">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '仓位代码未填写',
              },
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="名称：">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '仓位名称未填写',
              },
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="备注：">
          {getFieldDecorator('remark', {
          })(<Input type="textarea" rows={4} />)}
        </BaseFormItem>
      </Form>
    </Modal>
  );
};

CreateWrhModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(CreateWrhModal);
