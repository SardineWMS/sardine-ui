import React, { PropTypes } from 'react'
import { Form, Input, Col, InputNumber, Select, Modal } from 'antd'
const FormItem = Form.Item
const InputGroup = Input.Group;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CreateShelfModal = ({
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
        ...getFieldsValue(),
      }
      var shelfArray = new Array();
      var countPath = data.endPath - data.startPath + 1;

      for(let i=0;i<countPath;i++) { 
          for(let j=0;j<data.count;j++){
            let currentPathForInt = i + parseInt(data.startPath);
            let currentPathForString = "" + currentPathForInt;
            let zeroCount = 4 - currentPathForString.length;
            for(let k=0;k<zeroCount;k++){
              currentPathForString = "0" + currentPathForString;
            }
            shelfArray[i*data.count + j] = currentPathForString;
          }
      } 
      onOk(shelfArray)
    })
  }

  const modalOpts = {
    title: '货架新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
      <FormItem {...formItemLayout} label="起始~截止货道：" hasFeedback>
            {getFieldDecorator('shelf' ,{
            rules: [{ required: true, message: '起始截止货道不能为空' },],
         })(
        <InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startPath', {
            rules: [
              {
                required: true,
                message: '起始货道未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
             {getFieldDecorator('endPath', {
            rules: [
              {
                required: true,
                message: '截止货道未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>
         )}
        </FormItem>
        <FormItem label="每货道数量：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '每货道数量未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

CreateShelfModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(CreateShelfModal);
