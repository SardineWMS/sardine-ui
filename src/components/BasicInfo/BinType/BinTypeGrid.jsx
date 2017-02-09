import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card } from 'antd';

const BinTypeGrid = ({
    loading,
    dataSource,
    pagination,
    onCreate,
    onPageChange,
    onEditItem,
    onDelete,

}) => {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    }
    const columns = [{
        title: '代码',
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        //后台排序暂时没有name字段
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    }, {
        title: '长/宽/高(cm)',
        dataIndex: 'lwh',
        key: 'lwh',
        render: (text, record) => (record.length + "/" + record.width + "/" + record.height)
    }, {
        title: '容积率(%)',
        dataIndex: 'plotRatio',
        key: 'plotRatio',
    }, {
        title: '承重',
        dataIndex: 'bearing',
        key: 'bearing',
    }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
            <p>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record)}>
                    <a>删除</a>
                </Popconfirm>
                &nbsp;
                <a onClick={() => onEditItem(record)}>编辑</a>
            </p>
        )
    }];

    return (
        <Card>
            <Table
                size="small"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.id}
                pagination={pagination}
                bordered
                onChange={onPageChange}
                title={() => <div>
                    <Row type="flex">
                        <Col><Button onClick={handleCreate}>新建</Button></Col>
                    </Row>
                </div>}
            ></Table>
        </Card>
    );
}
export default BinTypeGrid;