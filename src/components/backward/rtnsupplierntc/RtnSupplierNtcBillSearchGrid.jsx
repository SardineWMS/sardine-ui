import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class RtnSupplierNtcBillSearchGrid extends React.Component {
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
        this.handleGenUnshelveTaskBatch = this.handleGenUnshelveTaskBatch.bind(this);
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
    handleGenUnshelveTaskBatch() {
        this.state.onGenUnshelveTaskBatch(this.state.selectedRows);
    }


    render() {
        function convertState(text) {
            if (text == "Initial")
                return '未审核';
            if (text == "InProgress")
                return '进行中';
            if (text == "Aborted")
                return '已作废';
            if (text == 'Finished')
                return '已完成';
        };

        const columns = [{
            title: '单号',
            dataIndex: 'billNumber',
            key: 'billNumber',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }} disabled={!PermissionUtil("rtnsupplierntcbill:view")}>{text}</a>,
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text)
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
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
                                    <Col><Button onClick={this.state.onCreate} disabled={!PermissionUtil("rtnsupplierntcbill:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleRemoveBatch} disabled={!PermissionUtil("rtnsupplierntcbill:delete")}>批量删除</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleAbortBatch} disabled={!PermissionUtil("rtnsupplierntcbill:edit")}>批量作废</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleGenUnshelveTaskBatch} disabled={!PermissionUtil("rtnsupplierntcbill:edit")}>批量生成下架指令</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleFinishBatch} disabled={!PermissionUtil("rtnsupplierntcbill:edit")}>批量完成</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default RtnSupplierNtcBillSearchGrid;