import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Modal } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';

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
    getFieldsValue
  }
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      };
      const data = {
        ...item,
        ...getFieldsValue(),
        upperCategory: upperCategory.uuid
      };
      onOk(data);
    });
  };

  const modalOpts = {
    title: '商品类别',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        {showUpper ?
          <BaseFormItem label="上级类别：">
            <span> [{upperCategory.code}]{upperCategory.name} </span>
          </BaseFormItem> : ''
        }
        <BaseFormItem label="类别代码：">
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
                message: '类别代码未填写',
              },
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="类别名称" >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '类别名称未填写',
              },
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="备注：">
          {getFieldDecorator('remark', {
            initialValue: item.remark,
          })(<Input type="textarea" rows={4} />)}
        </BaseFormItem>
      </Form>
    </Modal>
  );
};

CategoryModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  upperCategory: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showUpper: PropTypes.bool
};

export default Form.create()(CategoryModal);
