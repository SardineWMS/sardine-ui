import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';

import WaveBillSearchForm from '../../components/forward/wave/WaveBillSearchForm';
import WaveBillSearchGrid from '../../components/forward/wave/WaveBillSearchGrid';
import WaveBillCreateForm from '../../components/forward/wave/WaveBillCreateForm';
import WaveBillCreateItem from '../../components/forward/wave/WaveBillCreateItem';
import WaveBillSelectAlcNtcModal from '../../components/forward/wave/WaveBillSelectAlcNtcModal';
import WaveBillView from '../../components/forward/wave/WaveBillView';
import WMSProgress from '../../components/Widget/WMSProgress';
import { removeByValue } from '../../utils/ArrayUtils';


function WaveBill({ location, dispatch, waveBill }) {
    const { showPage, selectModalVisible, allInitialAlcNtcList, selectedAlcNtcList, waveType, serialArchList, currentItem, list, batchDeleteProcessModal, waveBillNext, deleteWaveBillEntitys, allRemoveAlcNtcList, isUpdate, existAlcNtcList, pagination } = waveBill;

    const waveBillSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/forward/waveBill',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.field,
                    order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
                }
            }));
        },
        onCreate() {
            dispatch({
                type: 'waveBill/showCreate'
            });
        },
        onViewItem(data) {
            dispatch({
                type: 'waveBill/viewWaveBill',
                payload: data
            })
        },
        onRemoveBatch(waveBills) {
            if (waveBills.length <= 0) {
                message.error("请选择要删除的波次单！", 2, '');
                return;
            };
            dispatch({
                type: 'waveBill/batchDeleteWaveBill',
                payload: {
                    deleteWaveBillEntitys: waveBills
                }
            });
        }
    };

    const waveBillSelectAlcNtcModalProps = {
        visible: selectModalVisible,
        dataSource: allInitialAlcNtcList,
        onCancel() {
            dispatch({
                type: 'waveBill/hideSelectModal'
            })
        },
        onOk(selectedAlcNtcs) {
            const length = selectedAlcNtcList.length;
            for (let i = 0; i < selectedAlcNtcs.length; i++) {
                const select = {};
                select.alcNtcBillNumber = selectedAlcNtcs[i].billNumber;
                select.line = length + i + 1;
                select.alcNtcBillState = selectedAlcNtcs[i].state;
                select.customer = selectedAlcNtcs[i].customer;
                selectedAlcNtcList.push(select);
                selectedAlcNtcList.sort(function (a, b) {
                    return a.line - b.line;
                });
            }
            dispatch({
                type: 'waveBill/hideSelectModal',
                payload: {
                    selectedAlcNtcList: selectedAlcNtcList
                }
            })
        }
    };

    const waveBillCreateItemProps = {
        dataSource: selectedAlcNtcList,
        onAddItem() {
            dispatch({
                type: 'waveBill/showSelectModal',
                payload: {
                    selectedAlcNtcList: selectedAlcNtcList,
                    waveType: waveType,
                    allRemoveAlcNtcList: allRemoveAlcNtcList,
                    isUpdate: isUpdate,
                    existAlcNtcList: existAlcNtcList
                }
            })
        },
        onRemoveBatch(waveBills) {
            dispatch({
                type: 'waveBill/removeSelectedBill',
                payload: {
                    selectedAlcNtcList: selectedAlcNtcList,
                    removes: waveBills,
                    allRemoveAlcNtcList: allRemoveAlcNtcList
                }
            })
        }
    };

    const waveBillCreateFormProps = {
        waveType: waveType,
        serialArchList: serialArchList,
        item: currentItem,
        onSelectType(value) {
            if (value === 'eCommerce')
                dispatch({
                    type: 'waveBill/selectTypeSuccess',
                    payload: {
                        waveType: value
                    }
                });
            else if (value === 'normal')
                dispatch({
                    type: 'waveBill/selectType',
                    payload: {
                        waveType: value
                    }
                });
        },
        onCancel() {
            dispatch({
                type: 'waveBill/query',
                payload: {
                    waveType: '',
                }
            })
        },
        handleSave(data) {
            data.serialArch = {};
            if (data.serialArchUuid != null) {
                if (data.serialArchUuid.indexOf("[") > 0)
                    data.serialArch = currentItem.serialArch;
                else
                    data.serialArch.uuid = data.serialArchUuid;
            }
            data.items = selectedAlcNtcList;
            const result = { ...currentItem, ...data };
            if (result.uuid) {
                dispatch({
                    type: 'waveBill/update',
                    payload: result
                });
            } else {
                dispatch({
                    type: 'waveBill/insert',
                    payload: result
                })
            }
        }
    };

    const WaveBillViewProps = {
        item: currentItem,
        onEdit(data) {
            dispatch({
                type: 'waveBill/edit',
                payload: data
            })
        },
        onDelete(data) {
            dispatch({
                type: 'waveBill/delete',
                payload: data
            })
        },
        onBack() {
            dispatch({
                type: 'waveBill/query',
            })
        }
    };

    const batchProcessDeleteWaveBillProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteWaveBillEntitys ? deleteWaveBillEntitys : [],
        next: waveBillNext,
        actionText: '删除',
        entityCaption: '波次单',
        batchProcess(entity) {
            dispatch({
                type: 'waveBill/delete',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token")
                }
            });
        },
        hideConfirmModal() {
            dispatch({
                type: 'waveBill/hideDeleteWaveBillModal'
            });
        },
        refreshGrid() {
            dispatch({
                type: 'waveBill/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

    const waveBillSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'waveBill/query',
                payload: fieldsValue
            });
        }
    };

    const WaveBillSelectAlcNtcModalGen = () => <WaveBillSelectAlcNtcModal {...waveBillSelectAlcNtcModalProps} />;
    const WaveBillCreateItemGen = () => <WaveBillCreateItem {...waveBillCreateItemProps} />;

    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div><WaveBillView {...WaveBillViewProps} /></div>
                        case 'create':
                            return <div><WaveBillCreateForm {...waveBillCreateFormProps} />
                                <WaveBillCreateItemGen />
                                <WaveBillSelectAlcNtcModalGen />
                            </div>
                        default:
                            return <div><WaveBillSearchForm {...waveBillSearchFormProps} />
                                <WaveBillSearchGrid {...waveBillSearchGridProps} />
                                <WMSProgress {...batchProcessDeleteWaveBillProps} />
                            </div>
                    }
                })()
            }
        </div>
    );
};

WaveBill.propType = {

};

function mapStateToProps({ waveBill }) {
    return {
        waveBill
    };
};

export default connect(mapStateToProps)(WaveBill);