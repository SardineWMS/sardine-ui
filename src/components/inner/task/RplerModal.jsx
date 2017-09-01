import React, { PropTypes } from 'react'
import {Form,Modal,Input,Button,Icon} from 'antd';
import moment from 'moment';
import BaseFormItem from '../../Widget/BaseFormItem';

const RplerModal=({
    currentRpler,
    visible,
    getRpler,
    queryRplers,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    }
})=>{
  
    const modalOpts = {
        title: "设置补货员",
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    }

    function handleOk(){
        onOk();
    }

    function handleEnterPress() {
      if (currentRpler && ("[" + currentRpler.code + "]" + currentRpler.name) == getFieldsValue().rpler)
        return;
      if (!getFieldsValue().rpler)
        return;
      getRpler(getFieldsValue().rpler);
    }

  return(
    <Modal {...modalOpts}>
      <Form horizontal>
           <BaseFormItem label="补货员">
              {getFieldDecorator('rpler', {
                 initialValue: (currentRpler && currentRpler.uuid) ?currentRpler.code+"["+currentRpler.name+"]":null
              })(
                <Input placeholder="请选择" suffix={<Icon type="ellipsis" onClick={() => queryRplers()} />}  
                onBlur={handleEnterPress} onPressEnter={handleEnterPress} />
              )}
          </BaseFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(RplerModal);
