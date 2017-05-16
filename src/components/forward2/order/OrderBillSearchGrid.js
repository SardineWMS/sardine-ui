import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function OrderBillSearchGrid({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onSearch,
  onCreate,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onBookRegItem,
  onCheckItem,
  onFinishItem,
  onAbortItem,
  onDeleteBatch,
  onBookRegBatch,
  onCheckBatch,
  onFinishBatch,
  onAbortBatch,
  selectedRowKeys = []
}) {

	function handlerBookRegBatch(){
		onBookRegBatch(selectedRowKeys);
	};
	function handlerCheckBatch(){
		onCheckBatch(selectedRowKeys);
	};
	function handlerFinishBatch(){
		onFinishBatch(selectedRowKeys);
	};
	function handlerAbortBatch(){
		onAbortBatch(selectedRowKeys);
	};
	function handlerDeleteBatch(){
		onDeleteBatch(selectedRowKeys);
	};
	function handleCreate(e){
		e.preventDefault();
		onCreate();
	};

	function converState(text)	{
		if(text == "Initial")
			return "初始";
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

	function converDate(text){
	}; 

	const columns=
	[
		{
	        title: '单号',
	        dataIndex: 'billNumber',
	        key: 'billNumber',
	        render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
	        sorter: true,
		},
	    {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
  			render: text => ("["+text.code+"]"+text.name),
        },
     	{  
     		title: '来源单据',
            dataIndex: 'sourceBillNumber',
            key: 'sourceBillNumber'
    	},
    	{
            title: '仓位',
            dataIndex: 'wrh',
            key: 'wrh',
  			render: text => ("["+text.code+"]"+text.name)
        },
    	{
	    	title:'状态',
	    	dataIndex:'state',
	    	key:'state',
  			render: text => converState(text)
    	},
		{  
     		title: '总件数',
            dataIndex: 'totalCaseQtyStr',
            key: 'totalCaseQtyStr'
    	},
		{  
     		title: '到校日期',
            dataIndex: 'expireDate',
            key: 'expireDate',
  			render: text => converDate(text)
    	},
	 	{
	    	title:'操作',
	    	key:'operation',
	    	render:(text,record) => (
	    		<p>
	    			<a onClick={() => onEditItem(record)}> 编辑</a>
	    			 &nbsp;&nbsp;&nbsp;
    			 	<a onClick={() => onBookRegItem(record)}> 预约</a>
	    			 &nbsp;&nbsp;&nbsp;
	    			<Popconfirm titldocke="确定要预检吗？" onConfirm={() => onCheckItem(record)}>
	    				<a disabled={record.state === "normal"}>预检</a>
	    			</Popconfirm>
	    			&nbsp;&nbsp;&nbsp;
    				<Popconfirm titldocke="确定要完成吗？" onConfirm={() => onFinishItem(record)}>
	    				<a disabled={record.state === "normal"}>完成</a>
	    			</Popconfirm>
	    			&nbsp;&nbsp;&nbsp;
					<Popconfirm titldocke="确定要作废吗？" onConfirm={() => onAbortItem(record)}>
	    				<a disabled={record.state === "normal"}>作废</a>
	    			</Popconfirm>
	    			&nbsp;&nbsp;&nbsp;
	    			<Popconfirm titldocke="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
	    				<a disabled={record.state != "Initial"}>删除</a>
	    			</Popconfirm>
	    		</p>
	    	),
    	}
	]

	const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	  },
	  onSelect: (record, selected, selectedRows) => {
	 		selectedRowKeys=selectedRows;
      },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	 		selectedRowKeys=selectedRows;
	  },
	  getCheckboxProps: record => ({
	     disabled: record.name === 'Disabled User',
	  }),
	};

	return(
		<div>
			<Table size="small"  bordered rowSelection={rowSelection}
				columns={columns} 
				title={
					()=>
					<div>
						<Button onClick={handlerBookRegBatch}> 批量预约</Button>
						<Button onClick={handlerCheckBatch}> 批量预检</Button>
						<Button onClick={handlerAbortBatch}> 批量作废</Button>
						<Button onClick={handlerFinishBatch}> 批量完成</Button>
						<Button onClick={handlerDeleteBatch}> 批量删除</Button>
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

OrderBillSearchGrid
OrderBillSearchGrid.propTypes={
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
	onCreate : PropTypes.func,
	onEditItem: PropTypes.func,
	onDeleteItem:PropTypes.func,
	onBookRegItem:PropTypes.func,
	onCheckItem : PropTypes.func,
	onFinishItem : PropTypes.func,
	onAbortItem : PropTypes.func,
	onBookRegBatch : PropTypes.func,
	onCheckBatch : PropTypes.func,
	onFinishBatch : PropTypes.func,
	onAbortBatch : PropTypes.func,
	onDeleteBatch : PropTypes.func
}

export default OrderBillSearchGrid;