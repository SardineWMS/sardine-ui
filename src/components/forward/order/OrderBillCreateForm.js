import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, DatePicker, Col,Icon,message } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option;
const OrderBillCreateForm = ({
	item = {},
    onOk,
    onCancel,
    queryWrhs,
    wrhs,
    querySuppliers,
    getSupplier,
    form: {
	    getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFields
    }
}) => {
    function handlerSave() {
        validateFields((errors) => {
            if (errors)
                return;
            const data = {
                ...getFieldsValue(), billNumber: item.billNumber, uuid: item.uuid, state: item.state,
                companyUuid: item.companyUuid, version: item.version, supplier: item.supplier, wrh: item.wrh
            };
            onOk(data);
        });
    };

    function expireDateOnSelect(value) {
        if(typeof value =='undefined' || value==null)
            return;
        if(value <= Date.now()){
           message.error("到校日期不能小于今天");
           return;
        }
        item.expireDate = value;
    };


    function wrhOnSelect(value) {
        const wrhUcn = new Object();
        wrhUcn.uuid = value;
        item.wrh = wrhUcn;
    };

    function handleEnterPress() {
       console.log(getFieldsValue().supplier);
       //getSupplier(getFieldsValue().supplier);
    }

    const baseChildren = [];
    const dataChildren = [];
    const options = [];
    if (wrhs != null) {
        for (var wrh of wrhs) {
            options.push(<Option value={wrh.uuid}>{wrh.name + "[" + wrh.code + "]"}</Option>)
        };
    };

    baseChildren.push(
        <BaseFormItem label={"供应商："}>
            {getFieldDecorator("supplier", { rules: [{ required: true, message: '供应商不能为空！' }], initialValue: item.supplier ? "["+item.supplier.code+"]"+item.supplier.name : null })(
                <Input placeholder="请选择" suffix={<Icon type="ellipsis" onClick={() => querySuppliers()}  />} 
                 onBlur={handleEnterPress} onPressEnter={handleEnterPress}/>
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"仓位"} >
            {getFieldDecorator("wrh.uuid", { rules: [{ required: true ,message: '仓位不能为空！' }], initialValue: item.wrh ? item.wrh.code : null })(
                <Select size="large" onSelect={wrhOnSelect}>
                    {options}
                </Select>
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"来源单据类型"} >
            {getFieldDecorator("billType", { rules: [{ required: false }, { max: 100, message: '来源单据类型最大长度是100！' }], initialValue: item.billType })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"来源单据号"} >
            {getFieldDecorator("sourceBillNumber", { rules: [{ required: false }, { max: 30, message: '来源单据号最大长度是30！' }], initialValue: item.sourceBillNumber })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"到效日期"} >
            {getFieldDecorator("expireDate", { rules: [{ required: false }], initialValue: item.expireDate })(
                <DatePicker onChange={expireDateOnSelect} format='YYYY-MM-DD' style={{ width: 283 }} />
            )}
        </BaseFormItem>
    );

    dataChildren.push(
        <BaseFormItem label={"总件数"} >
            <span> {item.totalCaseQtyStr} </span>
        </BaseFormItem>
    );

    dataChildren.push(
        <BaseFormItem label={"总金额"} >
            <span> {item.totalAmount} </span>
        </BaseFormItem>
    );

    const colChildren = [];
    colChildren.push(
        <Col span={12} key='col1'>
            {baseChildren}
        </Col>
    );
    colChildren.push(
        <Col span={12} key='col2'>
            {dataChildren}
        </Col>
    );


    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel('Vuew')} key='cancel'>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handlerSave} key='save'>保存</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
                <BaseForm items={colChildren} />
            </BaseCard>
        </div>
    );
};

export default Form.create()(OrderBillCreateForm);