import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm,Card,InputNumber} from 'antd';
const FormItem = Form.Item;
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseForm from '../../Widget/BaseForm';
import ToolbarPanel from '../../Widget/ToolbarPanel';

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

    const children = [];
    children.push(
          <BaseFormItem  label="代码 :" >
              {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                { required: true, message: '代码未填写' },
               ],
              })(
                <Input type="text"/>
               )}
          </BaseFormItem>
    );

    children.push(
           <BaseFormItem label="姓名 :" >
              {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                { required: true, message: '姓名未填写' },
              ],
             })(
                <Input type="text"/>
              )}
          </BaseFormItem>
    );

    children.push(
        <BaseFormItem  label="联系方式：" >
           {getFieldDecorator('phone',{
              initialValue: item.phone,
             rules: [
                { required: true, message: '联系方式未填写' }            ],
            })(
              <Input type="text"/>
               )}
        </BaseFormItem>
    );

    children.push(
          <BaseFormItem  label="地址：" hasFeedback>
              {getFieldDecorator('address' ,{
              initialValue: item.address,
              })(
                  <Input type="textarea" autosize={{ minRows: 4 }}></Input>
              )}
          </BaseFormItem>
    );

    const toolbar = [];
    toolbar.push(<Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>);
    toolbar.push(<Button type="primary" onClick={handleOk}> 保存</Button>);

    return (
      <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
              <BaseForm items={children} />
            </BaseCard>
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