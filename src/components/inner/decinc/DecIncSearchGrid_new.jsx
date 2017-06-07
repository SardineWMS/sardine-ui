import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import { createInfo2StringWithoutTime, lastModifyInfo2StringWithoutTime } from '../../../utils/OperatorInfoUtils';


class DecIncInvSearchGrid extends React.Component {
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
        const columns = [{
            title: '单号',
            dataIndex: 'billNumber',
            key: 'billNumber',
            sorter: true,
            render: (text, record) => <a onClick={() => {
                this.state.onViewItem(record)
            }} disabled={!PermissionUtil("decIncBill:view")}>{text}</a>
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: text => text == 'Inc' ? '溢余' : '损耗'
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: text => (text == "Initial" ? '未审核' : '已审核'),
        }, {
            title: '仓位',
            dataIndex: 'wrh',
            key: 'wrh',
            render: text => text.name + "[" + text.code + "]"
        }, {
            title: '创建人',
            dataIndex: 'createInfo',
            key: 'createInfo',
            render: (text, record) => createInfo2StringWithoutTime(record),
        }, {
            title: '最后修改人',
            dataIndex: 'lastModifyInfo',
            key: 'lastModifyInfo',
            render: (text, record) => lastModifyInfo2StringWithoutTime(record),
        }]

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <Table size="small"
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    onChange={this.state.onPageChange}
                    pagination={this.state.pagination}
                    rowKey={record => record.uuid}
                    rowSelection={rowSelection}
                    title={() => <div>
                        <Row type="flex">
                            <Col>
                                <Button onClick={this.handleRemoveBatch}>批量删除</Button>
                            </Col>
                            <Col><Button onClick={this.handleFinishBatch}>批量审核</Button></Col>
                            <Col><Button onClick={() => this.state.onCreate()}>新建</Button></Col>
                        </Row>
                    </div>}
                />
            </div>
        )
    }

}

export default DecIncInvSearchGrid;

