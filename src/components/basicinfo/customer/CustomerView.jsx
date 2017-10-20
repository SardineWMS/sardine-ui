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

const CustomerView = ({
    item = {},
    onBack,
    onOffline,
    onOnline,
    showEdit
}) => {

    const code = item.code;
    let offlineRight = false;
    let onlineRight = false;
    if (item.state === "online") {
        offlineRight = false;
        onlineRight = true;
    };
    if (item.state === "offline") {
        offlineRight = true;
        onlineRight = false;
    };

    function convertType(text) {
        if (text == "shop")
            return '精品店';
        if (text = "store")
            return '百货';
    };

    function convertState(text) {
        if (text == "online")
            return '正常';
        if (text = "offline")
            return '停用';
    };

    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="代码：" key={Guid()}>
        <span>{item.code}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="名称：" key={Guid()}>
        <span>{item.name}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="简称：" key={Guid()}>
        <span>{item.simpleName}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="类型：" key={Guid()}>
        <span>{convertType(item.type)}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="联系人：" key={Guid()}>
        <span>{item.contacter}</span>
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
    stateFormItems.push(<BaseFormItem label="操作信息：" key={Guid()}><span>{createInfo2String(item)}</span></BaseFormItem>);
    stateFormItems.push(<BaseFormItem label="最后修改信息：" key={Guid()}><span>{lastModifyInfo2String(item)}</span></BaseFormItem>);

    let toolbar = [];
    toolbar.push(<Button type="primary" onClick={() => showEdit(item)} key={Guid()} disabled={!PermissionUtil("customer:edit")}>编辑</Button>);
    toolbar.push(<Popconfirm title="确定要停用吗？" onConfirm={() => onOffline(item)} key={Guid()}>
        <Button disabled={offlineRight || (!PermissionUtil("customer:edit"))} >停用</Button>
    </Popconfirm>);
    toolbar.push(<Popconfirm title="确定要启用吗？" onConfirm={() => onOnline(item)} key={Guid()}>
        <Button disabled={onlineRight || (!PermissionUtil("customer:edit"))}>启用</Button>
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
