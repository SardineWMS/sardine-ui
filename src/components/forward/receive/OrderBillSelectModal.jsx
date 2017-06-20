import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import OrderBillSelectGrid from './OrderBillSelectGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';

const OrderBillSelectModal = ({
    visible,
    item = {},
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    orderBillLists,
    orderBillPagination
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 800
    };

    const orderBillSelectGridProps = {
        dataSource: orderBillLists,
        pagination: orderBillPagination,
        onSelect: onOk
    };
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择订单" single={true}>
                <BaseForm items={<OrderBillSelectGrid {...orderBillSelectGridProps} />} />
            </BaseCard>
        </Modal>
    );
};

export default Form.create()(OrderBillSelectModal);