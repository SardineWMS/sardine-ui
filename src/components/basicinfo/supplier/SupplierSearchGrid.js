import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
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
			render: (text, record) => <p><a onClick={() => onViewItem(record)} disabled={!PermissionUtil("supplier:view")}>{text}</a></p>,
			width: 50
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 100
		}, {
			title: '简称',
			dataIndex: 'simpleName',
			key: 'simpleName',
			width: 100
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
			render: (text) => text == "online" ? "正常" : "停用",
			width: 50
		},
		{
			title: '联系方式',
			dataIndex: 'phone',
			key: 'phone',
			width: 100
		}, {
			title: '联系人',
			dataIndex: 'contacter',
			key: 'contacter',
			width: 100
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
			width: 200
		}, {
			title: 'EMAIL',
			dataIndex: 'eMail',
			key: 'eMail',
			width: 100
		}, {
			title: '邮编',
			dataIndex: 'zCode',
			key: 'zCode',
			width: 80
		},{
			title: '传真',
			dataIndex: 'fax',
			key: 'fax',
			width: 80
		},{
			title: '创建信息',
			dataIndex: 'createInfo',
			key: 'createInfo',
			width: 100,
			render:(text,record)=>createInfo2String(record),
		},{
			title: '最后修改信息',
			dataIndex: 'lastModifyInfo',
			key: 'lastModifyInfo',
			width: 100,
			render:(text,record)=>lastModifyInfo2String(record),
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
							<Button type="primary" onClick={handleCreate} disabled={!PermissionUtil("supplier:create")}> 新建</Button>
							<Button onClick={handleRecoverBatch} disabled={!PermissionUtil("supplier:edit")}> 启用</Button>
							<Button onClick={handleRemoveBatch} disabled={!PermissionUtil("supplier:edit")}> 停用</Button>
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