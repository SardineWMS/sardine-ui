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
import WMSProgress from '../../components/Widget/NewProgressForRemove';
import { removeByValue } from '../../utils/ArrayUtils';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


function WaveBill({ location, dispatch, waveBill }) {
    const { showPage, selectModalVisible, allInitialAlcNtcList, selectedAlcNtcList, waveType, serialArchList, currentItem, list, batchDeleteProcessModal, waveBillNext, deleteWaveBillEntitys, allRemoveAlcNtcList, isUpdate, existAlcNtcList, pagination, line } = waveBill;

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
                select.ntcBillNumber = selectedAlcNtcs[i].billNumber;
                select.line = length + i + 1;
                select.alcNtcBillState = selectedAlcNtcs[i].state;
                select.customer = selectedAlcNtcs[i].customer;
                for (let j = 0; j < allInitialAlcNtcList.length; j++) {
                    if (select.ntcBillNumber == allInitialAlcNtcList[j].billNumber) {
                        allInitialAlcNtcList.splice(j, 1);
                    }
                }
                selectedAlcNtcList.push(select);
                selectedAlcNtcList.sort(function (a, b) {
                    return a.line - b.line;
                });
            }
            dispatch({
                type: 'waveBill/hideSelectModal',
                payload: {
                    selectedAlcNtcList: selectedAlcNtcList,
                    allInitialAlcNtcList
                }
            })
        },
        onSearch(fieldsValue) {
            if (fieldsValue.alcDateLessThan != null) {
                fieldsValue.alcDateLessThan = moment(fieldsValue.alcDateLessThan).format("YYYY-MM-DD");
            }
            if (fieldsValue.alcDateMoreThan != null) {
                fieldsValue.alcDateMoreThan = fieldsValue.alcDateMoreThan.format("YYYY-MM-DD");
            }
            dispatch({
                type: 'waveBill/showSelectModal',

                payload: {
                    ...fieldsValue, waveType, selectedAlcNtcList: selectedAlcNtcList,
                    waveType: waveType,
                    allRemoveAlcNtcList: allRemoveAlcNtcList,
                    isUpdate: isUpdate,
                    existAlcNtcList: existAlcNtcList
                }
            });
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
                    existAlcNtcList: existAlcNtcList,
                    line: line
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
            // if (value === 'eCommerce')
            dispatch({
                type: 'waveBill/selectTypeSuccess',
                payload: {
                    waveType: value,
                    selectedAlcNtcList: [],
                }
            });
            // else if (value === 'normal')
            //     dispatch({
            //         type: 'waveBill/selectType',
            //         payload: {
            //             waveType: value,
            //             selectedAlcNtcList: [],
            //         }
            //     });
        },
        onSelectLine(value) {
            dispatch({
                type: 'waveBill/selectTypeSuccess',
                payload: {
                    line: value
                }
            })
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
            data.ntcItems = selectedAlcNtcList;
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
        onStart(data) {
            dispatch({
                type: 'waveBill/start',
                payload: data
            })
        },
        onConfirm(data) {
            dispatch({
                type: 'waveBill/confirm',
                payload: data
            })
        },
        onRollBack(data) {
            dispatch({
                type: 'waveBill/rollBack',
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
        url: '/swms/out/wave/remove',
        canSkipState: '',
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