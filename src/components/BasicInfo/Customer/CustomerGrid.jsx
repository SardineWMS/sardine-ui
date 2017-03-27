import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

class CustomerGrid extends React.Component {
    constructor(props) {
        console.log("初始化");
        console.dir(props);
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
        }
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleRecoverBatch = this.handleRecoverBatch.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
            selectedRowKeys: [],
        });
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    handleRemoveBatch() {
        this.state.onRemoveBatch(this.state.selectedRowKeys);
        // this.setState({ selectedRowKeys: [] });
    };
    handleRecoverBatch() {
        this.state.onRecoverBatch(this.state.selectedRowKeys);
    };

    render() {
        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }}>{text}</a>,
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
                    <a onClick={() => { this.state.onEdit(record) }}>编辑</a>
                    &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={() => this.state.onDelete(record)} >
                        <a disabled={record.state === "已删除"}>删除</a>
                    </Popconfirm>
                    <Popconfirm title="确定要恢复吗？" onConfirm={() => this.state.onRecover(record)}>
                        <a disabled={record.state === "正常"}>恢复</a>
                    </Popconfirm>
                </p>
            )
        }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Table
                    size="small"
                    columns={columns}
                    dataSource={this.state.dataSource}
                    rowKey={record => record.uuid}
                    onChange={this.state.onPageChange}
                    pagination={this.state.pagination}
                    bordered
                    rowSelection={rowSelection}
                    title={
                        () =>
                            <div>
                                <Row type="flex">
                                    <Col><Button type="ghost" onClick={this.handleRemoveBatch}>批量删除</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleRecoverBatch}>批量恢复</Button></Col>
                                    <Col><Button onClick={this.state.onCreate}>新建</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    }
}

export default CustomerGrid;