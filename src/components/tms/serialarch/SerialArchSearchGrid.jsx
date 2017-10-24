import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin, Menu, Dropdown, Icon } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
const Item = Menu.Item;

class SerialArchSearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
        this.handleStickBatch = this.handleStickBatch.bind(this);
        this.handlePostponeBatch = this.handlePostponeBatch.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
    handleStickBatch() {
        this.state.onStickBatch(this.state.selectedRows);
    };
    handlePostponeBatch() {
        this.state.onPostponeBatch(this.state.selectedRows);
    };
    handleClick({ key }) {
        if (key == 1)
            this.state.onCreateSerialArch();
        else if (key == 2)
            this.state.onCreateLine();
        else if (key == 3)
            this.state.onAddCustomer();
    };


    render() {

        const columns = [{
            title: '序号',
            dataIndex: 'order',
            key: 'order'
        },
        {
            title: '客户代码',
            dataIndex: 'customer',
            key: 'customerCode',
            render: text => text.code
        },
        {
            title: '客户名称',
            dataIndex: 'customer',
            key: 'customerName',
            render: text => text.name
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => <div>
                <a onClick={() => this.state.onUp(record)}><Icon type="caret-up" style={{ fontSize: 16, color: '#08c' }} /></a>
                <a onClick={() => this.state.onDown(record)}><Icon type="caret-down" style={{ fontSize: 16, color: '#08c' }} /></a>
            </div>
        }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;

        const createMenu = (
            <Menu onClick={this.handleClick}>
                {/* <Menu.Item key="1">新增线路体系</Menu.Item> */}
                <Menu.Item key="2">新增线路</Menu.Item>
                <Menu.Item key="3">添加门店</Menu.Item>
            </Menu>
        );
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
                                    <Col><Dropdown overlay={createMenu}><Button type="ghost" style={{ marginLeft: 8 }}>新增<Icon type="down" /></Button>
                                    </Dropdown></Col>
                                    <Col><Button onClick={this.handleStickBatch} disabled={!PermissionUtil("vehicle:edit")}>置顶</Button></Col>
                                    <Col><Button onClick={this.handlePostponeBatch} disabled={!PermissionUtil("vehicle:edit")}>置后</Button></Col>
                                    <Col><Button type="primary" onClick={this.handleRemoveBatch} disabled={!PermissionUtil("carrier:edit")}>踢出线路</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default SerialArchSearchGrid;