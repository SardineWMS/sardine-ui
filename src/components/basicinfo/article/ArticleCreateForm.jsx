import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm, Card, Select, InputNumber
  , Radio
} from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';

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

  const children=[];
  children.push(
    <BaseFormItem label="代码 :" >
         {getFieldDecorator('code', {
                  initialValue: article ? article.code : null,
                  rules: [
                    { required: true, message: '代码未填写' },
                  ],
                })(
                  <Input type="text" />
         )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="名称 :" >
         {getFieldDecorator('name', {
                  initialValue: article ? article.name : null,
                  rules: [
                    { required: true, message: '名称未填写' },
                  ],
                })(
                  <Input type="text" />
          )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="规格 :" >
       {getFieldDecorator('spec', {
                    initialValue: article ? article.spec : null,
                    rules: [
                      { required: true, message: '规格未填写' },
                    ],
                  })(
                    <Input type="text" />
       )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="状态 ：" >
       {getFieldDecorator('state', {
                  initialValue: article.state ? article.state : 'normal',
                  rules: [{ required: true, message: '状态不能为空' },],
                })(
                  <Select>
                    <Select.Option value="normal">正常</Select.Option>
                  </Select>
       )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="保质期 ：" >
     {getFieldDecorator('expDays', {
                  initialValue: article.expDays ? article.expDays : 0,
                  rules: [{ required: true, message: '保质期不能为空' },],
                })(
                  <InputNumber min={0} />
      )}
    </BaseFormItem>
  );

  children.push(
    <BaseFormItem label="商品类别 :">
      {getFieldDecorator('categoryCode', {
                  initialValue: article ? article.category : null,
                  rules: [
                    { required: true, message: '类别未填写' },
                  ],
                })(
                  <Input type="text" />
                  )}
    </BaseFormItem>
  );

   children.push(
    <BaseFormItem label="质量管理 :">
      {getFieldDecorator('firstInFirstOut', {
                      initialValue: article.firstInFirstOut ? article.firstInFirstOut : true,
                    })(
                      <RadioGroup>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                      </RadioGroup>
                      )}
    </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push( <Button onClick={handleOk}> 保存</Button>);
  toolbar.push( <Button onClick={() => onCancel()}> 取消</Button>);

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard>
        <BaseForm items={children} />
      </BaseCard>
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