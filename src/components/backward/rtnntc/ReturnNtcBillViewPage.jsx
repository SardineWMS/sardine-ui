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
import ReturnNtcBillViewItem from './ReturnNtcBillViewItem';
import PermissionUtil from '../../../utils/PermissionUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const ReturnNtcBillViewPage = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onFinish,
    onAbort,
    onGenRtnBill
}) => {
    function convertState(text) {
        if (text == "initial")
            return '初始';
        if (text = "finished")
            return '已完成';
        if (text = "aborted")
            return '已作废';
        if (text = "inProgress")
            return '进行中';
    };
    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="客户：" key={Guid()}>
        <span>{item.customer.name + "[" + item.customer.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="来源单据：" key={Guid()}>
        <span>{item.sourceBillNumber == null ? "" : item.sourceBillType + "[" + item.sourceBillNumber + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="退货日期：" key={Guid()}>
        <span>{moment(item.returnDate).format("YYYY-MM-DD h:mm:ss")}</span>
    </BaseFormItem>);

    let extendForm = [];
    extendForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.totalCaseQtyStr}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="已退总件数：" key={Guid()}>
        <span>{item.totalReturnedCaseQtyStr}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{item.totalAmount}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="已退总金额：" key={Guid()}>
        <span>{item.totalReturnedAmount}</span>
    </BaseFormItem>);

    const returnNtcBillViewItemProps = {
        dataSource: item.items
    };

    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={!(item.state == "initial") && PermissionUtil("rtnNtcBill:edit")}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button disabled={!(item.state == "initial" || item.state == "aborted") && PermissionUtil("rtnNtcBill:delete")}>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onGenRtnBill(item)} disabled={!(item.state == "initial") && PermissionUtil("rtnNtcBill:edit")}>生成退仓单</Button >);
    toolbar.push(<Button onClick={() => onFinish(item)} disabled={!(item.state == "initial") && PermissionUtil("rtnNtcBill:edit")}>完成</Button>);
    toolbar.push(<Button onClick={() => onAbort(item)} disabled={!(item.state == "initial") && PermissionUtil("rtnNtcBill:edit")}>作废</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="收货单信息">
                <BaseForm items={basicForm} />
                <BaseForm items={extendForm} />
            </BaseCard>
            <BaseCard single={true} title="商品明细">
                <BaseForm items={<ReturnNtcBillViewItem {...returnNtcBillViewItemProps} />} />
            </BaseCard>
            <RemarkCard />
        </div>
    );
};

ReturnNtcBillViewPage.propTypes = {
    dataSource: PropTypes.array
};

export default Form.create()(ReturnNtcBillViewPage);
