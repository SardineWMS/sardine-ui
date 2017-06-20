import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { connect } from 'dva';
import RoleSearchForm from '../../components/ia/Role/RoleSearchForm';
import RoleSearchGrid from '../../components/ia/Role/RoleSearchGrid';
import RoleCreateModal from '../../components/ia/Role/RoleCreateModal';
import ResourceAssignmentModal from '../../components/ia/Role/ResourceAssignmentModal';
import RoleAssignTree from '../../components/ia/Role/RoleAssignTree';
import WMSProgress from '../../components/Widget/WMSProgress';
import ViewResourceModal from '../../components/ia/Role/ViewResourceModal';


function Role({ location, dispatch, role }) {
    const { list,
        current,
        pagination,
        currentItem,
        showCreate,
        showView,
        batchOnlineProcessModal,
        batchOfflineProcessModal,
        batchDeleteProcessModal,
        batchAssignResourceProcessModal,
        deleteRoleEntitys,
        onlineRoleEntitys,
        offlineRoleEntitys,
        assignResourceEntitys,
        showResourceAssignmentModal,
        resourceListTree,
        currentRoleUuid,
        roleNext,
        currentSelected,
        showViewResourceModal,
        viewResourceListTree
} = role;

    const roleSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            dispatch(routerRedux.push({
                pathname: '/ia/role',
                query: {
                    page: page.current,
                    pageSize: page.pageSize
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'role/showCreateModal'
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'role/viewResource',
                payload: {
                    roleUuid: item.uuid
                }
            });
        },
        onBatchRemove(items) {
            if (items.length <= 0) {
                message.warning("请选择要删除的角色！", 2);
                return;
            };
            dispatch({
                type: 'role/batchDeleteRole',
                payload: {
                    deleteRoleEntitys: items
                }
            });
        },
        onBatchOnline(items) {
            if (items.length <= 0) {
                message.warning("请选择要启用的角色！", 2);
                return;
            };
            dispatch({
                type: 'role/batchOnlineRole',
                payload: {
                    onlineRoleEntitys: items
                }
            });
        },
        onBatchOffline(items) {
            if (items.length <= 0) {
                message.warning("请选择要禁用的角色！", 2);
                return;
            };
            dispatch({
                type: 'role/batchOfflineRole',
                payload: {
                    offlineRoleEntitys: items
                }
            });
        },
        onDelete(item) {
            dispatch({
                type: 'role/gridDelete',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onOnline(item) {
            dispatch({
                type: 'role/gridOnline',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onOffline(item) {
            dispatch({
                type: 'role/gridOffline',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                }
            });
        },
        onEdit(record) {
            record.editable = true;
            dispatch({
                type: 'role/querySuccess',
                payload: record
            });
        },
        onCancelEdit(record) {
            record.editable = false;
            dispatch({
                type: 'role/querySuccess'
            });
        },
        onSave(record) {
            dispatch({
                type: 'role/update',
                payload: record
            });
        },
        onAssign(record) {
            currentItem: record,
                dispatch({
                    type: 'role/assginResource',
                    payload: {
                        roleUuid: record.uuid
                    }
                });
        }
    };

    const roleSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'role/query',
                payload: fieldsValue
            });
        }
    };

    const createModalProps = {
        visible: showCreate,
        onCancel() {
            dispatch({
                type: 'role/hideModal'
            });
        },
        onOk(data) {
            dispatch({
                type: 'role/create',
                payload: data
            });
        }
    };

    const resourceAssignmentModalProps = {
        item: currentItem,
        visible: showResourceAssignmentModal,
        treeData: resourceListTree,
        value: currentSelected,
        onCancel() {
            dispatch({
                type: 'role/hideResourceAssignment'
            });
        },
        onSave(values) {
            dispatch({
                type: 'role/saveResource',
                payload: { resourceUuids: values.resource, roleUuid: currentRoleUuid.roleUuid }
            });
        }
    };

    const viewResourceModalProps = {
        item: currentItem,
        visible: showViewResourceModal,
        treeData: viewResourceListTree,
        value: currentSelected,
        onCancel() {
            dispatch({
                type: 'role/hideViewResource'
            });
        }
    };

    const batchProcessDeleteRoleProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteRoleEntitys ? deleteRoleEntitys : [],
        next: roleNext,
        actionText: '删除',
        entityCaption: '角色',
        batchProcess(entity) {
            dispatch({
                type: 'role/gridDelete',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'role/hideDeleteRoleModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'role/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessOnlineRoleProps = {
        showConfirmModal: batchOnlineProcessModal,
        records: onlineRoleEntitys ? onlineRoleEntitys : [],
        next: roleNext,
        actionText: '启用',
        entityCaption: '角色',
        batchProcess(entity) {
            dispatch({
                type: 'role/gridOnline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'role/hideOnlineRoleModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'role/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const batchProcessOfflineRoleProps = {
        showConfirmModal: batchOfflineProcessModal,
        records: offlineRoleEntitys ? offlineRoleEntitys : [],
        next: roleNext,
        actionText: '停用',
        entityCaption: '角色',
        batchProcess(entity) {
            dispatch({
                type: 'role/gridOffline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'role/hideOfflineRoleModal',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'role/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };



    const CreateFormGen = () => <RoleCreateModal {...createModalProps} />;
    const AssignModalGen = () => <ResourceAssignmentModal {...resourceAssignmentModalProps} />;
    const ViewResourceGen = () => <ViewResourceModal {...viewResourceModalProps} />;

    function refreshWidget() {
        return (
            <div>
                <RoleSearchForm {...roleSearchFormProps} />
                <RoleSearchGrid {...roleSearchGridProps} />
                <CreateFormGen />
                <AssignModalGen></AssignModalGen>
                <ViewResourceGen></ViewResourceGen>
                <WMSProgress {...batchProcessDeleteRoleProps} />
                <WMSProgress {...batchProcessOnlineRoleProps} />
                <WMSProgress {...batchProcessOfflineRoleProps} />
            </div>
        );
    };

    return (
        <div>
            {refreshWidget()}
        </div>
    );
};

Role.propTypes = {

};

function mapStateToProps({ role }) {
    return { role };
};

export default connect(mapStateToProps)(Role);
