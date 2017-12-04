import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal, Card, Select, InputNumber, Popconfirm } from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseTwoCol from '../../Widget/BaseTwoCol';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import ArticleItemGrid from './OrderBillViewItem';


const OrderBillView = ({
	item = {},
	onEditItem,
	onDeleteItem,
	onBookRegItem,
	onCheckItem,
	onFinishItem,
	onAbortItem,
	onBack,
}) => {
  function converState(text) {
    if (text === 'Initial') { return '初始'; }
    if (text === 'PreBookReg') { return '已预约'; }
    if (text === 'PreChecked') { return '已预检'; }
    if (text === 'InProgress') { return '进行中'; }
    if (text === 'Finished') { return '已完成'; }
    if (text === 'Aborted') { return '已作废'; }
    return ''
  }

  function codeAddName(code, name) {
    return `[${code}]${name}`;
  }

  const baseChildren = [];
  const stateChildren = [];

  baseChildren.push(
    <BaseFormItem label="单号 :">
      <span> {item.billNumber} </span>
    </BaseFormItem>
	);
  baseChildren.push(
    <BaseFormItem label="供应商 :">
      <span> {codeAddName(item.supplier.code, item.supplier.name)} </span>
    </BaseFormItem>
	);
  baseChildren.push(
    <BaseFormItem label="仓位 :">
      <span> {codeAddName(item.wrh.code, item.wrh.name)} </span>
    </BaseFormItem>
	);
  baseChildren.push(
    <BaseFormItem label="到效日期 :">
      <span> {item.expireDate.format('YYYY-MM-DD')} </span>
    </BaseFormItem>
	);
  baseChildren.push(
    <BaseFormItem label="预约日期 :">
      <span> {item.bookedDate == null ? null : item.bookedDate.format('YYYY-MM-DD')} </span>
    </BaseFormItem>
	);
  baseChildren.push(
    <BaseFormItem label="来源单据 :">
      <span> {item.sourceBillNumber} </span>
    </BaseFormItem>
	);

  stateChildren.push(
    <BaseFormItem label="状态 :">
      <span> {converState(item.state)} </span>
    </BaseFormItem>
	);
  stateChildren.push(
    <BaseFormItem label="总件数 :">
      <span> {item.totalCaseQtyStr} </span>
    </BaseFormItem>
	);

  stateChildren.push(
    <BaseFormItem label="已收货件数 :">
      <span> {item.receivedCaseQtyStr} </span>
    </BaseFormItem>
	);

  stateChildren.push(
    <BaseFormItem label="创建信息 :">
      <span> {createInfo2String(item)} </span>
    </BaseFormItem>
	);
  stateChildren.push(
    <BaseFormItem label="最后修改信息 :">
      <span> {lastModifyInfo2String(item)} </span>
    </BaseFormItem>
	);

  const colChildren = [];
  colChildren.push(
    <Col span={12} key="col1">
      {baseChildren}
    </Col>
	);
  colChildren.push(
    <Col span={12} key="col2">
      {stateChildren}
    </Col>
	);


  const toolbar = [];
  toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);
  toolbar.push(<Button disabled={item.state !== 'Initial'} onClick={() => onEditItem(item)}> 编辑</Button>);
  toolbar.push(<Button disabled={item.state !== 'Initial'} onClick={() => onBookRegItem(item)}> 预约</Button>);
  toolbar.push(<Popconfirm title="确定要预检吗？" onConfirm={() => onCheckItem(item)}>
    <Button disabled={item.state !== 'Initial' && item.state !== 'PreBookReg'}>预检</Button>
  </Popconfirm>);
  toolbar.push(<Popconfirm title="确定要完成吗？" onConfirm={() => onFinishItem(item)}>
    <Button disabled={item.state === 'Finished' || item.state === 'Aborted'}>完成</Button>
  </Popconfirm>);
  toolbar.push(<Popconfirm title="确定要作废吗？" onConfirm={() => onAbortItem(item)}>
    <Button disabled={item.state !== 'Initial'}>作废</Button>
  </Popconfirm>);
  toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(item)}>
    <Button disabled={item.state !== 'Initial'}>删除</Button>
  </Popconfirm>);


  const articleItemProps = {
    dataSource: item.items,
  };
  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息" single>
        <BaseForm items={colChildren} />
      </BaseCard>
      <BaseCard single title="商品明细">
        <ArticleItemGrid {...articleItemProps} />
      </BaseCard>
      <RemarkCard remark={item.note} />
    </div>
  );
};

OrderBillView.propTypes = {
  onBack: PropTypes.func,
};

export default OrderBillView;
