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
      if(item){
        onOk(getFieldsValue());
      }else{
        onOk(item);
      }
    });
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
      <Row gutter={16}>
       <Col span={12}>
        <Form horizontal>
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
        <FormItem {...formItemLayout} label="联系方式：" hasFeedback>
         {getFieldDecorator('phone',{
            initialValue: item.phone,
           rules: [
              { required: true, message: '名称未填写' }            ],
          })(
            <Input type="text"/>
             )}
        </FormItem>
        <FormItem {...formItemLayout} label="地址：" hasFeedback>
            {getFieldDecorator('address' ,{
            initialValue: item.address,
        })(
            <Input type="textarea" autosize={{ minRows: 4 }}></Input>
        )}
        </FormItem>

      </Form>
      </Col>
   </Row>
    </Card>
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