import styles from '../../Widget/EditTable.less';
import React, { Component, PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const confirm = Modal.confirm;
import RowEditableCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect';

const AcceptanceBillItemForm = ({
	acceptanceBillItems,
	stocks,
	editable,
	inAlc,
	onAdd,
	onDelete,
	onSaveItems,
	queryStocks,
	refreshStockInfo,
	refreshCaseQtyAndAmount
}) => {
	const columns = [];

	columns.push({
		title: '行号',
		key: 'line',
		dataIndex: 'line',
		width: 70
	});

	columns.push({
		title: '商品代码',
		key: 'articleCode',
		dataIndex: 'article',
		width: 120,
		render: (text, record, index) => renderRowEditableCell(record, "articleCode", text)
	});

	columns.push({
		title: '商品名称',
		key: 'articleName',
		dataIndex: 'article',
		width: 150,
		render: (text) => text ? text.name : null
	});

	columns.push({
		title: '货位',
		key: 'binCode',
		dataIndex: 'binCode',
		width: 120,
		render: (text, record, index) => renderSelectColumns(record, "binCode", text)
	});

	columns.push({
		title: '容器',
		key: 'containerBarCode',
		dataIndex: 'containerBarCode',
		width: 140,
		render: (text, record, index) => renderSelectColumns(record, "containerBarCode", text)
	});

	columns.push({
		title: '供应商',
		key: 'supplier',
		dataIndex: 'supplier',
		width: 170,
		render: (text, record, index) => renderSelectColumns(record, "supplier", text)
	});

	columns.push({
		title: '规格',
		key: 'qpcStr',
		dataIndex: 'qpcStr',
		width: 150,
		render: (text, record, index) => renderSelectColumns(record, "qpcStr", text)
	});

	columns.push({
		title: '生产日期',
		key: 'productionDate',
		dataIndex: 'productionDate',
		width: 150
	});

	columns.push({
		title: '单位',
		key: 'munit',
		dataIndex: 'munit',
		width: 70
	});

	columns.push({
		title: '价格',
		key: 'price',
		dataIndex: 'price',
		width: 70
	});
	columns.push({
		title: '库存数量',
		key: 'stockQty',
		dataIndex: 'stockQty',
		width: 70
	});

	if (editable) {
		columns.push({
			title: '数量',
			key: 'qty',
			dataIndex: 'qty',
			width: 70,
			render: (text, record, index) => renderRowEditableCell(record, "qty", text)
		});
	};

	columns.push({
		title: '件数',
		key: 'caseQtyStr',
		dataIndex: 'caseQtyStr',
		width: 80
	});

	columns.push({
		title: '金额',
		key: 'amount',
		dataIndex: 'amount',
		width: 80
	});


	if (inAlc) {
		columns.push({
			title: '实际数量',
			key: 'realQty',
			dataIndex: 'realQty'
		});

		columns.push({
			title: '实际件数',
			key: 'realCaseQtyStr',
			dataIndex: 'realCaseQtyStr'
		});
	};

	if (editable) {
		columns.push({
			title: '操作',
			dataIndex: 'operation',
			hidden: true,
			render: (text, record, index) => {
				return (
					<div className={styles.editable_row_operations}>
						<span>
							<a onClick={() => onAdd(acceptanceBillItems)}>新增</a>
							<a onClick={() => onDelete(index)}>删除</a>
						</span>
					</div>
				);
			}
		});
	};


	function renderRowEditableCell(record, key, text) {
		if (typeof text != 'undefined' && text != null && typeof text.code != 'undefined')
			text = text.code;
		if (editable === false)
			return text;
		return (<RowEditableCell
			editable={editable}
			value={text}
			onBlur={value => handleChange(record, key, value)}
			autoFocus={key == "articleCode" ? true : false}
			status={status}
		/>);
	};

	function handleChange(record, key, text) {
		if ("articleCode" === key) {
			queryStocks(text, record.line - 1);
		} else if ("qty" === key) {
			record.qty = text;
			refreshCaseQtyAndAmount(record);
		};
	};

	let binCodeOptions = [];
	let containerBarCodeOptions = [];
	let supplierOptions = [];
	let qpcStrOptions = [];

	function renderSelectColumns(record, key, text) {
		if (typeof text != 'undefined' && typeof text.code != 'undefined')
			text = text.code;
		if (key === "binCode") {
			binCodeOptions.splice(0, binCodeOptions.length);
			stocks.map(function (stock) {
				binCodeOptions.push(<Option key={stock.binCode}>
					{stock.binCode}
				</Option>)
			});
			return renderRowEditCellSelect(binCodeOptions, text, record, key);
		} else if (key === "containerBarCode") {
			return renderRowEditCellSelect(containerBarCodeOptions, text, record, key);
		} else if (key === "supplier") {
			return renderRowEditCellSelect(supplierOptions, text, record, key);
		} else if (key === "qpcStr") {
			return renderRowEditCellSelect(qpcStrOptions, text, record, key);
		};

	};


	function renderRowEditCellSelect(options, text, record, key) {
		return (<RowEditCellSelect
			editable={editable}
			options={options}
			onFocus={value => handlerSelectFocus(record, value, key)}
			onChange={value => handlerSelect(record, value, key)}
			value={text}
		/>);
	};

	function handlerSelectFocus(record, value, key) {
		if (key === "containerBarCode") {
			containerBarCodeOptions.splice(0, containerBarCodeOptions.length);
			stocks.map(function (stock) {
				if (stock.binCode === record.binCode) {
					containerBarCodeOptions.push(<Option key={stock.containerBarcode}>
						{stock.containerBarcode}
					</Option>)
				};
			});
		} else if (key === "supplier") {
			supplierOptions.splice(0, supplierOptions.length);
			stocks.map(function (stock) {
				if (stock.binCode === record.binCode && stock.containerBarcode === record.containerBarCode) {
					supplierOptions.push(<Option key={stock.supplier.uuid} value={stock.supplier}>
						{"[" + stock.supplier.code + "]" + stock.supplier.name}
					</Option>)
				};
			});
		} else if (key === "qpcStr") {
			qpcStrOptions.splice(0, qpcStrOptions.length);
			stocks.map(function (stock) {
				if (stock.binCode === record.binCode && stock.containerBarcode === record.containerBarCode && stock.supplier.uuid === record.supplier.uuid) {
					qpcStrOptions.push(<Option key={stock.qpcStr}>
						{stock.qpcStr}
					</Option>)
				};
			});
		};
	};


	function handlerSelect(record, value, key) {
		if (key === "binCode") {
			record.binCode = value;
		} else if (key === "containerBarCode") {
			record.containerBarCode = value;
		} else if (key === "supplier") {
			record.supplier = value;
		} else if (key === "qpcStr") {
			record.qpcStr = value;
			stocks.map(function (stock) {
				if (stock.binCode === record.binCode && stock.containerBarcode === record.containerBarCode &&
					stock.supplier.uuid === record.supplier.uuid && stock.qpcStr === value) {
					record.munit = stock.measureUnit;
					record.price = stock.price;
					record.stockQty = stock.qty;
					var produceDate = moment(stock.productionDate);
					record.productionDate = produceDate.format('YYYY-MM-DD');
					record.validDate = stock.validDate;
					record.stockBatch = stock.stockBatch;
				};
			});
			refreshStockInfo(record);
		};
	};



	return (
		<div>
			<Table bordered dataSource={acceptanceBillItems} columns={columns} size="small" pagination={false} scroll={{ x: 1300 }} />
		</div>
	);

};

export default AcceptanceBillItemForm;