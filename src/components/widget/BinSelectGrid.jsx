import React, { PropTypes } from 'react';
import { Table, message, Row, Col, Modal, Form, Input, Select } from 'antd';
import BaseSearchPanel from './BaseSearchPanel';
import BaseTwoCol from './BaseTwoCol';
import BaseFormItem from './BaseFormItem';
import reqwest from 'reqwest';
import {
    parse, stringify
} from 'qs';
import Guid from '../../utils/Guid';



function convertUsage(text) {
    if (text == "StorageBin")
        return '存储位';
    if (text == "PickUpStorageBin")
        return '拣货存储位';
    if (text == "ReceiveStorageBin")
        return '收货暂存位';
    if (text == 'CollectBin')
        return '集货位';
    if (text == 'SupplierCollectBin')
        return '供应商集货位';
    if (text == 'SupplierStorageBin')
        return '供应商退货位';
    if (text == 'RtnReceiveTempBin')
        return '退仓收货暂存位';
};

function convertState(text) {
    if (text == "free")
        return '空闲';
    if (text == "using")
        return '已使用';
    if (text == "closeLock")
        return '异常锁定';
}

const columns = [{
    title: '货位代码',
    dataIndex: 'code',
    key: 'code',
},
{
    title: '货位用途',
    dataIndex: 'usage',
    key: 'usage',
    render: text => convertUsage(text)
},
{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text)
}];


class BinSelectGrid extends React.Component {
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
        reqwest({
            url: '/swms/basicinfo/bin/queryByPage',
            method: 'get',
            data:
            `${stringify(payload)}`,
            type: 'json',
        }).then((data) => {
            if (data.status == "200")
                this.setState({
                    data: data.obj.records,
                }); else
                message.error("查询货位列表失败", 2)
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
                <BaseFormItem label={"条码 类似于"}>
                    {getFieldDecorator("code")(
                        <Input placeholder="请输入" />
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"state"}>
                <BaseFormItem label={"状态 等于"}>
                    {getFieldDecorator("state", { initialValue: '' })(
                        <Select placeholder="请选择" showSearch={false} size="default">
                            <Option value=''> 全部</Option>
                            <Option value="free">空闲</Option>
                            <Option value="using" initialValue>已使用</Option>
                            <Option value="closeLock">异常锁定</Option>
                        </Select>
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"usage"}>
                <BaseFormItem label={"用途 等于"}>
                    {getFieldDecorator("usage", { initialValue: '' })(
                        <Select placeholder="请选择" showSearch={false} size="default">
                            <Option value=''>全部</Option>
                            <Option value="ReceiveStorageBin">收货暂存位</Option>
                            <Option value="PickUpStorageBin">拣货存储位</Option>
                            <Option value="StorageBin">存储位</Option>
                            <Option value="CollectBin">集货位</Option>
                            <Option value="RtnReceiveTempBin">退仓收货暂存位</Option>
                            <Option value="SupplierStorageBin">供应商退货位</Option>
                            <Option value="SupplierCollectBin">供应商集货位</Option>
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

export default Form.create()(BinSelectGrid);