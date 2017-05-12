import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Button, Form, Select } from 'antd';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import RowEditCellSelect from '../../Widget/RowEditCellSelect.jsx';
import styles from '../../Widget/EditTable.less';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';


const Option = Select.Option;
const EditableCell = require('../../Widget/EditableCell');

function ReceiveBillItemGrid({
	dataSource,
    pagination,
    onPageChange,
    onCreate,
    onViewItem,
    onEditItem,
    onRemoveItem,
    onRecoverItem,
    onRemoveBatch,
    onRecoverBatch,
    onCancelEdit,
    onAddItem,
    onSave,
    calculateValidDate,
    calculateCaseQtyStr,
    treeData,
    qpcStrTreeData,
    article_qpcStr,
    selectArticle,
    selectQpcStr,
}) {

    function handleCreate(e) {
        e.preventDefault();
        onCreate();
    }

    function handleRemoveBatch() {
        onRemoveBatch(suppliers);
    }

    function handleRecoverBatch() {
        onRecoverBatch(suppliers);
    }

    function handleChange(record, value, key) {
        if (key === 'produceDate') {
            if (value == null)
                return;
            record.produceDate = value;

            calculateValidDate(record, dataSource);
        }
        if (key === 'receiveQty') {
            record.receiveQty = value;
            calculateCaseQtyStr(record, dataSource);
        }
        if (key === 'validDate')
            record.validDate = value;
        if (key === 'containerBarcode')
            record.containerBarcode = value;
        if (key == 'articleCode') {
            if (record.article == null)
                record.article = new Object();
            record.article.code = value;
            selectArticle(record, dataSource);
        }
        if (key == 'qpcStr') {
            record.qpcStr = value;
            selectQpcStr(record, dataSource);
        }

    }

    function onCellChange(index, record) {
        return (value) => {
            if (dataSource[index]["receiveQty"] == value)
                return;
            record.receiveQty = value;
            calculateCaseQtyStr(record, dataSource)
        }
    }

    const columns = [
        {
            title: '商品代码',
            dataIndex: 'article.code',
            key: 'articleCode',
            render: (text, record) => renderSelectColumns(record, "articleCode", text),
        },
        {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName',
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            render: (text, record) => renderSelectColumns(record, "qpcStr", text),
        },
        {
            title: '可收货数量',
            dataIndex: 'canReceiveQty',
            key: 'canReceiveQty',
        },
        {
            title: '可收货件数',
            dataIndex: 'canReceiveCaseQtyStr',
            key: 'canReceiveCaseQtyStr',
        },
        {
            title: '收货数量',
            dataIndex: 'receiveQty',
            key: 'receiveQty',
            render: (text, record, index) => {
                return (
                    <EditableCell value={text}
                        onChange={onCellChange(index, record)}
                        editable={true}
                    />
                )
            },
        },
        {
            title: '收货件数',
            dataIndex: 'receiveCaseQtyStr',
            key: 'receiveCaseQtyStr',
        },
        {
            title: '生产日期',
            dataIndex: 'produceDate',
            key: 'produceDate',
            render: (text, record) => renderDateColumns(record, "produceDate", text),
        },
        {
            title: '到效期',
            dataIndex: 'validDate',
            key: 'validDate',
        },
        {
            title: '容器',
            dataIndex: 'containerBarcode',
            key: 'containerBarcode',
            render: (text, record) => renderColumns(record, "containerBarcode", text),
        },
        {
            title: '货位',
            dataIndex: 'bin',
            key: 'bin',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (
                    <div className={styles.editable_row_operations}>
                        {false ? <span>
                            <a onClick={() => { onSave(record) }}>保存</a>
                            <Popconfirm title={"确定要取消编辑吗？"} onConfirm={() => onCancelEdit(record)}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                            :
                            < span >
                                <Popconfirm titldocke="确定要删除吗？" onConfirm={() => onRemoveItem(record)}>
                                    <a disabled={record.state === "deleted"}>删除</a>
                                </Popconfirm>
                                &nbsp;&nbsp;&nbsp;
                <a onClick={() => onAddItem()}>新增</a>
                            </span >
                        }

                    </div>
                )

            },
        }
    ];

    function renderColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCell
            editable={record.editable}
            value={text}
            status={status}
            onChange={value => handleChange(record, value, key)}
        />)
    }

    function renderDateColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCellDatePicker
            editable={record.editable}
            value={text}
            status={status}
            onChange={value => handleChange(record, value, key)}
        />)
    }

    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];

        if (key == "articleCode") {
            for (var data of treeData) {
                options.push(<Option key={data.value}>
                    {data.value}
                </Option>)
            }
        } else {
            if (record.article != null) {
                if (article_qpcStr[record.article.code] != null) {
                    for (var data of article_qpcStr[record.article.code]) {
                        options.push(<Option key={data.value}>{data.value}</Option>)
                    }
                }
            }
        }

        let defaultValue = "";
        if (key == "articleCode" && record.article) {
            defaultValue = record.article.code;
        }
        if (key == "qpcStr" && record.qpcStr)
            defaultValue = record.qpcStr;



        return (<RowEditCellSelect
            editable={record.editable}
            value={text}
            options={options}
            status={status}
            onChange={value => handleChange(record, value, key)}
            defaultValue={defaultValue}
        />)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        },
        onSelect: (record, selected, selectedRows) => {
            suppliers = selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            suppliers = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
        }),
    };

    return (
        <div><Table size="small" bordered
            columns={columns}
            dataSource={dataSource}
            onChange={onPageChange}
            pagination={pagination}
            rowKey={Guid()}
        />
        </div>
    )
}

ReceiveBillItemGrid.propTypes = {
    onPageChange: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    pagination: PropTypes.any,
    onCreate: PropTypes.func,
    onRecoverBatch: PropTypes.func,
    onRemoveBatch: PropTypes.func,
    onViewItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
}

export default Form.create()(ReceiveBillItemGrid);