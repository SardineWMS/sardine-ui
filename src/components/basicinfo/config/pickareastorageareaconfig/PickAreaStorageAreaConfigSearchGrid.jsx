import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function PickAreaStorageAreaConfigSearchGrid({
	  loading,
	  dataSource,
	  pagination,
	  onPageChange,
	  onSetPickAreaStorageArea,
	  selectedRowKeys = []
}) {

    function handlerSetPickAreaStorageArea(){
        onSetPickAreaStorageArea(selectedRowKeys);
    };

    const columns=
    [
        {
            title: '代码',
            dataIndex: 'pickArea',
            key: 'pickAreaCode',
            render: text => text==null?"": text.code,
            sorter: true
        },
        {
            title: '名称',
            dataIndex: 'pickArea',
            key: 'pickAreaName',
            render: text => text==null?"": text.name,
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
                        <Button onClick={handlerSetPickAreaStorageArea}> 设置存储区域</Button>
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

PickAreaStorageAreaConfigSearchGrid.propTypes={
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any
}

export default PickAreaStorageAreaConfigSearchGrid;