import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm,Card,Select,InputNumber
, Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const ArticleCreateForm = ({
  article = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
   function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), uuid: article.uuid, version: article.version };
      onOk(data);
    });
  }

  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('年龄未填写'));
    }
    if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
  }

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
     <div>
     <div className="ant-table-title">
     <Button onClick={handleOk}> 保存</Button>
     <Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>
     </div>
     <Card title="基本信息">
      <Row gutter={6}>
       <Col span={12}>
      	<Form horizontal>
        <FormItem {...formItemLayout} label="代码 :" hasFeedback>
            {getFieldDecorator('code', {
            initialValue: article ? article.code : null,
            rules: [
              { required: true, message: '代码未填写' },
            ],
          })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="名称 :" hasFeedback>
            {getFieldDecorator('name', {
            initialValue: article ? article.name : null,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="规格 :" hasFeedback>
            {getFieldDecorator('spec', {
            initialValue: article ? article.spec : null,
            rules: [
              { required: true, message: '规格未填写' },
            ],
          })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态 ：" hasFeedback>
            {getFieldDecorator('state' ,{
            initialValue: article.state ? article.state : 'normal',
            rules: [{ required: true, message: '状态不能为空' },],
        })(
        <Select>
                  	<Select.Option value="normal">正常</Select.Option>
        </Select>
        )}
        </FormItem>
        <FormItem {...formItemLayout} label="保质期 ：" hasFeedback>
         {getFieldDecorator('expDays',{
            initialValue: article.expDays ? article.expDays : 0,
            rules: [{ required: true, message: '保质期不能为空' },],})(
            <InputNumber min={0} />
             )}
        </FormItem>
        <FormItem {...formItemLayout} label="商品类别 :" hasFeedback>
            {getFieldDecorator('category', {
            initialValue: article ? article.category : null,
            rules: [
              { required: true, message: '类别未填写' },
            ],
          })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="质量管理 :" hasFeedback>
            {getFieldDecorator('firstInFirstOut', {
            initialValue: article.firstInFirstOut ? article.firstInFirstOut : true,
          })(
              <RadioGroup>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
        </FormItem>
      </Form>
      </Col>
   </Row>
    </Card>
    </div>
    );
};

ArticleCreateForm.propTypes = {
  form: PropTypes.object,
  article: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(ArticleCreateForm);