import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import BinTypeSearchForm from '../../components/BasicInfo/BinType/BinTypeSearchForm';
import BinTypeGrid from '../../components/BasicInfo/BinType/BinTypeGrid';
import BinTypeModal from '../../components/BasicInfo/BinType/BinTypeModal';

function BinType({location, dispatch, binType}) {
    const {list, pagination, total, current, currentItem, modalVisible, modalType, } = binType;

    const {field, keyword} = location.query;
    const binTypeModalProps = {

        item: modalType === 'update' ? currentItem : {},
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            let token = localStorage.getItem("token");
            data.token = token;
            dispatch({
                type: `binType/${modalType}`,
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'binType/hideModal'
            })
        },
    };

    const binTypeListProps = {
        dataSource: list,
        pagination: pagination,
        onCreate() {
            dispatch({
                type: 'binType/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
        onPageChange(page, filters, sorter) {
            console.log("sorter");
            console.dir(sorter);
            dispatch(routerRedux.push({
                pathname: '/wms/basicInfo/binType',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    token: localStorage.getItem("token"),
                    sort: sorter.field,
                    sortDirection: sorter.order,
                }
            }))
        },
        onEditItem(item) {
            dispatch({
                type: 'binType/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            })
        },
        onDelete(item) {
            let token = localStorage.getItem("token");
            dispatch({
                type: 'binType/remove',
                payload: {
                    uuid: item.uuid,
                    version: item.version,
                    token: token,
                },
            })
        },
    };

    const binTypeSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            console.log("route层");
            dispatch({
                type: 'binType/query',
                payload: fieldsValue,
            })
        }
    };

    const BinTypeModalGen = () => <BinTypeModal {...binTypeModalProps} />

    function refreshWidget() {
        return (
            <div>
                <BinTypeSearchForm {...binTypeSearchProps} />
                <BinTypeGrid {...binTypeListProps} />
                <BinTypeModalGen />
            </div>
        )
    }

    return (
        <div>{refreshWidget()}</div>
    )
}

BinType.propTypes = {
    binType: PropTypes.object,
}

function mapStateToProps({binType}) {
    return { binType }
}

export default connect(mapStateToProps)(BinType)