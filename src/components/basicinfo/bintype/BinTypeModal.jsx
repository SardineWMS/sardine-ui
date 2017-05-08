import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import BaseFormItem from '../../Widget/BaseFormItem';

const BinTypeModal = ({
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
                uuid: item.uuid,
                version: item.version,
                //TODO
            }
            onOk(data)
        })
    }
    const modalOpts = {
        title: '货位类型',
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
                            message: '货位类型代码未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="名称：">
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [{
                            required: true,
                            message: '货位类型名称未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="长/宽/高(cm)：">
                    <Input.Group>
                        {getFieldDecorator('length', {
                            initialValue: item.length,
                            rules: [{
                                required: true,
                                message: '货位类型长度未填写',
                            }],
                        })(<Input style={{ width: "33.333333%" }}></Input>)}
                        {getFieldDecorator('width', {
                            initialValue: item.width,
                            rules: [{
                                required: true,
                                message: '货位类型宽度未填写',
                            }],
                        })(<Input style={{ width: "33.333333%" }}></Input>)}
                        {getFieldDecorator('height', {
                            initialValue: item.height,
                            rules: [{
                                required: true,
                                message: '货位类型高度未填写',
                            }],
                        })(<Input style={{ width: "33.333333%" }}></Input>)}
                    </Input.Group>
                </BaseFormItem>
                <BaseFormItem label="承重(kg)：">
                    {getFieldDecorator('bearing', {
                        initialValue: item.bearing,
                        rules: [{
                            required: true,
                            message: '货位类型承重未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="容积率(%)：">
                    {getFieldDecorator('plotRatio', {
                        initialValue: item.plotRatio,
                        rules: [{
                            required: true,
                            message: '货位类型容积率未填写',
                        }],
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(BinTypeModal);