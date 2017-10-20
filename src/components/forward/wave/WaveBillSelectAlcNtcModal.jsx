import React, { PropTypes } from 'react';
import { Table, Form, Popconfirm, Button, Modal, Select, Input, DatePicker } from 'antd';
import RowEditCellForModal from '../../Widget/RowEditCellForModal';
import styles from '../../less/EditTable.less';
import BaseSearchPanel from '../../widget/BaseSearchPanel';
import BaseTwoCol from '../../widget/BaseTwoCol';
import BaseFormItem from '../../widget/BaseFormItem';
import WrhSelect from '../../widget/WrhSelect';

const Option = Select.Option;

const WaveBillSelectAlcNtcModal = ({ dataSource, visible, onEdit, onCancel, onCancelEdit, onAdd, onDelete, onSave, selectedRowKeys = [], onOk, onSearch, form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
} }) => {
    const children = [];
    children.push(
        <BaseTwoCol key={"code"}>
            <BaseFormItem label={"客户代码 等于"} >
                {getFieldDecorator("customerCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"billNumber"}>
            <BaseFormItem label={"出库通知单单号 等于"} >
                {getFieldDecorator("billNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"sourceBillNumber"}>
            <BaseFormItem label={"出库通知单来源单号 等于"} >
                {getFieldDecorator("sourceBillNumber")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"alcDateMoreThan"}>
            <BaseFormItem label={"配货时间 大于等于"} >
                {getFieldDecorator("alcDateMoreThan")(
                    <DatePicker />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"alcDateLessThan"}>
            <BaseFormItem label={"配货时间 小于"} >
                {getFieldDecorator("alcDateLessThan")(
                    <DatePicker />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"wrh"}>
            <BaseFormItem label={"仓位 等于"} >
                {getFieldDecorator("wrh")(
                    <WrhSelect />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"articleCode"}>
            <BaseFormItem label={"商品 包含于"} >
                {getFieldDecorator("articleCode")(
                    <Input placeholder="请输入" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol key={"deliveryMode"}>
            <BaseFormItem label={"配送方式 等于"} >
                {getFieldDecorator("deliveryMode")(
                    <Select>
                        <Option value="warehouseDelivery">仓库配送</Option>
                        <Option value="sf">顺丰</Option>
                        <Option value="st">申通</Option>
                        <Option value="yt">圆通</Option>
                        <Option value="zt">中通</Option>
                        <Option value="ht">汇通</Option>
                        <Option value="yd">韵达</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    };

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    };

    function convertState(text) {
        if (text == 'initial')
            return '初始';
        if (text = "inAlc")
            return '配货中';
    };

    function convertType(text) {
        if (text == 'sf')
            return '顺丰';
        if (text == 'st')
            return '申通';
        if (text == 'yt')
            return '圆通';
        if (text == 'zt')
            return '中通';
        if (text == 'ht')
            return '汇通';
        if (text == 'yd')
            return '韵达';
        if (text == 'warehouseDelivery')
            return '仓库配送';
    }
    const columns = [
        {
            title: '出库通知单单号',
            dataIndex: 'billNumber',
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (text, record) => convertState(text)
        }, {
            title: '客户',
            dataIndex: 'customer',
            render: (text, record) => "[" + text.code + "]" + text.name
        }, {
            title: '配送方式',
            dataIndex: 'deliveryMode',
            render: (text, record) => convertType(text)
        }
    ];

    function refreshSelected() {
        onOk(selectedRowKeys);
        selectedRowKeys = [];
    };

    const modalOpts = {
        title: '出库通知单',
        visible,
        wrapClassName: 'vertical-center-modal',
        width: 800,
        onCancel,
        onOk: refreshSelected
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

        },
        onSelect: (record, selected, selectedRows) => {
            selectedRowKeys = selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            selectedRowKeys = selectedRows;
        },
        getCheckboxProps: record => ({

        })
    };

    return (<Modal {...modalOpts}>
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} rowSelection={rowSelection}></Table>
    </Modal>);
};

export default Form.create()(WaveBillSelectAlcNtcModal);