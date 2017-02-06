import React, { PropTypes } from 'react';
import { Card, Form, Row, Col, Input, Button } from 'antd';
const FormItem = Form.Item;
const CustomerView = ({item = {},
    onBack,
    onRemove,
    onRecover,
    showEdit,
}) => {
    const code = item.code;
    let removeRight = false;
    let recoverRight = false;
    if (item.state === "normal") {
        removeRight = false;
        recoverRight = true;
    }
    if (item.state === "deleted") {
        removeRight = true;
        recoverRight = false;
    }
    return (
        <div>
            <Card title={"基本资料 / 客户" + code}>
                <div>
                    <Button onClick={()=>showEdit(item)}>编辑</Button>
                    <Button disabled={removeRight} onClick={() => onRemove(item)}>删除</Button>
                    <Button disabled={recoverRight} onClick={() => onRecover(item)}>恢复</Button>
                    <Button onClick={() => onBack()}>返回></Button>
                </div>
                <Card title="基本信息">
                    <Row gutter={48}>
                        <Col span={12}>
                            <p>客户代码：{item.code}</p>
                            <p>客户名称：{item.name}</p>
                            <p>客户类型：{item.type}</p>
                            <p>联系方式：{item.phoneNumber}</p>
                            <p>地址：{item.address}</p>
                        </Col>
                        <Col span={12}>
                            <p>状态：{item.state}</p>
                            <p>创建信息：</p>
                            <p>修改信息：</p>
                        </Col>
                    </Row>
                </Card>
                <Card title="说明">
                    <Input type="textarea" autosize={{ minRows: 4 }} disabled={true}></Input>
                </Card>
            </Card>
        </div >
    )
};
export default CustomerView;
