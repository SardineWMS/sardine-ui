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
    title: '车牌号',
    dataIndex: 'vehicleNo',
    key: 'vehicleNo'
},
{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text)
},
{
    title: '承运商',
    dataIndex: 'carrier',
    key: 'carrier',
    render: text => "[" + text.code + "] " + text.name
}
];

function convertState(text) {
    if (text == "free")
        return '空闲';
    if (text == "unUse")
        return '待排车';
    if (text == "used")
        return '已排车';
    if (text == "shiping")
        return '装车中';
    if (text == "shiped")
        return '已装车';
    if (text == "inAlc")
        return '配送中';
    if (text == "offline")
        return '已停用';
};

class VehicleSelectGrid extends React.Component {
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
            url: '/swms/tms/vehicle/query',
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
            <BaseTwoCol key={"code"}>
                <BaseFormItem label={"代码 类似于"}>
                    {getFieldDecorator("code")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"vehicleNo"}>
                <BaseFormItem label={"车牌号 等于"}>
                    {getFieldDecorator("vehicleNo")(
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
                            <Option value="free" >空闲</Option>
                            <Option value="unUse">待排车</Option>
                            <Option value="used">已排车</Option>
                            <Option value="shiping">装车中</Option>
                            <Option value="shiped">已装车</Option>
                            <Option value="inAlc">配送中</Option>
                            <Option value="offline">已停用</Option>
                        </Select>
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"carrierCode"}>
                <BaseFormItem label={"承运商代码 等于"}>
                    {getFieldDecorator("carrierCode")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );

        return (
            <div>
                <Modal visible={this.state.visible} onCancel={this.handleCancel} width={800}>
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

export default Form.create()(VehicleSelectGrid);