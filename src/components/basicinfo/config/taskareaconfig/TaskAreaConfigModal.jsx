import React, { PropTypes } from 'react'
import {Form,Modal,Input,Button,Icon} from 'antd';
import moment from 'moment';
import BaseFormItem from '../../../Widget/BaseFormItem';

const TaskAreaConfigModal=({
	visible,
	onOk,
	onCancel,
  queryOperators,
  getOperator,
  currentOperator,
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

  function handleEnterPress() {
    if (currentOperator && ("[" + currentOperator.code + "]" + currentOperator.name) == getFieldsValue().operator)
      return;
    if (!getFieldsValue().operator)
      return;
    getOperator(getFieldsValue().operator);
  }

  return(
  	<Modal {...modalOpts}>
      <Form horizontal>
           <BaseFormItem label="员工">
              {getFieldDecorator('operator', {
                rules: [{ required: true, message: '员工不能为空' }], initialValue:(currentOperator && currentOperator.uuid) ? "[" + currentOperator.code + "]" + currentOperator.name : null
              })(
                <Input placeholder="请选择" suffix={<Icon type="ellipsis" onClick={() => queryOperators()} />}  
                onBlur={handleEnterPress} onPressEnter={handleEnterPress} />
              )}
          </BaseFormItem>
          <BaseFormItem label="作业区域">
              {getFieldDecorator('taskArea', {
                rules: [{ required: true, message: '作业区域不能为空' },{
                  max:255,message:'作业区域最大值是255！'
                }],
                initialValue:taskAreaConfig.taskArea ? taskAreaConfig.taskArea: ""  
              })(<Input />)}
          </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(TaskAreaConfigModal);
