import React, { PropTypes } from 'react';
import { Modal, Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

const RoleCreateModal = ({
    visible,
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
            if (errors)
                return;

            const data = {
                ...getFieldsValue()
            };
            onOk(data);
        });
    };

    const modalOpts = {
        title: '新建角色',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem label="代码：" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true,
                            message: '角色代码未填写',
                        }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="名称：" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '角色名称未填写',
                        }],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    );
};
export default Form.create()(RoleCreateModal);