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
import RtnSupplierNtcBillViewItem from './RtnSupplierNtcBillViewItem';
import PermissionUtil from '../../../utils/PermissionUtil';
import styles from '../../less/common.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const RtnSupplierNtcBillViewPage = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onFinish,
    onAbort,
    onGenTask
}) => {
    function convertState(text) {
        if (text == "Initial")
            return '未审核';
        if (text == "Finished")
            return '已完成';
        if (text == "Aborted")
            return '已作废';
        if (text == "InProgress")
            return '进行中';
    };

    function viewLog(){
        window.location.href=`/#/inner/entitylog?key=${item.uuid}`;
    };

    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="供应商：" key={Guid()}>
        <span>{item.supplier.name + "[" + item.supplier.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="来源单据：" key={Guid()}>
        <span>{item.sourceBill == null ? "" : item.sourceBill.billType + "[" + item.sourceBill.billNumber + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="退货日期：" key={Guid()}>
        <span>{moment(item.returnDate).format("YYYY-MM-DD")}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.totalCaseQtyStr}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="已下架总件数：" key={Guid()}>
        <span>{item.unshelvedCaseQtyStr}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{item.totalAmount}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="已下架总金额：" key={Guid()}>
        <span>{item.unshelvedAmount}</span>
    </BaseFormItem>);

    let stateForm = [];
    stateForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);
    stateForm.push(<BaseFormItem label="操作信息：" key={Guid()}><span>{createInfo2String(item)}</span></BaseFormItem>);
    stateForm.push(<BaseFormItem label="最后修改信息：" key={Guid()}><span>{lastModifyInfo2String(item)}</span></BaseFormItem>);
    stateForm.push(<BaseFormItem label="日志：" key={Guid()}><span><a onClick={() => viewLog()} >详情</a></span></BaseFormItem>);

    const rtnSupplierNtcBillViewItemProps = {
        dataSource: item.items
    };

    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={!(item.state == "Initial") && PermissionUtil("rtnNtcBill:edit")}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button disabled={!(item.state == "Initial" || item.state == "Aborted") && PermissionUtil("rtnNtcBill:delete")}>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onGenTask(item)} disabled={!(item.state == "Initial") && PermissionUtil("rtnNtcBill:edit")}>生成下架指令</Button >);
    toolbar.push(<Button onClick={() => onFinish(item)} disabled={!(item.state == "Initial") && PermissionUtil("rtnNtcBill:edit")}>完成</Button>);
    toolbar.push(<Button onClick={() => onAbort(item)} disabled={!(item.state == "Initial") && PermissionUtil("rtnNtcBill:edit")}>作废</Button>);
    toolbar.push(<Button onClick={() => onBack()} >返回</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="收货单信息">
                <BaseForm items={basicForm} />
                <BaseForm items={stateForm} />
            </BaseCard>
            <BaseCard single={true} title="商品明细">
                <BaseForm items={<RtnSupplierNtcBillViewItem {...rtnSupplierNtcBillViewItemProps} />} />
            </BaseCard>
            <RemarkCard />
        </div>
    );
};

RtnSupplierNtcBillViewPage.propTypes = {
    dataSource: PropTypes.array
};

export default Form.create()(RtnSupplierNtcBillViewPage);
