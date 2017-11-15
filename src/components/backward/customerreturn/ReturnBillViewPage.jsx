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
import ReturnBillViewItem from './ReturnBillViewItem';
import PermissionUtil from '../../../utils/PermissionUtil';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const ReturnBillViewPage = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onAudit,
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

    function convertMethod(text) {
        if (text == "ManualBill")
            return '手工单据';
        if (text == 'APP')
            return 'APP';
    };
    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="退仓通知单：" key={Guid()}>
        <span>{item.returnNtcBillNumber}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="客户：" key={Guid()}>
        <span>{item.customer.name + "[" + item.customer.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="退仓员：" key={Guid()}>
        <span>{item.returnor == null ? "" : item.returnor.name + "[" + item.returnor.code + "]"}</span>
    </BaseFormItem>);
    basicForm.push(<BaseFormItem label="单据类型：" key={Guid()}>
        <span>{convertMethod(item.type)}</span>
    </BaseFormItem>);

    let extendForm = [];
    extendForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.totalCaseQtyStr}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{item.totalAmount}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="创建信息：" key={Guid()}>
        <span>{createInfo2String(item)}</span>
    </BaseFormItem>);
    extendForm.push(<BaseFormItem label="最后修改信息：" key={Guid()}>
        <span>{lastModifyInfo2String(item)}</span>
    </BaseFormItem>);

    const ReturnBillViewPage = {
        dataSource: item.items
    };

    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={!(item.state == "initial") && PermissionUtil("storeRtnBill:edit")}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button disabled={!(item.state == "initial") && PermissionUtil("storeRtnBill:delete")}>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onAudit(item)} disabled={!(item.state == "initial") && PermissionUtil("storeRtnBill:edit")}>审核</Button>);
    toolbar.push(<Button onClick={() => onBack()}>返回 </Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="退仓单信息">
                <BaseForm items={basicForm} />
                <BaseForm items={extendForm} />
            </BaseCard>
            {/*<BaseCard single={true} title="商品明细">*/}
            <BaseForm items={<ReturnBillViewItem {...ReturnBillViewPage} />} />
            {/*</BaseCard>*/}
            <RemarkCard remark={item.remark} />
        </div>
    );
};

ReturnBillViewPage.propTypes = {
    dataSource: PropTypes.array
};

export default Form.create()(ReturnBillViewPage);
