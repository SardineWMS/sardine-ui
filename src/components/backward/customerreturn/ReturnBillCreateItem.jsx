import styles from '../../Widget/EditTable.less';
import React, { PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm, message, Select } from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';
import Guid from '../../../utils/Guid';
const confirm = Modal.confirm;
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
const Option = Select.Option;

const ReturnBillCreateItem = ({
	dataSource,
    pagination,
    onPageChange,
    selectArticle,
    selectQpcStr,
    getSupplierInfo,
    onAddItem,
    calculateCaseQtyStr,
    refreshAmount,
    onRemoveItem,
    treeData,
    article_qpcStr,
    calculateValidDate,
    selectSupplier,
    selectedRowKeys = [],
    onModifyReturnType,
    onModifyReturnContainer,
    onModifyProductionDate,
    refreshBin
}) => {
    function handleModifyReturnType(e) {
        e.preventDefault();
        onModifyReturnType(selectedRowKeys);
    };
    function handleModifyReturnContainer(e) {
        e.preventDefault();
        onModifyReturnContainer(selectedRowKeys);
    };
    function handleModifyProductionDate(e) {
        e.preventDefault();
        onModifyProductionDate(selectedRowKeys);
    };
    const columns = [];

    columns.push({
        title: '行号',
        dataIndex: 'line',
        key: 'line',
        width: 50
    });

    columns.push({
        title: '商品代码',
        dataIndex: 'article.code',
        key: 'articleCode',
        width: 100,
        render: (text, record, index) => renderSelectColumns(record, "articleCode", text)
    });

    columns.push({
        title: '商品名称',
        dataIndex: 'article.name',
        key: 'articleName',
        width: 200
    });

    columns.push({
        title: '规格',
        dataIndex: 'qpcStr',
        key: 'qpcStr',
        width: 100,
        render: (text, record) => renderSelectColumns(record, "qpcStr", text)
    });
    columns.push({
        title: '计量单位',
        dataIndex: 'munit',
        key: 'munit',
        width: 100,
    });
    columns.push({
        title: '供应商代码',
        dataIndex: 'supplier.code',
        key: 'supplierCode',
        width: 100,
        render: (text, record, index) => renderSelectColumns(record, "supplier", text)
    });
    columns.push({
        title: '供应商名称',
        dataIndex: 'supplier.name',
        key: 'supplierName',
        width: 100
    });
    columns.push({
        title: '货位',
        dataIndex: 'binCode',
        key: 'binCode',
        width: 100,
        // render: (text, record, index) => renderColumns(record, "binCode", text)
    });
    columns.push({
        title: '容器',
        dataIndex: 'containerBarcode',
        key: 'containerBarcode',
        width: 100,
        render: (text, record, index) => renderColumns(record, "containerBarcode", text)
    });
    columns.push({
        title: '数量',
        dataIndex: 'qty',
        key: 'qty',
        width: 150,
        render: (text, record, index) => renderColumns(record, "qty", text)
    });
    columns.push({
        title: '件数',
        dataIndex: 'caseQtyStr',
        key: 'caseQtyStr',
        width: 150
    });
    columns.push({
        title: '退仓类型',
        dataIndex: 'returnType',
        key: 'returnType',
        width: 150,
        render: (text, record, index) => renderSelectColumns(record, "returnType", text)
    });
    columns.push({
        title: '生产日期',
        dataIndex: 'productionDate',
        key: 'productionDate',
        width: 150,
        render: (text, record, index) => renderDateColumns(record, "productionDate", text)
    });
    columns.push({
        title: '到效期',
        dataIndex: 'validDate',
        key: 'validDate',
        width: 150,
        // render: (text, record, index) => renderColumns(record, "validDate", text)
    });
    columns.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
            return (<div>
                <span>
                    <Popconfirm title={"确定要删除吗？"} onConfirm={() => onRemoveItem(record, dataSource)}>
                        <a>删除</a>
                    </Popconfirm>
                    &nbsp;
                        <a onClick={() => onAddItem()}>新增</a>
                </span>
            </div>)
        }
    });

    function renderDateColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCellDatePicker
            editable={record.editable}
            value={record.productionDate ? text : null}
            status={status}
            onChange={value => handleChange(record, value, key)}
        />);
    };

    function renderColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCell
            editable={true}
            value={text}
            status={status}
            onBlur={value => handleChange(record, value, key)}
            autoFocus={false}
        />);
    };

    function handleChange(record, value, key) {
        if (key === "articleCode") {
            if (record.article == null)
                record.article = new Object();
            record.article.code = value;
            selectArticle(record, dataSource);
        };
        if (key === 'qpcStr') {
            record.qpcStr = value;
            selectQpcStr(record, dataSource);
        };
        if (key === "supplier") {
            record.supplier == null ? record.supplier = {} : record.supplier;
            record.supplier.code = value;
            selectSupplier(record, dataSource);
        };
        if (key === "qty") {
            record.qty = value;
            calculateCaseQtyStr(record, dataSource);
        };
        if (key === 'price') {
            if (value == "")
                return;
            let price = Number.parseFloat(value);
            if (isNaN(price)) {
                message.warning("金额格式不正确，请正确输入数字");
                return;
            }
            record.price = price;
            refreshAmount(record, dataSource);
        };
        if (key === 'containerBarcode') {
            record.containerBarcode = value;
        };
        if (key === 'productionDate') {
            if (value == null)
                return;
            record.productionDate = value;

            calculateValidDate(record, dataSource);
        };
        if (key === 'returnType') {
            record.returnType = value;
            refreshBin(record, dataSource);
        }
    };

    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];
        if (key == "articleCode") {
            for (let data of treeData) {
                options.push(<Option key={data.value}>{data.value}</Option>);
            };
        } else if (key === "qpcStr") {
            if (record.article != null) {
                if (article_qpcStr[record.article.code] != null) {
                    for (let data of article_qpcStr[record.article.code]) {
                        options.push(<Option key={data.value}>{data.value}</Option>)
                    };
                };
            };
        } else if (key === "supplier") {
            if (record.qpcStr != null) {
                if (record.suppliers != null) {
                    for (let data of record.suppliers) {
                        options.push(
                            <Option key=
                                {data.code}>{data.code}</Option>
                        );
                    };
                };
            }
        }
        else {
            options.push(<Option key="goodReturn">好退</Option>);
            options.push(<Option key="returnToSupplier">退供应商</Option>);
        }

        return (<RowEditCellSelect
            editable={true}
            options={options}
            onChange={value => handleChange(record, value, key)}
            value={text}
        />);
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

        }),
    };

    return (
        <div>
            <Table size="small" bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey={record => record.line}
                scroll={{ x: 1800, y: 300 }}
                rowSelection={rowSelection}
                title={() => <div>
                    <Button onClick={handleModifyReturnType}>批量修改退仓类型</Button>
                    <Button onClick={handleModifyReturnContainer}>批量添加容器</Button>
                    <Button onClick={handleModifyProductionDate}>批量修改生产日期</Button>
                </div>}
            />
        </div>
    );
};

export default ReturnBillCreateItem;