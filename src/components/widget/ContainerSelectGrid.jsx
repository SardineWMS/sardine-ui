import React, { PropTypes } from 'react';
import { Table, message, Row, Col, Modal, Form, Input, Select } from 'antd';
import BaseSearchPanel from './BaseSearchPanel';
import BaseTwoCol from './BaseTwoCol';
import BaseFormItem from './BaseFormItem';
import reqwest from 'reqwest';
import ContainerTypeSelect from './ContainerTypeSelect';
import {
    parse, stringify
} from 'qs';
import Guid from '../../utils/Guid';
const columns = [{
    title: '容器条码',
    dataIndex: 'barcode',
    key: 'barcode',
},
{
    title: '容器类型',
    dataIndex: 'containerType.name',
    key: 'containerType'
},
{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text => convertState(text)
}
];

function convertState(text) {
    if (text == "STACONTAINERIDLE")
        return '空闲';
    if (text == "STACONTAINERLOCK")
        return '锁定';
    if (text == 'STACONTAINERSTKINING')
        return '收货中';
    if (text == 'STACONTAINERUSEING')
        return '已使用';
    if (text == 'STACONTAINERPICKING')
        return '拣货中';
    if (text == 'STACONTAINERPUTAWAYING')
        return '上架中';
};

class ContainerSelectGrid extends React.Component {
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
            url: '/swms/basicinfo/container/querybypage',
            method: 'get',
            data:
            `${stringify(payload)}`,
            type: 'json',
        }).then((data) => {
            if (data.status == "200")
                this.setState({
                    data: data.obj.records,
                }); else
                message.error("查询容器列表失败", 2)
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
            <BaseTwoCol key={"barcode"}>
                <BaseFormItem label={"条码 类似于"}>
                    {getFieldDecorator("barcode")(
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
                            <Option value="STACONTAINERIDLE" >空闲</Option>
                            <Option value="STACONTAINERLOCK">锁定</Option>
                            <Option value="STACONTAINERSTKINING">收货中</Option>
                            <Option value="STACONTAINERUSEING">已使用</Option>
                            <Option value="STACONTAINERPICKING">拣货中</Option>
                            <Option value="STACONTAINERPUTAWAYING">上架中</Option>
                        </Select>
                    )}
                </BaseFormItem>
            </BaseTwoCol>
        );
        children.push(
            <BaseTwoCol key={"typeCode"}>
                <BaseFormItem label={"类型 等于"}>
                    {getFieldDecorator("typeCode")(
                        <ContainerTypeSelect />
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

export default Form.create()(ContainerSelectGrid);