import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal,Card,Select,InputNumber,Popconfirm} from 'antd';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import styles from '../../less/common.less';

import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';

const SupplierView = ({
  item = {},
  onEdit,
  onRemove,
  onRecover,
  onBack,
  onViewLog
  }) => {

    const children=[];
    children.push(
       <BaseFormItem  label="代码 :">
          <span> {item.code} </span>
      </BaseFormItem>
      );
    children.push(
       <BaseFormItem  label="名称 :">
          <span> {item.name} </span>
      </BaseFormItem>
      );
    children.push(
         <BaseFormItem  label="联系方式 :">
            <span>{item.phone} </span>
        </BaseFormItem>
      );
    children.push(
         <BaseFormItem  label="地址：">
            <span>{item.address} </span>
        </BaseFormItem>
      );

    const toolbar = [];
    toolbar.push(<Button  onClick={() => onEdit(item)}> 编辑</Button>);
    toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)}>
                      <Button disabled={item.state==="deleted"} >删除</Button>
                    </Popconfirm>);
    toolbar.push( <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)}>
                       <Button disabled={item.state==="normal"}>恢复</Button>
                    </Popconfirm> );
    toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
                <BaseForm items={basicFormItems} />
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
  onBack: PropTypes.func,
};

export default SupplierView;