import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal,Card,Select,InputNumber} from 'antd';
const FormItem = Form.Item;

const SupplierView = ({
  item = {},
  onEdit,
  onDelete,
  onCreate,
  onBack,
  }) => {

  const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

 function deleteConfirm() {
  Modal.confirm({
    title: '确定要删除该记录吗 ?',
    okText: '确定',
    cancelText: '取消',
    onOk : onDelete(item),
  });
};

return (
        <div>
            <Card title={"基本资料 / 供应商" + item.code}>
                <div>
                    <Button onClick={() => onCreate()}> 新建</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => onEdit(item)}> 编辑</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => deleteConfirm()}> 删除</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => onBack()}> 返回</Button>
                </div>
                <Card title="基本信息">
                    <Row gutter={48}>
                        <Col span={12}>
                            <Form horizontal>
                            <FormItem {...formItemLayout} label="代码 :" hasFeedback>
                                <span> {item.code} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="名称 :" hasFeedback>
                                <span> {item.name} </span>
                            </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：" hasFeedback>
                                <label>{item.phone} </label>
                            </FormItem>
                            <FormItem {...formItemLayout} label="地址：" hasFeedback>
                                <label>{item.address} </label>
                            </FormItem>
                          </Form>
                        </Col>
                        <Col span={12}>
                            <Form horizontal>
                            <FormItem {...formItemLayout} label="状态 :" hasFeedback>
                                <span> {item.state=='online'?"启用":"停用"} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="创建信息：" hasFeedback>
                                <span>{item.createInfo.operator.fullName+"["+item.createInfo.operator.code+"]"}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="最后修改信息：" hasFeedback>
                                <span>{item.lastModifyInfo.operator.fullName+"["+item.lastModifyInfo.operator.code+"]"}</span>
                            </FormItem>
                          </Form>
                        </Col>
                    </Row>
                </Card>
                <Card title="说明">
                    <Input type="textarea" autosize={{ minRows: 4 }} disabled={true}>{item.remark}</Input>
                </Card>
            </Card>
        </div >
    );
};

SupplierView.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
  onBack: PropTypes.func,
};

export default SupplierView;