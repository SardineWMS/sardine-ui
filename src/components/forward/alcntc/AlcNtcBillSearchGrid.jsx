import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class AlcNtcBillSearchGrid extends React.Component {
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
            if (text == "aborted")
                return '已作废';
            if (text == "inAlc")
                return '待配送';
            if (text == 'inSorting')
                return '分拣中';
            if (text == 'finished')
                return '已完成';
            if (text == 'inProgress')
                return '配送中';
            if (text == 'handover')
                return '已交接';
            if (text == "used")
                return '已使用';
        };

        function convertMode(text) {
            if (text == 'sf')
                return '顺丰';
            if (text == 'st')
                return '申通';
            if (text == 'yt')
                return '圆通';
            if (text == 'zt')
                return '中通';
            if (text == 'ht')
                return '汇通';
            if (text == 'yd')
                return '韵达';
            if (text == 'warehouseDelivery')
                return '仓库配送';

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
            title: '作业号',
            dataIndex: 'taskBillNumber',
            key: 'taskBillNumber'
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: text => (text.name + "[" + text.code + "]")
        },
        {
            title: '来源单据',
            dataIndex: 'sourceBillNumber',
            key: 'sourceBillNumber',
            render: (text, record) => record.sourceBillNumber == null ? "" : record.sourceBillType + "[" + record.sourceBillNumber + "]"
        },
        {
            title: '仓位',
            dataIndex: 'wrh',
            key: 'wrh',
            render: (text) => text.name + '[' + text.code + ']'
        },
        {
            title: '总件数',
            dataIndex: 'totalCaseQtyStr',
            key: 'totalCaseQtyStr',
        },
        {
            title: '配送方式',
            dataIndex: 'deliveryMode',
            key: 'deliveryMode',
            render: text => convertMode(text)
        },
        {
            title: '配送原因',
            dataIndex: 'deliveryReason',
            key: 'deliveryReason'
        },
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
                                    <Col><Button onClick={this.state.onCreate} disabled={!PermissionUtil("alcNtcBill:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleAbordBatch} disabled={!PermissionUtil("alcNtcBill:edit")}>作废</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default AlcNtcBillSearchGrid;