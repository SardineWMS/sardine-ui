import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Menu, Dropdown, Icon, Row, Col } from 'antd';
import PermissionUtil from '../../../utils/PermissionUtil';

class ContainerMove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedRowKeys: [],
            selectedRows: [],
            containerMoveItems: [],
            currentContainerItem
        }
        this.saveAndMove = this.saveAndMove.bind(this);
        this.cancel = this.cancel.bind(this);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps,
            selectedRowKeys: [],
            selectedRows: [],
        });
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };
    handleRemoveBatch() {
        this.state.onRemoveBatch(this.state.selectedRows);
    };
    handleFinishBatch() {
        this.state.onFinishBatch(this.state.selectedRows);
    };

    render() {
        let {currentContainerItem} = this.state;
        let formItems = [];
        formItems.push(
         <BaseFormItem label={"来源货位："} key="fromBinCode">
            {getFieldDecorator("fromBinCode", {
                rules: [{ required: true }], initialValue: currentContainerItem ? currentContainerItem.fromBinCode : null
            })(
                <Input />
                )
            }
         </BaseFormItem>
        );
       formItems.push(<BaseFormItem label={"来源容器："} key="fromContainerBarcode">
            {getFieldDecorator("fromContainerBarcode", {
                rules: [{ required: true }], initialValue: currentContainerItem ? currentContainerItem.fromContainerBarcode : null
            })(
                <Select placeholder="请选择：" onChange={(value) => onSelectWrh(value)}>
                    {options}
                </Select>
                )
            }
         </BaseFormItem>
        );
       formItems.push(<BaseFormItem label={"来源容器："} key="fromContainerBarcode">
            {getFieldDecorator("fromContainerBarcode", {
                rules: [{ required: true }], initialValue: currentContainerItem ? currentContainerItem.containFromContainerBarcode : false
            })(
                <RadioGroup value={currentContainerItem.containFromContainerBarcode}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
               </RadioGroup>
                )
            }
         </BaseFormItem>
        );

       children.push(
        <BaseFormItem label={"目标货位："} key="toBinCode">
            {getFieldDecorator("toBinCode", {
                rules: [{ required: true }], initialValue: currentContainerItem ? currentContainerItem.toBinCode : null
            })(
                <Input />
                )
            }
        </BaseFormItem>
       );
       children.push(
        <BaseFormItem label={"目标容器："} key="toContainerBarcode">
            {getFieldDecorator("toContainerBarcode", {
                rules: [{ required: true }], initialValue: currentContainerItem ? currentContainerItem.toContainerBarcode : null
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
            width: 50,
        }, {
            title: '来源货位',
            dataIndex: 'fromBinCode',
            key: 'fromBinCode',
            width: 200
        }, {
            title: '来源容器',
            dataIndex: 'fromContainerBarcode',
            key: 'fromContainerBarcode',
            width: 200
        }, {
            title: '来源容器释放',
            dataIndex: 'containFromContainer',
            key: 'containFromContainer',
            width: 100
        }, {
            title: '目标货位',
            dataIndex: 'toBinCode',
            key: 'toBinCode',
            width: 200
        }, {
            title: '目标容器',
            dataIndex: 'toContainerBarcode',
            key: 'toContainerBarcode'
        }];

        const toolbar = [];
        toolbar.push(<Button onClick={() => onCancel(item)} key={Guid()} > 取消</Button>);
        toolbar.push(<Button key={Guid()} onClick={handleCreate} disabled={!PermissionUtil("receiveBill:create")}>保存</Button>);
        toolbar.push(<Button key={Guid()} onClick={handleCreate} disabled={!PermissionUtil("receiveBill:create")}>保存并移库</Button>)

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <Table size="small"
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    onChange={this.state.onPageChange}
                    pagination={this.state.pagination}
                    rowKey={record => record.uuid}
                    rowSelection={rowSelection}
                    title={() => <div>
                        <Row type="flex">
                            <Col>
                                <Button onClick={this.handleRemoveBatch}>批量删除</Button>
                            </Col>
                        </Row>
                    </div>}
                />
            </div>
        )
    }

}

export default ContainerMove;

