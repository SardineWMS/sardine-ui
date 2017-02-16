import React, { PropTypes } from 'react';
import { Card, Button, Input, Form, Row, Col, Select } from 'antd';
import styles from '../../Layout/common.less';
const FormItem = Form.Item;
const Option = Select.Option;


const CustomerAddForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    }
}) => {
    function handleCreate() {
        validateFields((errors) => {
            if (errors) {
                return;
            }

            const data = { ...getFieldsValue(), key: item.key, uuid: item.uuid, state: item.state, companyUuid: item.companyUuid, version: item.version };
            handleSave(data);
        });
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },

    };

    const children = [];
    children.push(
        <Col span={13} key={1}>
            <FormItem {...formItemLayout} label={"客户代码"} className={styles.topInput}>
                {getFieldDecorator("code", { rules: [{ required: true }], initialValue: item.code })(
                    <Input placeholder="请输入" key="customerCodeInput" />
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={13} key={2}>
            <FormItem {...formItemLayout} label={"客户名称"} className={styles.normalInput}>
                {getFieldDecorator("name", { rules: [{ required: true }], initialValue: item.name })(
                    <Input placeholder="请输入" key="customerNameInput" />
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={13} key={3}>
            <FormItem {...formItemLayout} label={"客户类型"} className={styles.normalInput}>
                {getFieldDecorator("type", { rules: [{ required: true }], initialValue: item.type })(
                    <Select placeholder="请选择" showSearch={false} size="large">
                        <Option value="store">百货</Option>
                        <Option value="shop">精品店</Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={13} key={4}>
            <FormItem {...formItemLayout} label={"联系方式"} className={styles.normalInput}>
                {getFieldDecorator("phone", { initialValue: item.phone })(
                    <Input placeholder="请输入" key="phoneNumber" />
                )}
            </FormItem>
        </Col>
    );
    children.push(
        <Col span={13} key={5}>
            <FormItem {...formItemLayout} label={"地址"} className={styles.bottomInput}>
                {getFieldDecorator("address", { initialValue: item.address })(
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
        <div>
            <div className={styles.button}>
                <Button onClick={() => onCancel(item)}>取消</Button>
                <Button type="primary" onClick={handleCreate}>保存</Button>
            </div>
            <Form>
                <Card title="基本信息" bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row gutter={12} type="flex">
                        {children}
                    </Row>

                </Card>
            </Form>
        </div>
    );
}

export default Form.create()(CustomerAddForm);