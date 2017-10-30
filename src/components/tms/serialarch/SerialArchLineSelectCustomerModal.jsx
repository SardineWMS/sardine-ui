import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';
import PermissionUtil from '../../../utils/PermissionUtil';
import SerialArchLineSearchCustomer from './SerialArchLineSearchCustomer';

const SerialArchLineSelectCustomerModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave, selectedRowKeys = [], onOk, onSearch, pagination }) => {
    const columns = [
        {
            title: '客户代码',
            dataIndex: 'code',
            render: (text, record) => renderColumns(record, "binTypeCode", text)
        },
        {
            title: '客户名称',
            dataIndex: 'name',
            render: (text, record) => renderColumns(record, "binTypeName", text)
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: text => text == 'online' ? '正常' : '停用'
        }
    ];

    function renderColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCellForModal
            editable={record.editable}
            value={text}
            status={status}
            onChange={value => handleChange(record, value, key)}
            onBlur={() => { }}
        />);
    };

    function handleChange(record, value, key) {
        if ("binTypeCode" == key)
            record.code = value;
        if ("binTypeName" == key)
            record.name = value;
        if ("bearing" == key)
            record.bearing = value;
    };

    function refreshSelected() {
        onOk(selectedRowKeys);
    };

    const modalOpts = {
        title: '运输线路客户',
        visible,
        wrapClassName: 'vertical-center-modal',
        width: 800,
        onCancel,
        onOk: refreshSelected
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

        },
        onSelect: (record, selected, selectedRows) => {
            selectedRowKeys = selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            selectedRowKeys = selectedRows;
        },
        getCheckboxProps: record => ({

        })
    };

    const searchProps = {
        onSearch: onSearch
    };

    return (<Modal {...modalOpts}>
        <SerialArchLineSearchCustomer {...searchProps} />
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={pagination} rowSelection={rowSelection}></Table>
    </Modal>);
};

export default SerialArchLineSelectCustomerModal;