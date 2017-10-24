import React, { PropTypes } from 'react';
import { Table, message, Row, Col, Modal, Form, Input, Select } from 'antd';
import BaseSearchPanel from '../../widget/BaseSearchPanel';
import BaseTwoCol from '../../widget/BaseTwoCol';
import BaseFormItem from '../../widget/BaseFormItem';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
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
        return '启用';
    if (text == "offline")
        return '停用';
};

class DriverSelectGrid extends React.Component {
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
        payload.token = 'token'
        payload.pageSize = 0;
        payload.roleName = '司机';
        reqwest({
            url: '/swms/ia/user/querybypage',
            method: 'get',
            data:
            `${stringify(payload)}`,
            type: 'json',
        }).then((data) => {
            if (data.status == "200")
                this.setState({
                    data: data.obj.records,
                }); else
                message.error("查询用户列表失败", 2)
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
                            <Option value="online" >启用</Option>
                            <Option value="offline">停用</Option>
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

export default Form.create()(DriverSelectGrid);