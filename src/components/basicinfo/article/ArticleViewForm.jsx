import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Button, Modal, Card } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import PermissionUtil from '../../../utils/PermissionUtil';

const ArticleViewForm = ({
    article,
    onEdit,
    onCreate,
    onBack,
    onSaveSupplier,
}) => {

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCreate()} disabled={!PermissionUtil("article:create")}> 新建</Button>);
    toolbar.push(<Button onClick={() => onEdit(article)} disabled={!PermissionUtil("article:edit")}> 编辑</Button>);
    toolbar.push(<Button onClick={() => onBack()}> 返回</Button>);

    const children = [];
    children.push(
        <BaseFormItem label="代码:" >
            <span>{article.code} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="名称：" >
            <span>{article.name} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="规格：" >
            <span>{article.spec} </span>
        </BaseFormItem> 
    );
    children.push(
        <BaseFormItem label="状态：" >
            <span>{article.state == "normal" ? "正常" : article.state} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="保质期：" >
            <span>{article.expDays}</span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="商品类别：" >
            <span>{article.category ? "[" + article.category.code + "]" + article.category.name : ""} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="质量管理：" >
            <span>{article.firstInFirstOut ? "是" : "否"} </span>
        </BaseFormItem>
    );
     children.push(
        <BaseFormItem label="商品固定拣货位：" >
            <span>{article.fixedPickBin} </span>
        </BaseFormItem>
    );

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard>
                <BaseForm items={children} />
            </BaseCard>
        </div>
    );
};

ArticleViewForm.propTypes = {
    article: PropTypes.object,
    onEdit: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onSaveSupplier: PropTypes.func,
};

export default ArticleViewForm;