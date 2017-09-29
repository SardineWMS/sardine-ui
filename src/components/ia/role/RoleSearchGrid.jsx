import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';

class RoleGrid extends React.Component {
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
        this.handleCreate = this.handleCreate.bind(this);
        // this.handleOnlineOrOffline = this.handleOnlineOrOffline.bind(this, record);
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
        this.state.onBatchRemove(this.state.selectedRows);
    };
    handleOnlineBatch() {
        this.state.onBatchOnline(this.state.selectedRows);
    };
    handleOfflineBatch() {
        this.state.onBatchOffline(this.state.selectedRows);
    };
    handleCreate(e) {
        e.preventDefault();
        this.state.onCreate();
    };
    handleOnlineOrOffline(record, e) {
        record.state === '启用' ? this.state.onOffline(record) : this.state.onOnline(record);
    };
    handleView(record, e) {
        e.preventDefault();
        this.state.onViewItem(record);
    };
    render() {
        const columns = [{
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => {
                return <div>
                        <a onClick={this.handleView.bind(this, record)}>{text}</a>
                </div>
            },
            sorter: true
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text, record) => renderNameColumns(record, 'name', text)
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state'
        },
        {
            title: '角色说明',
            dataIndex: 'remark',
            key: 'remark',
            render: (text, record) => renderNameColumns(record, 'remark', text)
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (<div className={styles.editable_row_operations}>
                    {record.editable ?
                        <span>
                            <a onClick={() => this.state.onSave(record)} disabled={!PermissionUtil("role:edit")}>保存</a>
                            <Popconfirm title={"确定要取消编辑吗？"} onConfirm={() => this.state.onCancelEdit(record)}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                        :
                        <span>
                            <a onClick={() => { this.state.onEdit(record) }} disabled={(record.state === "停用") || !PermissionUtil("role:edit")}>编辑</a>
                            <Popconfirm title={`确定要${record.state === '启用' ? '停用' : '启用'}吗？`} onConfirm={this.handleOnlineOrOffline.bind(this, record)}>
                                <a disabled={record.state === '启用' ? !PermissionUtil("role:offline") : !PermissionUtil("role:online")}>{record.state === '启用' ? '停用' : '启用'}</a>
                            </Popconfirm>
                            <a onClick={() => { this.state.onAssign(record) }} disabled={(record.state === "停用") || !PermissionUtil("role:edit")}>分配权限</a>
                        </span>
                    }
                </div>
                )
            }
        }
        ];

        function renderCodeColumns(record, key, text) {

            if (!record.editable) {
                return (<a onClick={this.handleView.bind(this, record)}>{text}</a>);
            };

            return (<RowEditCell
                editable={record.editable}
                value={text}
                status={status}
                onChange={value => handleChange(record, value, key)}
            />);
        };

        function renderNameColumns(record, key, text) {
            if (!record.editable)
                return text;

            return (<RowEditCell
                editable={record.editable}
                value={text}
                status={status}
                onChange={value => handleChange(record, value, key)}
            />);
        };

        function handleChange(record, value, key) {
            if ("remark" == key)
                record.remark = value;
            if ("name" == key)
                record.name = value;
        };

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
                                    <Col><Button onClick={this.handleCreate}>新建</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleOfflineBatch}>停用</Button></Col>
                                    <Col><Button type="ghost" onClick={this.handleOnlineBatch}>启用</Button></Col>
                                    <Col><span style={{ marginLeft: 8 }}>{hasSelected ? `已选中${selectedRowKeys.length}条` : ''}</span></Col>
                                </Row>
                            </div>

                    }
                />
            </div>
        );
    };
};

export default RoleGrid;