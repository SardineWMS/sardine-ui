import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message } from 'antd';

import ReturnBillSearchForm from '../../components/backward/customerreturn/ReturnBillSearchForm';
import ReturnBillSearchGrid from '../../components/backward/customerreturn/ReturnBillSearchGrid';
import ReturnBillCreateForm from '../../components/backward/customerreturn/ReturnBillCreateForm';
import ReturnNtcBillSelectGrid from '../../components/widget/ReturnNtcBillSelectGrid';

function ReturnBill({ location, dispatch, rtnBill }) {
    const { showPage, showRtnNtcSelectModal } = rtnBill;

    const returnBillSearchGridProps = {
        onCreate() {
            dispatch({
                type: 'rtnBill/showCreateSuccess'
            })
        }
    };

    const returnNtcBillSelectGridProps = {
        visible: showRtnNtcSelectModal,
        onCancel() {
            dispatch({
                type: 'rtnBill/hideRtnNtcBillModal'
            })
        }
    };

    const returnBillCreateFormProps = {
        onRtnNtcBillSelect() {
            dispatch({
                type: 'rtnBill/showRtnNtcBillModal'
            })
        }
    }

    return (
        <div className="content-inner">
            {
                (() => {
                    switch (showPage) {
                        case 'view':
                            return <div></div>
                        case 'create':
                            return <div><ReturnBillCreateForm {...returnBillCreateFormProps} />
                                <ReturnNtcBillSelectGrid {...returnNtcBillSelectGridProps} />
                            </div>
                        default:
                            return <div><ReturnBillSearchForm />
                                <ReturnBillSearchGrid {...returnBillSearchGridProps} />
                            </div>
                    }
                })()
            }
        </div>
    );
};

function mapStateToProps({ rtnBill }) {
    return {
        rtnBill
    };
};

export default connect(mapStateToProps)(ReturnBill);