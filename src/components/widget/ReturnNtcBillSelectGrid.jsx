import React, { PropTypes } from 'react';
import { Table, Row, Col, Modal, Form, Input, Select, message } from 'antd';
import BaseSearchPanel from './BaseSearchPanel';
import BaseTwoCol from './BaseTwoCol';
import BaseFormItem from './BaseFormItem';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import Guid from '../../utils/Guid';
const columns = [{
    title: '单号',
    dataIndex: 'billNumber',
    key: 'billNumber',
},
{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text)
},
{
    title: '客户',
    dataIndex: 'customer',
    key: 'customer',
    render: text => "[" + text.code + "]" + text.name
},
{
    title: '仓位',
    dataIndex: 'wrh',
    key: 'wrh',
    render: text => "[" + text.code + "]" + text.name
},
];

function convertState(text) {
    if (text == "initial")
        return '初始';
    if (text == "inProgress")
        return '进行中';
};

class ReturnNtcBillSelectGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            data: [],
            pagination: {},
            loading: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
        });
    };

    handleSearch(e) {
        e.preventDefault();
        const payload = this.state.form.getFieldsValue();
        payload.token = localStorage.getItem("token");
        payload.pageSize = 0;
        if (payload.state == null)
            reqwest({
                url: '/swms/rtn/ntc/queryBillWithInitialAndInProgress',
                method: 'get',
                data:
                `${stringify(payload)}`,
                type: 'json',
            }).then((data) => {
                if (data.status == "200")
                    this.setState({
                        data: data.obj.records,
                    });
                else message.error("查询退仓通知单失败", 2);
            });
        else
            reqwest({
                url: '/swms/rtn/ntc/query',
                method: 'get',
                data:
                `${stringify(payload)}`,
                type: 'json',
            }).then((data) => {
                if (data.status == "200")
                    this.setState({
                        data: data.obj.records,
                    })
                else message.error("查询退仓通知单失败", 2);
            });
    };

    handleCancel() {
        this.setState({
            data: [],
            pagination: {},
            loading: false
        });
        this.state.onCancel();
    }

    handleReset(e) {
        e.preventDefault();
        this.state.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        children.push(
            <BaseTwoCol key={"billNumber"}>
                <BaseFormItem label={"单号 等于"}>
                    {getFieldDecorator("billNumber")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"state"}>
                <BaseFormItem label={"状态 等于"}>
                    {getFieldDecorator("state")(
                        <Select placeholder="请选择" showSearch={false} size="default">
                            <Option value="initial" >初始</Option>
                            <Option value="inProgress">进行中</Option>
                        </Select>
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"code"}>
                <BaseFormItem label={"客户代码 等于"}>
                    {getFieldDecorator("code")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.handleCancel} title={"退仓通知单"} width={800}>
                    <BaseSearchPanel children={children} handleReset={this.handleReset} handleSearch={this.handleSearch} />
                    <Table
                        size="small"
                        columns={columns}
                        dataSource={this.state.data}
                        rowKey={record => record.uuid}
                        bordered
                        onRowClick={(record, index) => this.state.onSelect(record)}
                    />
                </Modal>
            </div>
        )
    }
};

export default Form.create()(ReturnNtcBillSelectGrid);