import React,{PropTypes} from 'react';
import {Table,Popconfirm,Pagination,Button} from 'antd';

function UserGrid({
	onSelect,
	dataSource,
	onPageChange,
  users=[]
}) {

  function handleSelect() {
      onSelect(users);
  }

	const columns=[
		{
			title:'代码',
			dataIndex:'code',
			key:'code',
    	},
    	{
	    	title:'名称',
	    	dataIndex:'name',
	    	key:'name',
    	}  
	]

  const rowSelection = {
    type: 'radio',
    onChange: (selectedRowKeys, selectedRows) => {
    },
    onSelect: (record, selected, selectedRows) => {
   		users=selectedRows;
      handleSelect();
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
   		users=selectedRows;
     },
    getCheckboxProps: record => ({
       disabled: record.name === 'Disabled User',
    }),
  };

	return(
	    <div>
            <Table
                size="small"
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={dataSource}
                onChange={onPageChange}
                rowKey={record => record.uuid}
                filterMultiple={false}
            />
        </div>
	)
}

UserGrid.propTypes={
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
}

export default UserGrid;