import React, { PropTypes } from 'react'
import {Form,Modal,Input,Button} from 'antd';
import moment from 'moment';
import BaseFormItem from '../../../Widget/BaseFormItem';

const TaskAreaConfigModal=({
	visible,
	onOk,
	onCancel,
  queryOperators,
  taskAreaConfig,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
})=>{
  
	const modalOpts = {
		title: "作业区域",
		visible,
		onOk: handleOk,
		onCancel,
		wrapClassName: 'vertical-center-modal',
	}

	function handleOk(){
      const data = {
        ...taskAreaConfig,
        ...getFieldsValue(),
        operator:taskAreaConfig.operator
      }
		  onOk(data);
	}

  return(
  	<Modal {...modalOpts}>
      <Form horizontal>
           <BaseFormItem label="员工">
              {getFieldDecorator('operator', {
                rules: [{ required: true, message: '员工不能为空' }], initialValue: taskAreaConfig.operator ? taskAreaConfig.operator.code : ""
              })(
                <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => queryOperators()} />}  />
              )}
          </BaseFormItem>
          <BaseFormItem label="作业区域">
              {getFieldDecorator('taskArea', {
                rules: [{ required: true, message: '作业区域不能为空' },],
                initialValue:taskAreaConfig.taskArea ? taskAreaConfig.taskArea: ""  
              })(<Input />)}
          </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(TaskAreaConfigModal);
