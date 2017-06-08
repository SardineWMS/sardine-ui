import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';

const Option = Select.Option;

const CustomerSearchForm = ({
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
    const children = [];
    children.push(
        <BaseTwoCol key={"code"}>
            <BaseFormItem label={"代码 等于"} >
                {getFieldDecorator("code")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"state"}>
            <BaseFormItem label={"状态 等于"}>
                {getFieldDecorator("state", { initialValue: '' })(
                    <Select placeholder="请选择" showSearch={false} size="large">
                        <Option value=''> 全部</Option>
                        <Option value="normal" >正常</Option>
                        <Option value="deleted">已删除</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"name"}>
            <BaseFormItem label={"名称 等于"}>
                {getFieldDecorator("name")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    }

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    }
    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(CustomerSearchForm);
