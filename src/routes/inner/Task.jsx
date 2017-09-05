import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';


import TaskSearchForm from '../../components/Inner/Task/TaskSearchForm';
import TaskSearchGrid from '../../components/Inner/Task/TaskSearchGrid';
import ArticleMove from '../../components/Inner/Task/ArticleMove';
import ContainerMove from '../../components/Inner/Task/ContainerMove';
import PutAwayModal from '../../components/Inner/Task/PutAwayModal';
import RplerModal from '../../components/Inner/Task/RplerModal';
import PickModal from '../../components/Inner/Task/PickModal';
import UserModal from '../../components/Inner/Task/UserModal';
import WMSProgress from '../../components/Widget/WMSProgress';

function Task({ location, dispatch, task }) {
    const {
        list,
        loading,
        currentArticleItem,
        currentContainerItem,
        container,
        stockInfos,
        pagination,
        articleMoveModalVisable,
        containerMoveModalVisable,
        abortTaskEntitys,
        batchAbortProcessModalVisable,
        putAwayTaskEntitys,
        batchPutAwayProcessModalVisable,
        rplTaskEntitys,
        batchRplProcessModalVisable,
        userModalVisable,
        setRplerModalVisable,
        userList,
        currentUser,
        taskNext,
        putAwayModalVisable,
        setPickModalVisable,
        pickTaskEntitys,
        batchPickProcessModalVisable
    } = task;

    const { field, keyword } = location.query;

    const taskListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/wms/inner/task',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    token: localStorage.getItem("token"),
                    sort: sorter.field,
                    sortDirection: sorter.order
                }
            }));
        },
        onArticleMove() {
            dispatch({
                type: 'task/showArticleMoveModal',
                payload: {}
            });
        },
        onContainerMove() {
            dispatch({
                type: 'task/showContainerMoveModal',
                payload: {}
            });
        },
        onExecute(record) {
            dispatch({
                type: 'task/execute',
                payload: record
            })
        },
        onAbortBatch(tasks) {
            if (tasks.length <= 0) {
                message.warning("请选择要作废的指令", 2, '');
                return;
            };
            dispatch({
                type: 'task/batchAbortTask',
                payload: {
                    abortTaskEntitys: tasks
                }
            });
        },
        onPutAway(tasks) {
            if (tasks.length <= 0) {
                message.warning("请选择要收货上架的指令", 2, '');
                return;
            };
            dispatch({
                type: 'task/showPutAwayModal',
                payload: {
                   putAwayTaskEntitys:tasks
                }
            });
        },
        onRpl(tasks) {
            if (tasks.length <= 0) {
                message.warning("请选择要补货的指令", 2, '');
                return;
            };
            dispatch({
                type: 'task/showRplerModal',
                payload: {
                   rplTaskEntitys:tasks
                }
            });
        },
        onPick(tasks) {
            if (tasks.length <= 0) {
                message.warning("请选择要拣货的指令", 2, '');
                return;
            };
            dispatch({
                type: 'task/showPickModal',
                payload: {
                   pickTaskEntitys:tasks
                }
            });
        }
    };

    const putAwayModalProps={
        visible:putAwayModalVisable,
        tasks:putAwayTaskEntitys,
        onOk(tasks) {
            dispatch({
                type: 'task/batchPutAwayTask',
                payload: {
                   rplTaskEntitys:tasks
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'task/hidePutAwayModal'
            });
        }
    }

    const batchProcessPutAwayTaskProps = {
        showConfirmModal: batchPutAwayProcessModalVisable,
        records: putAwayTaskEntitys ? putAwayTaskEntitys : [],
        next: taskNext,
        actionText: '上架',
        entityCaption: '指令',
        batchProcess(entity) {
            dispatch({
                type: 'task/putAway',
                payload: {
                    uuid:entity.uuid,
                    version:entity.version,
                    toBinCode:entity.toBinCode,
                    toContainerBarcode:entity.toContainerBarcode
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideBatchPutAwayTask',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const rplerModalProps={
        visible:setRplerModalVisable,
        currentRpler:currentUser,
        queryRplers() {
            dispatch({
                type: 'task/queryUserByPage'
            });
        },
        getRpler(rplerCode) {
            dispatch({
                type: 'task/getUser',
                payload: {
                   userCode:rplerCode,
                   type:"Rpl"
                }
            });
        },
        onOk() {
            dispatch({
                type: 'task/batchRplTask'
            });
        },
        onCancel() {
            dispatch({
                type: 'task/hideRplerModal'
            });
        }
    };

    const userModalProps={
        visible:userModalVisable,
        users:userList,
        userPagination: pagination,
        onOk(users) {
            if(!users || users.size<1)
                return;
            dispatch({
                type: 'task/selectUser',
                payload: {
                   currentUser:{
                    uuid:users[0].uuid,
                    code:users[0].code,
                    name:users[0].name
                   }
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'task/hideUerModal'
            });
        }
    };

    const batchProcessRplTaskProps = {
        showConfirmModal: batchRplProcessModalVisable,
        records: rplTaskEntitys ? rplTaskEntitys : [],
        next: taskNext,
        actionText: '补货',
        entityCaption: '指令',
        batchProcess(entity) {
            dispatch({
                type: 'task/rpl',
                payload: {
                    rplBillUuid:entity.uuid,
                    version:entity.version,
                    rpler:currentUser
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideBatchRplTask',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const pickModalProps={
        visible:setPickModalVisable,
        currentPicker:currentUser,
        tasks:pickTaskEntitys,
        queryPickers() {
            dispatch({
                type: 'task/queryUserByPage'
            });
        },
        getPicker(pickerCode) {
            dispatch({
                type: 'task/getUser',
                payload: {
                   userCode:pickerCode,
                   type:"PICK"
                }
            });
        },
        onOk(data) {
            let pickItemUuids=[];
            for (let task of pickTaskEntitys) {
                pickItemUuids.push(task.uuid);
            };
            dispatch({
                type: 'task/batchPick',
                payload:{
                    pickItemUuids:pickItemUuids,
                    toBinCode:data.toBinCode,
                    toContainerBarcode:data.toContainerBarcode
                   // picker:currentUser
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'task/hidePickModal'
            });
        }
    };

    const batchProcessPickTaskProps = {
        showConfirmModal: batchPickProcessModalVisable,
        records: pickTaskEntitys ? pickTaskEntitys : [],
        next: taskNext,
        actionText: '拣货',
        entityCaption: '指令',
        batchProcess(entity) {
            dispatch({
                type: 'task/batchPick',
                payload: {
                    rplBillUuid:entity.uuid,
                    version:entity.version,
                    rpler:currentUser
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideBatchRplTask',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };


    const batchProcessAbortTaskProps = {
        showConfirmModal: batchAbortProcessModalVisable,
        records: abortTaskEntitys ? abortTaskEntitys : [],
        next: taskNext,
        actionText: '作废',
        entityCaption: '指令',
        batchProcess(entity) {
            dispatch({
                type: 'task/abort',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideAbortTaskModal',
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const articleMoveProps = {
        currentArticleItem: currentArticleItem,
        stockInfos: stockInfos,
        onQueryStock(articleCode) {
            dispatch({
                type: 'task/queryStocks',
                payload: {
                    articleCode: articleCode
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'task/query'
            });
        },
        onSave(records) {
            dispatch({
                type: 'task/saveArticleMoveRule',
                payload: {
                    articleMoveRules: records
                }
            });
        },
        onSaveAndMove(records) {
            dispatch({
                type: 'task/saveAndMoveArticleMoveRule',
                payload: {
                    articleMoveRules: records
                }
            });
        }
    };

    const containerMoveProps = {
        container: container,
        onGetContainer(containerBarcode) {
            dispatch({
                type: 'task/getContainer',
                payload: {
                    containerBarcode: containerBarcode
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'task/query'
            });
        },
        onSave(records) {
            dispatch({
                type: 'task/saveContainerMoveRule',
                payload: {
                    containereMoveRules: records
                }
            });
        },
        onSaveAndMove(records) {
            dispatch({
                type: 'task/saveAndMoveContainerMoveRule',
                payload: {
                    containereMoveRules: records
                }
            });
        }
    };

    const taskSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'task/query',
                payload: fieldsValue
            });
        }
    };

    function refreshWidget() {
        if (articleMoveModalVisable) {
            return (
                <div>
                    <ArticleMove {...articleMoveProps} />
                </div>
            );
        };
        if (containerMoveModalVisable) {
            return (
                <div>
                    <ContainerMove {...containerMoveProps} />
                </div>
            );
        };
        return (
            <div>
                <TaskSearchForm {...taskSearchProps} />
                <TaskSearchGrid {...taskListProps} />
                <WMSProgress {...batchProcessAbortTaskProps} />
                <UserModal {...userModalProps} />
                <RplerModal {...rplerModalProps} />
                <WMSProgress {...batchProcessRplTaskProps} />
                <PutAwayModal {...putAwayModalProps} />
                <WMSProgress {...batchProcessPutAwayTaskProps} />
                <PickModal {...pickModalProps} />
            </div>
        );
    };

    return (
        <div>{refreshWidget()}</div>
    );
};

Task.propTypes = {
    task: PropTypes.object
};

function mapStateToProps({ task }) {
    return { task };
};

export default connect(mapStateToProps)(Task)