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
  treeData,
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
      var pathArray = new Array();
      for(let i=0;i<treeData.length;i++){
        let wrh = treeData[i];
        for(let j=0;j<wrh.children.length;j++){
          let zone = wrh.children[j];
          for(let k=0;k<zone.children.length;k++){
            let path = zone.children[k];
            if(path.key <= data.endPath && path.key >= data.startPath){
              pathArray.push(path.key);
            }
          }
        }
      }

      for(let i=0;i<pathArray.length;i++) { 
          for(let j=0;j<data.count;j++){
            shelfArray[i*data.count + j] = pathArray[i];
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
  treeData: PropTypes.array,
}

export default Form.create()(CreateShelfModal);
