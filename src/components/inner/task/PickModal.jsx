import React, { PropTypes } from 'react'
import { Form, Modal, Input, Button, Icon } from 'antd';
import moment from 'moment';
import BaseFormItem from '../../Widget/BaseFormItem';

const PickModal = ({
    tasks,
    currentPicker,
    getPicker,
    queryPickers,
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    }
}) => {

    const modalOpts = {
        title: "拣货",
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    }

    function handleOk() {
        validateFields((errors) => {
            onOk({...getFieldsValue()});
        });
    }

    function handleEnterPress() {
      if (currentPicker && ("[" + currentPicker.code + "]" + currentPicker.name) == getFieldsValue().rpler)
        return;
      if (!getFieldsValue().rpler)
        return;
      getRpler(getFieldsValue().rpler);
    }

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="目标货位">
                    {getFieldDecorator('toBinCode', {
                        rules: [{ required: true, message: '目标货位不能为空' }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="目标容器">
                    {getFieldDecorator('toContainerBarcode', {
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(PickModal);
