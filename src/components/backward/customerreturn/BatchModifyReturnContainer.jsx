import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import BaseFormItem from '../../Widget/BaseFormItem';
import ContainerModal from '../../widget/ContainerModal';

const BatchModifyReturnContainer = ({
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
        title: '修改退仓容器',
        visible,
        onOk: handleOk,
        onCancel: handleCancel,
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
                    })(<ContainerModal />)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(BatchModifyReturnContainer);