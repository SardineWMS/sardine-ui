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

const PickAreaViewForm = ({ item = {},
    onBack,
    onRemove,
    showEdit
}) => {

    function convertOperateMode(text) {
        if (text == 'ManualBill')
            return '手工单据';
        if (text == 'APP')
            return 'APP';
    };

    function convertRplQtyMode(text) {
        if (text == 'enoughShipments')
            return '够出货量';
        if (text == 'highestStock')
            return '最高库存';
    };

    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="代码：" key={Guid()}>
        <span>{item.code}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="名称：" key={Guid()}>
        <span>{item.name}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="货位范围：" key={Guid()}>
        <span>{item.binScope}</span>
    </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="存储区域：" key={Guid()}>
        <span>{item.storageArea}</span>
    </BaseFormItem>);

    let extendFormItems = [];
    extendFormItems.push(<BaseFormItem label="拣货方式：" key={Guid()}>
        <span>{convertOperateMode(item.pickMode)}</span>
    </BaseFormItem>);

    extendFormItems.push(<BaseFormItem label="分单体积：" key={Guid()}>
        <span>{item.pickVolume}</span>
    </BaseFormItem>);

    extendFormItems.push(<BaseFormItem label="补货方式：" key={Guid()}>
        <span>{convertOperateMode(item.rplMode)}</span>
    </BaseFormItem>);

    extendFormItems.push(<BaseFormItem label="补货量：" key={Guid()}>
        <span>{convertRplQtyMode(item.rplQtyMode)}</span>
    </BaseFormItem>);

    let toolbar = [];
    toolbar.push(<Button onClick={() => showEdit(item)} key={Guid()} disabled={!PermissionUtil("pickArea:edit")}>编辑</Button>);
    toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)} key={Guid()}>
        <Button disabled={(!PermissionUtil("pickArea:delete"))} >删除</Button>
    </Popconfirm>);
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
export default PickAreaViewForm;
