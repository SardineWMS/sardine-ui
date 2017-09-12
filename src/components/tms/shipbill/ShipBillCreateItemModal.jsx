import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin, Modal, Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../widget/BaseSearchPanel';
import BaseTwoCol from '../../widget/BaseTwoCol';
import BaseFormItem from '../../widget/BaseFormItem';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import Guid from '../../../utils/Guid';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const columns = [{
    title: '商品',
    dataIndex: 'article',
    key: 'article',
    render: text => "[" + text.code + "] " + text.name
},
{
    title: '客户',
    dataIndex: 'customer',
    key: 'customer',
    render: text => "[" + text.code + "] " + text.name
},
{
    title: '规格',
    dataIndex: 'qpcStr',
    key: 'qpcStr'
},
{
    title: '计量单位',
    dataIndex: 'munit',
    key: 'munit'
},
{
    title: '数量',
    dataIndex: 'qty',
    key: 'qty'
},
{
    title: '件数',
    dataIndex: 'caseQtyStr',
    key: 'caseQtyStr'
},
{
    title: '配单/领用单',
    dataIndex: 'sourceBill',
    key: 'sourceBill',
    render: text => "[" + text.billType + "] " + text.billNumber
},
{
    title: '货位',
    dataIndex: 'binCode',
    key: 'binCode'
},
{
    title: '容器',
    dataIndex: 'containerBarcode',
    key: 'containerBarcode'
},
{
    title: '生产日期',
    dataIndex: 'productionDate',
    key: 'productionDate',
    render: text => moment(text).format("YYYY-MM-DD")
},
{
    title: '到效期',
    dataIndex: 'validDate',
    key: 'validDate',
    render: text => moment(text).format("YYYY-MM-DD")
},
];

function convertState(text) {
    if (text == "normal")
        return '正常';
    if (text == "deleted")
        return '已删除';
};

class ShipBillCreateItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            data: [],
            pagination: {},
            loading: false,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.refreshSelected = this.refreshSelected.bind(this);

    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
        });
    };

    handleSearch(e) {
        e.preventDefault();
        const payload = this.state.form.getFieldsValue();
        reqwest({
            url: '/swms/tms/shipbill/querywaitshipstocks',
            method: 'get',
            data:
            `${stringify(payload)}`,
            type: 'json',
        }).then((data) => {
            if (data.status == "200" && data.obj.records.length > 0)
                this.setState({
                    data: data.obj.records,
                })
        })
    };

    handleCancel() {
        this.setState({
            data: [],
            pagination: {},
            loading: false,
            selectedRowKeys: [],
            selectedRows: []
        });
        this.state.onCancel();
    }

    handleReset(e) {
        e.preventDefault();
        this.state.form.resetFields();
    };

    refreshSelected() {
        this.setState({
            data: [],
            pagination: {},
            loading: false,
            selectedRowKeys: [],
            selectedRows: []
        })
        this.state.onOk(this.state.selectedRows);
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        children.push(
            <BaseTwoCol key={"articleCode"}>
                <BaseFormItem label={"商品代码 类似于"}>
                    {getFieldDecorator("articleCode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"binCode"}>
                <BaseFormItem label={"货位代码 类似于"}>
                    {getFieldDecorator("binCode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"containerBarcode"}>
                <BaseFormItem label={"容器条码 类似于"}>
                    {getFieldDecorator("containerBarcode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"customerCode"}>
                <BaseFormItem label={"客户代码 类似于"}>
                    {getFieldDecorator("customerCode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"supplierCode"}>
                <BaseFormItem label={"供应商代码 类似于"}>
                    {getFieldDecorator("supplierCode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.handleCancel} width={1000} onOk={this.refreshSelected}>
                    <BaseSearchPanel children={children} handleReset={this.handleReset} handleSearch={this.handleSearch} />
                    <Table
                        size="small"
                        columns={columns}
                        dataSource={this.state.data}
                        rowKey={record => record.uuid}
                        bordered
                        rowSelection={rowSelection}
                    />
                </Modal>
            </div>
        )
    }
};

export default Form.create()(ShipBillCreateItemModal);