import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Collapse, Button } from 'antd';
const FormItem = Form.Item;
const Panel = Collapse.Panel;

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
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
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

export default Form.create()(BinTypeSearchForm);