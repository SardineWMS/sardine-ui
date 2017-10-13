import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';
import Panel from '../../Widget/Panel';

const Option = Select.Option;

const VehicleCreate = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    carrierList,
    vehicleTypeList
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            };
            const data = { ...getFieldsValue() };
            handleSave(data);
        });
    };

    const children = [];
    children.push(
        <BaseFormItem label={"代码"} key="code">
            {getFieldDecorator("code", { rules: [{ required: true, message: '代码不能为空' }, { pattern: /^[a-z0-9]{0,30}$/, message: "车辆代码只能是数字和字母，且小于30位" }], initialValue: item.code })(
                <Input placeholder="请输入" disabled={item.code} />
            )}
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label={"车牌号"} key="vehicleNo">
            {getFieldDecorator("vehicleNo", { rules: [{ required: true, message: '车牌号不能为空' }, { max: 30, message: '车牌号最大长度是30' }], initialValue: item.vehicleNo })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );

    const options = [];
    if (vehicleTypeList != null) {
        for (var vehicleType of vehicleTypeList) {
            options.push(<Option value={vehicleType.uuid} >{vehicleType.name + "[" + vehicleType.code + "]"}</Option>);
        };
    };
    children.push(
        <BaseFormItem label={"车型"} key="vehicleType">
            {getFieldDecorator("vehicleType", { rules: [{ required: true, message: '请选择车型' }], initialValue: item.vehicleType == null ? null : item.vehicleType.uuid })(
                <Select placeholder="请选择：">
                    {options}
                </Select>
            )}
        </BaseFormItem>
    );

    const carrierOptions = [];
    if (carrierList != null) {
        for (var carrier of carrierList) {
            carrierOptions.push(
                <Option value={carrier.uuid}>{
                    carrier.name + "[" + carrier.code + "]"}</Option>
            );
        };
    };

    children.push(<BaseFormItem label={"承运商"} key="carrier">
        {getFieldDecorator("carrier", { rules: [{ required: true, message: '请选择承运商' }], initialValue: item.carrier == null ? null : item.carrier.uuid })(
            <Select placeholder="请选择：">
                {carrierOptions}
            </Select>
        )}
    </BaseFormItem>);

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel()} key={Guid()}>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handleCreate} key={Guid()} disabled={!PermissionUtil("customer:create")}>保存</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息">
                <BaseForm items={children} />
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

export default Form.create()(VehicleCreate);