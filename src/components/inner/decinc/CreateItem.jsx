import styles from '../../Widget/EditTable.less';
import React, { PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';
import { Modal } from 'antd';
import commonStyles from '../../less/common.less';

const confirm = Modal.confirm;
import RowEditCell from '../../Widget/RowEditCell';
import RowEditCellSelect from '../../Widget/RowEditCellSelect';

const DecIncCreateItem = ({
	dataSource,
    pagination,
    onPageChange,
    getArticleInfo,
    qpcStrs
}) => {
    const columns = [];

    columns.push({
        title: '行号',
        dataIndex: 'line',
        key: 'line',
        width: 50
    });

    columns.push({
        title: '货位',
        dataIndex: 'bincode',
        key: 'bincode',
        width: 100,
        render: (text, record, index) => renderColumns(index, "bincode", text)
    });

    columns.push({
        title: '容器',
        dataIndex: 'container',
        key: 'container',
        width: 100,
        render: (text, record, index) => renderColumns(index, "container", text)
    });

    columns.push({
        title: '商品代码',
        dataIndex: 'article.code',
        key: 'articleCode',
        width: 100
        /*render: (text, record, index) => {
            return (<RowEditCell editable={record.editable}
                value={text}
                status={status}
                onBlur={value => onCellChange(index, record, value)}
                autoFocus={false}
            />)
        }*/
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
        title: '生产日期',
        dataIndex: 'produceDate',
        key: 'produceDate',
        width: 150
    });

    columns.push({
        title: '库存数量',
        dataIndex: 'stockQty',
        key: 'stockQty',
        width: 150
    });



    columns.push({
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: 100
    });

    columns.push({
        title: '损溢数量',
        dataIndex: 'qty',
        key: 'qty',
        width: 150
    });

    columns.push({
        title: '损溢件数',
        dataIndex: 'caseQtyStr',
        key: 'caseQtyStr',
        width: 150
    });



    columns.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
            return (<div>
                <span>
                    <Popconfirm title={"确定要删除吗？"} onConfirm={() => onRemoveItem(record)}>
                        <a>删除</a>
                    </Popconfirm>
                    &nbsp;
                        <a>编辑</a>
                    &nbsp;
                        <a>新增</a>
                </span>
            </div>)
        }
    });



    function renderColumns(index, key, text) {
        // if (typeof record.editable === undefined)
        //     return text;

        return (<RowEditCell
            editable={true}
            value={text}
            status={status}
            onBlur={value => handleChange(index, value, key)}
            autoFocus={key == "bincode" ? true : false}
        />);
    };

    function handleChange(index, value, key) {
        if (key === "articleCode") {
            if (value == null)
                return;
            record.article.code = value;
            getArticleInfo(record, dataSource);
        };
        if (key === 'qpcStr') {
            record.qpcStr = value;
        };
    };

    function renderSelectColumns(record, key, text) {
        if (typeof record.editable === undefined)
            return text;

        const options = [];

        if (record.article != null && qpcStrs != null) {
            for (var qpcStr of qpcStrs) {
                options.push(<Option key={qpcStr}>{qpcStr}</Option>);
            };
        };

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

            />
        </div>
    );

};

export default DecIncCreateItem;