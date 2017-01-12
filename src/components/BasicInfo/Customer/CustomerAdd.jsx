import React, { PropTypes } from 'react';
import { Card, Button, Input, Form, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class CustomerAddForm extends React.Component {
    state = {

    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };

        // To generate mock Form.Item
        const children = [];
        children.push(
            <Col span={13} key={1}>
                <FormItem {...formItemLayout} label={"客户代码"}>
                    {getFieldDecorator("customerCodeInput", { rules: [{ required: true }] })(
                        <Input placeholder="请输入" key="customerCodeInput" />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={13} key={2}>
                <FormItem {...formItemLayout} label={"客户名称"}>
                    {getFieldDecorator("customerNameInput", { rules: [{ required: true }] })(
                        <Input placeholder="请输入" key="customerNameInput" />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={13} key={3}>
                <FormItem {...formItemLayout} label={"客户类型"}>
                    {getFieldDecorator("customerTypeSelect", { rules: [{ required: true }] })(
                        <Select placeholder="请选择" showSearch={false} size="default">
                            <Option value="store">百货</Option>
                            <Option value="shop">精品店</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={13} key={4}>
                <FormItem {...formItemLayout} label={"联系方式"}>
                    {getFieldDecorator("phoneNumber")(
                        <Input placeholder="请输入" key="phoneNumber" />
                    )}
                </FormItem>
            </Col>
        );
        children.push(
            <Col span={13} key={5}>
                <FormItem {...formItemLayout} label={"地址"}>
                    {getFieldDecorator("address")(
                        <Input type="textarea" autosize={{ minRows: 4 }}></Input>
                        /**
                         * 在Input属性type设置为textare之后，在示例中通过属性rows指定文本域高度无效
                         * 所以通过autosize来指定，
                         */
                    )}
                </FormItem>
            </Col>
        );
        return (
            <Form
                className="ant-advanced-search-form"
                >
                <Row gutter={40} type="flex">
                    {children}
                </Row>
            </Form>
        );
    }
}
const CustomerAdd = Form.create()(CustomerAddForm);
const RemarkPanel = () => {
    return (
        <Input type="textarea" autosize={{ minRows: 4 }}></Input>
    )
};
const CustomerAddPage = ({onCancel}) => {
    return (
        <div>
            <Button type="primary">保存</Button>
            {" "}
            <Button onClick={() => onCancel()}>取消</Button>
            <Card title="基本信息">
                <CustomerAdd />
            </Card>
            <Card title="说明">
                <RemarkPanel />
            </Card>
        </div>
    )
};
export default CustomerAddPage;