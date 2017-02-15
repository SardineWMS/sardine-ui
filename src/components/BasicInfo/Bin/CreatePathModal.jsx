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

const CreatePathModal = ({
  visible,
  onOk,
  onCancel,
  zones,
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
        ...getFieldsValue()
      }
      let pathArray =new Array();  
      for(let i=0;i<data.zones.length;i++) { 
          for(let j=0;j<data.count;j++){
            pathArray[i*data.count + j] = data.zones[i];
          }
      } 
      onOk(pathArray)
    })
  }

  const zoneOptions = [];
  if (zones) {
  for (let i = 0; i < zones.length; i++) {
    let zone = zones[i];
    zoneOptions.push(
      <Select.Option key={zone.uuid}> {"[" + zone.code + "]" + zone.name} </ Select.Option>
    );
  }
  }

  const modalOpts = {
    title: '货道新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
      <FormItem {...formItemLayout} label="货区：" hasFeedback>
            {getFieldDecorator('zones' ,{
            rules: [{ required: true, message: '货区不能为空' },],
        })(
        <Select multiple>
                    {zoneOptions}
        </Select>
        )}
        </FormItem>
        <FormItem label="每货区数量：" hasFeedback {...formItemLayout}>
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

CreatePathModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  zones: PropTypes.array
}

export default Form.create()(CreatePathModal);
