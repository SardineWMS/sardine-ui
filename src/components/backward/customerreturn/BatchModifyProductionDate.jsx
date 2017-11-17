import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BaseFormItem from '../../Widget/BaseFormItem';

const BatchModifyProductionDate = ({
    visible,
    item = {},
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) => {
    function handleOk() {
        validateFields((errors) => {
            if (errors) {
                return;
            };
            const data = {
                ...getFieldsValue()
            };
            onOk(data);
            resetFields();
        });
    };
    function handleCancel() {
        resetFields();
        onCancel();
    };
    const modalOpts = {
        title: '修改生产日期',
        visible,
        onOk: handleOk,
        onCancel: handleCancel,
        wrapClassName: 'vertical-center-modal'
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="生产日期：">
                    {getFieldDecorator('productionDate', {
                        rules: [{
                            required: true,
                            message: '请选择生产日期',
                        }],
                    })(<DatePicker />)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(BatchModifyProductionDate);