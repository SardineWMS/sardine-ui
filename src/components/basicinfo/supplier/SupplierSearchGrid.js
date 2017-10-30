import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button, Row, Col, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils'

function SupplierSerachGrid({
	loading,
	dataSource,
	pagination,
	onPageChange,
	onCreate,
	onViewItem,
	onEditItem,
	onRemoveItem,
	onRecoverItem,
	onRemoveBatch,
	onRecoverBatch,
	selectedRowKeys = []
}) {

	function handleCreate(e) {
		e.preventDefault();
		onCreate();
	};

	function handleRemoveBatch() {
		onRemoveBatch(selectedRowKeys);
	};

	function handleRecoverBatch() {
		onRecoverBatch(selectedRowKeys);
	};

	const columns = [
		{
			title: '代码',
			dataIndex: 'code',
			key: 'code',
			render: (text, record) => <p><a onClick={() => onViewItem(record)} disabled={!PermissionUtil("supplier:view")}>{text}</a></p>
		},
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: '简称',
			dataIndex: 'simpleName',
			key: 'simpleName'
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
			render: (text) => text == "online" ? "正常" : "停用"
		},
		{
			title: '联系方式',
			dataIndex: 'phone',
			key: 'phone'
		}, {
			title: '联系人',
			dataIndex: 'contacter',
			key: 'contacter'
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address'
		}, {
			title: 'EMAIL',
			dataIndex: 'eMail',
			key: 'eMail'
		}, {
			title: '邮编',
			dataIndex: 'zCode',
			key: 'zCode'
		}, {
			title: '传真',
			dataIndex: 'fax',
			key: 'fax'
		}
	];

	const rowSelection = {
		onChange: (selectedRowsKeys, selectedRows) => {
		},
		onSelect: (record, selected, selectedRows) => {
			selectedRowKeys = selectedRows;
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			selectedRowKeys = selectedRows;
		},
		getCheckboxProps: record => ({
			//disabled: record.name === 'Disabled User',
		}),
	};

	const hasSelected = selectedRowKeys.length > 0;
	//bordered 有边的；
	return (
		<div>
			<Table
				size="small"
				bordered
				rowSelection={rowSelection}
				columns={columns}
				title={
					() =>
						<div>
							<Row type="flex">
								<Col><Button type="primary" onClick={handleCreate} disabled={!PermissionUtil("supplier:create")}> 新建</Button></Col>
								<Col><Button onClick={handleRecoverBatch} disabled={!PermissionUtil("supplier:edit")}> 启用</Button></Col>
								<Col><Button onClick={handleRemoveBatch} disabled={!PermissionUtil("supplier:edit")}> 停用</Button></Col>
								<Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
							</Row>
						</div>
				}
				dataSource={dataSource}
				//loading={loading}
				onChange={onPageChange}
				pagination={pagination}
				rowKey={record => record.uuid}
			/>
		</div>
	);
};

SupplierSerachGrid.propTypes = {
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
	onCreate: PropTypes.func,
	onRecoverBatch: PropTypes.func,
	onRemoveBatch: PropTypes.func,
	onViewItem: PropTypes.func,
	onEditItem: PropTypes.func,
	onRemoveItem: PropTypes.func
};

export default SupplierSerachGrid;