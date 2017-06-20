import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon, Col } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');

const Option = Select.Option;

const AcceptanceBillCreateForm = ({
    acceptanceBill = {},
    onCancel,
    onSave,
    queryWrhs,
    queryCustomers,
    wrhs = [],
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    }
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors)
                return;
            let data = {};
            data = {
                ...acceptanceBill,
                ...getFieldsValue(),
                customer: acceptanceBill.customer,
                wrh: acceptanceBill.wrh
            };
            onSave(data);
        });
    };

    function wrhOnSelect(value) {
        const wrhUcn = new Object();
        wrhUcn.uuid = value.uuid;
        wrhUcn.code = value.code;
        wrhUcn.name = value.name;
        acceptanceBill.wrh = wrhUcn;
    };

    function onSelectDeliverySystem(value) {
        if ("tradition" === value)
            acceptanceBill.deliveryType = "仓库送";
    };

    const baseChildren = [];
    const compositiveChildren = [];

    const wrhOptions = [];
    if (typeof wrhs != 'undefined') {
        wrhs.map(function (wrh) {
            wrhOptions.push(
                <Option key={wrh.uuid} value={wrh}>
                    {"[" + wrh.code + "]"}+{wrh.name}
                </Option>
            );
        });
    };


    baseChildren.push(
        <BaseFormItem label={"客户："}>
            {getFieldDecorator("customer", { rules: [{ required: true }], initialValue: acceptanceBill.customer ? acceptanceBill.customer.code : null })(
                <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => queryCustomers()} onBlur={queryWrhs} />} />
            )}
        </BaseFormItem>
    );

    baseChildren.push(
        <BaseFormItem label={"仓位"} >
            {getFieldDecorator("wrh", { rules: [{ required: true }], initialValue: acceptanceBill.wrh ? acceptanceBill.wrh.code : null })(
                <Select size="large" onSelect={wrhOnSelect}>
                    {wrhOptions}
                </Select>
            )}
        </BaseFormItem>
    );

    baseChildren.push(<BaseFormItem label={"来源单据类型："}>
        {getFieldDecorator("sourceBillType", {
            rules: [{ required: true }],
            initialValue: acceptanceBill.sourceBillType
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    baseChildren.push(<BaseFormItem label={"来源单据单号："}>
        {getFieldDecorator("sourceBillNumber", {
            rules: [{ required: true }],
            initialValue: acceptanceBill.sourceBillNumber
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    baseChildren.push(<BaseFormItem label={"领用原因："}>
        {getFieldDecorator("acceptanceReason", {
            rules: [{ required: true }],
            initialValue: acceptanceBill.acceptanceReason ? acceptanceBill.acceptanceReason : '正常'
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    baseChildren.push(
        <BaseFormItem label={"配送体系："}>
            {getFieldDecorator("deliverySystem", {
                rules: [{ required: true }], initialValue: acceptanceBill.deliverySystem
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectDeliverySystem(value)}>
                    <Option value="tradition">传统体系</Option>
                    <Option value="eCommerce">电商体系</Option>
                </Select>
                )
            }
        </BaseFormItem>);

    baseChildren.push(<BaseFormItem label={"配送方式："}>
        {getFieldDecorator("deliveryType", {
            rules: [{ required: true }],
            initialValue: acceptanceBill.deliveryType
        })(
            <Input placeholder="请输入：" />
            )}
    </BaseFormItem>);

    compositiveChildren.push(<BaseFormItem label={"总件数："}>
        <label>{acceptanceBill.totalCaseQtyStr == null ? 0 : acceptanceBill.totalCaseQtyStr}</label>
    </BaseFormItem>);

    compositiveChildren.push(<BaseFormItem label={"总金额："}>
        <label>{acceptanceBill.totalAmount == null ? 0 : acceptanceBill.totalAmount}</label>
    </BaseFormItem>);


    const colChildren = [];
    colChildren.push(
        <Col span={12} key='col1'>
            {baseChildren}
        </Col>
    );
    colChildren.push(
        <Col span={12} key='col2'>
            {compositiveChildren}
        </Col>
    );

    const toolbar = [];
    toolbar.push(<Button key={Guid()} onClick={handleCreate} >保存</Button>)
    toolbar.push(<Button onClick={() => onCancel()} key={Guid()} > 取消</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
                <BaseForm items={colChildren} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(AcceptanceBillCreateForm);