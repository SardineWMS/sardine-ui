import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Select, Modal } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';

const CreateZoneModal = ({
  visible,
  onOk,
  onCancel,
  wrhs,
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
      }
      const data = {
        ...getFieldsValue()
      };
      onOk(data);
    });
  };

  const wrhOptions = [];
  if (wrhs) {
    for (let i = 0; i < wrhs.length; i++) {
      let option = wrhs[i];
      wrhOptions.push(
        <Option key={option.uuid}>{"[" + option.code + "]" + option.name}</Option>
      );
    };
  };

  const modalOpts = {
    title: '货区新建',
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
                message: '代码不能为空！',
              }, {
                pattern: /^[0-9]{2}$/,
                message: '代码必须是两位数字！',
              }
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="名称：">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '货区名称未填写',
              }, {
                max: 100,
                message: '名称最大长度为100！',
              }
            ],
          })(<Input />)}
        </BaseFormItem>
        <BaseFormItem label="仓位：" >
          {getFieldDecorator('wrh', {
            rules: [{ required: true, message: '仓位不能为空' },],
          })(
            <Select>
              {wrhOptions}
            </Select>
            )}
        </BaseFormItem>
        <BaseFormItem label="备注：">
          {getFieldDecorator('remark', {
            rules: [
              {
                max: 255,
                message: '备注最大长度为255！',
              }
            ],
          })(<Input type="textarea" rows={4} />)}
        </BaseFormItem>
      </Form>
    </Modal>
  );
};

CreateZoneModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  wrhs: PropTypes.array
};

export default Form.create()(CreateZoneModal);
