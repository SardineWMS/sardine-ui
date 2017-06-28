import React, { PropTypes } from 'react'
import {Form,DatePicker,Modal,Input} from 'antd';
import moment from 'moment';
import BaseFormItem from '../../Widget/BaseFormItem';


const BinScopeModal=({
  title,
  label,
	visible,
	onOk,
	onCancel,
  form: {
    getFieldDecorator,
    getFieldsValue
  }
})=>{
  
	const modalOpts = {
		title: title,
		visible,
		onOk: handleOk,
		onCancel,
		wrapClassName: 'vertical-center-modal',
	}

	function handleOk(){
      const data = {
        ...getFieldsValue()
      }
		  onOk(data.binScope);
	}

  return(
  	<Modal {...modalOpts}>
      <Form>
           <BaseFormItem label={label}>
              {getFieldDecorator('binScope', {rules:[{max:30,message:'最大长度为30！'}]
              })(<Input />)}
          </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(BinScopeModal);
