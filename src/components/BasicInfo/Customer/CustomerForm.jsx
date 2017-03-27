import React, { PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, Collapse } from 'antd';
import styles from '../../Layout/common.less';
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
import BaseFormItem from '../../Widget/BaseFormItem';


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
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      };

    const children = [];
    children.push(
        <Col span={12} key={1}>
            <BaseFormItem formItemLayout={formItemLayout} label={"代码 类似于"} >
                {getFieldDecorator("code")(
                    <Input placeholder="请输入" key="codeInput" />
                )}
            </BaseFormItem>
        </Col>
    );
    children.push(
        <Col span={12} key={2}>
            <BaseFormItem formItemLayout={formItemLayout} label={"状态 等于"}>
                {getFieldDecorator("state", { initialValue: "normal" })(
                    /*在给select标签赋初始值时，因为此时被getFieldDecorator修饰，不能使用defaultValue。
                    而应该使用getFieldDecorator里的initalValue
                    */
                    <Select placeholder="请选择" showSearch={false} key="stateSelecter" size="default">
                        <Option value="normal" >正常</Option>
                        <Option value="deleted">已删除</Option>
                    </Select>
                )}
            </BaseFormItem>
        </Col>
    );
    children.push(
        <Col span={12} key={3}>
            <BaseFormItem formItemLayout={formItemLayout} label={"名称 类似于"}>
                {getFieldDecorator("name")(
                    <Input placeholder="请输入" key="nameInput"></Input>
                )}
            </BaseFormItem>

        </Col>
    );
    const shownCount = searchExpand ? children.length : 3;
    return (
        <Collapse defaultActiveKey={["1"]} >
            <Panel header="搜索" key="1">
                <Form
   
                    onSubmit={handleSearch}
                >
                    <Row gutter={40}>
                        {children.slice(0, shownCount)}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>清除</Button>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
    );


};

export default Form.create()(CustomerSearchForm);
