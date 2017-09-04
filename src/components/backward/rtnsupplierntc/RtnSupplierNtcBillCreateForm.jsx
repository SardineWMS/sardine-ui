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


const Option = Select.Option;

const RtnSupplierNtcBillCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    wrhs = [],
    onSupplierSelect,
    supplier,
    onEnterSupplier
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
            data.supplier=supplier;
            handleSave(data);
        });
    };

    function handleEnterPressSupplier() {
        if (getFieldsValue().supplier == null || getFieldsValue().supplier == '')
            return;
        const data = {
            supplierCode: getFieldsValue().supplier
        };
        onEnterSupplier(data);
    };

    const children = [];
    children.push(<BaseFormItem label={"供应商："} key="supplier">
        {getFieldDecorator("supplier", {
          rules: [{ required: true, message: '商品类别不能为空！' }],
          initialValue: (supplier && supplier.uuid) ? "[" + supplier.code + "]" + supplier.name : null
        })(
          <Input placeholder="请选择" suffix={<Icon type="ellipsis" onClick={() => onSupplierSelect()} />}
            onBlur={handleEnterPressSupplier} onPressEnter={handleEnterPressSupplier} />
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
                rules: [{ required: true, message: "仓位不能为空！" }], initialValue: item.wrh ? item.wrh.code : null
            })(
                <Select placeholder="请选择：">
                    {options}
                </Select>
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
        <BaseFormItem label={"来源单据号"} >
            {getFieldDecorator("sourceBillNumber", { rules: [{ required: false }, { max: 30, message: '来源单据号最大长度是30！' }], initialValue: item.sourceBillNumber })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"退货日期："} >
            {getFieldDecorator("rtnDate", { rules: [{ required: true, message: '退货日期不能为空' }], initialValue: moment(item.rtnDate) })(
                <DatePicker style={{ width: 270.5 }} size="large" />
            )}
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
            <BaseCard title="供应商退货通知单信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(RtnSupplierNtcBillCreateForm);