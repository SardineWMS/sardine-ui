import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Modal,Col,Checkbox,Radio } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

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
        <BaseFormItem label="代码">
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
        </BaseFormItem>
        : 
        <BaseFormItem label="代码">
          <span>{item.code}</span>
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="名称">
          <span>{item.name}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="名称">
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
        </BaseFormItem>
        }

     {modalType=== 'view' ?
        <BaseFormItem label="前缀/长度">
          <span>{item.barCodePrefix}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.barCodeLength}</span>
        </BaseFormItem>
        :
       <BaseFormItem label="前缀/长度">
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
        </BaseFormItem>
      }
      
       {modalType=== 'view' ?
        <BaseFormItem label="内长/宽/高">
          <span>{item.inLength}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.inWidth}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.inHeight}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="内长/宽/高">
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
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="内长/宽/高">
          <span>{item.outLength}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.outWidth}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.outHeight}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="外长/宽/高">
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
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="自重/承重">
          <span>{item.weight}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.bearingWeight}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="自重/承重">
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
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="容积率">
          <span>{item.rate}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="容积率">
          {getFieldDecorator('rate', {
            initialValue: item.rate
          })(<Input />)}
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="随车">
          <span>{item.ship ?"随车":"不随车"}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="随车">
          {getFieldDecorator('ship', {
            valuePropName: 'checked',
            initialValue: item.ship,
          })(<Checkbox/>)}
        </BaseFormItem>
      }

      {modalType=== 'view' ?
        <BaseFormItem label="条码类型">
          <span>{item.barCodeType==='ONCE' ? "一次性":"永久性"}</span>
        </BaseFormItem>
        :
        <BaseFormItem label="条码类型">
           {getFieldDecorator('barCodeType',{
            initialValue:item.barCodeType
           })(
            <RadioGroup>
              <RadioButton value="ONCE">一次</RadioButton>
              <RadioButton value="FOREVER">永久</RadioButton>
            </RadioGroup>
          )}
        </BaseFormItem>
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
