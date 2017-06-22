import React,{PropTypes} from 'react';
import {Table,Popconfirm,Pagination,Button} from 'antd';

function OperatorGrid({
	onSelect,
	dataSource,
	onPageChange,
  operators=[]
}) {

  function handleSelect() {
      onSelect(operators);
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
    onChange: (selectedRowKeys, selectedRows) => {
    },
    onSelect: (record, selected, selectedRows) => {
   		operators=selectedRows;
      handleSelect();
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
   		operators=selectedRows;
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

OperatorGrid.propTypes={
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	pagination: PropTypes.any,
}

export default OperatorGrid;