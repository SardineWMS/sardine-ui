import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin,Tabs  } from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';
import ReturnSupplierBillItemForm from './ReturnSupplierBillItemForm';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
const TabPane = Tabs.TabPane;


const ReturnSupplierBillViewForm = ({
    returnSupplierBill = {},
    onBack,
    onFinish
}) => {
    function converState(text) {
        if (text == "Initial")
            return "初始";
        if (text == "InProgress")
            return "进行中";
        if (text == "Finished")
            return "已完成";
    };

    function viewLog(){
        window.location.href=`/#/inner/entitylog?key=${returnSupplierBill.uuid}`;
    };

    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{returnSupplierBill.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="供应商退货通知单" key={Guid()}>
        <span>{returnSupplierBill.rtnSupplierNtcBillNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="供应商：" key={Guid()}>
        <span>{returnSupplierBill.supplier.name + "[" + returnSupplierBill.supplier.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{returnSupplierBill.wrh.name + "[" + returnSupplierBill.wrh.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="退货员：" key={Guid()}>
        <span>{returnSupplierBill.returner.name + "[" + returnSupplierBill.returner.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="单据类型：" key={Guid()}>
        {returnSupplierBill.method==='ManualBill' ?
            <span>"手工单据"</span>
            :
            <span>"APP"</span>
        }
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{returnSupplierBill.totalCaseQty}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{returnSupplierBill.totalAmount}</span>
    </BaseFormItem>);

    let stateForm = [];
    stateForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{converState(returnSupplierBill.state)}</span>
    </BaseFormItem>);
    stateForm.push(<BaseFormItem label="操作信息：" key={Guid()}><span>{createInfo2String(returnSupplierBill)}</span></BaseFormItem>);
    stateForm.push(<BaseFormItem label="最后修改信息：" key={Guid()}><span>{lastModifyInfo2String(returnSupplierBill)}</span></BaseFormItem>);
    stateForm.push(<BaseFormItem label="日志：" key={Guid()}><span><a onClick={() => viewLog()} >详情</a></span></BaseFormItem>);

    let toolbar = [];
    toolbar.push(
        <Popconfirm title="确定要完成吗？" onConfirm={() => onFinish(returnSupplierBill)}>
            <Button disabled={!(returnSupplierBill.state == "Initial" || returnSupplierBill.state == "InProgress") || (!PermissionUtil("returnSupplierBill:finish"))}>完成</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);

    const returnSupplierBillItemProps = {
        dataSource: returnSupplierBill.items
    };


    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="供应商退货单信息">
                <BaseForm items={basicForm} />
                <BaseForm items={stateForm} />
            </BaseCard>
            <BaseCard single={true} title="供应商退货单明细">
                <BaseForm items={<ReturnSupplierBillItemForm {...returnSupplierBillItemProps}/>} />
            </BaseCard>
        </div>
    );
};

ReturnSupplierBillViewForm.propTypes = {
    dataSource: PropTypes.array
};

export default Form.create()(ReturnSupplierBillViewForm);
