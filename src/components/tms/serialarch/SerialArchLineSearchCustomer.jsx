import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
const Option = Select.Option;

const SerialArchSearchCustomer = ({
    onSearch,
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
            <BaseFormItem label={"客户代码 类似于"}>
                {getFieldDecorator("code")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"name"}>
            <BaseFormItem label={"客户名称 类似于"}>
                {getFieldDecorator("name")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(<BaseTwoCol key={"state"}>
        <BaseFormItem label={"状态 等于"}>
            {
                getFieldDecorator("state")(
                    <Select>
                        <Option key="online">正常</Option>
                        <Option key="offline">停用</Option>
                    </Select>
                )
            }
        </BaseFormItem>
    </BaseTwoCol>
    )

    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(SerialArchSearchCustomer);