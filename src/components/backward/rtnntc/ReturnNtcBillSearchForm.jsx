import React, { PropTypes } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const Option = Select.Option;

const ReturnNtcBillSearchForm = ({
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
                {getFieldDecorator("state", { initialValue: '' })(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value='' >全部</Option>
                        <Option value="initial" >初始</Option>
                        <Option value="aborted">已作废</Option>
                        <Option value="inProgress">进行中</Option>
                        <Option value="finished">已完成</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customerCode"}>
            <BaseFormItem label={"客户代码 类似于"}>
                {getFieldDecorator("customerCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customerName"}>
            <BaseFormItem label={"客户名称 类似于"}>
                {getFieldDecorator("customerName")(
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
    children.push(
        <BaseTwoCol key={"wrhCode"}>
            <BaseFormItem label={"仓位 等于"}>
                {getFieldDecorator("wrhCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"dateLessThan"}>
            <BaseFormItem label={"退货日期 小于等于"}>
                {getFieldDecorator("dateLessThan")(
                    <DatePicker style={{ width: 290.5 }} size="large" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"dateMoreThan"}>
            <BaseFormItem label={"退货日期 大于等于"}>
                {getFieldDecorator("dateMoreThan")(
                    <DatePicker style={{ width: 290.5 }} size="large" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"articleName"}>
            <BaseFormItem label={"商品名称 包含于"}>
                {getFieldDecorator("articleName")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"articleCode"}>
            <BaseFormItem label={"商品代码 包含于"}>
                {getFieldDecorator("articleCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"supplierName"}>
            <BaseFormItem label={"供应商名称 包含于"}>
                {getFieldDecorator("supplierName")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"supplierCode"}>
            <BaseFormItem label={"供应商代码 包含于"}>
                {getFieldDecorator("supplierCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );


    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(ReturnNtcBillSearchForm);