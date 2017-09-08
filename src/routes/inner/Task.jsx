import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message,Tabs } from 'antd';

import RplTaskSearchForm from '../../components/inner/task/RplTaskSearchForm';
import RplTaskSearchGrid from '../../components/inner/task/RplTaskSearchGrid';
import PutawayTaskSearchForm from '../../components/inner/task/PutawayTaskSearchForm';
import PutawayTaskSearchGrid from '../../components/inner/task/PutawayTaskSearchGrid';
import RtnPutawayTaskSearchForm from '../../components/inner/task/RtnPutawayTaskSearchForm';
import RtnPutawayTaskSearchGrid from '../../components/inner/task/RtnPutawayTaskSearchGrid';
import RtnShelfTaskSearchForm from '../../components/inner/task/RtnShelfTaskSearchForm';
import RtnShelfTaskSearchGrid from '../../components/inner/task/RtnShelfTaskSearchGrid';
import RtnHandoverTaskSearchForm from '../../components/inner/task/RtnHandoverTaskSearchForm';
import RtnHandoverTaskSearchGrid from '../../components/inner/task/RtnHandoverTaskSearchGrid';
import PickTaskSearchForm from '../../components/inner/task/PickTaskSearchForm';
import PickTaskSearchGrid from '../../components/inner/task/PickTaskSearchGrid';
import PickModal from '../../components/inner/task/PickModal';
import ArticleMove from '../../components/inner/task/ArticleMove';
import ContainerMove from '../../components/inner/task/ContainerMove';
import UserModal from '../../components/inner/task/UserModal';
import WMSProgress from '../../components/widget/WMSProgress';

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
        userList,
        currentUser,
        taskNext,
        pickTaskEntitys,
        setPickModalVisable,
        batchPickProcessModalVisable,
        rtnShelfTaskEntitys,
        batchRtnShelfProcessModalVisable,
        taskType
    } = task;

    const TaskType={
        PUTAWAY:"Putaway",
        RPL:"Rpl",
        PICK:"Pick",
        RTNPUTAWAY:"RtnPutaway",
        RTNSHELF:"RtnShelf",
        RTNHANDOVER:"RtnHandover",
        MOVE:"Move"
    };

    const { field, keyword } = location.query;
    const taskListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/wms/inner/task',
                query: {
                    taskType:taskType,
                    page: page.current,
                    pageSize: page.pageSize,
                    token: localStorage.getItem("token"),
                    sort: sorter.field,
                    sortDirection: sorter.order
                }
            }));
        },
        refresRealCaseQtyStr(index,realQty,qpcStr){
            dispatch({
                type: 'task/refresRealCaseQtyStr',
                payload: {
                    index:index,
                    qty:realQty,
                    qpcStr:qpcStr,
                    tasks:list
                }
            });
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
                message.warning("请选择要上架的指令", 2, '');
                return;
            };
            for(var i = 0; i < tasks.length; i++){
                var task=tasks[i];
                if(!task.toBinCode || "-"===task.toBinCode){
                    message.error("第"+(i+ 1)+"条指令未设置目标货位", 2, '');
                    return;
                }
            };
            dispatch({
                type: 'task/batchPutAwayTask',
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
                type: 'task/batchRplTask',
                payload: {
                   rplTaskEntitys:tasks
                }
            });
        },
        onRtnShelf(tasks) {
            if (tasks.length <= 0) {
                message.warning("请选择要下架的指令", 2, '');
                return;
            };
            for(var i = 0; i < tasks.length; i++){
                var task=tasks[i];
                if(!task.toBinCode || "-"===task.toBinCode){
                    message.error("第"+(i+ 1)+"条指令未设置目标货位", 2, '');
                    return;
                }
            };
            dispatch({
                type: 'task/batchRtnShelfTask',
                payload: {
                   rtnShelfTaskEntitys:tasks
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
                    toContainerBarcode:entity.toContainerBarcode,
                    taskType:taskType
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
                    token: localStorage.getItem("token"),
                    taskType:taskType
                }
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
                    taskType:taskType
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideBatchRplTask'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token"),
                    taskType:taskType
                }
            });
        }
    };

    const batchProcessRtnShelfTaskProps = {
        showConfirmModal: batchRtnShelfProcessModalVisable,
        records: rtnShelfTaskEntitys ? rtnShelfTaskEntitys : [],
        next: taskNext,
        actionText: '退货下架',
        entityCaption: '指令',
        batchProcess(entity) {
            dispatch({
                type: 'task/rtnShelf',
                payload: {
                    uuid:entity.uuid,
                    version:entity.version,
                    toBinCode:entity.toBinCode,
                    toContainerBarcode:entity.toContainerBarcode,
                    qty:entity.realQty,
                    taskType:taskType
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'task/hideBatchRtnShelfTask'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'task/query',
                payload: {
                    token: localStorage.getItem("token"),
                    taskType:taskType
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
                    version: entity.version,
                    taskType:taskType
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
                    token: localStorage.getItem("token"),
                    taskType:taskType
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
            fieldsValue.taskType=taskType;
            dispatch({
                type: 'task/query',
                payload: fieldsValue
            });
        }
    };

    const tabsProps = {
        onPageChange(key) {
            dispatch({
                type: 'task/query',
                payload: {taskType:key}
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
                <Tabs defaultActiveKey={TaskType.PUTAWAY} onChange={activeKey=> tabsProps.onPageChange(activeKey)}>
                    <Tabs.TabPane tab="收货上架" key={TaskType.PUTAWAY}>
                        <PutawayTaskSearchForm {...taskSearchProps} />
                        <PutawayTaskSearchGrid {...taskListProps} />                    
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="补货" key={TaskType.RPL}>
                        <RplTaskSearchForm {...taskSearchProps} />
                        <RplTaskSearchGrid {...taskListProps} />      
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="退仓上架" key={TaskType.RTNPUTAWAY}>
                        <RtnPutawayTaskSearchForm {...taskSearchProps} />
                        <RtnPutawayTaskSearchGrid {...taskListProps} />      
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="退货下架" key={TaskType.RTNSHELF}>
                        <RtnShelfTaskSearchForm {...taskSearchProps} />
                        <RtnShelfTaskSearchGrid {...taskListProps} />      
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="退货交接" key={TaskType.RTNHANDOVER}>
                        <RtnHandoverTaskSearchForm {...taskSearchProps} />
                        <RtnHandoverTaskSearchGrid {...taskListProps} />      
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="拣货" key={TaskType.PICK}>
                        <PickTaskSearchForm {...taskSearchProps} />
                        <PickTaskSearchGrid {...taskListProps} />      
                    </Tabs.TabPane>
                </Tabs>
                <WMSProgress {...batchProcessAbortTaskProps} />
                <UserModal {...userModalProps} />
                <WMSProgress {...batchProcessRplTaskProps} />
                <WMSProgress {...batchProcessPutAwayTaskProps} />
                <PickModal {...pickModalProps} />
                <WMSProgress {...batchProcessRtnShelfTaskProps} />
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