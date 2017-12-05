import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin, Tabs } from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';
import ShipBillCustomerItemForm from './ShipBillCustomerItemForm';
import ShipBillContainerStockForm from './ShipBillContainerStockForm';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import RemarkCard from '../../Widget/RemarkCard';

const TabPane = Tabs.TabPane;


const ShipBillViewForm = ({
    shipBill = {},
    onBack,
    onFinish,
    onEdit,
}) => {
  function converState(text) {
    if (text == 'Initial') { return '初始'; }
    if (text == 'InProgress') { return '装车中'; }
    if (text == 'Finished') { return '已完成'; }
    return ''
  }
  const basicForm = [];
  basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
    <span>{shipBill.billNumber}</span>
  </BaseFormItem>);
  basicForm.push(<BaseFormItem label="车牌号" key={Guid()}>
    <span>{shipBill.vehicleNum}</span>
  </BaseFormItem>);
  basicForm.push(<BaseFormItem label="承运商：" key={Guid()}>
    <span>{`${shipBill.carrier.name}[${shipBill.carrier.code}]`}</span>
  </BaseFormItem>);
  basicForm.push(<BaseFormItem label="司机：" key={Guid()}>
    <span>{`${shipBill.driver.name}[${shipBill.driver.code}]`}</span>
  </BaseFormItem>);
  basicForm.push(<BaseFormItem label="配送方式：" key={Guid()}>
    {shipBill.deliveryType === 'warehouse' ?
      <span>仓库送</span>
            :
      <span>自提</span>
        }
  </BaseFormItem>);
  basicForm.push(<BaseFormItem label="单据类型：" key={Guid()}>
    {shipBill.method === 'ManualBill' ?
      <span>手工单据</span>
            :
      <span>APP</span>
        }
  </BaseFormItem>);

  const extendForm = [];
  extendForm.push(<BaseFormItem label="状态：" key={Guid()}>
    <span>{converState(shipBill.state)}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="总件数：" key={Guid()}>
    <span>{shipBill.totalCaseQty}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="总体积：" key={Guid()}>
    <span>{shipBill.totalVolume}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="总重量：" key={Guid()}>
    <span>{shipBill.totalWeight}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="总金额：" key={Guid()}>
    <span>{shipBill.totalAmount}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="创建信息：" key={Guid()}>
    <span>{createInfo2String(shipBill)}</span>
  </BaseFormItem>);
  extendForm.push(<BaseFormItem label="最后修改信息：" key={Guid()}>
    <span>{createInfo2String(shipBill)}</span>
  </BaseFormItem>);

  const toolbar = [];
  toolbar.push(<Button onClick={() => onEdit()}>编辑</Button>);
  toolbar.push(
    <Popconfirm title="确定要完成吗？" onConfirm={() => onFinish(shipBill)}>
      <Button disabled={!(shipBill.state == 'Initial' || shipBill.state == 'InProgress') || (!PermissionUtil('shipBill:finish'))}> 完成</Button>
    </Popconfirm>
    );
  toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);

  const shipBillCustomerItemProps = {
    dataSource: shipBill.customerItems,
  };

  const shipBillContainerStockProps = {
    dataSource: shipBill.containerStocks,
  };

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard single={false} title="装车单信息">
        <BaseForm items={basicForm} />
        <BaseForm items={extendForm} />
      </BaseCard>
      <Tabs>
        <TabPane tab="客户明细" key="1">
          <ShipBillCustomerItemForm {...shipBillCustomerItemProps} />
        </TabPane>
        <TabPane tab="容器库存" key="2">
          <ShipBillContainerStockForm {...shipBillContainerStockProps} />
        </TabPane>
      </Tabs>
      <RemarkCard remark={shipBill.remark} />
    </div>
  );
};

ShipBillViewForm.propTypes = {
  dataSource: PropTypes.array,
};

export default Form.create()(ShipBillViewForm);
