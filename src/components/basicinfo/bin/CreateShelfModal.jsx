import React, { PropTypes } from 'react'
import { Form, Input, Col, InputNumber, Select, Modal } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';
const InputGroup = Input.Group;

const CreateShelfModal = ({
  visible,
  onOk,
  onCancel,
  treeData,
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
      var shelfArray = new Array();
      var pathArray = new Array();
      for (let i = 0; i < treeData.length; i++) {
        let wrh = treeData[i];
        for (let j = 0; j < wrh.children.length; j++) {
          let zone = wrh.children[j];
          for (let k = 0; k < zone.children.length; k++) {
            let path = zone.children[k];
            if (path.key <= data.endPath && path.key >= data.startPath) {
              pathArray.push(path.key);
            };
          };
        };
      };

      for (let i = 0; i < pathArray.length; i++) {
        for (let j = 0; j < data.count; j++) {
          shelfArray[i * data.count + j] = pathArray[i];
        };
      };
      onOk(shelfArray);
    });
  };

  function validate(rule, value, callback) {
        if (rule.required == false) {
            callback();
            return;
        };
        var pattern = /^[0-9]{4}$/;
        if (!pattern.test(value.startPath)) {
            callback("起始货道必须是4位数字！");
        };
        if (!pattern.test(value.endPath)) {
            callback("截止货道必须是4位数字！");
        };
        callback();
  };

  const modalOpts = {
    title: '货架新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <BaseFormItem label="起始~截止货道：" >
          {getFieldDecorator('shelf', {
            rules: [{ required: true, validator: (rule, value, callback) => validate(rule, value, callback) }], validateTrigger: 'onChange'
          })(
            <InputGroup size="large">
              <Col span="12">
                <Input />
              </Col>
              <Col span="12">
                <Input />
              </Col>
            </InputGroup>
            )}
        </BaseFormItem>
        <BaseFormItem label="每货道数量：">
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '每货道数量未填写',
              }, {
                pattern: /^\+?[1-9]\d*$/,
                message: '数量必须大于0！'
              }
            ],
          })(<Input />)}
        </BaseFormItem>
      </Form>
    </Modal>
  );
};

CreateShelfModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  treeData: PropTypes.array
};

export default Form.create()(CreateShelfModal);
