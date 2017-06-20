import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal, Card, Select, InputNumber, Popconfirm } from 'antd';
import styles from '../less/common.less';
import { createInfo2String, lastModifyInfo2String } from '../../utils/OperatorInfoUtils';
import ToolbarPanel from '../Widget/ToolbarPanel';
import BaseCard from '../Widget/BaseCard';
import RemarkCard from '../Widget/RemarkCard';
import BaseForm from '../Widget/BaseForm';
import BaseFormItem from '../Widget/BaseFormItem';

const UserViewForm = ({
    item = {},
    onEdit,
    onCreate,
    onBack,
    onOnline,
    onOffline
}) => {
    const children = [];
    children.push(
        <BaseFormItem label="代码：" >
            <span> {item.code} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="名称：" >
            <span> {item.name} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="电话：" >
            <span> {item.phone} </span>
        </BaseFormItem>
    );

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCreate()}> 新建</Button>);
    toolbar.push(<Button onClick={() => onEdit(item)}> 编辑</Button>);
    toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);
    toolbar.push(<Popconfirm title="确定要启用吗？" onConfirm={() => onOnline(item)}>
        <Button disabled={item.userState === '已启用'}>启用</Button>
    </Popconfirm>);
    toolbar.push(<Popconfirm title="确定要停用吗？" onConfirm={() => onOffline(item)}>
        <Button disabled={item.userState === '已停用'}>停用</Button>
    </Popconfirm>);

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息" single={true}>
                <BaseForm items={children} />
            </BaseCard>
        </div>
    );
};

UserViewForm.propTypes = {
    form: PropTypes.object,
    item: PropTypes.object,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func
};

export default UserViewForm;