import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class WaveBillSearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleFinishBatch = this.handleFinishBatch.bind(this);
        this.handleAbordBatch = this.handleAbordBatch.bind(this);
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
    handleAbordBatch() {
        this.state.onAbortBatch(this.state.selectedRows);
    };


    render() {
        function convertState(text) {
            if (text == "initial")
                return '初始';
            if (text == "inProgress")
                return '启动中';
            if (text == "exception")
                return '启动异常';
            if (text == 'started')
                return '启动完成';
            if (text == 'inAlc')
                return '配货中';
            if (text == 'finished')
                return '已完成';
        };

        function convertType(text) {
            if (text == 'normal')
                return '正常波次';
            if (text == 'eCommerce')
                return '电商波次';
        };

        const columns = [{
            title: '单号',
            dataIndex: 'billNumber',
            key: 'billNumber',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }} disabled={!PermissionUtil("receiveBill:view")}>{text}</a>,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text)
        },
        {
            title: '波次类型',
            dataIndex: 'waveType',
            key: 'waveType',
            render: text => convertType(text)
        },
        {
            title: '线路体系',
            dataIndex: 'serialArch',
            key: 'serialArch',
            render: (text, record) => "[" + text.code + "]" + text.name
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
                                    <Col><Button onClick={this.state.onCreate} disabled={!PermissionUtil("waveBill:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleRemoveBatch} disabled={!PermissionUtil("waveBill:delete")}>批量删除</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default WaveBillSearchGrid;