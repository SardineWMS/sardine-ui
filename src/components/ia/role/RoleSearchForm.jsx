import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Collapse, Button, Select } from 'antd';

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
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    const children = [];
    children.push(<Col span={12} key={1}>
        <FormItem {...formItemLayout} label="代码 类似于">
            {getFieldDecorator("code")(
                <Input placeholder="请输入" key="codeInput" />
            )}
        </FormItem>
    </Col>);
    children.push(<Col span={12} key={2}>
        <FormItem {...formItemLayout} label="状态 等于">
            {getFieldDecorator("state", { initialValue: "" })(
                <Select placeholder="请选择" showSearch={false} key="stateSelecter" size="default">
                    <Option value="">全部</Option>
                    <Option value="online" >启用</Option>
                    <Option value="offline">停用</Option>
                </Select>
            )}
        </FormItem>
    </Col>);
    children.push(<Col span={12} key={3}>
        <FormItem {...formItemLayout} label="名称 类似于">
            {getFieldDecorator('name')(
                <Input placeholder="请输入" key="nameInput" />
            )}
        </FormItem>
    </Col>);
    return (
        <Collapse defaultActiveKey={["1"]}>
            <Panel header="搜索" key="1">
                <Form onSubmit={handleSearch} className="ant-advanced-search-form">
                    <Row gutter={40}>
                        {children}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8, fontSize: 12 }} onClick={handleReset}>清除</Button>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
    );
};

export default Form.create()(RoleSearchForm);