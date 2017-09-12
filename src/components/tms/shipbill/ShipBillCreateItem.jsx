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

function ShipBillCreateItem({
    dataSource,
    pagination,
    onPageChange,
    calculateCaseQtyStr,
    onAddItem,
    onRemoveBatch,
    selectedRowKeys = []
}) {

    function onCellChange(index, record) {
        return (value) => {
            if (dataSource[index]["qty"] == value)
                return;
            record.qty = value;
            calculateCaseQtyStr(record, dataSource)
        };
    };
    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            render: (text, record, index) => index + 1

        }, {
            title: '商品',
            dataIndex: 'article',
            key: 'article',
            render: (text, record) => "[" + text.code + "] " + text.name
        }, {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => "[" + text.code + "] " + text.name
        }, {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr'
        }, {
            title: '计量单位',
            dataIndex: 'munit',
            key: 'munit',
        }, {
            title: '数量',
            dataIndex: 'qty',
            key: 'qty',
            render: (text, record, index) => {
                return (<RowEditCell
                    editable={true}
                    value={text}
                    status={status}
                    onBlur={onCellChange(index, record)}
                />)
            }
        }, {
            title: '件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr',
        }, {
            title: '配单/领用单',
            dataIndex: 'sourceBill',
            key: 'sourceBill',
            render: text => "[" + text.billType + "] " + text.billNumber
        }, {
            title: '货位',
            dataIndex: 'binCode',
            key: 'binCode',
        }, {
            title: '容器',
            dataIndex: 'containerBarcode',
            key: 'containerBarcode'
        }, {
            title: '生产日期',
            dataIndex: 'productionDate',
            key: 'productionDate',
            render: text => moment(text).format("YYYY-MM-DD")
        }, {
            title: '到效期',
            dataIndex: 'validDate',
            key: 'validDate',
            render: text => moment(text).format("YYYY-MM-DD")
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

ShipBillCreateItem.propTypes = {
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func
};

export default ShipBillCreateItem;