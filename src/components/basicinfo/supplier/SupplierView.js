import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal, Card, Select, InputNumber, Popconfirm } from 'antd';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import styles from '../../less/common.less';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import PermissionUtil from '../../../utils/PermissionUtil';
import Guid from '../../../utils/Guid';

const SupplierView = ({
  item = {},
  onEdit,
  onRemove,
  onRecover,
  onBack,
  onViewLog
  }) => {

  function convertState(text) {
    if (text == "online")
      return '正常';
    if (text = "offline")
      return '停用';
  };

  const basicFormItems = [];
  basicFormItems.push(
    <BaseFormItem label="代码 :" key="code">
      <span> {item.code} </span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="名称 :" key="name">
      <span> {item.name} </span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="简称 :" key="simpleName">
      <span>{item.simpleName}</span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="地址 ：" key="address">
      <span>{item.address} </span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="联系方式 :" key="phone">
      <span>{item.phone} </span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="存储区域 ：" key="storageArea">
      <span>{item.storageArea} </span>
    </BaseFormItem>
  );
  

  const stateFormItems = [];
  stateFormItems.push(
    <BaseFormItem label="EMAIL ：" key="eMail">
      <span>{item.eMail} </span>
    </BaseFormItem>
  );
  stateFormItems.push(
    <BaseFormItem label="邮编 ：" key="zCode">
      <span>{item.zCode} </span>
    </BaseFormItem>
  );
  stateFormItems.push(
    <BaseFormItem label="传真 ：" key="fax">
      <span>{item.fax} </span>
    </BaseFormItem>
  );
  stateFormItems.push(
    <BaseFormItem label="状态 :" key="state">
      <span> {convertState(item.state)} </span>
    </BaseFormItem>
  );
  stateFormItems.push(
    <BaseFormItem label="操作信息 :" key="createInfo">
      <span>{createInfo2String(item)}</span>
    </BaseFormItem>
  );
  stateFormItems.push(
  <BaseFormItem label="最后修改信息 :" key="lastModifyInfo">
    <span>{ lastModifyInfo2String(item) }</span>
  </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push(<Button type="primary" onClick={() => onEdit(item)} disabled={!PermissionUtil("supplier:edit")} key="edit"> 编辑</Button>);
  toolbar.push(<Popconfirm title="确定要停用吗？" onConfirm={() => onRemove(item)} key="delete">
    <Button disabled={(item.state === "offline") || (!PermissionUtil("supplier:edit"))} >停用</Button>
  </Popconfirm>);
  toolbar.push(<Popconfirm title="确定要启用吗？" onConfirm={() => onRecover(item)} key="recele">
    <Button disabled={(item.state === "online") || (!PermissionUtil("supplier:edit"))}>启用</Button>
  </Popconfirm>);
  toolbar.push(<Button onClick={() => onBack()} key="back"> 返回</Button>);

  return (
    <div>
      <ToolbarPanel children={toolbar} />
      <BaseCard title="基本信息" single={false}>
        <BaseForm items={basicFormItems} />
        <BaseForm items={stateFormItems} />
      </BaseCard>
      <RemarkCard remark={item.remark} />
    </div>
  );
};

SupplierView.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onCreate: PropTypes.func,
  onBack: PropTypes.func
};

export default SupplierView;