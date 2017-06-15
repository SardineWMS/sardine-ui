import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import CustomerSelectGrid from './CustomerSelectGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';

const CustomerSelectModal = ({
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    customers,
    customerPagination,
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 500,
    }

    const customerSelectGridProps = {
        dataSource: customers,
        pagination: customerPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择客户" single={true}>
                <BaseForm items={<CustomerSelectGrid {...customerSelectGridProps} />} />
            </BaseCard>
        </Modal>
    )
}

export default Form.create()(CustomerSelectModal);