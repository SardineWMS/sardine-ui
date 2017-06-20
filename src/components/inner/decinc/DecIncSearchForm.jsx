import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Card, Collapse, Select } from 'antd';
const Option = Select.Option;
import BaseSearchPanel from '../../Widget/BaseSearchPanel';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import BaseFormItem from '../../Widget/BaseFormItem';

const DecIncInvSearchForm = ({
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

    const children = [];
    children.push(
        <BaseTwoCol>
            <BaseFormItem label="单号 类似于">
                {getFieldDecorator('billNumber')(
                    <Input type="text" placeholder="单号 类似于" />
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol>
            <BaseFormItem label="单据类型 等于">
                {getFieldDecorator('type')(
                    <Select size="default">
                        <Option value="Dec">损耗</Option>
                        <Option value="Inc">溢余</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );
    children.push(
        <BaseTwoCol>
            <BaseFormItem label="状态 等于">
                {getFieldDecorator('state')(
                    <Select size="default">
                        <Option value="Initial">未审核</Option>
                        <Option value="Audited">已审核</Option>
                    </Select>
                )}
            </BaseFormItem>
        </BaseTwoCol>
    );

    return (
        <BaseSearchPanel children={children} handleReset={handleReset} handleSearch={handleSearch} />
    );
};

DecIncInvSearchForm.propTypes = {
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    field: PropTypes.string,
    keyword: PropTypes.string
};

export default Form.create()(DecIncInvSearchForm);