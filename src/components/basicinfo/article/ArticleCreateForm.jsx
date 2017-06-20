import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input, Button, Icon, Table, message, Popconfirm, Card, Select, InputNumber
  , Radio
} from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import PermissionUtil from '../../../utils/PermissionUtil';
import RemarkCard from '../../Widget/RemarkCard';
import Panel from '../../Widget/Panel';

const RadioGroup = Radio.Group;


const ArticleCreateForm = ({
  article = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  onCategorySelect,
  category,
  onEnterCategory,
  onFirstInFirstOutChange,
  showLable,
  firstInFirstOut
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      };
      const data = { ...getFieldsValue(), uuid: article.uuid, version: article.version, category: category };
      onOk(data);
    });
  };

  function selectCategory(){
    let data = { ...getFieldsValue()};
    if (article.uuid) {
      data.uuid = article.uuid;
      data.version = article.version;
    };
    onCategorySelect(data);
  };

  function handleEnterPress() {
    let data = { ...getFieldsValue()};
    if (article.uuid) {
      data.uuid = article.uuid;
      data.version = article.version;
    };
    onEnterCategory(data, getFieldsValue().category);
  };

  function firstInFirstOutChange(e){
    onFirstInFirstOutChange(e.target.value);
  };

  const basicChildren = [];
  const businessChildren = [];
  basicChildren.push(
    <BaseFormItem label="代码 :" key="code">
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

  basicChildren.push(
    <BaseFormItem label="名称 :" key="name">
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

  basicChildren.push(
    <BaseFormItem label="规格 :" key="spec">
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

  basicChildren.push(<BaseFormItem label={"商品类别："} key="category">
        {getFieldDecorator("category", { rules: [{ required: true }], initialValue: category ? "[" + category.code + "]" + category.name : null })(
            <Input placeholder="请选择" suffix={<Button type="primary" icon="credit-card" onClick={() => selectCategory()} />} onBlur={handleEnterPress} />
        )}
    </BaseFormItem>);

  basicChildren.push(
    <BaseFormItem label="质量管理 :" key="firstInFirstOut">
      {getFieldDecorator('firstInFirstOut', {
        initialValue: article.firstInFirstOut ? article.firstInFirstOut : true,
      })(
        <Radio.Group>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="保质期 ：" key="expDays">
      {getFieldDecorator('expDays', {
        initialValue: article.expDays ? article.expDays : 0,
        rules: [{ required: true, message: '保质期不能为空' },],
      })(
        <InputNumber min={0} />
        )}
    </BaseFormItem>
  );

  businessChildren.push(
    <BaseFormItem label="上架货位 ：" key="putawayBin" >
      {getFieldDecorator('putawayBin', {
        initialValue: article.putawayBin ? article.putawayBin : "StorageBin",
        rules: [{ required: true, message: '上架货位不能为空' },],
      })(
        <Select size="large">
            <Select.Option value="StorageBin" >存储位</Select.Option>
            <Select.Option value="PickUpBin" >拣货位</Select.Option>
            <Select.Option value="PreChoosePickUp" >优先考虑拣货位</Select.Option>
        </Select> 
        )}
    </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push(<Button onClick={handleOk} key="ok"> 保存</Button>);
  toolbar.push(<Button onClick={() => onCancel()} key="cancel"> 取消</Button>);

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息">
        <BaseForm items={basicChildren} />
        <BaseForm items={businessChildren} />
      </BaseCard>
      <Panel title="说明">
         
         {getFieldDecorator('remark', {
        initialValue: article.remark
      })(
         <Input type="textarea" autosize={{ minRows: 4 }} defaultValue={article.remark} />
        )}
       </Panel>
    </div>
  );
};

ArticleCreateForm.propTypes = {
  form: PropTypes.object,
  article: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onCategorySelect: PropTypes.func,
  category: PropTypes.object,
  onEnterCategory: PropTypes.func,
  onFirstInFirstOutChange: PropTypes.func
};

export default Form.create()(ArticleCreateForm);