import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const Option = Select.Option;

const AlcNtcBillSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    }
}) => {
    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    }

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    }
    const children = [];
    children.push(
        <BaseTwoCol key={"billNumber"}>
            <BaseFormItem label={"单号 类似于"}>
                {getFieldDecorator("billNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"state"}>
            <BaseFormItem label={"状态 等于"}>
                {getFieldDecorator("state")(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="initial" >初始</Option>
                        <Option value="aborted">已作废</Option>
                        <Option value="inAlc">待配送</Option>
                        <Option value="inSorting">分拣中</Option>
                        <Option value="finished">已完成</Option>
                        <Option value="inProgress">配送中</Option>
                        <Option value="handover">已交接</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customer"}>
            <BaseFormItem label={"客户代码 类似于"}>
                {getFieldDecorator("customer")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"taskBillNumber"}>
            <BaseFormItem label={"作业号 类似于"}>
                {getFieldDecorator("taskBillNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"sourceBillNumber"}>
            <BaseFormItem label={"来源单号 类似于"}>
                {getFieldDecorator("sourceBillNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(<BaseTwoCol key={"wrh"}>
        <BaseFormItem label="仓位 等于">
            {getFieldDecorator("wrh")(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    /*children.push(<BaseTwoCol key={"deliverySystem"}>
        <BaseFormItem label="配送体系 等于">
            {getFieldDecorator("deliverySystem")(
                <Select placeholder="请选择" showSearch={false} size="default">
                    <Option value="tradition">传统体系</Option>
                    <Option value="eCommerce">电商体系</Option>
                </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);*/
    children.push(<BaseTwoCol key={"deliverMode"}>
        <BaseFormItem label="配送方式 等于">
            {getFieldDecorator("deliverMode")(
                <Select placeholder="请选择" showSearch={false} size="default">
                    <Option value="warehouseDelivery">仓库配送</Option>
                    <Option value="sf">顺丰</Option>
                    <Option value="st">申通</Option>
                    <Option value="yt">圆通</Option>
                    <Option value="zt">中通</Option>
                    <Option value="ht">汇通</Option>
                    <Option value="yd">韵达</Option>
                </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);


    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(AlcNtcBillSearchForm);