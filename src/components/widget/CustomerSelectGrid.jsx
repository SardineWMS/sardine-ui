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
    if (text == "normal")
        return '正常';
    if (text == "deleted")
        return '已删除';
};

class CustomerSelectGrid extends React.Component {
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

    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
        });
    };

    // componentDidMount() {
    //     this.handleSearch();
    // };

    handleSearch(e) {
        e.preventDefault();
        // this.state.onSearch(this.state.form.getFieldsValue());
        const payload = this.state.form.getFieldsValue();
        payload.token = localStorage.getItem("token");
        reqwest({
            url: '/swms/basicinfo/customer/query',
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
            selectedRowKeys: [],
            selectedRows: []
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
                            <Option value="normal" >正常</Option>
                            <Option value="deleted">已删除</Option>
                        </Select>
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
                <Modal visible={this.state.visible} onCancel={this.handleCancel}>
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

export default Form.create()(CustomerSelectGrid);