import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import OperatorGrid from './OperatorGrid.jsx';
import BaseCard from '../../../Widget/BaseCard';
import BaseFormItem from '../../../Widget/BaseFormItem';
import BaseForm from '../../../Widget/BaseForm';
import Guid from '../../../../utils/Guid';

const OperatorModal = ({
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    operators,
    operatorPagination,
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 500,
    }

    const operatorGridProps = {
        dataSource: operators,
        pagination: operatorPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择员工" single={true}>
                <BaseForm items={<OperatorGrid {...operatorGridProps} />} />
            </BaseCard>
        </Modal>
    )
}

export default Form.create()(OperatorModal);