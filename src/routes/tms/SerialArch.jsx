import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Layout, message } from 'antd';
const { Content, Footer, Sider } = Layout;
import { connect } from 'dva';
import SerialArchTree from '../../components/tms/serialarch/SerialArchTree';
import SerialArchSearchGrid from '../../components/tms/serialarch/SerialArchSearchGrid';
import SerialArchCreateModal from '../../components/tms/serialarch/SerialArchCreateModal';
import SerialArchLineCreateModal from '../../components/tms/serialarch/SerialArchLineCreateModal';
import SerialArchLineSelectCustomerModal from '../../components/tms/serialarch/SerialArchLineSelectCustomerModal';
import WMSProgress from '../../components/Widget/NewProgressForRemove';

function SerialArch({ location, dispatch, serialArch }) {
    const { showCreateModal, treeData, pagination, showCreateLineModal, showAddCustomerModal, currentLine, list, customers, batchRemoveProcessModal, removeCustomerEntitys, customerNext, currentLineCode, customerPagination } = serialArch;

    const serialArchCreateModalProps = {
        visible: showCreateModal,
        onCancel() {
            dispatch({
                type: 'serialArch/hideCreateModal'
            });
        },
        onOk(data) {
            dispatch({
                type: 'serialArch/createSerialArch',
                payload: data
            });
        }
    };
    const SerialArchSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch({
                type: 'serialArch/getLine',
                payload: {
                    page: page.current,
                    pageSize: page.pageSize,
                    lineCode: currentLineCode
                }
            });
        },
        onCreateSerialArch() {
            dispatch({
                type: 'serialArch/showCreateSerialArch'
            });
        },
        onCreateLine() {
            dispatch({
                type: 'serialArch/showCreateLine'
            });
        },
        onAddCustomer() {
            if (currentLine == '') {
                message.warning("请先选择运输线路", 2, '');
                return;
            };
            dispatch({
                type: 'serialArch/showAddCustomer',
                payload: currentLine
            });
        },
        onRemoveBatch(customers) {
            if (customers.length <= 0) {
                message.warning("请选择要踢出该线路的客户", 2, '');
                return;
            };
            dispatch({
                type: 'serialArch/batchRemoveFromLine',
                payload: {
                    removeCustomerEntitys: customers
                }
            });
        },
        onUp(record) {
            dispatch({
                type: 'serialArch/upOrder',
                payload: { record, lineCode: currentLineCode }
            });
        },
        onDown(record) {
            dispatch({
                type: 'serialArch/onDown',
                payload: { record, lineCode: currentLineCode }
            });
        },
        onPostpone(record) {
            dispatch({
                type: 'serialArch/postponeCustomer',
                payload: { record, lineCode: currentLineCode }
            });
        },
        onStick(record) {
            dispatch({
                type: 'serialArch/stickCustomer',
                payload: { record, lineCode: currentLineCode }
            });
        }
    };
    const serialArchTreeProps = {
        data: treeData,
        onSelect(selectedKeys, { node }) {
            const end = selectedKeys[0].indexOf("]");
            const code = selectedKeys[0].substring(1, end);
            if (!node.props.children || node.props.children.length <= 0)
                dispatch({
                    type: 'serialArch/getLine',
                    payload: { lineCode: code }
                });
        },
        onRemoveLine(code) {
            dispatch({
                type: 'serialArch/removeLine',
                payload: {
                    code: code
                }
            })
        }
    };

    const serialArchCreateLineModalProps = {
        visible: showCreateLineModal,
        serialArch: treeData,
        onCancel() {
            dispatch({
                type: 'serialArch/hideCreateLineModal'
            });
        },
        onOk(data) {
            data.serialArch = {};
            data.serialArch.uuid = data.serialArchUuid;
            dispatch({
                type: 'serialArch/createLine',
                payload: data
            });
        }
    };

    const serialArchLineSelectCustomerModalProps = {
        visible: showAddCustomerModal,
        dataSource: customers,
        pagination: customerPagination,
        onCancel() {
            dispatch({
                type: 'serialArch/hideAddCustomer'
            });
        },
        onOk(selectedRowKeys) {
            if (!selectedRowKeys || selectedRowKeys.length <= 0)
                return;
            const uuids = [];
            for (var customer of selectedRowKeys) {
                uuids.push(customer.uuid);
            };
            const data = {};
            data.lineUuid = currentLine;
            data.customers = uuids;
            dispatch({
                type: 'serialArch/addCustomer',
                payload: data
            });
        },
        onSearch(field) {
            dispatch({
                type: 'serialArch/searchCustomer',
                payload: { field, currentLine }
            })
        }
    };

    const batchProcessRemoveCustomerProps = {
        showConfirmModal: batchRemoveProcessModal,
        records: removeCustomerEntitys ? removeCustomerEntitys : [],
        next: customerNext,
        actionText: '踢出线路',
        entityCaption: '客户',
        url: '/swms/tms/serialarch/removeCustomer',
        canSkipState: '',
        hideConfirmModal() {
            dispatch({
                type: 'serialArch/hideRemoveCustomerModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'serialArch/getLine',
                payload: {
                    lineCode: currentLineCode
                }
            });
        }
    };

    const SerialArchCreateModalGen = () => <SerialArchCreateModal {...serialArchCreateModalProps} />;
    const SerialArchLineCreateModalGen = () => <SerialArchLineCreateModal {...serialArchCreateLineModalProps} />;
    const SerialArchLineSelectCustomerModalGen = () => <SerialArchLineSelectCustomerModal {...serialArchLineSelectCustomerModalProps} />;
    return (
        <div className="content-inner">
            <Layout style={{ padding: '0 0', background: '#fff' }}>
                <Sider width={210} style={{ background: '#fff', padding: '0 5px' }}>
                    <SerialArchTree {...serialArchTreeProps} />
                </Sider>
                <Content style={{ padding: '0 0 0 5px', minHeight: 280 }}>
                    <SerialArchSearchGrid {...SerialArchSearchGridProps} />
                    <SerialArchCreateModalGen />
                    <SerialArchLineCreateModalGen />
                    <SerialArchLineSelectCustomerModal {...serialArchLineSelectCustomerModalProps} />
                    <WMSProgress {...batchProcessRemoveCustomerProps} />
                </Content>
            </Layout>
        </div>
    );
};

SerialArch.propTypes = {
    SerialArch: PropTypes.object
};

function mapStateToProps({ serialArch }) {
    return { serialArch }
};

export default connect(mapStateToProps)(SerialArch);