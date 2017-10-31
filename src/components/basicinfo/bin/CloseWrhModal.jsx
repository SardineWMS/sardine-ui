import React, { PropTypes } from 'react';
import { Form, InputNumber, Input,Modal, Select } from 'antd';
import BaseFormItem from '../../Widget/BaseFormItem';
const Option = Select.Option;

const CloseWrhModal = ({
  visible,
  wrhs,
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
    title: '封仓',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  const options = [];
  if (wrhs) {
    for (let i = 0; i < wrhs.length; i++) {
      let option = wrhs[i];
      options.push(
        <Option key={option.uuid}>{"["+option.code+"]"+option.name}</Option>
      );
    };
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <BaseFormItem label="仓位：" >
          {getFieldDecorator('wrh', {
            rules: [{ required: false }
            ],})(
            <Select size="large" style={{ width: 258 }} >
              {options}
            </Select>
            )}
        </BaseFormItem>
        <BaseFormItem label="货位范围：" >
          {getFieldDecorator('binScope', {
            rules: [{ required: false },
            { pattern: /^[0-9]{0,8}$/, message: "代码长度最大为8,且只能为数字" }],
          })(
            <Input placeholder="请输入" />
            )}
        </BaseFormItem>
      </Form>
    </Modal>
  );
};

CloseWrhModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  wrhs: PropTypes.array
};

export default Form.create()(CloseWrhModal);
