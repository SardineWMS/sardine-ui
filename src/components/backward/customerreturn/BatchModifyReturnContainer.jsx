import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BaseFormItem from '../../Widget/BaseFormItem';

const BatchModifyReturnContainer = ({
    visible,
    item = {},
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
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
        });
    };
    const modalOpts = {
        title: '修改退仓容器',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="退仓容器：">
                    {getFieldDecorator('containerBarcode', {
                        rules: [{
                            required: true,
                            message: '请选择容器',
                        }],
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(BatchModifyReturnContainer);