import React,{PropTypes} from 'react';
import {Table,Popconfirm,Pagination,Button} from 'antd';

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
    suppliers=[]
}) {

	function handleCreate(e){
		e.preventDefault();
		onCreate();
	}

  	function handleRemoveBatch() {
        onRemoveBatch(suppliers);
    }

    function handleRecoverBatch() {
        onRecoverBatch(suppliers);
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
    	render:(text)=> text=="normal"?"正常":"已删除",
    	},
    	{
    	title:'操作',
    	key:'operation',
    	render:(text,record) => (
    		<p>
    			<Popconfirm titldocke="确定要恢复吗？" onConfirm={() => onRecoverItem(record)}>
    				<a disabled={record.state === "normal"}>恢复</a>
    			</Popconfirm>
    			&nbsp;&nbsp;&nbsp;
    			<a onClick={() => onEditItem(record)}> 编辑</a>
    			 &nbsp;&nbsp;&nbsp;
    			<Popconfirm titldocke="确定要删除吗？" onConfirm={() => onRemoveItem(record)}>
    				<a disabled={record.state === "deleted"}>删除</a>
    			</Popconfirm>
    		</p>
    	),
    	}	
	]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  },
  onSelect: (record, selected, selectedRows) => {
 		suppliers=selectedRows;
    },
  onSelectAll: (selected, selectedRows, changeRows) => {
 		suppliers=selectedRows;
   },
  getCheckboxProps: record => ({
     disabled: record.name === 'Disabled User',
  }),
};

//bordered 有边的；
	return(
		<div>
			<Table size="small"  bordered rowSelection={rowSelection}
				columns={columns} 
				title={
					()=>
					<div>			
						<Button onClick={handleRemoveBatch}> 批量删除</Button>
						<Button onClick={handleRecoverBatch}> 批量恢复</Button>	
						<Button onClick={handleCreate}> 新建</Button>
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
	onRecoverBatch: PropTypes.func,
	onRemoveBatch:PropTypes.func,
	onViewItem : PropTypes.func,
	onEditItem : PropTypes.func,
	onRemoveItem : PropTypes.func,
}

export default SupplierSerachGrid;