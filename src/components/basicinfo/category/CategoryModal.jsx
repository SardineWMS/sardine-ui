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
                message: '类别代码不能为空！'
              },
              {
                max: 30,
                message: '类别代码长度最大为30！'
              }
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="类别名称" >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '类别名称不能为空！',
              },
              {
                max: 100,
                message: '类别名称长度最大为100！'
              }
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="备注：">
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{
                max: 255,
                message: '类别备注长度最大为255！'
            }]
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
