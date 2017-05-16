import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

class ReceiveBillGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: [],
        }
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleFinishBatch = this.handleFinishBatch.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
            selectedRowKeys: [],
            selectedRows: [],
        });
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };
    handleRemoveBatch() {
        this.state.onRemoveBatch(this.state.selectedRows);
    };
    handleFinishBatch() {
        this.state.onFinishBatch(this.state.selectedRows);
    };


    render() {
        function convertState(text) {
            if (text == "Initial")
                return '未审核';
            if (text = "Audited")
                return '已审核';
            if (text = "InProgress")
                return '进行中';
        };

        const columns = [{
            title: '单号',
            dataIndex: 'billNumber',
            key: 'billNumber',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }}>{text}</a>,
            sorter: true,
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            render: text => (text.name + "[" + text.code + "]")
        },
        {
            title: '仓位',
            dataIndex: 'wrh',
            key: 'wrh',
            render: text => (text.name + "[" + text.code + "]")
        },
        {
            title: '入库订单',
            dataIndex: 'orderBillNumber',
            key: 'orderBillNumber',
            render: (text, record) => <a onClick={() => { this.state.onViewOrderBill(record) }}>{text}</a>,
            sorter: true,
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text),
        },
        {
            title: '总件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr',
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
                    &nbsp;
                    <Popconfirm title="确定要完成吗？" onConfirm={() => this.state.onFinish(record)}>
                        <a>完成</a>
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
                                    <Col><Button onClick={this.state.onCreate}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleRemoveBatch}>删除</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleFinishBatch}>完成</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    }
}

export default ReceiveBillGrid;