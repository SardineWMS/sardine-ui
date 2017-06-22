import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Collapse, Button, Select } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

const RoleSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) => {
    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    };

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    };
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
    };
    const children = [];
    children.push(<BaseTwoCol key="code">
        <BaseFormItem {...formItemLayout} label="代码 类似于">
            {getFieldDecorator("code")(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    children.push(<BaseTwoCol key="name">
        <BaseFormItem {...formItemLayout} label="名称 类似于">
            {getFieldDecorator('name')(
                <Input placeholder="请输入" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    children.push(<BaseTwoCol key="state">
        <BaseFormItem {...formItemLayout} label="状态 等于">
            {getFieldDecorator("state", { initialValue: "" })(
                <Select placeholder="请选择" showSearch={false} size="large">
                    <Option value="">全部</Option>
                    <Option value="online" >启用</Option>
                    <Option value="offline">停用</Option>
                </Select>
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(RoleSearchForm);