import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Table, message, Modal,Card,Select,InputNumber,Popconfirm} from 'antd';
import { createInfo2String, lastModifyInfo2String } from '../../../utils/OperatorInfoUtils';
import styles from '../../Layout/common.less';

const FormItem = Form.Item;

const SupplierView = ({
  item = {},
  onEdit,
  onRemove,
  onRecover,
  onBack,
  }) => {

  const formItemLayout = {
      labelCol: { span: 9 },
  };

return (
        <div>
            <Card title={"基本资料 / 供应商" + item.code}>
                <div className={styles.button}>
                    <Button  onClick={() => onEdit(item)}> 编辑</Button>
                    <Popconfirm title="确定要删除吗？" onConfirm={() => onRemove(item)}>
                      <Button disabled={item.state==="deleted"} >删除</Button>
                    </Popconfirm>
                    <Popconfirm title="确定要恢复吗？" onConfirm={() => onRecover(item)}>
                       <Button disabled={item.state==="normal"}>恢复</Button>
                    </Popconfirm>                   
                    <Button onClick={() => onBack()}> 返回</Button>
                </div>
                <Card title="基本信息">
                    <Row gutter={36}>
                        <Col span={12}>
                            <Form horizontal>
                            <FormItem  label="代码 :" {...formItemLayout} className={styles.fromItem}>
                                <span> {item.code} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="名称 :" className={styles.fromItem}>
                                <span> {item.name} </span>
                            </FormItem>
                                <FormItem {...formItemLayout} label="联系方式：" className={styles.fromItem}>
                                <span>{item.phone} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="地址：" className={styles.fromItem}>
                                <span>{item.address} </span>
                            </FormItem>
                          </Form>
                        </Col>
                        <Col span={12}>
                            <Form horizontal>
                            <FormItem {...formItemLayout} label="状态 :" className={styles.fromItem}>
                                <span> {item.state=='normal'?"正常":"已删除"} </span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="创建信息：" hasFeedback>
                                <span>{createInfo2String(item)}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="最后修改信息：" hasFeedback>
                                <span>{lastModifyInfo2String(item)}</span>
                            </FormItem>
                          </Form>
                        </Col>
                    </Row>
                </Card>
                <Card bordered={false} title="说明">
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
  onRemove: PropTypes.func,
  onCreate: PropTypes.func,
  onBack: PropTypes.func,
};

export default SupplierView;