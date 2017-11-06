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
import ArticleItemGrid from './AlcNtcBillViewItem.jsx';
import PermissionUtil from '../../../utils/PermissionUtil';

const AlcNtcBillView = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onAudit,
    onAbort
}) => {
    function convertState(text) {
        if (text == "initial")
            return '初始';
        if (text == "aborted")
            return '已作废';
        if (text == "inAlc")
            return '待配送';
        if (text == 'inSorting')
            return '分拣中';
        if (text == 'finished')
            return '已完成';
        if (text == 'inProgress')
            return '配送中';
        if (text == 'handover')
            return '已交接';
        if (text == "used")
            return '已使用';
    };

    function convertDeliveryMode(text) {
        if (text == "warehouseDelivery")
            return "仓库配送";
        if (text == "sf")
            return "顺丰";
        if (text == "st")
            return "申通";
        if (text == "yt")
            return "圆通";
        if (text == "zt")
            return '中通';
        if (text == "ht")
            return '汇通';
        if (text == "yd")
            return '韵达';
    }

    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="客户：" key={Guid()}>
        <span>{"[" + item.customer.code + "]" + item.customer.name}</span>
    </BaseFormItem>);

    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="来源单据：" key={Guid()}>
        <span>{"[" + item.sourceBillNumber + "]" + item.sourceBillType}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="配送方式：" key={Guid()}>
        <span>{convertDeliveryMode(item.deliveryMode)}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="配送原因：" key={Guid()}>
        <span>{item.deliveryReason}</span>
    </BaseFormItem>);

    let operateForm = [];
    operateForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="创建信息：" key={Guid()}>
        <span>{createInfo2String(item)}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="最后修改信息 ：" key={Guid()}>
        <span>{lastModifyInfo2String(item)}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.totalCaseQtyStr}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{item.totalAmount == null ? 0 : item.totalAmount}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="计划总件数：" key={Guid()}>
        <span>{item.planTotalCaseQtyStr == null ? 0 : item.planTotalCaseQtyStr}</span>
    </BaseFormItem>);
    operateForm.push(<BaseFormItem label="实际总件数：" key={Guid()}>
        <span>{item.realTotalCaseQtyStr == null ? 0 : item.realTotalCaseQtyStr}</span>
    </BaseFormItem>);


    let toolbar = [];
    toolbar.push(
        <Button onClick={() => onBack()}>返回</Button>
    )
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={(item.state != 'initial') || (!PermissionUtil("alcNtcBill:edit"))}>编辑</Button>
    );
    toolbar.push(
        <Button onClick={() => onAbort(item)} disabled={item.state != 'initial' || (!PermissionUtil("alcNtcBill:edit"))}>作废</Button>
    )
    /**
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button disabled={!((item.state == 'initial') || (item.state == 'aborted')) || (!PermissionUtil("alcNtcBill:delete"))}>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onAudit(item)} disabled={(item.state != 'initial') || (!PermissionUtil("alcNtcBill:edit"))}>审核</Button >)
    */
    const articleItemProps = {
        dataSource: item.items
    };

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="出库通知单">
                <BaseForm items={basicForm} />
                <BaseForm items={operateForm} />
            </BaseCard>
            <BaseCard single={true} title="商品明细">
                <ArticleItemGrid {...articleItemProps} />
            </BaseCard>
            <RemarkCard />
        </div>
    );
};

AlcNtcBillView.propTypes = {
    item: PropTypes.object
};

export default Form.create()(AlcNtcBillView);