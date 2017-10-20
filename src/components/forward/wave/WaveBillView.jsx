import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin, Tabs } from 'antd';
import timeStamp2datetime from '../../../utils/DateUtils';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseCard from '../../Widget/BaseCard';
import RemarkCard from '../../Widget/RemarkCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import Guid from '../../../utils/Guid';
import PermissionUtil from '../../../utils/PermissionUtil';
import WaveBillAlcNtcItem from './WaveBillAlcNtcItem';
import WaveBillPickupItem from './WaveBillPickupItem';
const TabPane = Tabs.TabPane;

const WaveBillView = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onStart,
    onConfirm,
    onRollBack
}) => {
    function convertState(text) {
        if (text == "initial")
            return '初始';
        if (text == "inProgress")
            return '启动中';
        if (text == "exception")
            return '启动异常';
        if (text == 'started')
            return '启动完成';
        if (text == 'inAlc')
            return '配货中';
        if (text == 'finished')
            return '已完成';
    };

    function convertType(text) {
        if (text == 'normal')
            return '正常波次';
        if (text == 'eCommerce')
            return '电商波次';
    }

    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="波次类型：" key={Guid()}>
        <span>{convertType(item.waveType)}</span>
    </BaseFormItem>);

    if (item.waveType != 'eCommerce')
        basicForm.push(<BaseFormItem label="线路体系：" key={Guid()}>
            <span>{item.serialArch.name + "[" + item.serialArch.code + "]"}</span>
        </BaseFormItem>);

    let operateForm = [];
    operateForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);


    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onBack(item)} >返回</Button >
    );
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={(item.state != 'initial') || (!PermissionUtil("waveBill:edit"))}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" disabled={(item.state != 'initial') || (!PermissionUtil("waveBill:delete"))} onConfirm={() => onDelete(item)}>
            <Button >删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button disabled={(item.state != 'initial') || (!PermissionUtil("waveBill:start"))} onClick={() => onStart(item)}>启动</Button >)
    toolbar.push(<Button disabled={((item.state != 'started') && (item.state != 'exception')) || (!PermissionUtil("waveBill:start"))} onClick={() => onRollBack(item)}>回滚</Button >)
    toolbar.push(<Button disabled={(item.state != 'started') || (!PermissionUtil("waveBill:start"))}  onClick={() => onConfirm(item)}>确认</Button >)

    const waveBillViewItemProps = {
        dataSource: item.ntcItems
    };

    const waveBillPickupItem = {
        dataSource: item.pickItems
    };

    const waveBillRplItem = {
        dataSource: item.rplItems
    };

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="基本信息">
                <BaseForm items={basicForm} />
                <BaseForm items={operateForm} />
            </BaseCard>
            <BaseCard single={true} title="明细">
                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab="配单">
                        <BaseForm items={<WaveBillAlcNtcItem {...waveBillViewItemProps} />} />
                    </TabPane>
                    {item.pickItems.length >= 1 ?
                        <TabPane key="2" tab="拣货单">
                            <BaseForm items={<WaveBillPickupItem {...waveBillPickupItem} />} />
                        </TabPane> : <div />}
                    {item.rplItems.length >= 1 ?
                        <TabPane key="3" tab="补货单">
                            <BaseForm items={<WaveBillPickupItem {...waveBillRplItem} />}></BaseForm>
                        </TabPane> : <div />}
                </Tabs>
            </BaseCard>
            <RemarkCard />
        </div>
    );
};

WaveBillView.propTypes = {
    item: PropTypes.object
};

export default Form.create()(WaveBillView);