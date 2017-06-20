import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin } from 'antd';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';

const VehicleView = ({
    item = {},
    onBack,
    onOnline,
    onOffline,
    showEdit
}) => {
    function convertState(text) {
        if (text == "free")
            return '空闲';
        if (text == "unUse")
            return '待排车';
        if (text == "used")
            return '已排车';
        if (text == "shiping")
            return '装车中';
        if (text == "shiped")
            return '已装车';
        if (text == "inAlc")
            return '配送中';
        if (text == "offline")
            return '已停用';
    };
    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="代码：" key={Guid()}>
        <span>{item.code}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="车牌号：" key={Guid()}>
        <span>{item.vehicleNo}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="车型：" key={Guid()}>
        <span>{"[" + item.vehicleType.code + "]" + item.vehicleType.name}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="承运商：" key={Guid()}>
        <span>{"[" + item.carrier.code + "]" + item.carrier.name}</span>
    </BaseFormItem>);

    let extendFormItems = [];
    extendFormItems.push(<BaseFormItem label="状态：" key={Guid()}><span>{convertState(item.state)}</span></BaseFormItem>);

    let toolbar = [];
    toolbar.push(<Button onClick={() => showEdit(item)} key={Guid()} disabled={!item.state == 'free' ? true : !PermissionUtil("vehicle:edit")}>编辑</Button>);
    toolbar.push(<Popconfirm title="确定要停用吗？" onConfirm={() => onOffline(item)} key={Guid()}>
        <Button disabled={item.state ===
            'offline' ? true : !PermissionUtil("vehicle:edit")} >停用</Button>
    </Popconfirm >);
    toolbar.push(<Popconfirm title="确定要启用吗？" onConfirm={() => onOnline(item)} key={Guid()}>
        <Button disabled={item.state === 'free' ? true : !PermissionUtil("vehicle:edit")}>启用</Button>
    </Popconfirm >);
    toolbar.push(<Button onClick={() => onBack()} key={Guid()}>返回</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={false}>
                <BaseForm items={basicFormItems} />
                <BaseForm items={extendFormItems} />
            </BaseCard>
            <RemarkCard remark={item.remark} />
        </div>
    );
};

export default VehicleView;