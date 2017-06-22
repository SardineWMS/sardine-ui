import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function CategoryStorageAreaConfigSearchGrid({
	  loading,
	  dataSource,
	  pagination,
	  onPageChange,
	  onSetCategoryStorageArea,
	  selectedRowKeys = []
}) {

    function handlerSetCategoryStorageArea(){
        onSetCategoryStorageArea(selectedRowKeys);
    };

    const columns=
    [
        {
            title: '商品类别代码',
            dataIndex: 'category',
            key: 'categoryCode',
            render: text => text.code,
            sorter: true
        },
        {
            title: '商品类别名称',
            dataIndex: 'category',
            key: 'categoryName',
            render: text => text.name,
        },
        {  
            title: '存储区域',
            dataIndex: 'storageArea',
            key: 'storageArea'
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
                        <Button onClick={handlerSetCategoryStorageArea}> 设置存储区域</Button>
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

CategoryStorageAreaConfigSearchGrid.propTypes={
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any
}

export default CategoryStorageAreaConfigSearchGrid;