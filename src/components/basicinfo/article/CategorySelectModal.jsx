import React, { PropTypes } from 'react';
import { Modal, Form } from 'antd';
import CategorySelectGrid from './CategorySelectGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';

const CategorySelectModal = ({
    visible,
    item = {},
    onOk,
    onCancel,
    categoryList,
    categoryPagination
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 800
    };

    const categorySelectGridProps = {
        dataSource: categoryList,
        pagination: categoryPagination,
        onSelect: onOk
    };
    return (
        <Modal {...modalOpts}>
            <BaseCard title="选择类别" single={true}>
                <BaseForm items={<CategorySelectGrid {...categorySelectGridProps} />} />
            </BaseCard>
        </Modal>
    );
};

export default Form.create()(CategorySelectModal);