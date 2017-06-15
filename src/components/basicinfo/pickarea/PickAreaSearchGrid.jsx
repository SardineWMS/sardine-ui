import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class PickAreaSearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: [],
        }
        this.handleRemoveBatch = this.handleRemoveBatch.bind(this);
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


    render() {

        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => <a onClick={() => { this.state.onViewItem(record) }}>{text}</a>
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '货位范围',
            dataIndex: 'binScope',
            key: 'binScope',
        },
        {
            title: '存储区域',
            dataIndex: 'storageArea',
            key: 'storageArea',
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
                                    <Col><Button onClick={() => this.state.onCreate()} disabled={!PermissionUtil("pickArea:create")}>新建</Button></Col>
                                    <Col><Button onClick={this.handleRemoveBatch} disabled={!PermissionUtil("pickArea:delete")}>删除</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    }
}

export default PickAreaSearchGrid;