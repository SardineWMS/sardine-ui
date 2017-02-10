import React,{PropTypes} from 'react';
import {Table,Popconfirm,Pagination,Button,Modal} from 'antd';

function ContainerTypeSerachGrid({
	loading,
	dataSource,
	pagination,
	onPageChange,
	onCreate,
	onViewItem,
	onEditItem,
	onDeleteItem
}) {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
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
    	title:'内长/内宽/内高(cm)',
    	dataIndex:'inInfo',
    	key:'inInfo',
        render:(text,record) => (
            record.inLength+"/"+record.inWidth+"/"+record.inHeight
          ),
        },
    	{
    	title:'外长/外宽/外高(cm)',
    	dataIndex:'outInfo',
    	key:'outInfo',
        render:(text,record) => (
            record.outLength+"/"+record.outWidth+"/"+record.outHeight
          ),    	
        },
    	{
    	title:'容积率(%)',
    	dataIndex:'rate',
    	key:'rate',
    	},
    	{
    	title:'自重(kg)',
    	dataIndex:'weight',
    	key:'weight',
    	},
    	{
    	title:'承重(kg)',
    	dataIndex:'bearingWeight',
    	key:'bearingWeight',
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


//bordered 有边的；
	return(
		<div>
			<Table size="small" bordered
				columns={columns} 
				title={
					()=>
				    <div>
                        <Button type="primary" onClick={handleCreate}>新建</Button>              
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

ContainerTypeSerachGrid.propTypes={
onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
	onCreate : PropTypes.func,
	onViewItem : PropTypes.func,
	onEditItem : PropTypes.func,
	onDeleteItem : PropTypes.func,
}

export default ContainerTypeSerachGrid;