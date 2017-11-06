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

function AlcNtcBillCreateItem({
    dataSource,
    pagination,
    onPageChange,
    getArticleInfo,
    refreshMunit,
    calculateCaseQtyStr,
    onAddItem,
    onRemoveItem,
    refreshAmount
}) {
    const columns = [
        {
            title: '行号',
            dataIndex: 'line',
            key: 'line'
        }, {
            title: '商品代码',
            dataIndex: 'article',
            key: 'articleCode',
            render: (text, record, index) => {
                return (<RowEditCell editable={record.editable}
                    status={status}
                    onBlur={value => onCellChange(index, record, value)}
                    autoFocus={false}
                    value={record.article == null ? '' : record.article.code}
                />);
            }
        }, {
            title: '商品名称',
            dataIndex: 'article.name',
            key: 'articleName',
            render: (text, record) => record.article ? record.article.name + ", " + record.articleSpec : ''
        },
        {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            render: (text, record) => renderSelectColumns(record, 'qpcStr', text)

        }, {
            title: '单位',
            dataIndex: 'munit',
            key: 'munit'
        }, {
            title: '数量',
            dataIndex: 'qty',
            key: 'qty',
            render: (text, record) => renderColumns(record, 'qty', text)
        }, {
            title: '件数',
            dataIndex: 'caseQtyStr',
            key: 'caseQtyStr'
        }, {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) => renderPriceColumns(record, "price", text)
        }, {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount'
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (<div>
                    <span>
                        <a onClick={() => onAddItem()}>新增</a>
                        &nbsp;
                        <Popconfirm title={"确定要删除吗？"} onConfirm={() => onRemoveItem(record, dataSource)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                </div>)
            }
        }
    ];

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

    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];

        if (key == "qpcStr") {
            if (record.article != null && record.qpcs != null) {
                for (var qpc of record.qpcs) {
                    options.push(<Option key={qpc.qpcStr}>{qpc.qpcStr}</Option>)
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

        if (key === 'qpcStr') {
            record.qpcStr = value;
            refreshMunit(record, dataSource);
        };
        if (key === 'qty') {
            record.qty = value;
            if (record.qty == 0 || record.qty == '')
                return;
            calculateCaseQtyStr(record, dataSource);
        };
        if (key === 'price') {
            if (value == record.price)
                return;
            record.price = value;
            if (/^[0-9]{1,24}(.[0-9]{1,5})?$/.test(value) == false) {
                message.error("价格格式不正确，最大24位数字，支持5位小数！");
                return;
            }
            refreshAmount(record, dataSource);
        }
    };

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

    function renderPriceColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        return (<RowEditCell
            editable={true}
            status={status}
            onBlur={value => handleChange(record, value, key)}
            autoFocus={false}
            value={record.price}
        />);
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
            />
        </div>
    );
};

AlcNtcBillCreateItem.propTypes = {
    dataSource: PropTypes.array,
    pagination: PropTypes.any,
    onPageChange: PropTypes.func
};

export default AlcNtcBillCreateItem;