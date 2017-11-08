import styles from '../../Widget/EditTable.less';
import React, { PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm, message, Select } from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';
import Guid from '../../../utils/Guid';
const confirm = Modal.confirm;
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect';
const Option = Select.Option;

const ReturnNtcBillCreateItem = ({
	dataSource,
    pagination,
    onPageChange,
    getArticleInfo,
    refreshMunit,
    getSupplierInfo,
    onAddItem,
    calculateCaseQtyStr,
    refreshAmount,
    onRemoveItem,
    reasons
}) => {
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
        render: (text, record, index) => renderColumns(record, "articleCode", text)
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
        render: (text, record, index) => renderColumns(record, "supplierCode", text)
    });
    columns.push({
        title: '供应商名称',
        dataIndex: 'supplier.name',
        key: 'supplierName',
        width: 100
    });
    columns.push({
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: (text, record, index) => renderColumns(record, "price", text)
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
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 150
    });
    columns.push({
        title: '退仓原因',
        dataIndex: 'reason',
        key: 'reason',
        width: 150,
        render: (text, record, index) => renderSelectColumns(record, "reason", text)
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
            if (value == null)
                return;
            record.article == null ? record.article = {} : record.article;
            record.article.code = value;
            getArticleInfo(record, dataSource);
        };
        if (key === 'qpcStr') {
            record.qpcStr = value;
            refreshMunit(record, dataSource);
        };
        if (key === "supplierCode") {
            record.supplier == null ? record.supplier = {} : record.supplier;
            record.supplier.code = value;
            getSupplierInfo(record, dataSource);
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
        if (key === 'reason') {
            record.reason = value;
        }
    };

    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];

        if (key == "qpcStr") {
            if (record.article != null && record.qpcs != null) {
                for (var qpc of record.qpcs) {
                    options.push(<Option key={qpc.qpcStr}>{qpc.qpcStr}</Option>);
                };
            }
        } else if (key == "reason" && reasons) {
            reasons.map(function (reason) {
                options.push(<Option key={reason}>
                    {reason}
                </Option>)
            });
        }

        return (<RowEditCellSelect
            editable={true}
            options={options}
            onChange={value => handleChange(record, value, key)}
            value={text}
        />);
    };




    return (
        <div>
            <Table size="small" bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey={record => record.line}
            />
        </div>
    );

};

export default ReturnNtcBillCreateItem;