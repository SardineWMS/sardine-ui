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

const CustomerView = ({item = {},
    onBack,
    onRemove,
    onRecover,
    showEdit,
}) => {

    const code = item.code;
    let removeRight = false;
    let recoverRight = false;
    if (item.state === "正常") {
        removeRight = false;
        recoverRight = true;
    }
    if (item.state === "已删除") {
        removeRight = true;
        recoverRight = false;
    }
    let basicFormItems = [];
    basicFormItems.push(<BaseFormItem label="客户代码：" key={Guid()}>
                            <span>{item.code}</span>
                        </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="客户名称：" key={Guid()}>
                            <span>{item.name}</span>
                        </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="客户类型：" key={Guid()}>
                            <span>{item.type}</span>
                        </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="联系方式：" key={Guid()}>
                            <span>{item.phone}</span>
                        </BaseFormItem>);
    basicFormItems.push(<BaseFormItem label="联系地址：" key={Guid()}>
                            <span>{item.address}</span>
                        </BaseFormItem>);

    let toolbar = [];
    toolbar.push(<Button onClick={() => showEdit(item)} key={Guid()}>编辑</Button>);
    toolbar.push(<Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)} key={Guid()}>
                    <Button disabled={removeRight} >删除</Button>
                </Popconfirm>);
    toolbar.push(<Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)} key={Guid()}>
                    <Button disabled={recoverRight}>恢复</Button>
                </Popconfirm>);
    toolbar.push(<Button onClick={() => onBack()} key={Guid()}>返回</Button>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
                <BaseForm items={basicFormItems} />
            </BaseCard>
            <RemarkCard remark={item.remark} />
        </div>
    )
};
export default CustomerView;
