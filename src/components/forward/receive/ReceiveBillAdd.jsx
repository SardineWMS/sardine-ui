import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import ReceiveBillItemGrid from './ReceiveBillItemGrid';
const EditableCell = require('../../Widget/EditableCell');
import PermissionUtil from '../../../utils/PermissionUtil';

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
            let data = {};
            if (item.type == "订单") {
                data = {
                    ...getFieldsValue(),
                    supplier: {
                        uuid: item.supplier.uuid,
                        code: item.supplier.code,
                        name: item.supplier.name,
                    },
                    wrh: {
                        uuid: item.wrh.uuid,
                        code: item.wrh.code,
                        name: item.wrh.name,
                    }
                }
            } else {
                data = {
                    ...getFieldsValue(),
                    ...item,
                    supplier: {
                        uuid: item.supplier.uuid,
                        code: item.supplier.code,
                        name: item.supplier.name,
                    },
                    wrh: {
                        uuid: item.wrh.uuid,
                        code: item.wrh.code,
                        name: item.wrh.name,
                    }
                };
            }
            handleSave(data);
        });
    }

    function handleEnterPress() {
        const data = {
            orderBillNo: getFieldsValue().orderBillNumber,

        }
        onEnterOrderBill(data);
    }

    const orderBillItemGridProps = {
        dataSource: orderItems,
        onEditItem: onEditItem,
    }

    const children = [];
    children.push(<BaseFormItem label={"入库订单："}>
        {getFieldDecorator("orderBillNumber", { rules: [{ required: true }], initialValue: orderBillNo })(
            <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => onOrderBillSelect()} />} onBlur={handleEnterPress} />
        )}
    </BaseFormItem>);

    children.push(
        <BaseFormItem label={"供应商："} >
            <label>{item.uuid == null ? null : item.supplier.name + "[" + item.supplier.code + "]"}</label>
        </BaseFormItem>
    );

    children.push(
        <BaseFormItem label={"仓位："} >
            <label>{item.uuid == null ? null : item.wrh.name + "[" + item.wrh.code + "]"} </label>
        </BaseFormItem>
    );

    children.push(
        <BaseFormItem label={"收货人："} >
            <label>{item.receiver == null ? localStorage.getItem("loginName") + "[" + localStorage.getItem("loginCode") + "]" : item.receiver.name + "[" + item.receiver.code + "]"}</label>
        </BaseFormItem>
    );

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        <label>{item.caseQtyStr == null ? 0 : item.caseQtyStr}</label>
    </BaseFormItem>)

    totalCaseQtyStrForm.push(<BaseFormItem label={"总金额："}>
        <label>{item.totalAmount == null ? 0 : item.totalAmount}</label>
    </BaseFormItem>)

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);
    toolbar.push(<Button key={Guid()} onClick={handleCreate} disabled={!PermissionUtil("receiveBill:create")}>保存</Button>)

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