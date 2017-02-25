import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm } from 'antd';
import timeStamp2datetime from '../../../utils/DateUtils';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import styles from '../../Layout/common.less';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const CustomerView = ({item = {},
    onBack,
    onRemove,
    onRecover,
    showEdit,
}) => {

    const formItemLayout = {
        labelCol: { span: 9 },
    }
    const code = item.code;
    let removeRight = false;
    let recoverRight = false;
    if (item.state === "正常") {
        removeRight = false;
        recoverRight = true;
    }
    if (item.state === "已删除") {
        removeRight = true;
        recoverRight = false;
    }
    return (
        <div>
            <div className={styles.button}>
                <Button onClick={() => showEdit(item)}>编辑</Button>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)}>
                    <Button disabled={removeRight} >删除</Button>
                </Popconfirm>
                <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)}>
                    <Button disabled={recoverRight}>恢复</Button>
                </Popconfirm>
                <Button onClick={() => onBack()}>返回</Button>
            </div>
            <Card title="基本信息" bordered={false} bodyStyle={{ padding: 0 }}>
                <Row gutter={36}>
                    <Col span={12}>
                        <Form horizontal>
                            <FormItem label="客户代码：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.code}</span>
                            </FormItem>
                            <FormItem label="客户名称：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.name}</span>
                            </FormItem>
                            <FormItem label="客户类型：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.type}</span>
                            </FormItem>
                            <FormItem label="联系方式：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.phone}</span>
                            </FormItem>
                            <FormItem label="联系地址：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.address}</span>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Form horizontal>
                            <FormItem label="状态：" {...formItemLayout} className={styles.formItem}>
                                <span>{item.state}</span>
                            </FormItem>
                            <FormItem label="创建信息：" {...formItemLayout} className={styles.formItem}>
                                <span>{createInfo2String(item)}</span>
                            </FormItem>
                            <FormItem label="修改信息：" {...formItemLayout} className={styles.formItem}>
                                <span>{lastModifyInfo2String(item)}</span>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
            <Card bordered={false} title="说明">
                <Input type="textarea" autosize={{ minRows: 4 }} disabled={true}></Input>
            </Card>
        </div >
    )
};
export default CustomerView;
