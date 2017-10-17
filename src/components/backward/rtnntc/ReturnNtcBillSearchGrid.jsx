import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class ReturnNtcBillSearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleFinishBatch = this.handleFinishBatch.bind(this);
        this.handleAbortBatch = this.handleAbortBatch.bind(this);
        this.handleGenRtnBillBatch = this.handleGenRtnBillBatch.bind(this);
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
    handleAbortBatch() {
        this.state.onAbortBatch(this.state.selectedRows);
    };
    handleGenRtnBillBatch() {
        this.state.onGenRtnBillBatch(this.state.selectedRows);
    }


    render() {
        function convertState(text) {
            if (text == "initial")
                return '初始';
            if (text == "inProgress")
                return '进行中';
            if (text == "aborted")
                return '已作废';
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
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '仓位',
            dataIndex: 'wrh',
            key: 'wrh',
            render: (text, record) => "[" + text.code + "]" + text.name
        },
        {
            title: '来源单据',
            dataIndex: 'sourceBill',
            key: 'sourceBill',
            render: (text, record) => record.sourceBillNumber == null ? "" : record.sourceBillType + "[" + record.sourceBillNumber + "]"
        },
        {
            title: '退货日期',
            dataIndex: 'returnDate',
            key: 'returnDate',
            render: (text, record) => moment(text).format("YYYY-MM-DD")
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
                                    <Col><Button onClick={this.state.onCreate} disabled={!PermissionUtil("rtnNtcBill:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleAbortBatch} disabled={!PermissionUtil("rtnNtcBill:edit")}>作废</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleFinishBatch} disabled={!PermissionUtil("rtnNtcBill:edit")}>完成</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleGenRtnBillBatch} disabled={!PermissionUtil("rtnNtcBill:edit")}>生成退仓单</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default ReturnNtcBillSearchGrid;