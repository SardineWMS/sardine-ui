import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import SupplierSelectGrid from './SupplierSelectGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import ToolbarPanel from '../../Widget/ToolbarPanel';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';

const SupplierSelectModal = ({
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    suppliers,
    supplierPagination,
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 500,
    }

    const supplierSelectGridProps = {
        dataSource: suppliers,
        pagination: supplierPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择供应商" single={true}>
                <BaseForm items={<SupplierSelectGrid {...supplierSelectGridProps} />} />
            </BaseCard>
        </Modal>
    )
}

export default Form.create()(SupplierSelectModal);