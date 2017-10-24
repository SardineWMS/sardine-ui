import React, { PropTypes } from 'react';
import { Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import DriverModal from './DriverModalForSearch';
import UserModalForSearch from './UserModalForSearch';

const Option = Select.Option;

const ShipBillSearchForm = ({
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
                {getFieldDecorator("state", { initialValue: "all" })(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="all">全部</Option>
                        <Option value="Initial" >初始</Option>
                        <Option value="InProgress">装车中</Option>
                        <Option value="Finished">已完成</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"vehicleNum"}>
            <BaseFormItem label={"车牌号 类似于"}>
                {getFieldDecorator("vehicleNum")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customerCode"}>
            <BaseFormItem label={"客户代码 包含于"}>
                {getFieldDecorator("customerCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"customerName"}>
            <BaseFormItem label={"客户代码 包含于"}>
                {getFieldDecorator("customerName")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"deliveryType"}>
            <BaseFormItem label={"配送方式 等于"}>
                {getFieldDecorator("deliveryType", { initialValue: "all" })(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="all">全部</Option>
                        <Option value="warehouse" >仓库送</Option>
                        <Option value="pickByOneSelf">自提</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"operateMethod"}>
            <BaseFormItem label={"单据类型 等于"}>
                {getFieldDecorator("operateMethod", { initialValue: "all" })(
                    <Select placeholder="请选择" showSearch={false} size="default">
                        <Option value="all">全部</Option>
                        <Option value="ManualBill" >手工单据</Option>
                        <Option value="APP">APP</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"driverCode"}>
            <BaseFormItem label={"司机代码 等于"}>
                {getFieldDecorator("driverCode")(
                    <DriverModal />
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
        <BaseTwoCol key={"shiperCode"}>
            <BaseFormItem label={"装车员代码 等于"}>
                {getFieldDecorator("shiperCode")(
                    <UserModalForSearch />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"containerBarcode"}>
            <BaseFormItem label={"容器条码 类似于"}>
                {getFieldDecorator("containerBarcode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(ShipBillSearchForm);