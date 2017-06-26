import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd';

import PickAreaSearchForm from '../../components/basicinfo/pickarea/PickAreaSearchForm';
import PickAreaSearchGrid from '../../components/basicinfo/pickarea/PickAreaSearchGrid';
import PickAreaCreateForm from '../../components/basicinfo/pickarea/PickAreaCreateForm';
import PickAreaViewForm from '../../components/basicinfo/pickarea/PickAreaViewForm';
import WMSProgress from '../../components/Widget/WMSProgress';


function PickArea({ location, dispatch, pickArea }) {
    const { showPage, currentItem, list, pagination, batchRemoveProcessModal, removePickAreaEntitys, pickAreaNext } = pickArea;

    const pickAreaCreateFormProps = {
        item: currentItem,
        handleSave(data) {
            const result = { ...currentItem, ...data };
            if (currentItem.uuid) {
                dispatch({
                    type: 'pickArea/update',
                    payload: result
                });
            } else {
                dispatch({
                    type: 'pickArea/insert',
                    payload: result
                });
            };
        },
        onCancel() {
            dispatch({
                type: 'pickArea/query',
                payload: {}
            });
        },
    };

    const pickAreaSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onCreate() {
            dispatch({
                type: 'pickArea/createSuccess'
            });
        },

        onCancel() {
            dispatch({
                type: 'pickArea/query',
                payload: {}
            });
        },
        onViewItem(item) {
            dispatch({
                type: 'pickArea/onViewItem',
                payload: { currentItem: item }
            });
        },
        onRemoveBatch(pickAreas) {
            if (pickAreas.length <= 0) {
                message.warning("请选择要删除的拣货分区", 2, '');
                return;
            };
            dispatch({
                type: 'pickArea/batchRemovePickArea',
                payload: {
                    removePickAreaEntitys: pickAreas
                }
            });
        },
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/basicInfo/pickArea',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
    };

    const pickAreaViewFormProps = {
        item: currentItem,
        onBack(data) {
            dispatch({
                type: 'pickArea/query',
                payload: {
                    currentItem: {}
                }
            });
        },
        showEdit(item) {
            dispatch({
                type: 'pickArea/itemEditSuccess',
                payload: item
            });
        },
        onRemove(item) {
            dispatch({
                type: 'pickArea/remove',
                payload: item
            });
        }
    };

    const pickAreaSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'pickArea/query',
                payload: fieldsValue
            });
        }
    };

    const batchProcessRemovePickAreaProps = {
        showConfirmModal: batchRemoveProcessModal,
        records: removePickAreaEntitys ? removePickAreaEntitys : [],
        next: pickAreaNext,
        actionText: '删除',
        entityCaption: '拣货分区',
        batchProcess(entity) {
            dispatch({
                type: 'pickArea/remove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'pickArea/hideRemovePickAreaModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'pickArea/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };



    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div><PickAreaViewForm  {...pickAreaViewFormProps} /></div>
                        case 'create':
                            return <div><PickAreaCreateForm {...pickAreaCreateFormProps} /></div>
                        default: {
                            return (
                                <div>
                                    <PickAreaSearchForm {...pickAreaSearchFormProps} />
                                    <PickAreaSearchGrid {...pickAreaSearchGridProps} />
                                    <WMSProgress {...batchProcessRemovePickAreaProps} />
                                </div>
                            )
                        }
                    }
                })()
            }
        </div>
    );
};

PickArea.propType = {
    pickArea: PropTypes.object
};

function mapStateToProps({ pickArea }) {
    return {
        pickArea
    };
};

export default connect(mapStateToProps)(PickArea);