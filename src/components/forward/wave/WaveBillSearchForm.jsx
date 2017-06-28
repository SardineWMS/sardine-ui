import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const Option = Select.Option;

const WaveBillSearchForm = ({
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
                {getFieldDecorator("state")(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="initial" >初始</Option>
                        <Option value="inProgress">启动中</Option>
                        <Option value="exception">异常</Option>
                        <Option value="started">启动完成</Option>
                        <Option value="inAlc">配货中</Option>
                        <Option value="finished">已完成</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(<BaseTwoCol key={"waveType"}>
        <BaseFormItem label="波次类型 等于">
            {getFieldDecorator("waveType")(
                <Select placeholder="请选择" showSearch={false} size="default">
                    <Option value="normal">正常波次</Option>
                    <Option value="eCommerce">电商波次</Option>
                </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);


    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(WaveBillSearchForm);