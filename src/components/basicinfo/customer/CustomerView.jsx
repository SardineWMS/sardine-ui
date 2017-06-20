import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin } from 'antd';
import timeStamp2datetime from '../../../utils/DateUtils';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';

const CustomerView = ({ item = {},
    onBack,
    onRemove,
    onRecover,
    showEdit
}) => {

    const code = item.code;
    let removeRight = false;
    let recoverRight = false;
    if (item.state === "normal") {
        removeRight = false;
        recoverRight = true;
    };
    if (item.state === "deleted") {
        removeRight = true;
        recoverRight = false;
    };

    function convertType(text) {
        if (text == "shop")
            return '精品店';
        if (text = "store")
            return '百货';
    };

    function convertState(text) {
        if (text == "normal")
            return '正常';
        if (text = "deleted")
            return '已删除';
    };

    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="代码：" key={Guid()}>
        <span>{item.code}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="名称：" key={Guid()}>
        <span>{item.name}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="类型：" key={Guid()}>
        <span>{convertType(item.type)}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="联系方式：" key={Guid()}>
        <span>{item.phone}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="地址：" key={Guid()}>
        <span>{item.address}</span>
    </BaseFormItem>);

    let stateFormItems = [];
    stateFormItems.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);

    let toolbar = [];
    toolbar.push(<Button onClick={() => showEdit(item)} key={Guid()} disabled={!PermissionUtil("customer:edit")}>编辑</Button>);
    toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)} key={Guid()}>
        <Button disabled={removeRight && (!PermissionUtil("customer:edit"))} >删除</Button>
    </Popconfirm>);
    toolbar.push(<Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)} key={Guid()}>
        <Button disabled={recoverRight && (!PermissionUtil("customer:edit"))}>恢复</Button>
    </Popconfirm>);
    toolbar.push(<Button onClick={() => onBack()} key={Guid()}>返回</Button>);

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
export default CustomerView;
