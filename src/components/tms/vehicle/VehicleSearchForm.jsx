import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const Option = Select.Option;

const VehicleSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) => {
    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    };

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    };
    const children = [];
    children.push(
        <BaseTwoCol key={"code"}>
            <BaseFormItem label={"代码 类似于"}>
                {getFieldDecorator("code")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"state"}>
            <BaseFormItem label={"状态 等于"}>
                {getFieldDecorator("state")(
                    <Select placeholder="请选择" showSearch={false} size="large">
                        <Option value="free" >空闲</Option>
                        <Option value="unUse">待排车</Option>
                        <Option value="used">已排车</Option>
                        <Option value="shiping">装车中</Option>
                        <Option value="shiped">已装车</Option>
                        <Option value="inAlc">配送中</Option>
                        <Option value="offline">已停用</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"vehicleNo"}>
            <BaseFormItem label={"车牌号 等于"}>
                {getFieldDecorator("vehicleNo")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"vehicleType"}>
            <BaseFormItem label={"车型 等于"}>
                {getFieldDecorator("vehicleType")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"carrierCode"}>
            <BaseFormItem label={"承运商代码 等于"}>
                {getFieldDecorator("carrierCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );



    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(VehicleSearchForm);