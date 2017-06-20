import { parse, stringify } from 'qs';
import { queryRole, create, online, offline, update, remove, queryAllResourceByRole, saveRoleResource, queryOwnedResourceByRole, queryAllRole } from '../../services/ia/Role';
import { removeByValue } from '../../utils/ArrayUtils';

export default {
    namespace: 'role',

    state: {
        list: [],
        currentItem: {},
        showCreate: false,
        showEdit: false,
        showView: false,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            current: 1,
            total: null,
            size: 'default'
        },
        showResourceAssignmentModal: false,
        resourceListTree: [],
        currentRoleUuid: {},
        batchDeleteProcessModal: false,
        batchAssignResourceProcessModal: false,
        batchOnlineProcessModal: false,
        batchOfflineProcessModal: false,
        deleteRoleEntitys: [],
        onlineRoleEntitys: [],
        offlineRoleEntitys: [],
        assignResourceEntitys: [],
        currentSelected: [],
        showViewResourceModal: false
    },

    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen(location => {
                if (location.pathname === '/ia/role') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                };
            });
        },
    },

    effects: {
        *query({
            payload
        }, {
            call,
                put
        }) {
            const { data } = yield call(queryRole, parse(payload));
            if (data) {
                let roleList = data.obj.records;
                for (var role of roleList) {
                    role.state = (role.state === 'online' ? '启用' : '停用');
                };
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: roleList,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        }
                    },
                });
            };
        },

        *create({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'hideModal'
            });
            yield call(create, payload);
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *gridOnline({
            payload
        }, {
            call, put
        }) {
            yield call(online, payload);
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *gridOffline({
            payload
        }, {
            call, put
        }) {
            yield call(offline, payload);
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *update({
            payload
        }, {
            call, put
        }) {
            payload.state = (payload.state === '启用' ? 'online' : 'offline');
            yield call(update, payload);
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *gridDelete({
            payload
        }, {
            call, put
        }) {
            yield call(remove, payload);
            yield put({
                type: 'query',
                payload: {},
            });
        },

        *assginResource({
            payload
        }, {
            call, put
        }) {
            function buildResourceTree(resource, currentSelected) {
                resource.value = resource.uuid;
                resource.label = resource.name;
                if (resource.owned) {
                    currentSelected.push(resource.value);
                };
                if (resource.children.length > 0) {
                    for (let lowerResource of resource.children) {
                        resource.value = resource.uuid;
                        resource.label = resource.name;
                        if (lowerResource.owned) {
                            currentSelected.push(lowerResource.value);
                        };
                        buildResourceTree(lowerResource, currentSelected);
                    };
                };
            };

            const { data } = yield call(queryAllResourceByRole, parse(payload));
            let resourceListTree = [];
            let currentSelected = [];
            if (data.obj.length > 0) {
                resourceListTree = data.obj;
                for (let resource of resourceListTree) {
                    resource.value = resource.uuid;
                    resource.label = resource.name;
                    if (resource.owned) {
                        currentSelected.push(resource.value);
                    };
                    buildResourceTree(resource, currentSelected);
                };
            };
            yield put({
                type: 'showResourceAssignment',
                payload: {
                    resourceListTree: resourceListTree,
                    currentRoleUuid: payload,
                    currentSelected: currentSelected
                }
            });
        },

        *saveResource({ payload }, {
            call, put
        }) {
            yield call(saveRoleResource, parse(payload));
            yield put({
                type: 'hideResourceAssignment'
            });
            yield put({
                type: 'query',
                payload: {}
            });

        },

        *viewResource({ payload }, {
            call, put
        }) {

            function buildResourceTree(resource, currentSelected, resourceListTree) {
                resource.value = resource.uuid;
                resource.label = resource.name;
                resource.disabled = true;
                if (resource.owned) {
                    currentSelected.push(resource.value);
                };
                if (resource.children.length > 0) {
                    for (let lowerResource of resource.children) {
                        lowerResource.value = lowerResource.uuid;
                        lowerResource.label = lowerResource.name;
                        lowerResource.disabled = true;
                        if (!lowerResource.owned) {
                            removeByValue(resourceListTree, lowerResource);
                        } else {
                            currentSelected.push(lowerResource.value);
                        };
                        buildResourceTree(lowerResource, currentSelected, resourceListTree);
                    };
                };
            };
            const { data } = yield call(queryAllResourceByRole, parse(payload));
            // if (data) {
            //     const resourceList = data.obj;
            //     const resourceListTree = [];
            //     for (let resource of resourceList) {
            //         if (!resource.upperUuid) {
            //             resource.value = resource.code;
            //             resource.label = resource.name;
            //             resource.children = [];
            //             removeByValue(resourceList, resource);
            //             const lowerList = buildResourceTree(resourceList, resource);
            //             if (lowerList.length > 0) {
            //                 for (var lowerResource of lowerList) {
            //                     if (lowerResource.upperUuid === resource.uuid) {
            //                         resource.children.push(lowerResource);
            //                     }
            //                 }
            //                 resourceListTree.push(resource);
            //             }
            //             else {
            //                 resource.value = resource.code;
            //                 resource.label = resource.name;
            //                 resource.children = [];
            //                 resourceListTree.push(resource)
            //             }
            //         }
            //     }

            // }
            let resourceListTree = [];
            let currentSelected = [];
            if (data.obj.length > 0) {
                resourceListTree = data.obj;
                for (let resource of resourceListTree) {
                    resource.value = resource.uuid;
                    resource.label = resource.name;
                    resource.disabled = true;
                    if (resource.owned) {
                        currentSelected.push(resource.value);
                    };
                    buildResourceTree(resource, currentSelected, resourceListTree);
                };
            };

            yield put({
                type: 'showViewResource',
                payload: {
                    viewResourceListTree: resourceListTree,
                    currentSelected: currentSelected
                }
            });
        }

    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        showCreateModal(state) {
            return { ...state, showCreate: true };
        },
        hideModal(state) {
            return { ...state, showCreate: false };
        },
        showResourceAssignment(state, action) {
            return { ...state, ...action.payload, showResourceAssignmentModal: true };
        },
        hideResourceAssignment(state) {
            return { ...state, showResourceAssignmentModal: false };
        },
        batchDeleteRole(state, action) {
            return { ...state, ...action.payload, batchDeleteProcessModal: true };
        },
        hideDeleteRoleModal(state) {
            return { ...state, batchDeleteProcessModal: false };
        },
        batchOnlineRole(state, action) {
            return { ...state, ...action.payload, batchOnlineProcessModal: true };
        },
        hideOnlineRoleModal(state) {
            return { ...state, batchOnlineProcessModal: false };
        },
        batchOfflineRole(state, action) {
            return { ...state, ...action.payload, batchOfflineProcessModal: true };
        },
        hideOfflineRoleModal(state) {
            return { ...state, batchOfflineProcessModal: false };
        },
        showViewResource(state, action) {
            return { ...state, ...action.payload, showViewResourceModal: true };
        },
        hideViewResource(state) {
            return { ...state, showViewResourceModal: false };
        }

    }
}