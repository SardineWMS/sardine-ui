import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Form, message, Select, Row, Col } from 'antd';
import Guid from '../../../utils/Guid';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect.jsx';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Option = Select.Option;

function WaveBillCreateItem({
    dataSource,
    pagination,
    onPageChange,
    getArticleInfo,
    refreshMunit,
    calculateCaseQtyStr,
    onAddItem,
    onRemoveBatch,
    selectedRowKeys = []
}) {
    function convertState(text) {
        if (text == 'initial')
            return '初始';
        if (text == 'inAlc')
            return '配送中';
        if (text == 'used')
            return '已使用';
    };
    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            render: (text, record, index) => { return index + 1 }
        }, {
            title: '出库通知单单号',
            dataIndex: 'ntcBillNumber',
            key: 'ntcBillNumber',
        }, {
            title: '状态',
            dataIndex: 'alcNtcBillState',
            key: 'alcNtcBillState',
            render: (text, record) => convertState(text)
        }, {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        }
    ];

    function removeBatch() {
        onRemoveBatch(selectedRowKeys);
    }

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

    return (
        <div>
            <Table
                size="small" bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={Guid()}
                rowSelection={rowSelection}
                title={() => <div>
                    <Row type="flex">
                        <Col><Button onClick={() => onAddItem()} >添加</Button></Col>
                        <Col><Button type="ghost" onClick={() => onRemoveBatch(selectedRowKeys)}>删除</Button></Col>
                    </Row>
                </div>}
            />
        </div>
    );
};

WaveBillCreateItem.propTypes = {
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func
};

export default WaveBillCreateItem;