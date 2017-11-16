import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');
import PermissionUtil from '../../../utils/PermissionUtil';
import WrhSelect from '../../widget/WrhSelectWithUuid';
const UserModal = require('../../Widget/UserModal');
import Panel from '../../Widget/Panel';

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
    onSelectType,//选择单据类型之后，在查询仓位
    totalCaseQtyStr,
    totalAmount
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            };
            let data = {};
            let wrh = {};
            wrh.uuid = getFieldsValue().wrh;
            data = {
                ...getFieldsValue(),
                ...item,
                remark: getFieldsValue().remark,
                operator: getFieldsValue().operator,
                wrh: wrh,
            };
            handleSave(data);
        });
    };


    const children = [];
    children.push(<BaseFormItem label={"单据类型："}>
        {getFieldDecorator("type", { rules: [{ required: true }], initialValue: item.type ? item.type : 'Dec' })(
            <Select placeholder="请选择" onChange={(value) => onSelectType(value)}>
                <Option value='Dec'>损耗</Option>
                <Option value='Inc'>溢余</Option>
            </Select>
        )}
    </BaseFormItem>);

    children.push(
        <BaseFormItem label={"仓位："}>
            {getFieldDecorator("wrh", {
                rules: [{ required: true }], initialValue: item.wrh ? item.wrh.name + "[" + item.wrh.code + "]" : null
            })(
                <WrhSelect />
                )
            }
        </BaseFormItem>);

    children.push(
        <BaseFormItem label={"报损员："}>
            {getFieldDecorator("operator", {
                rules: [{ required: true, message: "报损员不能为空！" }], initialValue: item.operator ? item.operator.code : localStorage.getItem("loginCode")
            })(
                <UserModal />
                )
            }
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
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);
    toolbar.push(<Button key={Guid()} onClick={handleCreate} disabled={!PermissionUtil("receiveBill:create")}>保存</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={false}>
                <BaseForm items={children} />
                <BaseForm items={totalCaseQtyStrForm} />
            </BaseCard>
            <Panel title="说明">
                <Form.Item>
                    {getFieldDecorator('remark', {
                        initialValue: item.remark, rules: [{ max: 255, message: '说明最大长度是255！' }]
                    })(
                        <Input type="textarea" autosize={{ minRows: 4 }} />
                        )}
                </Form.Item>
            </Panel>
        </div>
    );

};

export default Form.create()(DecIncCreateForm);