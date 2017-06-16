import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import TaskSearchForm from '../../components/Inner/Task/TaskSearchForm';
import TaskSearchGrid from '../../components/Inner/Task/TaskSearchGrid';
import ArticleMove from '../../components/Inner/Task/ArticleMove';
import ContainerMove from '../../components/Inner/Task/ContainerMove';

function Task({location, dispatch, task}) {
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
    } = task;

    const {field, keyword} = location.query;
    

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
                    sortDirection: sorter.order,
                }
            }))
        },
        onArticleMove() {
            dispatch({
                type: 'task/showArticleMoveModal',
                payload: { }
            })
        },
        onContainerMove() {
            dispatch({
                type: 'task/showContainerMoveModal',
                payload: { }
            })
        },
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
            })
        },
        onCancel() {
            dispatch({
                type: 'task/query'
            })
        },
        onSave(records) {
            dispatch({
                type: 'task/saveArticleMoveRule',
                payload: {
                    articleMoveRules: records
                }
            })
        },
        onSaveAndMove(records) {
            dispatch({
                type: 'task/saveAndMoveArticleMoveRule',
                payload: {
                    articleMoveRules: records
                }
            })
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
            })
        },
        onCancel() {
            dispatch({
                type: 'task/query'
            })
        },
        onSave(records) {
            dispatch({
                type: 'task/saveContainerMoveRule',
                payload: {
                    containereMoveRules: records
                }
            })
        },
        onSaveAndMove(records) {
            dispatch({
                type: 'task/saveAndMoveContainerMoveRule',
                payload: {
                    containereMoveRules: records
                }
            })
        }
    };

    const taskSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'task/query',
                payload: fieldsValue,
            })
        }
    };

    function refreshWidget() {
        if (articleMoveModalVisable) {
            return (
               <div>
                  <ArticleMove {...articleMoveProps} />
               </div>
            );
        }
        if (containerMoveModalVisable) {
            return (
               <div>
                  <ContainerMove {...containerMoveProps} />
               </div>
            );
        }
        return (
            <div>
                <TaskSearchForm {...taskSearchProps} />
                <TaskSearchGrid {...taskListProps} />
            </div>
        )
    }

    return (
        <div>{refreshWidget()}</div>
    )
}

Task.propTypes = {
    task: PropTypes.object,
}

function mapStateToProps({task}) {
    return { task }
}

export default connect(mapStateToProps)(Task)