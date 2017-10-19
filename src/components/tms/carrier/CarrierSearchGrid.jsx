import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class Carrier extends React.Component {
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
            if (text == "online")
                return '正常';
            if (text == "offline")
                return '停用';
        };
        
        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => convertState(text)
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: '联系电话',
            dataIndex: 'contactPhone',
            key: 'contactPhone'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <a onClick={() => this.state.onEdit(record)}>编辑</a>
            )
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
                                    <Col><Button type="primary" onClick={this.state.onCreate} disabled={!PermissionUtil("carrier:create")}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleOnlineBatch} disabled={!PermissionUtil("carrier:edit")}>启用</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleOfflineBatch} disabled={!PermissionUtil("carrier:edit")}>禁用 </Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default Carrier;