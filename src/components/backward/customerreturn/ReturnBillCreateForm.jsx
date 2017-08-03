import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon, DatePicker } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Panel from '../../Widget/Panel';

const Option = Select.Option;

const ReturnBillCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    onRtnNtcBillSelect,
    wrhs = [],
    onEnterCustomer
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
        <BaseFormItem label="退仓通知单：">
            {
                getFieldDecorator("returnNtcBillNumber", {
                    rules: [{ required: true, message: "退仓通知单不能为空！" }],
                    initialValue: item.returnNtcBillNumber ? item.returnNtcBillNumber : ""
                })(
                    <Input placeholder="请选择" suffix={<Icon type="bars" onClick={() => onRtnNtcBillSelect()} />} onBlur={handleEnterPress} />
                    )
            }
        </BaseFormItem>
    );
    // const options = [];
    // if (wrhs != null) {
    //     console.log("仓位");
    //     console.dir(wrhs);
    //     for (var wrh of wrhs) {
    //         options.push(<Option value={wrh.uuid}>{wrh.name + "[" + wrh.code + "]"}</Option>)
    //     };
    // };
    children.push(<BaseFormItem label={"客户："}>
        <label>{item.customer == null ? '' : "[" + item.customer.code + "]" + item.customer.name}</label>
    </BaseFormItem>);
    children.push(<BaseFormItem label={"仓位："}>
        <label>{item.wrh == null ? '' : "[" + item.wrh.code + "]" + item.wrh.name}</label>
    </BaseFormItem>)
    children.push(
        <BaseFormItem label={"退仓员："} >
            <label>{item.returnor == null ? "[" + localStorage.getItem("loginCode") + "]" + localStorage.getItem("loginName") : "[" + item.returnor.code + "]" + item.returnor.name}</label>
        </BaseFormItem>
    );

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        <label>{item.totalCaseQtyStr == null ? 0 : item.totalCaseQtyStr}</label>
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
            <BaseCard title="退仓单信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(ReturnBillCreateForm);