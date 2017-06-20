import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin } from 'antd';

function AcceptanceBillSearchGrid({
  loading,
    dataSource,
    pagination,
    onPageChange,
    onSearch,
    onCreate,
    onViewAcceptanceBill,
    onDeleteBatch,
    onFinishBatch,
    onAbortBatch,
    onApproveBatch,
    onAlcBatch,
    selectedRowKeys = []
}) {

    function handlerFinishBatch() {
        onFinishBatch(selectedRowKeys);
    };
    function handlerAbortBatch() {
        onAbortBatch(selectedRowKeys);
    };
    function handlerDeleteBatch() {
        onDeleteBatch(selectedRowKeys);
    };
    function handlerApproveBatch() {
        onApproveBatch(selectedRowKeys);
    };
    function handlerAlcBatch() {
        onAlcBatch(selectedRowKeys);
    };
    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    };

    function converState(text) {
        if (text == "Initial")
            return "初始";
        if (text == "Approved")
            return "已批准";
        if (text == "InAlc")
            return "配货中";
        if (text == "Finished")
            return "已完成";
        if (text == "Aborted")
            return "已作废";
    };

    const columns =
        [
            {
                title: '单号',
                dataIndex: 'billNumber',
                key: 'billNumber',
                render: (text, record) => <a onClick={() => { onViewAcceptanceBill(record) }}>{text}</a>,
                sorter: true
            },
            {
                title: '客户',
                dataIndex: 'customer',
                key: 'customer',
                render: text => ("[" + text.code + "]" + text.name)
            },
            {
                title: '领用原因',
                dataIndex: 'acceptanceReason',
                key: 'acceptanceReason'
            },
            {
                title: '仓位',
                dataIndex: 'wrh',
                key: 'wrh',
                render: text => ("[" + text.code + "]" + text.name)
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: text => converState(text)
            },
            {
                title: '配送体系',
                dataIndex: 'deliverySystem',
                key: 'deliverySystem',
                render: text => 'tradition' ? "传统体系" : eCommerce
            },
            {
                title: '配送方式',
                dataIndex: 'deliveryType',
                key: 'deliveryType'
            }
        ];

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
            disabled: record.name === 'Disabled User',
        })
    };

    return (
        <div>
            <Table size="small" bordered rowSelection={rowSelection}
                columns={columns}
                title={
                    () =>
                        <div>
                            <Button onClick={handleCreate}> 新建</Button>
                            <Button onClick={handlerDeleteBatch}> 批量删除</Button>
                            <Button onClick={handlerApproveBatch}> 批量批准</Button>
                            <Button onClick={handlerAlcBatch}> 批量配货</Button>
                            <Button onClick={handlerAbortBatch}> 批量作废</Button>
                            <Button onClick={handlerFinishBatch}> 批量完成</Button>
                        </div>
                }
                dataSource={dataSource}
                loading={loading}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={record => record.uuid}
            />
        </div>
    );
};

AcceptanceBillSearchGrid.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onCreate: PropTypes.func,
    onViewAcceptanceBill: PropTypes.func,
    onDeleteBatch: PropTypes.func,
    onFinishBatch: PropTypes.func,
    onAbortBatch: PropTypes.func

};

export default AcceptanceBillSearchGrid;