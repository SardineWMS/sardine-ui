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
import ArticleItemGrid from './ReceiveBillItemGrid_View';

const ReceiveBillView = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onFinish,
}) => {
    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>)
    basicForm.push(<BaseFormItem label="入库订单号：" key={Guid()}>
        <span>{item.orderBillNumber}</span>
    </BaseFormItem>)
    basicForm.push(<BaseFormItem label="供应商：" key={Guid()}>
        <span>{item.supplier.name + "[" + item.supplier.code + "]"}</span>
    </BaseFormItem>)
    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>)
    basicForm.push(<BaseFormItem label="收货人：" key={Guid()}>
        <span>{item.receiver.name + "[" + item.receiver.code + "]"}</span>
    </BaseFormItem>)

    let extendForm = [];
    extendForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{item.state}</span>
    </BaseFormItem>)
    extendForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.caseQtyStr}</span>
    </BaseFormItem>)

    const articleItemProps = {
        dataSource: item.items,
    }

    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onFinish(item)}>审核</Button>)

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="收货单信息">
                <BaseForm items={basicForm} />
                <BaseForm items={extendForm} />
            </BaseCard>
            <BaseCard single={true} title="商品明细">
                <BaseForm items={<ArticleItemGrid {...articleItemProps} />} />
            </BaseCard>
            <RemarkCard />
        </div>
    );
}

ReceiveBillView.propTypes = {
    dataSource: PropTypes.array,
}

export default Form.create()(ReceiveBillView);
