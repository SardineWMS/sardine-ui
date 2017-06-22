import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function TaskAreaConfigSearchGrid({
	  loading,
	  dataSource,
	  pagination,
	  onPageChange,
	  onCreate,
      onEdit,
      onRemove,
	  selectedRowKeys = []
}) {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    }
  
    const columns=
    [
        {
            title: '员工代码',
            dataIndex: 'operator',
            key: 'operatorCode',
            render: text => text==null?"": text.code,
            sorter: true
        },
        {
            title: '员工名称',
            dataIndex: 'operator',
            render: text => text==null?"": text.name,
            key: 'operatorName'
        },
        {  
            title: '作业区域',
            dataIndex: 'taskArea',
            key: 'taskArea'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <p>
                <a onClick={() => onEdit(record)} > 编辑</a>
                &nbsp;&nbsp;&nbsp;
                <Popconfirm titldocke="确定要删除吗？" onConfirm={() => onRemove(record)}>
                    <a>删除</a>
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
                        <Button onClick={handleCreate}> 新增</Button>
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

TaskAreaConfigSearchGrid.propTypes={
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any
}

export default TaskAreaConfigSearchGrid;