import React, { PropTypes } from 'react';
import {Form,Row, Col, Input, Collapse, Button } from 'antd';
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';


const BinTypeSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
}) => {
    function handleSearch(e) {
        e.preventDefault();
        onSearch(getFieldsValue());
    }

    function handleReset(e) {
        e.preventDefault();
        resetFields();
    }

    const children = [];
    children.push(<BaseTwoCol>
        <BaseFormItem label="代码 类似于">
            {getFieldDecorator("code")(
                <Input placeholder="请输入" key="codeInput" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    children.push(<BaseTwoCol>
        <BaseFormItem label="名称 类似于">
            {getFieldDecorator('name')(
                <Input placeholder="请输入" key="nameInput" />
            )}
        </BaseFormItem>
    </BaseTwoCol>);
    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

export default Form.create()(BinTypeSearchForm);