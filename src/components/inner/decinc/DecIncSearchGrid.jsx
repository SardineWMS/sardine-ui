import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';


function DecIncInvSearchGrid({
	dataSource,
    pagination,
    onPageChange,
    onCreate,
    onViewItem,
    onEdit
}) {
    const columns = [{
        title: '单号',
        dataIndex: 'billNumber',
        key: 'billNumber',
        sorter: true,
        render: (text, record) => <a onClick={() => {
            onViewItem(record)
        }} disabled={!PermissionUtil("decIncBill:view")}>{text}</a>
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: text => (text == "initial" ? '未审核' : '已审核')
    }, {
        title: '仓位',
        dataIndex: 'wrh',
        key: 'wrh',
        render: text => text.name + "[" + text.code + "]"
    }, {
        title: '创建人',
        dataIndex: 'create',
        key: 'create',
        render: () => { }
    }, {
        title: '最后修改人',
        dataIndex: 'lastModify',
        key: 'lastModify'
    }, {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => (
            <p>
                <a onClick={() => onEdit(record)}>审核</a>
                <a onClick={() => onEdit(record)}>编辑</a>
                <a onClick={() => onEdit(record)}>删除</a>
            </p>
        )
    }];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

        },
        onSelect: (record, selected, selectedRows) => {

        },
        onSelectAll: (selected, selectedRows, changeRows) => {

        },
        getCheckboxProps: record => ({

        })
    };

    return (
        <div>
            <Table size="small"
                bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={record => record.uuid}
                rowSelection={rowSelection}
                title={() => <div>
                    <Row type="flex">
                        <Col><Button onClick={() => { }}>批量删除</Button></Col>
                        <Col><Button onClick={() => { }}>批量审核</Button></Col>
                        <Col><Button onClick={() => onCreate()}>新建</Button></Col>
                    </Row>
                </div>}
            />
        </div>
    );
};

DecIncInvSearchGrid.propTypes = {
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func
};

export default DecIncInvSearchGrid;

