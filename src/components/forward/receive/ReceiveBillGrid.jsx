import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class ReceiveBillGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleFinishBatch = this.handleFinishBatch.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
            selectedRowKeys: [],
            selectedRows: []
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
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }} disabled={!PermissionUtil("receiveBill:view")}>{text}</a>,
            sorter: true
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
            render: (text, record) => <a onClick={() => { this.state.onViewOrderBill(record) }} disabled={!PermissionUtil("orderBill:view")}>{text}</a>,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text)
        },
        {
            title: '总件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr'
        }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
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
                                    <Col><Button onClick={this.state.onCreate} disabled={!PermissionUtil("receiveBill:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleRemoveBatch} disabled={!PermissionUtil("receiveBill:delete")}>删除</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleFinishBatch} disabled={!PermissionUtil("receiveBill:finish")}>完成</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default ReceiveBillGrid;