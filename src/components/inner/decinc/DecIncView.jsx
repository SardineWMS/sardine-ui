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
import ArticleItemGrid from './DecIncViewItem.jsx';
import PermissionUtil from '../../../utils/PermissionUtil';

const DecIncView = ({
    item = {},
    onBack,
    onEdit,
    onDelete,
    onFinish,
}) => {
    function convertState(text) {
        if (text == "Initial")
            return '未审核';
        if (text = "Audited")
            return '已审核';
    };

    let basicForm = [];
    basicForm.push(<BaseFormItem label="单号：" key={Guid()}>
        <span>{item.billNumber}</span>
    </BaseFormItem>)
    basicForm.push(<BaseFormItem label="单据类型：" key={Guid()}>
        <span>{item.type == "Inc" ? '溢余' : '损耗'}</span>
    </BaseFormItem>)

    basicForm.push(<BaseFormItem label="仓位：" key={Guid()}>
        <span>{item.wrh.name + "[" + item.wrh.code + "]"}</span>
    </BaseFormItem>)

    let operateForm = [];
    operateForm.push(<BaseFormItem label="状态：" key={Guid()}>
        <span>{convertState(item.state)}</span>
    </BaseFormItem>)
    operateForm.push(<BaseFormItem label="创建人：" key={Guid()}>
        <span>{createInfo2String(item)}</span>
    </BaseFormItem>)
    operateForm.push(<BaseFormItem label="最后修改人 ：" key={Guid()}>
        <span>{lastModifyInfo2String(item)}</span>
    </BaseFormItem>)
    operateForm.push(<BaseFormItem label="总件数：" key={Guid()}>
        <span>{item.totalCaseQtyStr}</span>
    </BaseFormItem>)
    operateForm.push(<BaseFormItem label="总金额：" key={Guid()}>
        <span>{item.totalAmount}</span>
    </BaseFormItem>)


    let toolbar = [];
    toolbar.push(
        <Button key={Guid()} onClick={() => onEdit(item)} disabled={(item.state == 'Audited') || (!PermissionUtil("decIncBill:edit"))}>编辑</Button>
    );
    toolbar.push(
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(item)}>
            <Button disabled={(item.state == 'Audited') || (!PermissionUtil("decIncBill:audit"))}>删除</Button>
        </Popconfirm>
    );
    toolbar.push(<Button onClick={() => onFinish(item)} disabled={(item.state == 'Audited') || (!PermissionUtil("decIncBill:audit"))}>审核</Button >)

    const articleItemProps = {
        dataSource: item.items,
    }

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard single={false} title="损溢单明细">
                <BaseForm items={basicForm} />
                <BaseForm items={operateForm} />
            </BaseCard>
            <BaseCard single={true} title="商品明细">
                <BaseForm items={<ArticleItemGrid {...articleItemProps} />} />
            </BaseCard>
            <RemarkCard />
        </div>
    );
}

DecIncView.propTypes = {
    item: PropTypes.object,
}

export default Form.create()(DecIncView);