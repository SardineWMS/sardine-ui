import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Button, Modal, Card } from 'antd';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import PermissionUtil from '../../../utils/PermissionUtil';
import RemarkCard from '../../Widget/RemarkCard';

const ArticleViewForm = ({
    article,
    onEdit,
    onCreate,
    onBack,
    onSaveSupplier
}) => {

    const toolbar = [];
    toolbar.push(<Button onClick={() => onCreate()} disabled={!PermissionUtil("article:create")} key="create"> 新建</Button>);
    toolbar.push(<Button onClick={() => onEdit(article)} disabled={!PermissionUtil("article:edit")} key="edit"> 编辑</Button>);
    toolbar.push(<Button onClick={() => onBack()} key="back"> 返回</Button>);

    const children = [];
    const businessChildren = [];
    children.push(
        <BaseFormItem label="代码:" key="code">
            <span>{article.code} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="第二代码:" key="secondCode">
            <span>{article.secondCode} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="名称：" key="name">
            <span>{article.name} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="简称：" key="simpleName">
            <span>{article.simpleName} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="包装：" key="spec">
            <span>{article.spec} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="商品类别：" key="category">
            <span>{article.category ? "[" + article.category.code + "]" + article.category.name : ""} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="保质期类型：" key="expflag">
            <span>{article.expflag == "produceDate" ? "按生产日期" : (
                article.expflag == "expireDate" ? "按到效期" : "不管理保质期")} </span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="保质期：" key="expDays">
            <span>{article.expDays}天</span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="售价：" key="sellPrice">
            <span>{article.sellPrice}</span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="进价：" key="purchasePrice">
            <span>{article.purchasePrice}</span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="产地：" key="habitat">
            <span>{article.habitat}</span>
        </BaseFormItem>
    );
    children.push(
        <BaseFormItem label="尺寸：" key="size">
            <span>{article.size}</span>
        </BaseFormItem>
    );
    businessChildren.push(
        <BaseFormItem label="状态：" key="state">
            <span>{article.state == "normal" ? "正常" : article.state} </span>
        </BaseFormItem>
    );
    businessChildren.push(
        <BaseFormItem label="上架货位：" key="putawayBin">
            <span>{article.putawayBin == "StorageBin" ? "存储位" : (article.putawayBin == "PickUpBin" ? "拣货位" : "优先考虑拣货位")} </span>
        </BaseFormItem>
    );
    businessChildren.push(
        <BaseFormItem label="固定拣货位：" key="fixedPickBin">
            <span>{article.fixedPickBin} </span>
        </BaseFormItem>
    );
    businessChildren.push(
        <BaseFormItem label="存储区域：" key="storageArea">
            <span>{article.storageArea} </span>
        </BaseFormItem>
    );

    return (
        <div>
            <ToolbarPanel children={toolbar} />
            <BaseCard title="基本信息">
                <BaseForm items={children} />
                <BaseForm items={businessChildren} />
            </BaseCard>
            <RemarkCard remark={article.remark} />
        </div>
    );
};

ArticleViewForm.propTypes = {
    article: PropTypes.object,
    onEdit: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onSaveSupplier: PropTypes.func
};

export default ArticleViewForm;