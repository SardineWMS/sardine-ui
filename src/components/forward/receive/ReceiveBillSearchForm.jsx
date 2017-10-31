import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import UserModalForSearch from '../../widget/UserModalForSearch';

const Option = Select.Option;

const ReceiveBillSearchForm = ({
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
                        <Option value=''>全部</Option>
                        <Option value="Initial" >未审核</Option>
                        <Option value="Audited">已审核</Option>
                        <Option value="InProgress">进行中</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"supplier"}>
            <BaseFormItem label={"供应商 等于"}>
                {getFieldDecorator("supplier")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"wrh"}>
            <BaseFormItem label={"仓位 等于"}>
                {getFieldDecorator("wrh")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"orderBillNumber"}>
            <BaseFormItem label={"订单 等于"}>
                {getFieldDecorator("orderBill")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"articleCode"}>
            <BaseFormItem label={"商品代码 类似于"}>
                {getFieldDecorator("articleCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"receiverCode"}>
            <BaseFormItem label={"收货员 等于"}>
                {getFieldDecorator("receiverCode")(
                    <UserModalForSearch />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );



    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(ReceiveBillSearchForm);