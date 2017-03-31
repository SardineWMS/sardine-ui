import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import RoleSearchForm from '../../components/ia/Role/RoleSearchForm';
import RoleSearchGrid from '../../components/ia/Role/RoleSearchGrid';
import RoleCreateModal from '../../components/ia/Role/RoleCreateModal';
import ResourceAssignmentModal from '../../components/ia/Role/ResourceAssignmentModal';
import RoleAssignTree from '../../components/ia/Role/RoleAssignTree';


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
        deleteRoleEntitys,
        onlineRoleEntitys,
        offlineRoleEntitys,
        showResourceAssignmentModal,
        resourceListTree,
} = role;

    const roleSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            dispatch(routerRedux.push({
                pathname: '/role',
                query: {
                    page: page.current,
                    pageSize: page.pageSize
                },
            }))
        },
        onCreate() {
            dispatch({
                type: 'role/showCreateModal'
            })
        },
        onViewItem(item) {
            dispatch({
                type: 'role/showViewPage',
                payload: {
                    currentItem: item,
                }
            })
        },
        onBatchDelete(items) {
            dispatch({
                type: 'role/batchDeleteRole',
                payload: {
                    deleteRoleEntitys: items,
                }
            })
        },
        onBatchOnline(items) {
            dispatch({
                type: 'role/batchOnlineRole',
                payload: {
                    onlineRoleEntitys: items,
                }
            })
        },
        onBatchOffline(items) {
            dispatch({
                type: 'role/batchOfflineRole',
                payload: {
                    offlineRoleEntitys: items,
                }
            })
        },
        onDelete(item) {
            dispatch({
                type: 'role/gridDelete',
                payload: {
                    uuid: item.uuid,
                    version: item.version
                },
            })
        },
        onOnline(item) {
            dispatch({
                type: 'role/gridOnline',
                payload: {
                    uuid: item.uuid,
                    version: item.version,
                }
            })
        },
        onOffline(item) {
            console.log('onOffline...');
            dispatch({
                type: 'role/gridOffline',
                payload: {
                    uuid: item.uuid,
                    version: item.version,
                }
            })
        },
        onEdit(record) {
            record.editable = true;
            dispatch({
                type: 'role/querySuccess',
                payload: record,
            })
        },
        onCancelEdit(record) {
            record.editable = false;
            dispatch({
                type: 'role/querySuccess',
            })
        },
        onSave(record) {
            dispatch({
                type: 'role/update',
                payload: record,
            })
        },
        onAssign(record) {
            console.log("onAssign...");
            dispatch({
                type: 'role/assginResource',
                payload: {
                    roleUuid: record.uuid
                },
            })
        },
    }

    const roleSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'role/query',
                payload: fieldsValue,
            })
        },
    }

    const createModalProps = {
        item: currentItem,
        visible: showCreate,
        onCancel() {
            dispatch({
                type: 'role/hideModal'
            })
        },
        onOk(data) {
            console.log("sourcedata.....", data);
            dispatch({
                type: 'role/create',
                payload: data,
            })
        },
    }

    const resourceAssignmentModalProps = {
        item: currentItem,
        visible: showResourceAssignmentModal,
        treeData: resourceListTree,
        onCancel() {
            dispatch({
                type: 'role/hideResourceAssignmentModal',
            })
        },
        // onSave(values) {
        //     for(let value of values){

        //     }
        //     dispatch({
        //         type: 'role/saveResource',
        //         payload:
        //     })
        // }
    }



    const CreateFormGen = () => <RoleCreateModal {...createModalProps} />;
    const AssignModalGen = () => <ResourceAssignmentModal {...resourceAssignmentModalProps} />

    function refreshWidget() {
        return (
            <div>
                <RoleSearchForm {...roleSearchFormProps} />
                <RoleSearchGrid {...roleSearchGridProps} />
                <CreateFormGen />
                <ResourceAssignmentModal {...resourceAssignmentModalProps} />
            </div>
        )
    }

    return (
        <div>
            {refreshWidget()}
        </div>
    )
}

Role.propTypes = {

}

function mapStateToProps({ role }) {
    return { role };
}

export default connect(mapStateToProps)(Role);
