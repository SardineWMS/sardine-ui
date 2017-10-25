import React, { PropTypes } from 'react';
import { Form, Input, Select,DatePicker } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;

const ReturnSupplierBillSearchForm = ({
    onSearch,
    field,
    keyword,
    wrhs = [],
    queryWrhs,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) => {

    const wrhOptions = [];
    wrhOptions.push(<Option value="all">全部</Option>);                       
    wrhs.map(function (wrh) {
        wrhOptions.push(
            <Option key={wrh.uuid} value={wrh.uuid} >
                {"[" + wrh.code + "]"}+{wrh.name}
            </Option>
        );
    });

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
                        <Option value="InProgress">进行中</Option>
                        <Option value="Finished">已完成</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"rtnSupplierNtcBillNumber"}>
            <BaseFormItem label={"退货通知单号 类似于"}>
                {getFieldDecorator("rtnSupplierNtcBillNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"supplierCode"}>
            <BaseFormItem label={"供应商代码 类似于"}>
                {getFieldDecorator("supplierCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"supplierName"}>
            <BaseFormItem label={"供应商代码 类似于"}>
                {getFieldDecorator("supplierName")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"wrhUuid"}>
            <BaseFormItem label={"仓位 等于"}>
                {getFieldDecorator("wrhUuid",{ initialValue:"all"})(
                    <Select placeholder="请选择" showSearch={false} size="default" onFocus={queryWrhs}>
                        {wrhOptions}
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"operateMethod"}>
            <BaseFormItem label={"单据类型 等于"}>
                {getFieldDecorator("operateMethod",{ initialValue:"all"})(
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
        <BaseTwoCol key={"returnSupplierDateGreaterThanOrEqualStr"}>
            <BaseFormItem label={"退货日期 大于等于"}>
                {getFieldDecorator("returnSupplierDateGreaterThanOrEqualStr")(
                    <DatePicker format='YYYY-MM-DD' style={{ width: 290.5 }} />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"returnSupplierDateLessThanOrEqualStr"}>
            <BaseFormItem label={"退货日期 小于"}>
                {getFieldDecorator("returnSupplierDateLessThanOrEqualStr")(
                    <DatePicker format='YYYY-MM-DD' style={{ width: 290.5 }} />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"returnerCode"}>
            <BaseFormItem label={"退货员代码 类似于"}>
                {getFieldDecorator("returnerCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"returnerName"}>
            <BaseFormItem label={"退货员名称 类似于"}>
                {getFieldDecorator("returnerName")(
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
        <BaseTwoCol key={"binCode"}>
            <BaseFormItem label={"货位 包含于"}>
                {getFieldDecorator("binCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"containerBarcode"}>
            <BaseFormItem label={"容器条码 包含于"}>
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

export default Form.create()(ReturnSupplierBillSearchForm);