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
        getFieldsValue,
    },
    orderBillLists,
    orderBillPagination,
}) => {

    const modalOpts = {
        title: '请选择：订单',
        visible,
        onOk: onOk,
        onCancel,
    }

    const orderBillSelectGridProps = {
        dataSource: orderBillLists,
        pagination: orderBillPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择订单" single={true}>
                <BaseForm items={<OrderBillSelectGrid {...orderBillSelectGridProps} />} />
            </BaseCard>
            <a>是否显示modal</a>
        </Modal>
    )
}

export default Form.create()(OrderBillSelectModal);