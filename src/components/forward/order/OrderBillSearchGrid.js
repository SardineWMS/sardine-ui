import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function OrderBillSearchGrid({
  loading,
	dataSource,
	pagination,
	onPageChange,
	onSearch,
	onCreate,
	onViewItem,
	onDeleteBatch,
	onBookRegBatch,
	onCheckBatch,
	onFinishBatch,
	onAbortBatch,
	selectedRowKeys = []
}) {

	function handlerBookRegBatch() {
		onBookRegBatch(selectedRowKeys);
	};
	function handlerCheckBatch() {
		onCheckBatch(selectedRowKeys);
	};
	function handlerFinishBatch() {
		onFinishBatch(selectedRowKeys);
	};
	function handlerAbortBatch() {
		onAbortBatch(selectedRowKeys);
	};
	function handlerDeleteBatch() {
		onDeleteBatch(selectedRowKeys);
	};
	function handleCreate(e) {
		e.preventDefault();
		onCreate();
	};

	function converState(text) {
		if (text == "Initial")
			return "初始";
		if (text == "PreBookReg")
			return "已预约";
		if (text == "PreChecked")
			return "已预检";
		if (text == "InProgress")
			return "进行中";
		if (text == "Finished")
			return "已完成";
		if (text == "Aborted")
			return "已作废";
	};

	function converDate(text) {
		if (text == null || text == undefined)
			return null;
		return moment(text).format('YYYY-MM-DD');
	}

	const columns =
		[
			{
				title: '单号',
				dataIndex: 'billNumber',
				key: 'billNumber',
				render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
				sorter: true
			},
			{
				title: '状态',
				dataIndex: 'state',
				key: 'state',
				render: text => converState(text)
			},
			{
				title: '供应商',
				dataIndex: 'supplier',
				key: 'supplier',
				render: text => ("[" + text.code + "]" + text.name)
			},
			{
				title: '仓位',
				dataIndex: 'wrh',
				key: 'wrh',
				render: text => ("[" + text.code + "]" + text.name)
			},
			{
				title: '来源单据',
				dataIndex: 'sourceBillNumber',
				key: 'sourceBillNumber'
			},
			{
				title: '预约日期',
				dataIndex: 'bookedDate',
				key: 'bookedDate',
				render: text => converDate(text)
			},
			{
				title: '预检日期',
				dataIndex: 'preCheckDate',
				key: 'preCheckDate',
				render: text => converDate(text)
			},
			{
				title: '到效日期',
				dataIndex: 'expireDate',
				key: 'expireDate',
				render: text => converDate(text)
			},
			{
				title: '总件数',
				dataIndex: 'totalCaseQtyStr',
				key: 'totalCaseQtyStr'
			},
			{
				title: '已收件数',
				dataIndex: 'receivedCaseQtyStr',
				key: 'receivedCaseQtyStr'
			},
		];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
		},
		onSelect: (record, selected, selectedRows) => {
			selectedRowKeys = selectedRows;
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			selectedRowKeys = selectedRows;
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User',
		})
	};

	return (
		<div>
			<Table size="small" bordered rowSelection={rowSelection}
				columns={columns}
				title={
					() =>
						<div>
							<Button onClick={handleCreate}> 新建</Button>
							<Button onClick={handlerBookRegBatch}> 预约</Button>
							<Button onClick={handlerCheckBatch}> 预检</Button>
							<Button onClick={handlerFinishBatch}> 完成</Button>
							<Button onClick={handlerAbortBatch}> 作废</Button>
						</div>
				}
				dataSource={dataSource}
				loading={loading}
				onChange={onPageChange}
				pagination={pagination}
				rowKey={record => record.uuid}
			/>
		</div>
	);
};

OrderBillSearchGrid
OrderBillSearchGrid.propTypes = {
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
	onCreate: PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem: PropTypes.func,
	onBookRegItem: PropTypes.func,
	onCheckItem: PropTypes.func,
	onFinishItem: PropTypes.func,
	onAbortItem: PropTypes.func,
	onBookRegBatch: PropTypes.func,
	onCheckBatch: PropTypes.func,
	onFinishBatch: PropTypes.func,
	onAbortBatch: PropTypes.func,
	onDeleteBatch: PropTypes.func
};

export default OrderBillSearchGrid;