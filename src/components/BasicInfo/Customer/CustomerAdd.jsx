import React, { PropTypes } from 'react';
import {Button, Input, Form, Select, Card} from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';

const Option = Select.Option;

const CustomerAddForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = { ...getFieldsValue(), key: item.key, uuid: item.uuid, state: item.state, companyUuid: item.companyUuid, version: item.version };
            handleSave(data);
        });
    }

    const children = [];
    children.push(
            <BaseFormItem label={"客户代码"}>
                {getFieldDecorator("code", { rules: [{ required: true }], initialValue: item.code })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"客户名称"}>
                {getFieldDecorator("name", { rules: [{ required: true }], initialValue: item.name })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"客户类型"}>
                {getFieldDecorator("type", { rules: [{ required: true }], initialValue: item.type })(
                    <Select placeholder="请选择" showSearch={false} size="large">
                        <Option value="store">百货</Option>
                        <Option value="shop">精品店</Option>
                    </Select>
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"联系方式"}>
                {getFieldDecorator("phone", { initialValue: item.phone })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"地址"}>
                {getFieldDecorator("address", { initialValue: item.address })(
                    <Input type="textarea" autosize={{ minRows: 4 }} />
                )}
            </BaseFormItem>
    );

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel(item)}>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handleCreate}>保存</Button>);


    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
              <BaseForm items={children} />
            </BaseCard>
        </div>
    );
}

export default Form.create()(CustomerAddForm);