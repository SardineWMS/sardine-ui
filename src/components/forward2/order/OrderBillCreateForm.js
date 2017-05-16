import React, { PropTypes } from 'react';
import {Button, Input, Form, Select, Card, Calendar} from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';

const Option = Select.Option;
const OrderBillCreateForm=({
	item={},
	onOk,
	onCancel,
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
            const data = { ...getFieldsValue(), billNumber: item.billNumber, uuid: item.uuid, state: item.state, companyUuid: item.companyUuid, version: item.version };
            onOk(data);
        });
	}

    function expireDateOnSelect(value){
        item.expireDate=value;
    }

    const children = [];
    children.push(
            <BaseFormItem label={"供应商"} >
                {getFieldDecorator("supplier.uuid", { rules: [{ required: true }], initialValue: item.supplier ? item.supplier.uuid : null })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"仓位"} >
                {getFieldDecorator("wrh.uuid", { rules: [{ required: true }], initialValue:item.wrh ? item.wrh.uuid: null })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"来源单据类型"} >
                {getFieldDecorator("billType", { rules: [{ required: false }], initialValue: item.billType })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"来源单据号"} >
                {getFieldDecorator("sourceBillNumber", { rules: [{ required: false }], initialValue: item.sourceBillNumber })(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
    );
    children.push(
            <BaseFormItem label={"到校日期"} >
                {getFieldDecorator("expireDate", { rules: [{ required: false }], initialValue: item.expireDate })(
                    <div style={{ width: 345, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                        <Calendar  fullscreen={false} onSelect={expireDateOnSelect}/>
                    </div>
                )}
            </BaseFormItem>
    );


    const toolbar = [];
    toolbar.push(<Button onClick={() => onCancel('Vuew')} key='cancel'>取消</Button>);
    toolbar.push(<Button type="primary" onClick={handlerSave} key='save'>保存</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
              <BaseForm items={children} />
            </BaseCard>
        </div>
    );
}

export default Form.create()(OrderBillCreateForm);