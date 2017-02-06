import React,{PropTypes} from 'react';
import {Table,Popconfirm,Pagination,Button} from 'antd';

function SupplierSerachGrid({
	loading,
	dataSource,
	pagination,
	onPageChange,
	onCreate,
	onDelete,
	onViewItem,
	onEditItem,
	onDeleteItem
}) {

	let selectlist=[];

	function handleCreate(e){
		e.preventDefault();
		onCreate();
	}

	function handlerDelete(e){
		e.preventDefault();
		onDelete(selectlist);
	}

	const columns=[
		{
		title:'代码',
		dataIndex:'code',
		key:'code',
        render: (text, record) => <p><a onClick={() => onViewItem(record)}>{text}</a></p>,
    	},
    	{
    	title:'姓名',
    	dataIndex:'name',
    	key:'name',
    	},
    	{
    	title:'状态',
    	dataIndex:'state',
    	key:'state',
    	render:(text)=> text=="online"?"启用":"停用",
    	},
    	{
    	title:'操作',
    	key:'operation',
    	render:(text,record) => (
    		<p>
    			<a onClick={() => onEditItem(record)}> 编辑</a>
    			 &nbsp;&nbsp;&nbsp;
    			<Popconfirm titldocke="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
    				<a>删除</a>
    			</Popconfirm>
    		</p>
    	),
    	}	
	]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectlist=selectedRows;
  },
  onSelect: (record, selected, selectedRows) => {
    //console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    //console.log(selected, selectedRows, changeRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};

//bordered 有边的；
	return(
		<div>
			<Table size="small" bordered rowSelection={rowSelection}
				columns={columns} 
				title={
					()=>
					<div>				
						<Button onClick={handleCreate}> 新建</Button>
						<Button onClick={handlerDelete}> 批量删除</Button>
						<Button onClick={handleCreate}> 批量恢复</Button>
					</div>
				}
				dataSource={dataSource}
				loading={loading}
				onChange={onPageChange}
				pagination={pagination}
				rowKey={record => record.uuid}
			/>
		</div>
	)
}

SupplierSerachGrid.propTypes={
onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
	onCreate : PropTypes.func,
	onDelete: PropTypes.func,
	onViewItem : PropTypes.func,
	onEditItem : PropTypes.func,
	onDeleteItem : PropTypes.func,
}

export default SupplierSerachGrid;