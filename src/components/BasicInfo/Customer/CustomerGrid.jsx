import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card } from 'antd';
import style from './CustomerGrid.less';

function CustomerGrid({
    loading,
    dataSource,
    onSearch,
    onCreate,
    pagination,
    onPageChange,
    onViewItem,
    onEdit,
    onDelete,
    onRecover,
    onRemoveBatch,
    onRecoverBatch,
    customers = []
}) {

    const columns = [{
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        render: (text, record) => <a onClick={() => { onViewItem(record) }}>{text}</a>,
        sorter: true,
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
            <p>
                <a onClick={() => { onEdit(record) }}>编辑</a>
                &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record)} >
                    <a disabled={record.state === "已删除"}>删除</a>
                </Popconfirm>
                <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(record)}>
                    <a disabled={record.state === "正常"}>恢复</a>
                </Popconfirm>
            </p>
        )
    }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('...测试行选择器onchange');

        },
        onSelect: (record, selected, selectedRows) => {
            console.log('...测试行选择器onselect');
            if (customers.length === 0) {
                customers = selectedRows;
            } else {
                selected = false;
                selectedRows = null;
            }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('...测试行选择器onselectall');
            console.log(customers.length);
            if (customers.length === 0) {
                console.log('customers 的长度');
                customers = selectedRows;
            } else {
                selected = false;
            }
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
        }),
    };

    function handleRemoveBatch() {
        onRemoveBatch(customers);
    }

    function handleRecoverBatch() {
        onRecoverBatch(customers);
    }

    return (
        <div>
            <Table className={style.table}
                size="small"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.uuid}
                onChange={onPageChange}
                pagination={pagination}
                bordered
                rowSelection={rowSelection}
                title={
                    () =>
                        <div>
                            <Row type="flex">
                                <Col><Button type="ghost" onClick={handleRemoveBatch}>批量删除</Button></Col>
                                <Col><Button type="ghost" onClick={handleRecoverBatch}>批量恢复</Button></Col>
                                <Col><Button onClick={() => onCreate()}>新建</Button></Col>
                            </Row>
                        </div>

                }
            />
        </div>
    );
}

CustomerGrid.propTypes = {
    onPageChange: PropTypes.func,
}

export default CustomerGrid;