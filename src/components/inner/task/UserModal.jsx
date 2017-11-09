import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, } from 'antd';
const FormItem = Form.Item;
import UserGrid from './UserGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseFormItem from '../../Widget/BaseFormItem';
import BaseForm from '../../Widget/BaseForm';
import Guid from '../../../utils/Guid';

const UserModal = ({
    visible,
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    users,
    userPagination,
}) => {
 
    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 500,
    }

    const userGridProps = {
        dataSource: users,
        pagination: userPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择员工" single={true}>
                <BaseForm items={<UserGrid {...userGridProps} />} />
            </BaseCard>
        </Modal>
    )
}

export default Form.create()(UserModal);