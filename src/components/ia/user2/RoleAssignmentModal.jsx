import React, { PropTypes } from 'react';
import { Form, Modal, Col, Row, Input, TreeSelect } from 'antd';
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

const RoleAssginmentModal = ({
    visible,
    onSave,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    treeData,
}) => {
    function handleOk() {
        validateFields((errors) => {
            if (errors)
                return;
            const data = {
                ...getFieldsValue(),
            }

            onSave(data)
        })
    };

    const modalOpts = {
        title: '选择角色',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal',
    };

    const treeSelectProps = {
        treeData: treeData,
        value: getFieldsValue,
    }

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem label="角色：" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('role', {
                        rules: [{
                            required: true,
                            message: '请选择角色',
                        }],
                    })(<TreeSelect treeData={treeData}
                        multiple={true} treeCheckable={true}
                        showCheckedStrategy={SHOW_PARENT}
                        style={
                            { width: 300 }} />)}
                </FormItem>
            </Form>
        </Modal>
    )
}
export default Form.create()(RoleAssginmentModal);