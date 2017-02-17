import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Button, Modal, Card } from 'antd';
import styles from '../../Layout/common.less';
const FormItem = Form.Item;
const ArticleViewForm = ({
    article,
    onEdit,
    onCreate,
    onBack,
    onSaveSupplier,
}) => {

    const formItemLayout = {
        labelCol: { span: 9 },
    };

    return (
        <div>
            <div className={styles.button}>
                <Button onClick={() => onCreate()}> 新建</Button>
                <Button onClick={() => onEdit(article)}> 编辑</Button>
                <Button onClick={() => onBack()}> 返回</Button>
            </div>
            <Card title="基本信息" bordered={false} bodyStyle={{ padding: 0 }}>
                <Row gutter={36}>
                    <Col span={12}>
                        <Form horizontal>
                            <FormItem {...formItemLayout} label="代码:" hasFeedback className={styles.formItem}>
                                <span>{article.code} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="名称：" hasFeedback className={styles.formItem}>
                                <label>{article.name} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="规格：" hasFeedback className={styles.formItem}>
                                <label>{article.spec} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="状态：" hasFeedback className={styles.formItem}>
                                <label>{article.state == "normal" ? "正常" : article.state} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="保质期：" hasFeedback className={styles.formItem}>
                                <label>{article.expDays} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="商品类别：" hasFeedback className={styles.formItem}>
                                <label>{article.category ? "[" + article.category.code + "]" + article.category.name : ""} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="质量管理：" hasFeedback className={styles.formItem}>
                                <label>{article.firstInFirstOut ? "是" : "否"} </label>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

ArticleViewForm.propTypes = {
    article: PropTypes.object,
    onEdit: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onSaveSupplier: PropTypes.func,
};

export default ArticleViewForm;