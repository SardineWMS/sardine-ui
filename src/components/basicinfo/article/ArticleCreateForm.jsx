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
      const data = { ...getFieldsValue(), uuid: article.uuid, version: article.version, category: category, companyUuid: article.companyUuid };
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
        rules: [{ required: true }, {
          pattern: /^[a-z0-9]{0,30}$/,
          message: '商品代码只能由30位字母和数字组成！'
        }
        ],
      })(
        <Input type="text" />
        )}
    </BaseFormItem>
  );
  basicChildren.push(
    <BaseFormItem label="第二代码 :" key="secondCode">
      {getFieldDecorator('secondCode', {
        initialValue: article ? article.secondCode : null,
        rules: [
          { required: false }, {
            pattern: /^[a-z0-9]{0,30}$/,
            message: '商品第二代码只能由30位字母和数字组成！'
          }
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
    <BaseFormItem label="简称 :" key="simpleName">
      {getFieldDecorator('simpleName', {
        initialValue: article ? article.name : null,
        rules: [
          { max: 100, message: '商品简称名称最大长度为100！' }
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
      <Input placeholder="请选择" suffix={<Icon type="ellipsis" onClick={() => selectCategory()} />}
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
        <InputNumber min={0} style={{ width: '100%' }} />
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="进价 ：" key="purchasePrice">
      {getFieldDecorator('purchasePrice', {
        initialValue: article.purchasePrice ? article.purchasePrice : 0,
        rules: [{ required: true, message: '进价不能为空！' }, {
          pattern: /^[0-9]{1,19}+(.[0-9]{1,3})?$/,
          message: '进价格式不正确，最大24位数字，默认5位小数！'
        }]//这里在使用max：11 时，无论输入什么数字，都会校验失败，所有此处使用正则表达式，待antd版本更新修复
      })(
        <Input style={{ width: '100%' }} />
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="售价 ：" key="sellPrice">
      {getFieldDecorator('sellPrice', {
        initialValue: article.sellPrice ? article.sellPrice : 0,
        rules: [{ required: true, message: '售价不能为空！' }, {
          pattern: /^[0-9]{1,19}+(.[0-9]{1,3})?$/,
          message: '售价格式不正确，最大24位数字，默认5位小数！'
        }]//这里在使用max：11 时，无论输入什么数字，都会校验失败，所有此处使用正则表达式，待antd版本更新修复
      })(
        <Input style={{ width: '100%' }} />
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="产地 ：" key="habitat">
      {getFieldDecorator('habitat', {
        initialValue: article.habitat ? article.habitat : 0,
        rules: [{
          max: 100,
          message: '产地最大为100位！'
        }]
      })(
        <Input style={{ width: '100%' }} />
        )}
    </BaseFormItem>
  );

  basicChildren.push(
    <BaseFormItem label="尺寸 ：" key="size">
      {getFieldDecorator('size', {
        initialValue: article.size ? article.size : 0,
        rules: [{
          max: 100,
          message: '尺寸最大为100位！'
        }]
      })(
        <Input style={{ width: '100%' }} />
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

  // businessChildren.push(
  //   <BaseFormItem label="默认供应商：">
  //     {
  //       getFieldDecorator("supplier", {
  //         rules: [{ required: true, message: "供应商不能为空！" }],
  //         initialValue: item.customer ? item.customer.code : ""
  //       })(
  //         <Input placeholder="请选择" suffix={<Icon type="bars" onClick={() => onCustomerSelect()} />} onBlur={handleEnterPress} />
  //         )
  //     }
  //   </BaseFormItem>);

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
