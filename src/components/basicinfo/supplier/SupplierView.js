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

const SupplierView = ({
  item = {},
  onEdit,
  onRemove,
  onRecover,
  onBack,
  onViewLog
  }) => {

  function convertState(text) {
        if (text == "normal")
            return '正常';
        if (text = "deleted")
            return '已删除';
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
    <BaseFormItem label="联系方式 :" key="phone">
      <span>{item.phone} </span>
    </BaseFormItem>
  );
  basicFormItems.push(
    <BaseFormItem label="地址：" key="address">
      <span>{item.address} </span>
    </BaseFormItem>
  );
  const stateFormItems = [];
  stateFormItems.push(
    <BaseFormItem label="状态 :" key="state">
      <span> {convertState(item.state)} </span>
    </BaseFormItem>
  );

  const toolbar = [];
  toolbar.push(<Button onClick={() => onEdit(item)} disabled={!PermissionUtil("supplier:edit")} key="edit"> 编辑</Button>);
  toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)} key="delete">
    <Button disabled={(item.state === "deleted") && (!PermissionUtil("supplier:edit"))} >删除</Button>
  </Popconfirm>);
  toolbar.push(<Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)} key="recele">
    <Button disabled={(item.state === "normal") && (!PermissionUtil("supplier:edit"))}>恢复</Button>
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