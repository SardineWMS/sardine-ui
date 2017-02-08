import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Button, Modal,Card} from 'antd';
const FormItem = Form.Item;
const ArticleViewForm = ({
  article,
  onEdit,
  onCreate,
  onBack,
  onSaveSupplier,
  }) => {

  const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
     <div>
     <Button onClick={() => onCreate()}> 新建</Button>
     <Button style={{ marginLeft: 8 }} onClick={() => onEdit(article)}> 编辑</Button>
     <Button style={{ marginLeft: 8 }} onClick={() => onBack()}> 返回</Button>

    <Card title="基本信息">
      <Row gutter={16}>
       <Col span={12}>
        <Form horizontal>
        <FormItem {...formItemLayout} label="代码:" hasFeedback>
            <span>{article.code} </span>
        </FormItem>
        <FormItem {...formItemLayout} label="名称：" hasFeedback>
            <label>{article.name} </label>
        </FormItem>
        <FormItem {...formItemLayout} label="规格：" hasFeedback>
            <label>{article.spec} </label>
        </FormItem>
        <FormItem {...formItemLayout} label="状态：" hasFeedback>
            <label>{article.state == "normal" ? "正常" : article.state} </label>
        </FormItem>
        <FormItem {...formItemLayout} label="保质期：" hasFeedback>
            <label>{article.expDays} </label>
        </FormItem>
        <FormItem {...formItemLayout} label="商品类别：" hasFeedback>
            <label>{article.category ? "[" + article.category.code + "]" + article.category.name : ""} </label>
        </FormItem>
        <FormItem {...formItemLayout} label="质量管理：" hasFeedback>
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