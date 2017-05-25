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

const DecIncCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    wrhs,//当前组织下的所有仓位
    onSelectType,//选择单据类型之后，在查询仓位
    onSelectWrh,
    totalCaseQtyStr,
    totalAmount,
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            }
            let data = {};
            data = {
                ...getFieldsValue(),
                ...item,
            }
            handleSave(data);
        });
    }


    const children = [];
    children.push(<BaseFormItem label={"单据类型："}>
        {getFieldDecorator("type", { rules: [{ required: true }], initialValue: item.type })(
            <Select placeholder="请选择" onChange={(value) => onSelectType(value)}>
                <Option value='Dec'>损耗</Option>
                <Option value='Inc'>溢余</Option>
            </Select>
        )}
    </BaseFormItem>);

    const options = [];
    if (wrhs != null) {
        for (var wrh of wrhs) {
            options.push(<Option value={wrh.uuid}>{wrh.name + "[" + wrh.code + "]"}</Option>)
        }
    }

    children.push(
        <BaseFormItem label={"仓位："}>
            {getFieldDecorator("wrh", {
                rules: [{ required: true }], initialValue: item.wrh ? item.wrh.name + "[" + item.wrh.code + "]" : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    {options}
                </Select>
                )
            }
        </BaseFormItem>);


    children.push(
        <BaseFormItem label={"报损人："} >
            <label>{item.operator == null ? localStorage.getItem("loginName") + "[" + localStorage.getItem("loginCode") + "]" : item.operator.name + "[" + item.operator.code + "]"}</label>
        </BaseFormItem>
    );

    const totalCaseQtyStrForm = [];
    totalCaseQtyStrForm.push(<BaseFormItem label={"总件数："}>
        <label>{item.totalCaseQtyStr == null ? 0 : item.totalCaseQtyStr}</label>
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

export default Form.create()(DecIncCreateForm);