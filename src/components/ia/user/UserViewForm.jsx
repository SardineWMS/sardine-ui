import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal, Card, Select, InputNumber, Popconfirm } from 'antd';
import styles from '../../less/common.less';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import PermissionUtil from '../../../utils/PermissionUtil';

const FormItem = Form.Item;

const UserViewForm = ({
    item = {},
    onEdit,
    onCreate,
    onBack,
    onOnline,
    onOffline,
}) => {

    const formItemLayout = {
        labelCol: { span: 5 },
    };

    return (
        <div>
            <div className={styles.button}>
                <Button onClick={() => onCreate()} disabled={!PermissionUtil("user:create")}> 新建</Button>
                <Button onClick={() => onEdit(item)} disabled={!PermissionUtil("user:edit")}> 编辑</Button>
                <Button onClick={() => onBack()}> 返回</Button>
                <Popconfirm title="确定要启用吗？" onConfirm={() => onOnline(item)}>
                    <Button disabled={(item.userState === '已启用') && !PermissionUtil("user:online")}>启用</Button>
                </Popconfirm>
                <Popconfirm title="确定要停用吗？" onConfirm={() => onOffline(item)}>
                    <Button disabled={(item.userState === '已停用')&&!PermissionUtil("user:offline")}>停用</Button>
                </Popconfirm>
            </div>
            <Card title="基本信息" bordered={false} bodyStyle={{ padding: 0 }}>
                <Row gutter={36}>
                    <Col span={12}>
                        <Form horizontal>
                            <FormItem {...formItemLayout} label="代码：" hasFeedback className={styles.formItem}>
                                <span> {item.code} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="名称：" hasFeedback className={styles.formItem}>
                                <label>{item.name} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="电话：" hasFeedback className={styles.formItem}>
                                <label>{item.phone} </label>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Form horizontal>
                            <FormItem {...formItemLayout} label="状态 :" hasFeedback className={styles.formItem}>
                                <span> {item.userState} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="创建信息：" hasFeedback className={styles.formItem}>
                                <label>{createInfo2String(item)} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="修改信息：" hasFeedback className={styles.formItem}>
                                <label>{lastModifyInfo2String(item)} </label>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

UserViewForm.propTypes = {
    form: PropTypes.object,
    item: PropTypes.object,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
};

export default UserViewForm;