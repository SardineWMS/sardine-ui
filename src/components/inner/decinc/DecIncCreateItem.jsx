import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Form, message, Select } from 'antd';
import Guid from '../../../utils/Guid';
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect.jsx';
import RowEditCellDatePicker from '../../Widget/RowEditCellDatePicker';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const Option = Select.Option;

function DecIncCreateItem({
    dataSource,
    pagination,
    onPageChange,
    getArticleInfo,
    qpcStrs,
    verifyBin,
    decIncType,//损溢单类型
    proDates,//损耗单时，选择生产日期的数据源 
    queryStockQty,
    calculateCaseQtyStr,
    onRemoveItem,
    onAddItem,
    billType,
    suppliers,//商品供应商选择控件数据源
    refreshSupplier,
    currentItem,
    getSupplier
}) {
    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            width: 50
        }, {
            title: '货位',
            dataIndex: 'binCode',
            key: 'binCode',
            width: 100,
            render: (text, record) => renderColumns(record, "binCode", text)
        }, {
            title: '容器',
            dataIndex: 'containerBarCode',
            key: 'containerBarCode',
            width: 100,
            render: (text, record) => renderColumns(record, "containerBarCode", text)
        }, {
            title: '商品代码',
            dataIndex: 'article.code',
            key: 'articleCode',
            width: 100,
            render: (text, record, index) => {
                return (<RowEditCell editable={record.editable}
                    status={status}
                    onBlur={value => onCellChange(index, record, value)}
                    autoFocus={false}
                    value={text}
                />)
            }
        }, {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName',
            width: 200
        }, {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            width: 100,
            render: (text, record) => renderSelectColumns(record, "qpcStr", text)
        }, {
            title: '供应商',
            dataIndex: 'supplier.uuid',
            key: 'supplierName',
            width: 100,
            render: (text, record) => renderSelectColumns(record, "supplierName", text)
        }, {
            title: '生产日期',
            dataIndex: 'productionDate',
            key: 'productionDate',
            width: 150,
            render: (text, record) => renderProDate(record, "productionDate", text)
        }, {
            title: '库存数量',
            dataIndex: 'stockQty',
            key: 'stockQty',
            width: 150
        }, {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (text, record, index) => {
                if (currentItem.type == 'Inc') {
                    return (<RowEditCell editable={record.editable}
                        status={status}
                        onBlur={value => handleChange(record, value, "price")}
                        autoFocus={false}
                        value={text}
                    />)
                }
                else return text;
            }
        }, {
            title: '损溢数量',
            dataIndex: 'qty',
            key: 'qty',
            width: 150,
            render: (text, record) => renderColumns(record, "qty", text)
        }, {
            title: '损溢件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr',
            width: 150
        }, {
            title: '损溢原因',
            dataIndex: 'reason',
            key: 'reason',
            width: 150,
            render: (text, record) => renderColumns(record, "reason", text)
        }, {
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
        }
    ];

    function renderColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCell
            editable={true}
            status={status}
            onBlur={value => handleChange(record, value, key)}
            autoFocus={false}
            value={record.article ? text : null}
        />);
    };


    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];

        if (key == "qpcStr") {
            if (record.article != null && record.qpcStrs != null) {
                for (var qpcStr of record.qpcStrs) {
                    options.push(<Option key={qpcStr}>{qpcStr}</Option>)
                };
            };

        }
        else if (key == "supplierName") {
            if (record.qpcStrs != null && record.suppliers != null) {
                if (currentItem.type == "Inc") {
                    for (var supplier of record.suppliers) {
                        options.push(<Option key={supplier.supplierUuid}>{supplier.supplierName + "[" + supplier.supplierCode + "]"}</Option>)
                    };
                } else {
                    for (var supplier of record.suppliers) {
                        options.push(<Option key={supplier.uuid}>{supplier.name + "[" + supplier.code + "]"}</Option>)
                    };
                };
            };
        };
        return (<RowEditCellSelect
            editable={true}
            options={options}
            onChange={value => handleChange(record, value, key)}
            value={text}
        />);
    };

    function handleChange(record, value, key) {
        if (key === "articleCode") {
            if (value == null)
                return;
            record.article.code = value;
            getArticleInfo(record, dataSource);
        };
        if (key === 'qpcStr') {
            record.qpcStr = value;
            if (currentItem.type == 'Dec') {
                getSupplier(record, dataSource);
            };
        };
        if (key == 'binCode') {
            record.binCode = value;
        };
        if (key == 'containerBarCode') {
            record.containerBarCode = value;
        };
        if (key == 'productionDate') {
            record.productionDate = value;
        };
        if (key == 'qty') {
            record.qty = value;
            calculateCaseQtyStr(record, dataSource);
        };
        if (key == 'price') {
            record.price = value;
        };
        if (key == 'supplierName') {
            const uuid = value;
            for (var supplier of record.suppliers) {
                if (currentItem.type == 'Dec') {
                    if (uuid == supplier.uuid) {
                        record.supplier = new Object();
                        record.supplier.uuid = uuid;
                        record.supplier.code = supplier.code;
                        record.supplier.name = supplier.name;
                    };
                }
                else {
                    if (uuid == supplier.supplierUuid) {
                        record.supplier = new Object();
                        record.supplier.uuid = uuid;
                        record.supplier.code = supplier.supplierCode;
                        record.supplier.name = supplier.supplierName;
                    };
                };
            };
            // refreshSupplier(record, dataSource);
            queryStockQty(record, dataSource);

        };
        if (key == 'reason') {
            record.reason = value;
        };
    };

    function onCellChange(index, record, value) {
        if (!value) {
            message.warn("请输入商品代码！", 2, '');
            return;
        };
        if (dataSource[index]["article.code"] == value)
            return;
        record.article = new Object();
        record.article.code = value;
        getArticleInfo(record, dataSource);

    };

    function renderProDate(record, key, text) {
        if (typeof record.editable === undefined)
            return text;
        if (billType == 'Dec') {

            const options = [];

            if (record.article != null && record.proDates != null) {
                for (var proDate of record.proDates) {
                    options.push(<Option key={moment(proDate).format("YYYY-MM-DD")}>{moment(proDate).format("YYYY-MM-DD")}</Option>)
                };
            };

            return (<RowEditCellSelect
                editable={true}
                options={options}
                onChange={value => handleChange(record, value, key)}
                value={text}
            />);
        } else {
            return (<RowEditCellDatePicker
                editable={record.editable}
                value={record.productionDate ? text : null}
                status={status}
                onChange={value => handleChange(record, value, key)}
            />);
        };
    };

    return (
        <div>
            <Table size="small" bordered
                columns={columns}
                dataSource={dataSource}
                onChange={onPageChange}
                pagination={pagination}
                rowKey={Guid()}
                scroll={{ x: 1700, y: 300 }}
            />
        </div>
    );
};

DecIncCreateItem.propTypes = {
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func
};

export default DecIncCreateItem;
