import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');
import PermissionUtil from '../../../utils/PermissionUtil';

const Option = Select.Option;

const AlcNtcBillCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    wrhs,
    checkCustomer,
    onSelectWrh
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors)
                return;
            let data = {};
            data = {
                ...getFieldsValue(),
                ...item
            };
            handleSave(data);
        });
    };

    function refreshCustomer(e) {
        item.customer = {};
        item.customer.code = e.target.value;
        checkCustomer(e.target.value);
    };

    const children = [];
    children.push(<BaseFormItem label={"客户："}>
        {getFieldDecorator("customer.code", {
            rules: [{ required: true, message: '请输入客户！' }],
            initialValue: item.customer ? item.customer.name : ''
        })(
            <Input placeholder="请输入：" onBlur={(e) => refreshCustomer(e)} />
            )}
    </BaseFormItem>);

    const options = [];
    if (wrhs != null) {
        for (var wrh of wrhs) {
            options.push(<Option value={wrh.uuid}>{wrh.name + "[" + wrh.code + "]"}</Option>)
        };
    };
    children.push(
        <BaseFormItem label={"仓位："}>
            {getFieldDecorator("wrh", {
                rules: [{ required: true, message: '请选择仓位！' }], initialValue: item.wrh ? item.wrh.name + "[" + item.wrh.code + "]" : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    {options}
                </Select>
                )
            }
        </BaseFormItem>);

    children.push(<BaseFormItem label={"来源单据类型："}>
        {getFieldDecorator("sourceBillType", {
            rules: [{
                max: 100, message: '来源单据类型最大长度是100！'
            }],
            initialValue: item.sourceBillType
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    children.push(<BaseFormItem label={"来源单据单号："}>
        {getFieldDecorator("sourceBillNumber", {
            rules: [{
                max: 30, message: '来源单据单号最大长度是30！'
            }],
            initialValue: item.sourceBillNumber
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    children.push(<BaseFormItem label={"配送原因："}>
        {getFieldDecorator("deliveryReason", {
            rules: [{ required: true, message: '请输入配送原因！' }, {
                max: 100, message: '配送原因最大长度是100！'
            }],
            initialValue: item.deliveryReason ? item.deliveryReason : '正常'
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    /*children.push(
        <BaseFormItem label={"配送体系："}>
            {getFieldDecorator("deliverySystem", {
                rules: [{ required: true }], initialValue: item.deliverySystem
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    <Option value="tradition">传统体系</Option>
                    <Option value="eCommerce">电商体系</Option>
                </Select>
                )
            }
        </BaseFormItem>);*/

    children.push(
        <BaseFormItem label={"配送方式："}>
            {getFieldDecorator("deliveryMode", {
                rules: [{ required: true, message: '请选择配送方式！' }], initialValue: item.deliveryMode == null ? "warehouseDelivery" : item.deliveryMode
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    <Option value="warehouseDelivery">仓库配送</Option>
                    <Option value="sf">顺丰</Option>
                    <Option value="st">申通</Option>
                    <Option value="yt">圆通</Option>
                    <Option value="zt">中通</Option>
                    <Option value="ht">汇通</Option>
                    <Option value="yd">韵达</Option>
                </Select>
                )
            }
        </BaseFormItem>);

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        <label>{item.totalCaseQtyStr == null ? 0 : item.totalCaseQtyStr}</label>
    </BaseFormItem>);

    totalCaseQtyStrForm.push(<BaseFormItem label={"总金额："}>
        <label>{item.totalAmount == null ? 0 : item.totalAmount}</label>
    </BaseFormItem>);

    const toolbar = [];
    toolbar.push(<Button key={Guid()} onClick={handleCreate} disabled={!PermissionUtil("alcNtcBill:create")}>保存</Button>);
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="出库通知单信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(AlcNtcBillCreateForm);