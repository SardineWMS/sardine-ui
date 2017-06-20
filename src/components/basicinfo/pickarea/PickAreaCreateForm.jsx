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
const PickAreaCreateForm = ({
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
            const data = {
                ...getFieldsValue()
            };
            handleSave(data);
        });
    };

    function validate(rule, value, callback) {
        if (rule.required == false) {
            callback();
            return;
        };
        var pattern = /^\d{2,8}(\((\d\/)*\d\))*$|^\d{2,8}\-\d{2,8}(\((\d\/)*\d\))*$/
        if (!pattern.test(value)) {
            callback("输入不匹配，请重新输入");
        };
        callback();
    };

    const basic = [];
    basic.push(
        <BaseFormItem label={"代码"} key="code">
            {getFieldDecorator("code", { rules: [{ required: true, max: 30, message: '代码必填不能超过30字符' }], initialValue: item.code })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    basic.push(
        <BaseFormItem label={"名称"} key="name">
            {getFieldDecorator("name", { rules: [{ required: true, max: 100, message: '名称不填且不能超过100字符' }], initialValue: item.name })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    basic.push(
        <BaseFormItem label={"货位范围"} key="binScope">
            {getFieldDecorator("binScope", { initialValue: item.binScope, rules: [{ required: true, validator: (rule, value, callback) => validate(rule, value, callback) }], validateTrigger: 'onChange' })(
                <Input placeholder="请输入：" />
            )}
        </BaseFormItem>
    );
    basic.push(
        <BaseFormItem label={"存储区域"} key="storageArea">
            {getFieldDecorator("storageArea", { initialValue: item.storageArea, rules: [{ required: false, validator: (rule, value, callback) => validate(rule, value, callback) }], validateTrigger: 'onChange' })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );

    const extend = [];
    extend.push(
        <BaseFormItem label={"拣货方式"} key="pickMode">
            {getFieldDecorator("pickMode", { rules: [{ required: true, message: '拣货方式不能为空' }], initialValue: item.pickMode })(
                <Select placeholder="请选择" showSearch={false} size="large">
                    <Option value="ManualBill">手工单据</Option>
                    <Option value="APP">APP</Option>
                </Select>
            )}
        </BaseFormItem>
    );

    extend.push(
        <BaseFormItem label={"分单体积"} key="pickVolume">
            {getFieldDecorator("pickVolume", { rules: [{ required: true, message: '分单体积不能为空' }], initialValue: item.pickVolume })(
                <Input placeholder="请输入：" />
            )}
        </BaseFormItem>
    );

    extend.push(
        <BaseFormItem label={"补货方式"} key="rplMode">
            {getFieldDecorator("rplMode", { rules: [{ required: true, message: '补货方式不能为空' }], initialValue: item.rplMode })(
                <Select placeholder="请选择" showSearch={false} size="large">
                    <Option value="ManualBill">手工单据</Option>
                    <Option value="APP">APP</Option>
                </Select>
            )}
        </BaseFormItem>
    );

    extend.push(
        <BaseFormItem label={"补货量"} key="rplQtyMode">
            {getFieldDecorator("rplQtyMode", { rules: [{ required: true, message: '补货量不能为空' }], initialValue: item.rplQtyMode })(
                <Select placeholder="请选择" showSearch={false} size="large">
                    <Option value="enoughShipments">够出货量</Option>
                    <Option value="highestStock">最高库存</Option>
                </Select>
            )}
        </BaseFormItem>
    );
    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()}>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handleCreate} key={Guid()} disabled={!PermissionUtil("customer:create")} className={"save"}>保存</Button>);


    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={false}>
                <BaseForm items={basic} />
                <BaseForm items={extend} />
            </BaseCard>
            <Panel title="说明">
                {getFieldDecorator('remark', {
                    initialValue: item.remark
                })(
                    <Input type="textarea" autosize={{ minRows: 4 }} />
                    )}
            </Panel>
        </div>
    );
};

export default Form.create()(PickAreaCreateForm);