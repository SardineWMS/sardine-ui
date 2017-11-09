import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon, DatePicker } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');
import WrhSelect from '../../widget/WrhSelectWithUuid';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option;

const ReturnNtcBillCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        setFieldsValue
    },
    onCustomerSelect,
    onEnterCustomer
}) => {

    function handleCustomerSelect() {
        let { customer } = getFieldsValue(["customer"]);
        if (!customer) {
            item.customer = {};
        }
        resetFields(["customer"]);
        onCustomerSelect();
    }
    function handleCreate() {
        validateFields((errors) => {
            if (errors)
                return;
            let data = {};
            data = {
                ...getFieldsValue(),
                billNumber: item.billNumber, uuid: item.uuid, state: item.state, totalCaseQtyStr: item.totalCaseQtyStr,
                totalAmount: item.totalAmount,
                companyUuid: item.companyUuid, version: item.version, customer: item.customer,
            };
            handleSave(data);
        });
    };

    function handleEnterPress() {
        if (getFieldsValue().customer == null || getFieldsValue().customer == '')
            return;
        const data = {
            customer: getFieldsValue().customer
        };
        onEnterCustomer(data);
    };

    const children = [];
    children.push(
        <BaseFormItem label="客户：">
            {
                getFieldDecorator("customer", {
                    rules: [{ required: true, message: "客户不能为空！" }],
                    initialValue: item.customer ? item.customer.code : ""
                })(
                    <Input placeholder="请选择" suffix={<Icon type="bars" onClick={handleCustomerSelect} />} onBlur={handleEnterPress} />
                    )
            }
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"仓位："}>
            {getFieldDecorator("wrh.uuid", {
                rules: [{ required: true, message: "仓位不能为空！" }], initialValue: item.wrh ? item.wrh.uuid : null
            })(
                <WrhSelect />
                )
            }
        </BaseFormItem>);
    children.push(
        <BaseFormItem label={"来源单据类型"} >
            {getFieldDecorator("sourceBillType", { rules: [{ required: false }, { max: 100, message: '来源单据类型最大长度是100！' }], initialValue: item.sourceBillNumber })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"来源单号"} >
            {getFieldDecorator("sourceBillNumber", { rules: [{ required: false }, { max: 30, message: '来源单据号最大长度是30！' }], initialValue: item.sourceBillNumber })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"退货日期："} >
            {getFieldDecorator("returnDate", { rules: [{ required: true, message: '退货日期不能为空' }], initialValue: moment(item.returnDate) })(
                <DatePicker style={{ width: 270.5 }} size="large" />
            )}
        </BaseFormItem>
    );

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        <label>{item.totalCaseQtyStr == null ? '0' : item.totalCaseQtyStr}</label>
    </BaseFormItem>);

    totalCaseQtyStrForm.push(<BaseFormItem label={"总金额："}>
        <label>{item.totalAmount == null ? 0 : item.totalAmount}</label>
    </BaseFormItem>);

    const toolbar = [];
    toolbar.push(<Button key={Guid()} onClick={handleCreate} >保存</Button>);
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="退仓通知单信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(ReturnNtcBillCreateForm);