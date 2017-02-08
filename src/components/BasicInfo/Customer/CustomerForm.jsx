import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, Collapse } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

const CustomerSearchForm = ({
    onSearch,
    field,
    keyword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
    onToggle,
    searchExpand,
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
    children.push(
        <Col span={11} key={1}>
            <FormItem {...formItemLayout} label={"代码 类似于"}>
                {getFieldDecorator("code")(
                    <Input placeholder="请输入" key="codeInput" />
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={11} key={2}>
            <FormItem {...formItemLayout} label={"状态 等于"}>
                {getFieldDecorator("state", { initialValue: "normal" })(
                    /*在给select标签赋初始值时，因为此时被getFieldDecorator修饰，不能使用defaultValue。
                    而应该使用getFieldDecorator里的initalValue
                    */
                    <Select placeholder="请选择" showSearch={false} key="stateSelecter">
                        <Option value="normal" >正常</Option>
                        <Option value="deleted">已删除</Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={11} key={3}>
            <FormItem {...formItemLayout} label={"名称 类似于"}>
                {getFieldDecorator("name")(
                    <Input placeholder="请输入" key="nameInput"></Input>
                )}
            </FormItem>

        </Col>
    );
    const shownCount = searchExpand ? children.length : 2;
    return (
        <Collapse defaultActiveKey={["1"]}>
            <Panel header="搜索" key="1">
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={handleSearch}
                    >
                    <Row gutter={40}>
                        {children.slice(0, shownCount)}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Search</Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>Clear</Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => onToggle(searchExpand)}>
                                高级搜索 <Icon type={searchExpand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
    );


};

export default Form.create()(CustomerSearchForm);
