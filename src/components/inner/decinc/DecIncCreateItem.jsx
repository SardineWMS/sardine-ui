<<<<<<< HEAD
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
    verifyBin,
    calculateCaseQtyStr,
    onRemoveItem,
    onAddItem,
    reasons,
    currentBill
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
            dataIndex:'supplier.uuid',
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
                if (currentBill.type == 'Inc') {
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
            render: (text, record) => renderSelectColumns(record, "reason", text)
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
                    for (var supplier of record.suppliers) {
                        options.push(<Option key={supplier.uuid}>{supplier.name + "[" + supplier.code + "]"}</Option>)
                };
            };
        }else if(key == "reason" && reasons){
            reasons.map(function (reason) {
                options.push(<Option key={reason}>
                    {reason}
                </Option>)
            });
        }
        return renderRowEditCellSelect(options, text, record, key);
    };

    function renderRowEditCellSelect(options, text, record, key) {
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
            if (currentBill.type == 'Dec') {
                let currentSuppliers=[];
                let proDates=[];
                record.stocks.map(function(stock){
                    if(stock.qpcStr===value){
                        currentSuppliers.push(stock.supplier);
                        proDates.push(stock.productionDate);
                    }
                });
                record.suppliers=currentSuppliers;
                record.supplier=record.suppliers[0];
                record.proDates=proDates;
                record.productionDate=record.proDates[0];
                renderSelectColumns(record, "supplierName", record.supplier.name + "[" + record.supplier.code + "]");
                renderProDate(record,"productionDate",moment(record.productionDate).format("YYYY-MM-DD"));
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
                    if (uuid == supplier.uuid) {
                        record.supplier = new Object();
                        record.supplier.uuid = uuid;
                        record.supplier.code = supplier.code;
                        record.supplier.name = supplier.name;
                    };
            };
            if (currentBill.type == 'Dec') {
                let productionDates=[];
                record.stocks.map(function(stock){
                    if(stock.qpcStr===record.qpcStr &&
                        stock.supplier.uuid===record.supplier.uuid)
                        productionDates.push(stock.productionDate);
                });
                record.proDates=productionDates;
                record.productionDate=record.proDates[0];
                renderProDate(record,"productionDate",moment(record.productionDate).format("YYYY-MM-DD"));
            }
        };
        if (key == 'reason') {
            record.reason = value;
        };
        queryStockQty(record);
    };

    function queryStockQty(record){
        if((record.qpcStr && record.supplier && record.productionDate)==false)
            return;
        if(record.stocks && record.stocks.lenght>0){
            record.stocks.map(function(stock){
                if(stock.qpcStr===record.qpcStr
                    && stock.supplier.uuid===record.supplier.uuid
                    && stock.productionDate===record.productionDate)
                    record.stockQty=stock.qty;
                });  
        }
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
        if (currentBill.type == 'Dec') {

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
                value={moment(text).format("YYYY-MM-DD")}
            />);
        } else {
            return (<RowEditCellDatePicker
                editable={record.editable}
                value={record.productionDate ? moment(text).format("YYYY-MM-DD") : null}
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
=======
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
    verifyBin,
    calculateCaseQtyStr,
    onRemoveItem,
    onAddItem,
    reasons,
    currentBill
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
            dataIndex:'supplier.uuid',
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
                if (currentBill.type == 'Inc') {
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
            render: (text, record) => renderSelectColumns(record, "reason", text)
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
                    for (var supplier of record.suppliers) {
                        options.push(<Option key={supplier.uuid}>{supplier.name + "[" + supplier.code + "]"}</Option>)
                };
            };
        }else if(key == "reason" && reasons){
            reasons.map(function (reason) {
                options.push(<Option key={reason}>
                    {reason}
                </Option>)
            });
        }
        return renderRowEditCellSelect(options, text, record, key);
    };

    function renderRowEditCellSelect(options, text, record, key) {
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
            if (currentBill.type == 'Dec') {
                let currentSuppliers=[];
                let proDates=[];
                record.stocks.map(function(stock){
                    if(stock.qpcStr===value){
                        currentSuppliers.push(stock.supplier);
                        proDates.push(stock.productionDate);
                    }
                });
                record.suppliers=currentSuppliers;
                record.supplier=record.suppliers[0];
                record.proDates=proDates;
                record.productionDate=record.proDates[0];
                renderSelectColumns(record, "supplierName", record.supplier.name + "[" + record.supplier.code + "]");
                renderProDate(record,"productionDate",moment(record.productionDate).format("YYYY-MM-DD"));
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
                    if (uuid == supplier.uuid) {
                        record.supplier = new Object();
                        record.supplier.uuid = uuid;
                        record.supplier.code = supplier.code;
                        record.supplier.name = supplier.name;
                    };
            };
            if (currentBill.type == 'Dec') {
                let productionDates=[];
                record.stocks.map(function(stock){
                    if(stock.qpcStr===record.qpcStr &&
                        stock.supplier.uuid===record.supplier.uuid)
                        productionDates.push(stock.productionDate);
                });
                record.proDates=productionDates;
                record.productionDate=record.proDates[0];
                renderProDate(record,"productionDate",moment(record.productionDate).format("YYYY-MM-DD"));
            }
        };
        if (key == 'reason') {
            record.reason = value;
        };
        queryStockQty(record);
    };

    function queryStockQty(record){
        if((record.qpcStr && record.supplier && record.productionDate)==false)
            return;
        if(record.stocks && record.stocks.lenght>0){
            record.stocks.map(function(stock){
                if(stock.qpcStr===record.qpcStr
                    && stock.supplier.uuid===record.supplier.uuid
                    && stock.productionDate===record.productionDate)
                    record.stockQty=stock.qty;
                });  
        }
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
        if (currentBill.type == 'Dec') {

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
                value={moment(text).format("YYYY-MM-DD")}
            />);
        } else {
            return (<RowEditCellDatePicker
                editable={record.editable}
                value={record.productionDate ? moment(text).format("YYYY-MM-DD") : null}
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
>>>>>>> 27cad35b124b4bce0b331293fb077b07b9b22e13
