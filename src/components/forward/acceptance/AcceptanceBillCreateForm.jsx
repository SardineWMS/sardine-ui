import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon, Col } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import Panel from '../../Widget/Panel';
import AcceptanceBillItemForm from './AcceptanceBillItemForm';

const EditableCell = require('../../Widget/EditableCell');

import CustomerModal from '../../Widget/CustomerModal';

const Option = Select.Option;

const AcceptanceBillCreateForm = ({
    acceptanceBill = {},
    onCancel,
    onSave,
    queryWrhs,
    queryCustomers,
    getCustomer,
    customer,
    wrhs = [],
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    acceptanceBillItemProps,
}) => {
  function handleCreate() {
    validateFields((errors) => {
      if (errors) { return; }
      let data = {};
      data = {
        ...acceptanceBill,
        ...getFieldsValue(),
                //customer: customer,
        wrh: acceptanceBill.wrh,
      };
      onSave(data);
    });
  }

  function wrhOnSelect(value) {
    const wrhUcn = new Object();
    wrhUcn.uuid = value;
    acceptanceBill.wrh = wrhUcn;
  }

  function onSelectDeliverySystem(value) {
    if (value === 'tradition') { acceptanceBill.deliveryType = '仓库送'; }
  }

  function handleGetCustomer() {
    if (!getFieldsValue().customer) { return; }
    if (customer && customer.code == getFieldsValue().customer) { return; }
    if (customer && (`[${customer.code}]${customer.name}`) == getFieldsValue().customer) { return; }
    getCustomer(getFieldsValue().customer);
  }

  const baseChildren = [];
  const compositiveChildren = [];

  const wrhOptions = [];
  if (wrhs != null) {
    for (const wrh of wrhs) {
      wrhOptions.push(<Option value={wrh.uuid}>{`${wrh.name}[${wrh.code}]`}</Option>)
    }
  }

  baseChildren.push(
    <BaseFormItem label={'客户：'}>
      {getFieldDecorator('customer.code', {
        rules: [{ required: true, message: '请输入客户！' }],
        initialValue: acceptanceBill.customer ? acceptanceBill.customer : '',
      })(
        <CustomerModal />
                )}
    </BaseFormItem>
    );

  baseChildren.push(
    <BaseFormItem label={'仓位'} key="wrh">
      {getFieldDecorator('wrh', { rules: [{ required: true }], initialValue: acceptanceBill.wrh ? acceptanceBill.wrh.code : null })(
        <Select size="large" onSelect={wrhOnSelect}>
          {wrhOptions}
        </Select>
            )}
    </BaseFormItem>
    );

  baseChildren.push(<BaseFormItem label={'来源单据类型：'} key="sourceBillType">
    {getFieldDecorator('sourceBillType', {
      rules: [{ max: 100, message: '来源单据类型最大长度是100！' }],
      initialValue: acceptanceBill.sourceBillType,
    })(
      <Input placeholder="请输入：" />
            )}
  </BaseFormItem>);

  baseChildren.push(<BaseFormItem label={'来源单据单号：'} key="sourceBillNumber">
    {getFieldDecorator('sourceBillNumber', {
      rules: [{
        max: 30, message: '来源单据单号最大长度是30！',
      }],
      initialValue: acceptanceBill.sourceBillNumber,
    })(
      <Input placeholder="请输入：" />
            )}
  </BaseFormItem>);

  baseChildren.push(<BaseFormItem label={'领用原因：'} key="acceptanceReason">
    {getFieldDecorator('acceptanceReason', {
      rules: [{ required: true }, {
        max: 100, message: '领用原因最大长度是100！',
      }],
      initialValue: acceptanceBill.acceptanceReason ? acceptanceBill.acceptanceReason : '正常',
    })(
      <Input placeholder="请输入：" />
            )}
  </BaseFormItem>);

  baseChildren.push(
    <BaseFormItem label={'配送体系：'} key="deliverySystem">
      {getFieldDecorator('deliverySystem', {
        rules: [{ required: true }], initialValue: acceptanceBill.deliverySystem ? acceptanceBill.deliverySystem : 'tradition',
      })(
        <Select placeholder="请选择：" onChange={value => onSelectDeliverySystem(value)}>
          <Option value="tradition">传统体系</Option>
          <Option value="eCommerce">电商体系</Option>
        </Select>
                )
            }
    </BaseFormItem>);

  baseChildren.push(<BaseFormItem label={'配送方式：'} key="deliveryType">
    {getFieldDecorator('deliveryType', {
      rules: [{ required: true, message: '请选择配送方式！' }], initialValue: acceptanceBill.deliveryType == null ? '仓库配送' : acceptanceBill.deliveryType,
    })(
      <Select placeholder="请选择：">
        <Option value="仓库配送">仓库配送</Option>
        <Option value="顺丰">顺丰</Option>
        <Option value="申通">申通</Option>
        <Option value="圆通">圆通</Option>
        <Option value="中通">中通</Option>
        <Option value="汇通">汇通</Option>
        <Option value="韵达">韵达</Option>
      </Select>
            )
        }
  </BaseFormItem>);

  compositiveChildren.push(<BaseFormItem label={'总件数：'} key="totalCaseQtyStr">
    <label>{acceptanceBill.totalCaseQtyStr == null ? 0 : acceptanceBill.totalCaseQtyStr}</label>
  </BaseFormItem>);

  compositiveChildren.push(<BaseFormItem label={'总金额：'} key="totalAmount">
    <label>{acceptanceBill.totalAmount == null ? 0 : acceptanceBill.totalAmount}</label>
  </BaseFormItem>);


  const colChildren = [];
  colChildren.push(
    <Col span={12} key="col1">
      {baseChildren}
    </Col>
    );
  colChildren.push(
    <Col span={12} key="col2">
      {compositiveChildren}
    </Col>
    );

  const toolbar = [];
  toolbar.push(<Button key={Guid()} onClick={handleCreate} >保存</Button>)
  toolbar.push(<Button onClick={() => onCancel()} key={Guid()} > 取消</Button>);

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息" single>
        <BaseForm items={colChildren} />
      </BaseCard>
      <BaseCard single>
        <AcceptanceBillItemForm {...acceptanceBillItemProps} />
      </BaseCard>
      <Panel title="说明">
        <Form.Item>
          {getFieldDecorator('remark', {
            initialValue: acceptanceBill.remark, rules: [{ max: 255, message: '说明最大长度是255！' }],
          })(
            <Input type="textarea" autosize={{ minRows: 4 }} />
                        )}
        </Form.Item>
      </Panel>
    </div>
  );
};

export default Form.create()(AcceptanceBillCreateForm);
