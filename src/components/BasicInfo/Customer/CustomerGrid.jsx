import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card } from 'antd';

const CustomerGrid = ({
    loading,
    dataSource,
    onSearch,
    onCreate,
    pagination,
    onPageChange,
    onViewItem,
}) => {

    const columns = [{
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        render: (text, record) => <a onClick={() => { onViewItem(record) } }>{text}</a>,
        sorter: (a, b) => a.code - b.code,
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => { },
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
                <a onClick={() => { } }>编辑</a>
                &nbsp;
                <Popconfirm title="确定要删除吗？">
                    <a>删除</a>
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
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log('...测试行选择器onselectall');
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

    return (
        <Card>
            <Table
                size="small"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.id}
                onChange={onPageChange}
                pagination={pagination}
                bordered
                rowSelection={rowSelection}
                title={
                    () =>
                        <div>
                            <Row type="flex">
                                <Col><Button type="ghost" >批量删除</Button></Col>
                                <Col><Button type="ghost">批量恢复</Button></Col>
                                <Col><Button onClick={() => onCreate()}>新建</Button></Col>
                            </Row>
                        </div>

                }
                />
        </Card>
    );
}

CustomerGrid.propTypes = {
    onPageChange: PropTypes.func,
}

export default CustomerGrid;