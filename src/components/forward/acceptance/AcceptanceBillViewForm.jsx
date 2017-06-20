import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal, Card, Select, InputNumber, Popconfirm } from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import PermissionUtil from '../../../utils/PermissionUtil';

const AcceptanceBillViewForm = ({
	acceptanceBill = {},
	onEdit,
	onDelete,
	onApprove,
	onBeginAlc,
	onFinish,
	onAbort,
	onBack
}) => {

	function converState(text) {
		if (text == "Initial")
			return "初始";
		if (text == "Approved")
			return "已批准";
		if (text == "PreChecked")
			return "已预检";
		if (text == "InAlc")
			return "配货中";
		if (text == "Finished")
			return "已完成";
		if (text == "Aborted")
			return "已作废";
	};

	function codeAddName(code, name) {
		return "[" + code + "]" + name;
	};

	const baseChildren = [];
	const compositiveChildren = [];

	baseChildren.push(
		<BaseFormItem label="单号 :">
			<span> {acceptanceBill.billNumber} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="客户 :">
			<span> {codeAddName(acceptanceBill.customer.code, acceptanceBill.customer.name)} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="仓位 :">
			<span> {codeAddName(acceptanceBill.wrh.code, acceptanceBill.wrh.name)} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="来源单据 :">
			<span> {acceptanceBill.sourceBillNumber} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="配货体系 :">
			<span> {acceptanceBill.deliverySystem === "tradition" ? "传统体系" : "电商体系"} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="配货方式 :">
			<span> {acceptanceBill.deliveryType} </span>
		</BaseFormItem>
	);
	baseChildren.push(
		<BaseFormItem label="领用原因 :">
			<span> {acceptanceBill.acceptanceReason} </span>
		</BaseFormItem>
	);

	compositiveChildren.push(
		<BaseFormItem label="状态 :">
			<span> {converState(acceptanceBill.state)} </span>
		</BaseFormItem>
	);
	compositiveChildren.push(
		<BaseFormItem label="总件数 :">
			<span> {acceptanceBill.totalCaseQtyStr} </span>
		</BaseFormItem>
	);
	compositiveChildren.push(
		<BaseFormItem label="总金额 :">
			<span> {acceptanceBill.totalAmount} </span>
		</BaseFormItem>
	);

	compositiveChildren.push(
		<BaseFormItem label="配货总数 :">
			<span> {acceptanceBill.alcTotalCaseQtyStr} </span>
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
			{compositiveChildren}
		</Col>
	);


	const toolbar = [];
	toolbar.push(<Button onClick={() => onEdit(acceptanceBill)}
		disabled={(acceptanceBill.state != 'Initial') || (!PermissionUtil("acceptanceBill:edit"))}> 编辑</Button>);
	toolbar.push(<Button onClick={() => onDelete(acceptanceBill)}
		disabled={(acceptanceBill.state != 'Initial') || (!PermissionUtil("acceptanceBill:delete"))}> 删除</Button>);
	toolbar.push(<Button onClick={() => onApprove(acceptanceBill)}
		disabled={(acceptanceBill.state != 'Initial') || (!PermissionUtil("acceptanceBill:approve"))}> 批准</Button>);
	toolbar.push(<Button onClick={() => onBeginAlc(acceptanceBill)}
		disabled={(acceptanceBill.state != 'Approved') || (!PermissionUtil("acceptanceBill:alc"))}> 配货</Button>);
	toolbar.push(<Button onClick={() => onFinish(acceptanceBill)}
		disabled={((acceptanceBill.state != 'Approved') && (acceptanceBill.state != 'Initial')) || (!PermissionUtil("acceptanceBill:finesh"))}> 完成</Button>);
	toolbar.push(<Button onClick={() => onAbort(acceptanceBill)}
		disabled={(acceptanceBill.state != 'Initial') || (!PermissionUtil("acceptanceBill:abort"))}> 作废</Button>);
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

AcceptanceBillViewForm.propTypes = {
	form: PropTypes.object,
	acceptanceBill: PropTypes.object,
	onBack: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onApprove: PropTypes.func,
	onBeginAlc: PropTypes.func,
	onFinish: PropTypes.func,
	onAbort: PropTypes.func
};

export default AcceptanceBillViewForm;

