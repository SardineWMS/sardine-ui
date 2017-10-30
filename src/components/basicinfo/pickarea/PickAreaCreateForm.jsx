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
            {getFieldDecorator("code", {
                rules: [{ required: true, message: '代码不能为空' }, { pattern: /^[0-9]{0,30}$/, message: "代码长度最大为30,且只能输入数字" }], initialValue: item.code
            })(
                <Input placeholder="请输入" disabled={item.code} />
                )}
        </BaseFormItem>
    );
    basic.push(
        <BaseFormItem label={"名称"} key="name">
            {getFieldDecorator("name", {
                rules: [{ required: true, message: '名称不能为空' }, {
                    max: 100, message: '名称最大长度是100！'
                }], initialValue: item.name
            })(
                <Input placeholder="请输入" />
                )}
        </BaseFormItem>
    );
    //required：false 时，后面的validator 不会调用
    basic.push(
        <BaseFormItem label={"货位范围"} key="binScope">
            {getFieldDecorator("binScope", { initialValue: item.binScope, rules: [{ required: true, validator: (rule, value, callback) => validate(rule, value, callback) }], validateTrigger: 'onChange' })(
                <Input placeholder="样例：020310(1/2/3),0208-0210(4/5)" />
            )}
        </BaseFormItem>
    );
    basic.push(
        <BaseFormItem label={"存储区域"} key="storageArea">
            {getFieldDecorator("storageArea", { initialValue: item.storageArea, rules: [{ pattern: /^\d{2,8}(\((\d\/)*\d\))*$|^\d{2,8}\-\d{2,8}(\((\d\/)*\d\))*$/, message: '输入不匹配，请重新输入' }], validateTrigger: 'onChange' })(
                <Input placeholder="样例：020310(1/2/3),0208-0210(4/5)" />
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
        <BaseFormItem label={"分单体积(m³)"} key="pickVolume">
            {getFieldDecorator("pickVolume", {
                rules: [{ required: true, message: '分单体积不能为空' }, { pattern: /^([1-9][0-9]{0,7}\.[0-9]{0,3})$|^([1-9][0-9]{0,7})$|^0$/, message: "分单体积输入不正确，只能输入正数，最大长度12，保留三位小数" }], initialValue: item.pickVolume
            })(<Input placeholder="请输入：" />
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
                <Form.Item>
                    {getFieldDecorator('remark', {
                        initialValue: item.remark, rules: [{ required: false }, {
                            max: 255, message: '说明的最大长度是255！'
                        }]
                    })(
                        <Input type="textarea" autosize={{ minRows: 4 }} />
                        )}
                </Form.Item>
            </Panel>
        </div>
    );
};

export default Form.create()(PickAreaCreateForm);