import React, { PropTypes } from 'react';
import { Table, Collapse } from 'antd';
import BaseCard from '../../widget/BaseCard';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const ContainerStockInfo = ({
    dataSource,
    onViewArticle
 }) => {
    const columns = [{
        title: '商品代码',
        dataIndex: 'article.code',
        key: 'articleCode',
        render: (text, record) => <a onClick={() => { onViewArticle(record) }}>{text}</a>
    }, {
        title: '商品名称',
        dataIndex: 'article.name',
        key: 'articleName'
    }, {
        title: '包装规格',
        dataIndex: 'qpcStr',
        key: 'qpcStr'
    }, {
        title: '供应商',
        dataIndex: 'supplier',
        key: 'supplier',
        render: (text, record) => record.supplier ? record.supplier.name + "[" + record.supplier.code + "]" : ''
    }, {
        title: '货位',
        dataIndex: 'binCode',
        key: 'binCode'
    }, {
        title: '生产日期',
        dataIndex: 'productionDate',
        key: 'productionDate',
        render: (text) => moment(text).format("YYYY-MM-DD")
    }, {
        title: '到效日期',
        dataIndex: 'validDate',
        key: 'validDate',
        render: (text) => moment(text).format("YYYY-MM-DD")
    }, {
        title: '批次',
        dataIndex: 'stockBatch',
        key: 'stockBatch'
    }, {
        title: '数量',
        dataIndex: 'qty',
        key: 'qty'
    }, {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
    }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record) => Number.parseFloat(record.qty) * Number.parseFloat(record.price)
    }];

    return (
        <div>
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel header="容器库存信息" key="1">
                    <Table size="small" bordered columns={columns} dataSource={dataSource} />
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

export default ContainerStockInfo;