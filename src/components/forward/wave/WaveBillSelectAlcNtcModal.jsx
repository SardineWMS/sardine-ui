import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';

const WaveBillSelectAlcNtcModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave, selectedRowKeys = [], onOk }) => {
    function convertState(text) {
        if (text == 'initial')
            return '初始';
        if (text = "inAlc")
            return '配货中';
    };
    const columns = [
        {
            title: '配货通知单单号',
            dataIndex: 'billNumber',
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (text, record) => convertState(text)
        }, {
            title: '客户',
            dataIndex: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        }
    ];

    function refreshSelected() {
        onOk(selectedRowKeys);
        selectedRowKeys = [];
    };

    const modalOpts = {
        title: '配货通知单',
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

    return (<Modal {...modalOpts}>
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} rowSelection={rowSelection}></Table>
    </Modal>);
};

export default WaveBillSelectAlcNtcModal;