import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button, Collapse, Popconfirm, Spin } from 'antd';
import timeStamp2datetime from '../../../utils/DateUtils';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import styles from '../../Layout/common.less';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
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
    return (
        <div>
            <div className={styles.button}>
                <Button onClick={() => showEdit(item)}>编辑</Button>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)}>
                    <Button disabled={removeRight} >删除</Button>
                </Popconfirm>
                <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)}>
                    <Button disabled={recoverRight}>恢复</Button>
                </Popconfirm>
                <Button onClick={() => onBack()}>返回</Button>
            </div>
                <BaseCard title="基本信息" >
                    <Form horizontal>
                        <BaseFormItem label="客户代码：">
                            <span>{item.code}</span>
                        </BaseFormItem>
                        <BaseFormItem label="客户名称：">
                            <span>{item.name}</span>
                        </BaseFormItem>
                        <BaseFormItem label="客户类型：">
                            <span>{item.type}</span>
                        </BaseFormItem>
                        <BaseFormItem label="联系方式：">
                            <span>{item.phone}</span>
                        </BaseFormItem>
                        <BaseFormItem label="联系地址：">
                            <span>{item.address}</span>
                        </BaseFormItem>
                    </Form>
                    <Form horizontal>
                        <BaseFormItem label="状态：">
                            <span>{item.state}</span>
                        </BaseFormItem>
                        <BaseFormItem label="创建信息：">
                            <span>{createInfo2String(item)}</span>
                        </BaseFormItem>
                        <BaseFormItem label="修改信息：">
                            <span>{lastModifyInfo2String(item)}</span>
                        </BaseFormItem>
                    </Form>
                </BaseCard>
                <BaseCard title="说明">
                    <Input type="textarea" autosize={{ minRows: 4 }} disabled={true}></Input>
                </BaseCard>
        </div >
    )
};
export default CustomerView;
