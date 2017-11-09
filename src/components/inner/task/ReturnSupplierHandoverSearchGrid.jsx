import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col, message } from 'antd';
const EditableCell = require('../../widget/EditableCell');


function ReturnSupplierHandoverSearchGrid({
	dataSource,
	pagination,
	onPageChange,
	onHandover,
	onAbortBatch,
	refresRealCaseQtyStr,
	selectedRowKeys = []
}) {

	const columns = [{
		title: '供应商',
		dataIndex: 'owner',
		key: 'owner',
		width: 80
	}, {
		title: '商品',
		dataIndex: 'article',
		key: 'article',
		render: (text, record) => text ? "[" + text.code + "]" + text.name + "," + record.spec : text,
		width: 80
	}, {
		title: '包装',
		dataIndex: 'qpcStr',
		key: 'qpcStr',
		render: (text, record) => record.munit + "," + record.qpcStr,
		width: 80
	}, {
		title: '货位',
		dataIndex: 'binCode',
		key: 'binCode',
		width: 80
	}, {
		title: '容器',
		dataIndex: 'containerBarcode',
		key: 'containerBarcode',
		width: 80
	}, {
		title: '数量',
		dataIndex: 'qty',
		key: 'qty',
		width: 50
	}, {
		title: '件数',
		dataIndex: 'caseQtyStr',
		key: 'caseQtyStr',
		width: 70
	}, {
		title: '实际数量',
		dataIndex: 'realQty',
		key: 'realQty',
		render: (text, record, index) => renderColumns(record, "realQty", text, index),
		width: 70
	}, {
		title: '实际件数',
		dataIndex: 'realCaseQtyStr',
		key: 'realCaseQtyStr',
		render: (text, record) => text ? text : record.caseQtyStr,
		width: 70
	}, {
		title: '操作人',
		dataIndex: 'operator',
		key: 'operator',
		width: 100
	}, {
		title: '单价',
		dataIndex: 'price',
		key: 'price',
		width: 70
	}];

	function renderColumns(record, key, text, index) {
		// if(key==="toBinCode")
		//   return text;
		if (!text)
			text = record.qty;
		return (<EditableCell
			editable={false}
			value={text}
			status={status}
			onChange={value => handleChange(record, key, value, index)}
		/>);
	};

	function handleChange(record, key, value, index) {
		var reg = /^\d+(\.{0,1}\d+){0,1}$/;
		if (!reg.test(value)) {
			message.error("请输入大于0的数字", 2, '');
			return;
		}
		if (value > record.qty) {
			message.error("实际数量不能大于计划数量", 2, '');
			return;
		}
		record.realQty = value;
		dataSource[index] = record;
		refresRealCaseQtyStr(index, record.realQty, record.qpcStr);
	};

	function handlerHandover() {
		onHandover(selectedRowKeys);
	};

	function handlerAbortBatch() {
		onAbortBatch(selectedRowKeys);
	};

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
			<Table size="small"
				bordered
				columns={columns}
				dataSource={dataSource}
				onChange={onPageChange}
				pagination={pagination}
				scroll={{ x: 1500, y: 300 }}
				rowKey={record => record.uuid}
				rowSelection={rowSelection}
				title={() =>
					<div>
						<Button onClick={handlerHandover}>退货交接</Button>
						<Button onClick={handlerAbortBatch}>作废</Button>
					</div>}
			/>
		</div>
	);
};

ReturnSupplierHandoverSearchGrid.propTypes = {
	dataSource: PropTypes.array,
	pagination: PropTypes.any,
	onPageChange: PropTypes.func,
	onHandover: PropTypes.func,
	onAbortBatch: PropTypes.func
};

export default ReturnSupplierHandoverSearchGrid;

