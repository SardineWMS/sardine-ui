import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BaseFormItem from '../../Widget/BaseFormItem';

const BatchModifyReturnType = ({
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
        title: '修改退仓类型',
        visible,
        onOk: handleOk,
        onCancel: handleCancel,
        wrapClassName: 'vertical-center-modal'
    };

    const options = [];
    if (visible) {
        options.push(<Option value="goodReturn">好退</Option>);
        options.push(<Option value="returnToSupplier">退供应商</Option>);
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="退仓类型：">
                    {getFieldDecorator('returnType', {
                        rules: [{
                            required: true,
                            message: '请选择退仓类型',
                        }],
                    })(<Select showSearch={false}>
                        {options}
                    </Select>)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(BatchModifyReturnType);