import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Button, Row, Col, Card, Spin, Modal, Form, Input, Select } from 'antd';
import BaseSearchPanel from './BaseSearchPanel';
import BaseTwoCol from './BaseTwoCol';
import BaseFormItem from './BaseFormItem';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import Guid from '../../utils/Guid';
const columns = [{
    title: '代码',
    dataIndex: 'code',
    key: 'code',
},
{
    title: '名称',
    dataIndex: 'name',
    key: 'name'
},
{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text)
}
];

function convertState(text) {
    if (text == "online")
        return '已启用';
    if (text == "offline")
        return '已停用';
};

class CarrierSelectGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            data: [],
            pagination: {},
            loading: false,
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
        reqwest({
            url: '/swms/tms/carrier/query',
            method: 'get',
            data:
            `${stringify(payload)}`,
            type: 'json',
        }).then((data) => {
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
        });
        this.state.onCancel();
    }

    handleReset(e) {
        e.preventDefault();
        this.state.form.resetFields();
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
        this.state.onSelect(selectedRows);
        this.setState({ selectedRowKeys: [], selectedRows: [] });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        children.push(
            <BaseTwoCol key={"code"}>
                <BaseFormItem label={"代码 类似于"}>
                    {getFieldDecorator("code")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"name"}>
                <BaseFormItem label={"名称 等于"}>
                    {getFieldDecorator("name")(
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
                            <Option value="online" >已启用</Option>
                            <Option value="offline">已停用</Option>
                        </Select>
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );

        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.handleCancel}>
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

export default Form.create()(CarrierSelectGrid);