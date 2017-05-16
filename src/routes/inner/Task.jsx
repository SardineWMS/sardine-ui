import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import TaskSearchForm from '../../components/Inner/Task/TaskSearchForm';
import TaskSearchGrid from '../../components/Inner/Task/TaskSearchGrid';

function Task({location, dispatch, task}) {
    const {
        list, 
        pagination, 
        total, 
        current, 
        currentItem, 
        modalVisible, 
        modalType
    } = task;

    const {field, keyword} = location.query;
    

    const taskListProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            console.log("sorter");
            console.dir(sorter);
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