import { parse, stringify } from 'qs';
import { queryRole, create, online, offline, update, remove, queryAllResourceByRole } from '../../services/ia/Role';
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
                    })
                }
            })
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
                }
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: roleList,
                        pagination: {
                            total: data.obj.recordCount,
                            current: data.obj.page,
                        }
                    },
                })
            }
        },

        *create({
            payload
        }, {
            call, put
        }) {
            yield put({
                type: 'hideModal'
            })
            yield call(create, payload);
            yield put({
                type: 'query',
                payload: {},
            })
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
            })
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
            })
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
            })
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
            })
        },

        *assginResource({
            payload
        }, {
            call, put
        }) {
            /**
             * 构造资源树
             * @param {*原数组} data 
             * @param {*上级资源} resource 
             */
            function buildResourceTree(data, resource) {
                var result = [];
                var temps = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].upperUuid == resource.uuid) {
                        data[i].value = data[i].code;
                        data[i].label = data[i].name;
                        data[i].children = [];
                        temps = buildResourceTree(data, data[i]);
                        if (temps.length > 0) {
                            for (var temp of temps)
                                data[i].children.push(temp);
                        }
                        result.push(data[i]);
                    }
                }
                return result;
            }
            const { data } = yield call(queryAllResourceByRole, parse(payload));
            if (data) {
                const resourceList = data.obj;
                const resourceListTree = [];
                for (let resource of resourceList) {
                    if (!resource.upperUuid) {
                        resource.value = resource.code;
                        resource.label = resource.name;
                        resource.children = [];
                        removeByValue(resourceList, resource);
                        const lowerList = buildResourceTree(resourceList, resource);
                        if (lowerList.length > 0) {
                            for (var lowerResource of lowerList) {
                                if (lowerResource.upperUuid === resource.uuid) {
                                    resource.children.push(lowerResource);
                                }
                            }
                            resourceListTree.push(resource);
                        }
                        else {
                            resource.value = resource.code;
                            resource.label = resource.name;
                            resource.children = [];
                            resourceListTree.push(resource)
                        }
                    }
                }
                yield put({
                    type: 'showResourceAssignment',
                    payload: {
                        resourceListTree: resourceListTree
                    },
                })
            }
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
        hideResourceAssignmentModal(state) {
            return { ...state, showResourceAssignmentModal: false };
        },

    }
}