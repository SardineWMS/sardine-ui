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
              {getFieldDecorator('binScope', {rules: [{ required: true, message: '货位范围不能为空！' }, {
                  pattern:  '^(([\\d]{2,8}(\\(([\\d]{1}/?)*[^/]\\))?)?,?([\\d]{2,8}-([\\d]{2,8}(\\(([\\d]{1}/?)*[^/]\\))?)?[^\\-])?,?([\\d]{2,8})*)*$',
                  message: '货位范围格式不正确'
                }]
              })(<Input />)}
          </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(BinScopeModal);
