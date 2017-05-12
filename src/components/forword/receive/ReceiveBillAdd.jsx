import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import ReceiveBillItemGrid from './ReceiveBillItemGrid';
const EditableCell = require('../../Widget/EditableCell');

const ReceiveBillAddForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    onOrderBillSelect,
    orderBillNo,
    orderItems,
    onEditItem,
    wrhMsg,
    supplierMsg,
    onEnterOrderBill,
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = {
                ...getFieldsValue(),
                ...item,
            };
            handleSave(data);
        });
    }

    function handleEnterPress() {
        console.log("回调函数");
        // validateFields((errors) => {
        //     if (errors) {
        //         return;
        //     }
        const data = {
            orderBillNo: getFieldsValue().orderBillNumber,

        }
        onEnterOrderBill(data);
        // })
    }

    const orderBillItemGridProps = {
        dataSource: orderItems,
        onEditItem: onEditItem,
    }

    const children = [];
    children.push(<BaseFormItem label={"入库订单："}>
        {getFieldDecorator("orderBillNumber", { rules: [{ required: true }], initialValue: orderBillNo })(
            <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => onOrderBillSelect()} />} onPressEnter={handleEnterPress} />
        )}
    </BaseFormItem>);

    children.push(
        <BaseFormItem label={"供应商："} >
            {getFieldDecorator("supplier", { rules: [{ required: true }], initialValue: item.uuid == null ? null : item.supplier.name + "[" + item.supplier.code + "]" })(
                <Input placeholder="请输入" disabled={true} />
            )}
        </BaseFormItem>
    );

    children.push(
        <BaseFormItem label={"仓位："} >
            {getFieldDecorator("wrh", { rules: [{ required: true }], initialValue: item.uuid == null ? null : item.wrh.name + "[" + item.wrh.code + "]" })(
                <Input placeholder="请输入" disabled={true} />
            )}
        </BaseFormItem>
    );

    children.push(
        <BaseFormItem label={"收货人："} >
            {getFieldDecorator("receiver", { rules: [{ required: true }], initialValue: item.uuid == null ? null : item.wrh.name + "[" + item.wrh.code + "]" })(
                <Input placeholder="请输入" disabled={true} />
            )}
        </BaseFormItem>
    );

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        {getFieldDecorator("totalCaseQtyStr", { initialValue: item.uuid == null ? null : item.totalCaseQtyStr })(<Input disabled={true} />)}
    </BaseFormItem>)

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);
    toolbar.push(<Button key={Guid()} onClick={handleCreate}>保存</Button>)

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
        </div>
    )

}

export default Form.create()(ReceiveBillAddForm);