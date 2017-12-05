import React, { PropTypes } from 'react';
import { Button, Input, Form, Select, Card, Icon, DatePicker } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';
import ShipBillCreateItem from './ShipBillCreateItem';

const EditableCell = require('../../Widget/EditableCell');

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import Panel from '../../widget/Panel';

const Option = Select.Option;

const ShipBillCreateForm = ({
    item = {},
    onCancel,
    handleSave,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    onCarrierSelect,
    wrhs = [],
    onEnterCustomer,
    onDriverSelect,
    onVehicleSelect,
    shipBillCreateItemProps,
}) => {
  function handleCreate(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) { return; }
      let data = {};
      data = {
        ...getFieldsValue(),
        ...item,
      };
      handleSave(data);
    });
  }

  function handleEnterPress(e) {
    e.preventDefault();
    if (getFieldsValue().customer == null || getFieldsValue().customer == '') { return; }
    const data = {
      customer: getFieldsValue().customer,
    };
    onEnterCustomer(data);
  }

  const children = [];
  children.push(
    <BaseFormItem label="车牌号：">
      {
                getFieldDecorator('vehicleNum', {
                  rules: [{ required: true, message: '车牌号不能为空！' }],
                  initialValue: item.vehicleNum ? item.vehicleNum : '',
                })(
                  <Input placeholder="请选择" suffix={<Icon type="bars" onClick={() => onVehicleSelect()} />} onBlur={handleEnterPress} />
                    )
            }
    </BaseFormItem>
    );
  children.push(
    <BaseFormItem label="承运商：">
      <label>{item.carrier == null ? '' : `[${item.carrier.code}] ${item.carrier.name}`}</label>
    </BaseFormItem>
    );
  children.push(
    <BaseFormItem label="司机：">
      {
                getFieldDecorator('driver', {
                  rules: [{ required: true, message: '司机不能为空！' }],
                  initialValue: item.driver ? `[${item.driver.code}] ${item.driver.name}` : '',
                })(
                  <Input placeholder="请选择" suffix={<Icon type="bars" onClick={() => onDriverSelect()} />} onBlur={handleEnterPress} />
                    )
            }
    </BaseFormItem>
    );
  children.push(
    <BaseFormItem label="配送体系：">
      {
                getFieldDecorator('deliverySystem', {
                  rules: [{ required: true, message: '配送体系不能为空！' }],
                  initialValue: item.deliverySystem ? item.deliverySystem : 'tradition',
                })(
                  <Select placeholder="请选择：">
                    <Option value="tradition">传统体系</Option>
                    <Option value="eCommerce">电商体系</Option>
                  </Select>
                    )
            }
    </BaseFormItem>
    );
  if (getFieldsValue(['deliverySystem']).deliverySystem == 'tradition') {
    children.push(
      <BaseFormItem label="配送方式：">
        {
                    getFieldDecorator('deliveryType', {
                      rules: [{ required: true, message: '配送方式不能为空！' }],
                      initialValue: item.deliveryType ? item.deliveryType : 'warehouse',
                    })(
                      <Select placeholder="请选择：">
                        <Option value="warehouse">仓库送</Option>
                        <Option value="pickByOneSelf">自提</Option>
                      </Select>
                        )
                }
      </BaseFormItem>
        );
  } else {
    children.push(
      <BaseFormItem label="配送方式：">
        {
                    getFieldDecorator('deliveryType', {
                      rules: [{ required: true, message: '配送方式不能为空！' }],
                      initialValue: item.deliveryType ? item.deliveryType : 'sf',
                    })(
                      <Select placeholder="请选择：">
                        <Option value="sf">顺丰</Option>
                        <Option value="st">申通</Option>
                        <Option value="yt">圆通</Option>
                        <Option value="zt">中通</Option>
                        <Option value="ht">汇通</Option>
                        <Option value="yd">韵达</Option>
                      </Select>
                        )
                }
      </BaseFormItem>
        );
  }

  children.push(
    <BaseFormItem label="单据类型：">
      {
                getFieldDecorator('method', {
                  rules: [{ required: true, message: '单据类型不能为空！' }],
                  initialValue: item.method ? item.method : '',
                })(
                  <Select placeholder="请选择：">
                    <Option value="ManualBill">手工单据</Option>
                    <Option value="APP">APP</Option>
                  </Select>
                    )
            }
    </BaseFormItem>
    );

  const totalCaseQtyStrForm = [];
  totalCaseQtyStrForm.push(<BaseFormItem label={'总件数：'}>
    <label>{item.totalCaseQty == null ? 0 : item.totalCaseQty}</label>
  </BaseFormItem>);
  totalCaseQtyStrForm.push(<BaseFormItem label={'总体积：'}>
    <label>{item.totalVolume == null ? 0 : item.totalVolume}</label>
  </BaseFormItem>);

  totalCaseQtyStrForm.push(<BaseFormItem label={'总重量：'}>
    <label>{item.totalWeight == null ? 0 : item.totalWeight}</label>
  </BaseFormItem>);

  const toolbar = [];
  toolbar.push(<Button key={Guid()} onClick={handleCreate} >保存</Button>);
  toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);

  const ShipBillCreateItemGen = () => <ShipBillCreateItem {...shipBillCreateItemProps} />;
  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="装车单信息" single={false}>
        <BaseForm items={children} />
        <BaseForm items={totalCaseQtyStrForm} />
      </BaseCard>
      <BaseCard single>
        <ShipBillCreateItemGen />
      </BaseCard>
      <Panel title="说明">
        <Form.Item>
          {getFieldDecorator('remark', {
            initialValue: item.remark, rules: [{ max: 255, message: '说明最大长度是255！' }],
          })(
            <Input type="textarea" autosize={{ minRows: 4 }} />
                        )}
        </Form.Item>
      </Panel>
    </div>
  );
};

export default Form.create()(ShipBillCreateForm);
