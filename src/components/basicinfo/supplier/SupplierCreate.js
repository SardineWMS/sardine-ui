import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm, Card, InputNumber } from 'antd';
const FormItem = Form.Item;
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseForm from '../../Widget/BaseForm';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import PermissionUtil from '../../../utils/PermissionUtil';
import Panel from '../../Widget/Panel';

const SupplierCreate = ({
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    }
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      };

      const data = { ...getFieldsValue(), uuid: item.uuid, version: item.version, state: item.state };
      onOk(data);

    });
  };

  const children = [];
  children.push(
    <BaseFormItem label="代码 :" >
      {getFieldDecorator('code', {
        initialValue: item.code,
        rules: [
          { required: true, message: '代码未填写' },
          { max: 30, message: '代码最大长度是30！' }
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="姓名 :" >
      {getFieldDecorator('name', {
        initialValue: item.name,
        rules: [
          { required: true, message: '姓名未填写' },
          { max: 100, message: '姓名最大长度是100！' }
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="联系方式：" >
      {getFieldDecorator('phone', {
        initialValue: item.phone, rules: [{ max: 30, message: '联系方式最大长度是30！' }]
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  if (item.uuid) {
    console.log("item", item);
    children.push(<BaseFormItem label="存储区域：">
      {
        getFieldDecorator('storageArea', { initialValue: item.storageArea, rules: [{ max: 30, message: '存储区域最大长度是30！' }] })(
          <Input type="text" />
        )
      }
    </BaseFormItem>
    )
  }

  children.push(
    <BaseFormItem label="地址：" hasFeedback>
      {getFieldDecorator('address', {
        initialValue: item.address, rules: [{ max: 100, message: '地址最大长度是100！' }]
      })(
        <Input type="textarea" autosize={{ minRows: 4 }}></Input>
        )}
    </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push(<Button style={{ marginLeft: 8 }} onClick={() => onCancel()}> 取消</Button>);
  toolbar.push(<Button type="primary" onClick={handleOk} disabled={!PermissionUtil("supplier:create")}> 保存</Button>);

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息">
        <BaseForm items={children} />
      </BaseCard>
      <Panel title="说明">
        <Form.Item>
          {getFieldDecorator('remark', {
            initialValue: item.remark, rules: [{ max: 255, message: '说明最大长度是255！' }]
          })(
            <Input type="textarea" autosize={{ minRows: 4 }} />
            )}
        </Form.Item>
      </Panel>
    </div>
  );
};

SupplierCreate.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(SupplierCreate);