import React, { PropTypes } from 'react';
import {Form, Input, Select, label, Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import RemarkCard from '../../Widget/RemarkCard';
import Panel from '../../Widget/Panel';

class ArticleMove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: [],
            moveItems: []
            // currentArticleItem: props.currentArticleItem
        };
        this.saveAndMove = this.saveAndMove.bind(this);
        // this.cancel = this.cancel.bind(this);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
            selectedRowKeys: [],
            selectedRows: []
        });
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };
    saveAndMove(moveItems) {
        this.state.onRemoveBatch(this.state.selectedRows);
    };
    handleFinishBatch() {
        this.state.onFinishBatch(this.state.selectedRows);
    };

    queryStockInfos(e) {
        let currentItem = this.state.currentArticleItem;
        if (e.target.value && e.target.value != currentItem.articleCode) {
          this.state.onQueryStock(e.target.value);
          currentItem.articleCode = e.target.value;
          this.setState({
            currentArticleItem: currentItem
          });
        };
    };

    render() {
        let {currentArticleItem} = this.state;
        let getFieldDecorator = this.props.form.getFieldDecorator;
        let formItems = [];
        let qtyItems = [];
        formItems.push(
         <BaseFormItem label={"商品代码："} key="articleCode">
            {getFieldDecorator("articleCode", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.articleCode : null
            })(
                <Input onBlur={(e) => this.queryStockInfos(e)} onPressEnter={(e) => this.queryStockInfos(e)}/>
                )
            }
         </BaseFormItem>
        );
       formItems.push(
        <BaseFormItem label={"商品名称："} key="articleName">
            <label>{currentArticleItem ? currentArticleItem.articleName : null}</label>
        </BaseFormItem>
       );
       formItems.push(
        <BaseFormItem label={"来源货位："} key="fromBinCode">
            {getFieldDecorator("fromBinCode", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.fromBinCode : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    
                </Select>
                )
            }
        </BaseFormItem>
       );
       formItems.push(
        <BaseFormItem label={"来源容器："} key="fromContainerBarcode">
            {getFieldDecorator("fromContainerBarcode", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.fromContainerBarcode : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    
                </Select>
                )
            }
        </BaseFormItem>
       );
       formItems.push(
        <BaseFormItem label={"生产日期："} key="productDate">
            {getFieldDecorator("productDate", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.productDate : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                   
                </Select>
                )
            }
        </BaseFormItem>
       );
       formItems.push(
        <BaseFormItem label={"规格："} key="qpcStr">
            {getFieldDecorator("qpcStr", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.qpcStr : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                   
                </Select>
                )
            }
        </BaseFormItem>
       );
       qtyItems.push(
        <BaseFormItem label={"库存数量："} key="stockQty">
            <label>{currentArticleItem ? currentArticleItem.stockQty : null}</label>
        </BaseFormItem>
       ); 
       qtyItems.push(
         <BaseFormItem label={"移库数量："} key="qty">
            {getFieldDecorator("qty", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.qty : 0
            })(
                <Input />
                )
            }
         </BaseFormItem>
        );
        qtyItems.push(
         <BaseFormItem label={"目标货位："} key="toBinCode">
            {getFieldDecorator("toBinCode", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.toBinCode : null
            })(
                <Input />
                )
            }
         </BaseFormItem>
        );
        qtyItems.push(
         <BaseFormItem label={"目标容器："} key="toContainerbarcode">
            {getFieldDecorator("toContainerbarcode", {
                rules: [{ required: true }], initialValue: currentArticleItem ? currentArticleItem.toContainerbarcode : null
            })(
                <Input />
                )
            }
         </BaseFormItem>
        );
        const columns = [{
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            width: 50
        }, {
            title: '商品代码',
            dataIndex: 'articleCode',
            key: 'articleCode',
            width: 100
        }, {
            title: '商品名称',
            dataIndex: 'articleName',
            key: 'articleName',
            width: 200
        }, {
            title: '来源货位',
            dataIndex: 'fromBinCode',
            key: 'fromBinCode',
            width: 100
        }, {
            title: '来源容器',
            dataIndex: 'fromContainerBarcode',
            key: 'fromContainerBarcode',
            width: 100
        }, {
            title: '规格',
            dataIndex: 'qpcStr',
            key: 'qpcStr',
            width: 100
        }, {
            title: '生产日期',
            dataIndex: 'productDate',
            key: 'productDate',
            width: 150
        }, {
            title: '库存数量',
            dataIndex: 'stockQty',
            key: 'stockQty',
            width: 100
        }, {
            title: '移库数量',
            dataIndex: 'qty',
            key: 'qty',
            width: 100
        }, {
            title: '目标货位',
            dataIndex: 'toBinCode',
            key: 'toBinCode',
            width: 100
        }, {
            title: '目标容器',
            dataIndex: 'toContainerBarcode',
            key: 'toContainerBarcode',
            width: 150
        }];

        const toolbar = [];
        toolbar.push(<Button key="canel" > 取消</Button>);
        toolbar.push(<Button key="save" disabled={!PermissionUtil("receiveBill:create")}>保存</Button>);
        toolbar.push(<Button key="saveAndMove" disabled={!PermissionUtil("receiveBill:create")}>保存并移库</Button>);

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <ToolbarPanel children={toolbar} />
                <BaseCard title="商品移库" single={false}>
                   <BaseForm items={formItems} />
                   <BaseForm items={qtyItems} />
                </BaseCard>
                <Table size="small"
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    rowKey={record => record.uuid}
                    rowSelection={rowSelection}
                    scroll={{ x: 800, y: 300 }}
                    title={() => <div style={{height: '30px'}}>
                        <Row type="flex" style={{lineHeight: '30px'}}>
                            <Col >
                                <label>移库明细&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            </Col>
                            <Col>
                                <Button>批量删除</Button>
                            </Col>
                        </Row>
                    </div>}
                />
            </div>
        );
    };
};

export default Form.create()(ArticleMove);;

