import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
const EditableCell = require('../../Widget/EditableCell');

const Option = Select.Option;

const WaveBillCreateForm = ({
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
    onSelectType,
    waveType,
    serialArchList
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors)
                return;
            let data = {};
            data = {
                ...getFieldsValue(),
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
    children.push(<BaseFormItem label={"波次类型："}>
        {getFieldDecorator("waveType", {
            rules: [{ required: true }],
            initialValue: item.waveType ? item.waveType : ''
        })(
            <Select placeholder="请选择：" onChange={(value) => onSelectType(value)}>
                <Option value='normal'>正常波次</Option>
                <Option value='eCommerce'>电商波次</Option>
            </Select>
            )}
    </BaseFormItem>);

    const options = [];
    if (serialArchList != null) {
        for (var serialArch of serialArchList) {
            options.push(<Option value={serialArch.uuid}>{serialArch.name + "[" + serialArch.code + "]"}</Option>)
        };
    };
    if (waveType == 'normal')
        children.push(
            <BaseFormItem label={"线路体系："}>
                {getFieldDecorator("serialArchUuid", {
                    rules: [{ required: true }], initialValue: item.serialArch ? item.serialArch.name + "[" + item.serialArch.code + "]" : null
                })(
                    <Select placeholder="请选择：">
                        {options}
                    </Select>
                    )
                }
            </BaseFormItem>);

    const toolbar = [];
    toolbar.push(<Button key={Guid()} onClick={handleCreate} >保存</Button>);
    toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="波次单信息" single={false}>
                <BaseForm items={children} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(WaveBillCreateForm);