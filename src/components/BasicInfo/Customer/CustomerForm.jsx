import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, Collapse } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
class SearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };

        // To generate mock Form.Item
        const children = [];
        children.push(
            <Col span={11} key={1}>
                <FormItem {...formItemLayout} label={"代码 类似于"}>
                    {getFieldDecorator("codeInput")(
                        <Input placeholder="请输入" key="codeInput" />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={11} key={2}>
                <FormItem {...formItemLayout} label={"状态 等于"}>
                    {getFieldDecorator("stateSelecter", { initialValue: "normal" })(
                        /*在给select标签赋初始值时，因为此时被getFieldDecorator修饰，不能使用defaultValue。
                        而应该使用getFieldDecorator里的initalValue
                        */
                        <Select placeholder="请选择" showSearch={false} key="stateSelecter">
                            <Option value="normal" >正常</Option>
                            <Option value="已删除">已删除</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={11} key={3}>
                <FormItem {...formItemLayout} label={"名称 类似于"}>
                    {getFieldDecorator("nameInput")(
                        <Input placeholder="请输入" key="nameInput"></Input>
                    )}
                </FormItem>

            </Col>
        );

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 2;
        return (
            <Collapse defaultActiveKey={["1"]}>
                <Panel header="搜索" key="1">
                    <Form
                        className="ant-advanced-search-form"
                        onSubmit={this.handleSearch}
                        >
                        <Row gutter={40}>
                            {children.slice(0, shownCount)}
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">Search</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>Clear</Button>
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                    高级搜索 <Icon type={expand ? 'up' : 'down'} />
                                </a>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </Collapse>
        );
    }
}

const DrawCustomerSearch = Form.create()(SearchForm);

const CustomerSearch = () => {
    return (
        <DrawCustomerSearch />
    )
}


export default CustomerSearch;
