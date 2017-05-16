import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal,Card,Select,InputNumber,Popconfirm} from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseTwoCol from '../../Widget/BaseTwoCol';

const OrderBillView=({
	item={},
	onEdit,
	onDelete,
	onBookReg,
	onCheck,
	onFinish,
	onAbort,
	onBack
}) => {

	function converState(text)	{
		if(text == "Initial")
			return "正常";
	 	if(text=="PreBookReg")
	 		return "已预约";
 	 	if(text=="PreChecked")
	 		return "已预检";
 	 	if(text=="InProgress")
	 		return "进行中";
 		if(text=="Finished")
	 		return "已完成";
 		if(text=="Aborted")
	 		return "已作废";
	};

	function codeAddName(code,name){
		return "["+code+"]"+name;
	}

	const baseChildren=[];
	const stateChildren=[];

	baseChildren.push(
		    <BaseFormItem  label="单号 :">
	          <span> {item.billNumber} </span>
	        </BaseFormItem>
	);	
	baseChildren.push(
		    <BaseFormItem  label="供应商 :">
	          <span> {codeAddName(item.supplier.code,item.supplier.name)} </span>
	        </BaseFormItem>
	);
	baseChildren.push(
		    <BaseFormItem  label="仓位 :">
	          <span> {codeAddName(item.wrh.code,item.wrh.name)} </span>
	        </BaseFormItem>
	);
	baseChildren.push(
		    <BaseFormItem  label="到校日期 :">
	          <span> {item.expireDate.format('YYYY-MM-DD')} </span>
	        </BaseFormItem>
	);
	baseChildren.push(
		    <BaseFormItem  label="预约日期 :">
	          <span> {item.bookedDate.format('YYYY-MM-DD')} </span>
	        </BaseFormItem>
	);
	baseChildren.push(
		    <BaseFormItem  label="来源单据 :">
	          <span> {item.sourceBillNumber} </span>
	        </BaseFormItem>
	);

	stateChildren.push(
		    <BaseFormItem  label="状态 :">
	          <span> {converState(item.state)} </span>
	        </BaseFormItem>
	);
	stateChildren.push(
		    <BaseFormItem  label="总件数 :">
	          <span> {item.totalCaseQtyStr} </span>
	        </BaseFormItem>
	);

	stateChildren.push(
		    <BaseFormItem  label="已收货件数 :">
	          <span> {item.receivedCaseQtyStr} </span>
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
         {stateChildren}
       </Col>
	);


    const toolbar = [];
    toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <Card title="基本信息" single={true}>
                <BaseForm items={colChildren} />
            </Card>
        </div>
    );
};

OrderBillView.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onBack: PropTypes.func,
};

export default OrderBillView;