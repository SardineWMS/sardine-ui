import React,{PropTypes} from 'react';
import { Table, Popconfirm, Button } from 'antd';

function CategorySearch({
	dataSource,
	onCreate,
	onCreateLower,
	onEditItem,
	onDeleteItem,
  onPageChange,
}) {

	function handleCreate(e) {
		e.preventDefault();
		onCreate();
	}

	const columns = [{
    	title: '代码',
    	dataIndex: 'code',
    	key: 'categoryCode'
  	}, {
    	title: '名称',
    	dataIndex: 'name',
    	key: 'categoryName'
  	}, {
    	title: '备注',
    	dataIndex: 'remark',
    	key: 'remark',
  	}, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onCreateLower(record)}> 新增下级 </a>
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }
  ]

  return (
    <div>
      <Table size="small"
        bordered
        columns={columns}
        pagination = {false}
        title={() => 
        	<div>
            <Button onClick={handleCreate}>新建根目录</Button>
        	</div>
        }
        dataSource={dataSource}
        onChange={onPageChange}
        rowKey={record => record.uuid}
      />
    </div>
  )
}

CategorySearch.propTypes = {
	dataSource: PropTypes.array,
	onCreate : PropTypes.func,
	onEditItem : PropTypes.func,
	onDeleteItem : PropTypes.func,
  onPageChange: PropTypes.func,
  onCreateLower : PropTypes.func,
}

export default CategorySearch;

