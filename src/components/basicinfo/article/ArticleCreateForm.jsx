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
const FormItem = Form.Item;

const ArticleCreateForm = ({
  article = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
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
      }
      const data = { ...getFieldsValue(), uuid: article.uuid, version: article.version, category: category };
      onOk(data);
    });
  }

  function selectCategory() {
    let data = { ...getFieldsValue() };
    if (article.uuid) {
      data.uuid = article.uuid;
      data.version = article.version;
    }
    onCategorySelect(data);
  }

  function handleEnterPress() {
    if (category && ("[" + category.code + "]" + category.name) == getFieldsValue().category)
      return;
    if (!getFieldsValue().category)
      return;
    let data = { ...getFieldsValue() };
    if (article.uuid) {
      data.uuid = article.uuid;
      data.version = article.version;
    }
    onEnterCategory(data, getFieldsValue().category);
  }

  function firstInFirstOutChange(e) {
    onFirstInFirstOutChange(e.target.value);
  }

  const basicChildren = [];
  const businessChildren = [];
  basicChildren.push(
    <BaseFormItem label="代码 :" key="code">
      {getFieldDecorator('code', {
        initialValue: article ? article.code : null,
        rules: [
          { required: true, message: '商品代码不能为空！' },
          { max: 30, message: '商品代码最大长度为30！' }
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
          { required: true, message: '商品名称不能为空！' },
          { max: 100, message: '商品名称最大长度为100！' }
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="包装 :" key="spec">
      {getFieldDecorator('spec', {
        initialValue: article ? article.spec : null,
        rules: [
          { required: true, message: '包装不能为空！' },
          { max: 30, message: '商品包装最大长度为30！' }
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );

  basicChildren.push(<BaseFormItem label={"商品类别："} key="category">
    {getFieldDecorator("category", {
      rules: [{ required: true, message: '商品类别不能为空！' }],
      initialValue: (category && category.uuid) ? "[" + category.code + "]" + category.name : null
    })(
      <Input placeholder="请选择" suffix={<Icon type="bars" onClick={() => selectCategory()} />}
        onBlur={handleEnterPress} onPressEnter={handleEnterPress} />
      )}
  </BaseFormItem>);

  basicChildren.push(
    <BaseFormItem label="保质期类型 :" key="expflag">
      {getFieldDecorator('expflag', {
        initialValue: article.expflag ? article.expflag : "produceDate",
      })(
        <Select size="large">
          <Select.Option value="produceDate">按生产日期</Select.Option>
          <Select.Option value="expireDate">按到效期</Select.Option>
          <Select.Option value="none">不管理保质期</Select.Option>
        </Select>
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="保质期 ：" key="expDays">
      {getFieldDecorator('expDays', {
        initialValue: article.expDays ? article.expDays : 0,
        rules: [{ required: true, message: '保质期不能为空！' }, {
          pattern: /^[0-9]{0,11}$/,
          message: '保质期最大长度是11！'
        }]//这里在使用max：11 时，无论输入什么数字，都会校验失败，所有此处使用正则表达式，待antd版本更新修复
      })(
        <InputNumber min={0} />
        )}
    </BaseFormItem>
  );

  businessChildren.push(
    <BaseFormItem label="上架货位 ：" key="putawayBin">
      {getFieldDecorator('putawayBin', {
        initialValue: article.putawayBin ? article.putawayBin : "StorageBin",
        rules: [{ required: true, message: '上架货位不能为空！' },],
      })(
        <Select size="large">
          <Select.Option value="StorageBin">存储位</Select.Option>
          <Select.Option value="PickUpBin">拣货位</Select.Option>
          <Select.Option value="PreChoosePickUp">优先考虑拣货位</Select.Option>
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
        <FormItem>
          {getFieldDecorator('remark', {
            initialValue: article.remark,
            rules: [
              { required: false, },
              { max: 255, message: '说明最大长度为255！' }
            ],
          })(
            <Input type="textarea" autosize={{ minRows: 4 }} />
            )}
        </FormItem>
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
