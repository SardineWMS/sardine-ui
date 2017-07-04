import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class VehicleSearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleOnlineBatch = this.handleOnlineBatch.bind(this);
        this.handleOfflineBatch = this.handleOfflineBatch.bind(this);
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
    handleOnlineBatch() {
        this.state.onOnlineBatch(this.state.selectedRows);
    };
    handleOfflineBatch() {
        this.state.onOfflineBatch(this.state.selectedRows);
    };


    render() {
        function convertState(text) {
            if (text == "free")
                return '空闲';
            if (text == "unUse")
                return '待排车';
            if (text == "used")
                return '已排车';
            if (text == "shiping")
                return '装车中';
            if (text == "shiped")
                return '已装车';
            if (text == "inAlc")
                return '配送中';
            if (text == "offline")
                return '已停用';
        };


        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }}>{text}</a>,
            sorter: true
        },
        {
            title: '车牌号',
            dataIndex: 'vehicleNo',
            key: 'vehicleNo'
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text)
        },
        {
            title: '车型',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            render: text => text.name + "[" + text.code + "]"
        },
        {
            title: '承运商',
            dataIndex: 'carrier',
            key: 'carrier',
            render: text => text.name + "[" + text.code + "]"
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
                                    <Col><Button onClick={() => this.state.onCreate()} disabled={!PermissionUtil("vehicle:create")}>新建</Button></Col>
                                    <Col><Button onClick={this.handleOnlineBatch} disabled={!PermissionUtil("vehicle:edit")}>批量启用</Button></Col>
                                    <Col><Button onClick={this.handleOfflineBatch} disabled={!PermissionUtil("vehicle:edit")}>批量禁用 </Button></Col>
                                    <Col><Button type="primary" onClick={() => this.state.onCreateVehicleType()} disabled={!PermissionUtil("carrier:edit")}>新建车型</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default VehicleSearchGrid;