import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm,Card,InputNumber} from 'antd';
const FormItem = Form.Item;

const SupplierCreate = ({
  item = {},
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

      const data = { ...getFieldsValue(), uuid: item.uuid,version:item.version,state:item.state };
      onOk(data);

    });
  }

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const children = [];
    children.push(
        <Col span={13} key={1}>
          <FormItem {...formItemLayout} label="代码 :" hasFeedback>
            {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              { required: true, message: '代码未填写' },
             ],
            })(
              <Input type="text"/>
             )}
          </FormItem>
        </Col>
    );

    children.push(
        <Col span={13} key={2}>
           <FormItem {...formItemLayout} label="姓名 :" hasFeedback>
            {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              { required: true, message: '名称未填写' },
            ],
           })(
              <Input type="text"/>
            )}
          </FormItem>
        </Col>
    );

    children.push(
        <Col span={13} key={3}>
          <FormItem {...formItemLayout} label="联系方式：" hasFeedback>
           {getFieldDecorator('phone',{
              initialValue: item.phone,
             rules: [
                { required: true, message: '名称未填写' }            ],
            })(
              <Input type="text"/>
               )}
        </FormItem>
        </Col>
    );

    children.push(
        <Col span={13} key={4}>
          <FormItem {...formItemLayout} label="地址：" hasFeedback>
            {getFieldDecorator('address' ,{
            initialValue: item.address,
            })(
                <Input type="textarea" autosize={{ minRows: 4 }}></Input>
            )}
          </FormItem>
        </Col>
    );

    return (
     <div>
     <div className="ant-table-title">
      <Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>
      <Button type="primary" onClick={handleOk}> 保存</Button>
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
};

SupplierCreate.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(SupplierCreate);