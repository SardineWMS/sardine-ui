import React, { PropTypes } from 'react';
import {Button, Input, Form, Select, Card, DatePicker,Col} from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option;
const OrderBillCreateForm=({
	item={},
    wrhs=[],
	onOk,
	onCancel,
    queryWrhs,
    querySuppliers,
    form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue
    }
})=>{
	function handlerSave(){
        validateFields((errors) => {
            if (errors)
                return;
            const data = { ...getFieldsValue(), billNumber: item.billNumber, uuid: item.uuid, state: item.state, 
                companyUuid: item.companyUuid, version: item.version ,supplier:item.supplier,wrh:item.wrh};
            onOk(data);
        });
	}

    function expireDateOnSelect(value){
        item.expireDate=value;
    }

    function wrhOnSelect(value){
        const wrhUcn=new Object();
        wrhUcn.uuid=value.uuid;
        wrhUcn.code=value.code;
        wrhUcn.name=value.name;
        item.wrh=wrhUcn;
    }

    const baseChildren = [];
    const dataChildren=[];
    const options=[];

    wrhs.map(function(wrh){
        options.push(
            <Option key={wrh.uuid} value={wrh} >
                {"["+wrh.code+"]"}+{wrh.name}
            </Option>
        )
    });

    baseChildren.push(
        <BaseFormItem label={"供应商："}>
            {getFieldDecorator("supplier.uuid", { rules: [{ required: true }], initialValue: item.supplier ? item.supplier.uuid : null })(
                <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => querySuppliers()} />}  />
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"仓位"} >
            {getFieldDecorator("wrh.uuid", { rules: [{ required: true }], initialValue:item.wrh ? item.wrh.uuid: null })(
                <Select size="large" style={{ width: 325 }} onFocus={queryWrhs} onSelect={wrhOnSelect}>
                  {options}
                </Select>            
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"来源单据类型"} >
            {getFieldDecorator("billType", { rules: [{ required: false }], initialValue: item.billType })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"来源单据号"} >
            {getFieldDecorator("sourceBillNumber", { rules: [{ required: false }], initialValue: item.sourceBillNumber })(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    );
    baseChildren.push(
        <BaseFormItem label={"到校日期"} >
            {getFieldDecorator("expireDate", { rules: [{ required: false }], initialValue: item.expireDate})(
                 <DatePicker onChange={expireDateOnSelect} format='YYYY-MM-DD'/>
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

    const colChildren=[];
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
}

export default Form.create()(OrderBillCreateForm);