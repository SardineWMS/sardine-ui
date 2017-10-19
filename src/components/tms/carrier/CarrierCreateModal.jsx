import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import BaseFormItem from '../../Widget/BaseFormItem';

const CarrierCreateModal = ({
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
                ...getFieldsValue(),
                uuid: item.uuid,
                version: item.version
            };
            onOk(data);
        });
    };

    const modalOpts = {
        title: '承运商',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <BaseFormItem label="代码：">
                    {getFieldDecorator('code', {
                        initialValue: item ? item.code : null,
                        rules: [{
                            required: true,
                            message: '承运商代码未填写',
                        },{ pattern:/^[a-zA-Z0-9]{0,6}$/,
                            message:'承运商最大长度为6,且只能为字母数字'
                        }
                    ],
                    })(<Input disabled={item.code}/>)}
                </BaseFormItem>
                <BaseFormItem label="名称：">
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [{
                            required: true,
                            message: '承运商名称未填写',
                        }, {
                            max: 100,
                            message: '承运商名称最大长度是100！'
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="联系人：">
                    {getFieldDecorator('contact', {
                        initialValue: item.contact,
                        rules: [{ max: 100, message: '联系人最大长度是100！' }]
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="联系方式：">
                    {getFieldDecorator('contactPhone', {
                        initialValue: item.contactPhone,
                        rules: [{ max: 30, message: '联系方式最大长度是30！' }]
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="地址：">
                    {getFieldDecorator('address', {
                        initialValue: item.address,
                        rules: [{ max: 255, message: '地址最大长度是255！' }]
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(CarrierCreateModal);