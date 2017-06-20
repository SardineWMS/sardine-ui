import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import BaseFormItem from '../../Widget/BaseFormItem';

const SerialArchCreateModal = ({
    visible,
    item = {},
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
            }
            onOk(data)
        })
    }
    const modalOpts = {
        title: '线路体系',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="代码：">
                    {getFieldDecorator('code', {
                        initialValue: item.code,
                        rules: [{
                            required: true,
                            message: '线路代码未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="名称：">
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [{
                            required: true,
                            message: '线路体系名称未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(SerialArchCreateModal);