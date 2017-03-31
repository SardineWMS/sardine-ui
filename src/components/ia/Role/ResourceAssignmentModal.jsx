import React, { PropTypes } from 'react';
import { Form, Modal, Col, Row, Input } from 'antd';
import RoleAssignTree from './RoleAssignTree';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

const ResourceAssginmentModal = ({
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    treeData,
}) => {
    function handleOk() {
        const data = {
            ...getFieldsValue(),
        }
        console.log("getFieldsValue...", data);
        validateFields((errors) => {
            if (errors)
                return;

            onOk(data)
        })
    };

    const modalOpts = {
        title: '分配权限',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    };

    const treeSelectProps = {
        treeData: treeData,
        value: getFieldsValue,
        form
    }

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem label="权限：" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('resource', {
                        rules: [{
                            required: true,
                            message: '请选择权限',
                        }],
                    })(<RoleAssignTree {...treeSelectProps} />)}
                </FormItem>
            </Form>
        </Modal>
    )
}
export default Form.create()(ResourceAssginmentModal);