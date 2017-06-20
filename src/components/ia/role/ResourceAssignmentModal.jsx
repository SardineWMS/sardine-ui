import React, { PropTypes } from 'react';
import { Form, Modal, Col, Row, Input, TreeSelect } from 'antd';
import RoleAssignTree from './RoleAssignTree';

const FormItem = Form.Item;
const SHOW_ALL = TreeSelect.SHOW_ALL;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};

const ResourceAssginmentModal = ({
    visible,
    onSave,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    treeData,
    value
}) => {
    function handleOk() {
        validateFields((errors) => {
            if (errors)
                return;
            const data = {
                ...getFieldsValue()
            };

            onSave(data);
        });
    };

    const modalOpts = {
        title: '分配权限',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    };

    const treeSelectProps = {
        treeData: treeData
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem label="权限：" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('resource', {
                        rules: [{
                            required: true,
                            message: '请选择权限',
                        }
                        ], initialValue: value
                    })(<TreeSelect treeData={treeData}
                        multiple={true} treeCheckable={true}
                        showCheckedStrategy={SHOW_ALL}
                        style={
                            { width: 300 }} />)}
                </FormItem>
            </Form>
        </Modal>
    );
};

function mapPropsToFields(value) {
    return { resource: value };
};

export default Form.create(mapPropsToFields)(ResourceAssginmentModal);