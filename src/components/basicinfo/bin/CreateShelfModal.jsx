import React, { PropTypes } from 'react'
import { Form,message, Input, Col, InputNumber, Select, Modal } from 'antd'
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
      var pattern = /^[0-9]{4}$/;
        if (!pattern.test(data.startPath)) {
            message.error("起始货道必须是4位数字！");
            return;
        };
        if (!pattern.test(data.endPath)) {
            message.error("截止货道必须是4位数字！");
            return;
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
      if (shelfArray.length == 0) {
        message.warn("当前范围内没有可用货道，请重新输入货道范围！");
        return;
      }
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
            {getFieldDecorator('shelf' ,{
            rules: [{ required: true, message: '起始截止货道不能为空' },],
         })(
        <InputGroup compact>
    
              {getFieldDecorator('startPath', {
            rules: [
              {
                required: true,
                message: '起始货道未填写',
              },
            ],
          })(<Input style={{width: '50%'}}/>)}

             {getFieldDecorator('endPath', {
            rules: [
              {
                required: true,
                message: '截止货道未填写',
              },
            ],
          })(<Input style={{width: '50%'}} />)}
        </InputGroup>
         )}
        </BaseFormItem>
        <BaseFormItem label="每货道数量：">
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '每货道数量未填写',
              },
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
