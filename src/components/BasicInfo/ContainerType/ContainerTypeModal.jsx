import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Modal,Col,Checkbox,Radio } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
}

const ContainerTypeModal = ({
  visible,
  item = {},
  modalType,
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
        uuid : item.uuid,
        version : item.version,
        token:localStorage.getItem("token"),
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '容器类型',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal >
      {modalType != 'view' ?
        <FormItem label="代码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
                message: '代码未填写',
              },
            ],
          })
          (<Input />)
        }
        </FormItem>
        : 
        <FormItem label="代码" hasFeedback {...formItemLayout}>
          <span>{item.code}</span>
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          <span>{item.name}</span>
        </FormItem>
        :
        <FormItem label="名称" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            text:item.name,
            rules: [
              {
                required: true,
                message: '名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        }

     {modalType=== 'view' ?
        <FormItem label="前缀/长度" hasFeedback {...formItemLayout}>
          <span>{item.barCodePrefix}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.barCodeLength}</span>
        </FormItem>
        :
       <FormItem label="前缀/长度" hasFeedback {...formItemLayout}>
          <Col span="6">
          <FormItem>
          {getFieldDecorator('barCodePrefix', {
            initialValue: item.barCodePrefix,
            text:item.barCodePrefix,
            rules: [
              {
                required: true,
                message: '前缀未填写',
              },
            ],
          })(<Input />)}
          </FormItem>
          </Col>

          <Col span="6">
           <FormItem>
            {getFieldDecorator('barCodeLength', {
            initialValue: item.barCodeLength,
            text:item.barCodeLength,
            rules: [
              {
                required: true,
                message: '长度未填写',
              },
            ],
          })(<Input />)}
           </FormItem>
          </Col>
        </FormItem>
      }
      
       {modalType=== 'view' ?
        <FormItem label="内长/宽/高" hasFeedback {...formItemLayout}>
          <span>{item.inLength}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.inWidth}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.inHeight}</span>
        </FormItem>
        :
        <FormItem label="内长/宽/高" hasFeedback {...formItemLayout}>
          <Col span="6">
            <FormItem>
            {getFieldDecorator('inLength', {
              initialValue: item.inLength
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
             {getFieldDecorator('inWidth', {
              initialValue: item.inWidth
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
           {getFieldDecorator('inHeight', {
            initialValue: item.inHeight
          })(<Input />)}
            </FormItem>
          </Col>
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="内长/宽/高" hasFeedback {...formItemLayout}>
          <span>{item.outLength}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.outWidth}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.outHeight}</span>
        </FormItem>
        :
        <FormItem label="外长/宽/高" hasFeedback {...formItemLayout}>
          <Col span="6">
            <FormItem>
            {getFieldDecorator('outLength', {
              initialValue: item.outLength
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
             {getFieldDecorator('outWidth', {
              initialValue: item.outWidth
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
           {getFieldDecorator('outHeight', {
            initialValue: item.outHeight
          })(<Input />)}
            </FormItem>
          </Col>
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="自重/承重" hasFeedback {...formItemLayout}>
          <span>{item.weight}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.bearingWeight}</span>
        </FormItem>
        :
        <FormItem label="自重/承重" hasFeedback {...formItemLayout}>
          <Col span="6">
            <FormItem>
            {getFieldDecorator('weight', {
              initialValue: item.weight
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
             {getFieldDecorator('bearingWeight', {
              initialValue: item.bearingWeight
            })(<Input />)}
            </FormItem>
          </Col>
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="容积率" hasFeedback {...formItemLayout}>
          <span>{item.rate}</span>
        </FormItem>
        :
        <FormItem label="容积率" hasFeedback {...formItemLayout}>
          {getFieldDecorator('rate', {
            initialValue: item.rate
          })(<Input />)}
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="随车" hasFeedback {...formItemLayout}>
          <span>{item.ship ?"随车":"不随车"}</span>
        </FormItem>
        :
        <FormItem label="随车" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ship', {
            valuePropName: 'checked',
            initialValue: item.ship,
          })(<Checkbox/>)}
        </FormItem>
      }

      {modalType=== 'view' ?
        <FormItem label="条码类型" hasFeedback {...formItemLayout}>
          <span>{item.barCodeType==='ONCE' ? "一次性":"永久性"}</span>
        </FormItem>
        :
        <FormItem label="条码类型" hasFeedback {...formItemLayout}>
           {getFieldDecorator('barCodeType',{
            initialValue:item.barCodeType
           })(
            <RadioGroup>
              <RadioButton value="ONCE">一次</RadioButton>
              <RadioButton value="FOREVER">永久</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
      }

      </Form>
    </Modal>
  )
}

ContainerTypeModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showUpper : PropTypes.bool,
}

export default Form.create()(ContainerTypeModal);
