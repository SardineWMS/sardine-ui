import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import WrhSelect from '../../widget/WrhSelect';

const Option = Select.Option;

const AcceptanceBillSearchForm = ({
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
                {getFieldDecorator("state",{ initialValue:"all"})(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="all">全部</Option>
                        <Option value="Initial" >初始</Option>
                        <Option value="Approved">已批准</Option>
                        <Option value="InAlc">配货中</Option>
                        <Option value="Finished">已完成</Option>
                        <Option value="Aborted">已作废</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customercode"}>
            <BaseFormItem label={"客户代码 类似于"}>
                {getFieldDecorator("customercode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    children.push(
        <BaseTwoCol key={"binCode"}>
            <BaseFormItem label={"货位代码 类似于"}>
                {getFieldDecorator("binCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    children.push(
        <BaseTwoCol key={"containerBarcode"}>
            <BaseFormItem label={"容器代码 类似于"}>
                {getFieldDecorator("containerBarcode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    children.push(<BaseTwoCol key={"wrhcode"}>
        <BaseFormItem label="仓位代码 等于">
            {getFieldDecorator("wrhcode")(
                <WrhSelect/>
                //<Input placeholder="请输入" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    children.push(<BaseTwoCol key={"deliverySystem"}>
        <BaseFormItem label="配送体系 等于">
            {getFieldDecorator("deliverySystem")(
                <Select placeholder="请选择" showSearch={false} size="default">
                    <Option value="tradition">传统体系</Option>
                    <Option value="eCommerce">电商体系</Option>
                </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);

    children.push(<BaseTwoCol key={"deliveryType"}>
        <BaseFormItem label="配送方式 类似于">
            {getFieldDecorator("deliveryType")(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);


    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(AcceptanceBillSearchForm);