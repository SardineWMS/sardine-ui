import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';
import Panel from '../../Widget/Panel';

const Option = Select.Option;

const CustomerAddForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    }
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            };
            const data = { ...getFieldsValue(), key: item.key, uuid: item.uuid, state: item.state, companyUuid: item.companyUuid, version: item.version };
            handleSave(data);
        });
    };

    const children = [];
    children.push(
        <BaseFormItem label={"代码"} key="code">
            {getFieldDecorator("code", {
                rules: [{ required: true, message: '代码不能为空！' }, {
                    max: 30, message: '代码最大长度30！'
                },{ pattern:/^[a-zA-Z0-9]{0,6}$/,message:"代码长度最大为6,且只能为数字和字母"}], initialValue: item.code
            })(
                <Input placeholder="请输入" disabled={item.code} />
                )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"名称"} key="name">
            {getFieldDecorator("name", {
                rules: [{ required: true, message: '名称不能为空！' }, {
                    max: 100, message: '名称最大长度100！'
                }], initialValue: item.name
            })(
                <Input placeholder="请输入" />
                )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"简称"} key="simpleName">
        {getFieldDecorator("simpleName",{
            rules:[{required:true,message:'简称不能为空！'},{
                max:100,message:'长度最大为100！'
            }],initialValue:item.simpleName
        })(
            <Input placeholder="请输入"/>
        )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"类型"} key="type">
            {getFieldDecorator("type", { rules: [{ required: true, message: '客户类型不能为空！' }], initialValue: item.type })(
                <Select placeholder="请选择" showSearch={false} size="large">
                    <Option value="store">百货</Option>
                    <Option value="shop">精品店</Option>
                </Select>
            )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"联系人"} key="contacter">
        {getFieldDecorator("contacter",{
            rules:[{ required:false},{
                max:30,message:'联系人最大长度30！'
            }],initialValue:item.contacter
        })(
            <Input placeholder="请输入"/>
        )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"联系方式"} key="phone">
            {getFieldDecorator("phone", {
                rules: [{ required: false }, {
                    max: 30, message: '联系方式最大长度30！'
                }], initialValue: item.phone
            })(
                <Input placeholder="请输入" />
                )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"地址"} key="address">
            {getFieldDecorator("address", {
                rules: [{ required: false }, {
                    max: 100, message: '地址最大长度100！'
                }], initialValue: item.address
            })(
                <Input type="textarea" autosize={{ minRows: 4 }} />
                )}
        </BaseFormItem>
    );

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()}>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handleCreate} key={Guid()} disabled={!PermissionUtil("customer:create")}>保存</Button>);


    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息">
                <BaseForm items={children} />
            </BaseCard>
            <Panel title="说明">
                <Form.Item>
                    {getFieldDecorator('remark', {
                        initialValue: item.remark, rules: [{ max: 255, message: '说明最大长度是255！' }]
                    })(
                        <Input type="textarea" autosize={{ minRows: 4 }} />
                        )}
                </Form.Item>
            </Panel>
        </div>
    );
};

export default Form.create()(CustomerAddForm);