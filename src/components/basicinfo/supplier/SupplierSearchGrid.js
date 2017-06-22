import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

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
	suppliers = []
}) {

	function handleCreate(e) {
		e.preventDefault();
		onCreate();
	};

	function handleRemoveBatch() {
		onRemoveBatch(suppliers);
	};

	function handleRecoverBatch() {
		onRecoverBatch(suppliers);
	};

	const columns = [
		{
			title: '代码',
			dataIndex: 'code',
			key: 'code',
			render: (text, record) => <p><a onClick={() => onViewItem(record)} disabled={!PermissionUtil("supplier:view")}>{text}</a></p>,
			width: 150
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 300
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
			render: (text) => text == "normal" ? "正常" : "已删除",
			width: 150
		},
		{
			title: '联系方式',
			dataIndex: 'phone',
			key: 'phone',
			width: 300
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
			width: 400
		},
		
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
		},
		onSelect: (record, selected, selectedRows) => {
			suppliers = selectedRows;
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			suppliers = selectedRows;
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User',
		}),
	};

	//bordered 有边的；
	return (
		<div>
			<Table size="small" bordered rowSelection={rowSelection}
				columns={columns}
				title={
					() =>
						<div>
							<Button onClick={handleRemoveBatch} disabled={!PermissionUtil("supplier:edit")}> 批量删除</Button>
							<Button onClick={handleRecoverBatch} disabled={!PermissionUtil("supplier:edit")}> 批量恢复</Button>
							<Button onClick={handleCreate} disabled={!PermissionUtil("supplier:create")}> 新建</Button>
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