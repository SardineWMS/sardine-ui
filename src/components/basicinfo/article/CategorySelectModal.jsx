import React, { PropTypes } from 'react';
import {Modal, Form} from 'antd';
import CategorySelectGrid from './CategorySelectGrid.jsx';
import BaseCard from '../../Widget/BaseCard';
import BaseForm from '../../Widget/BaseForm';

const CategorySelectModal = ({
    visible,
    item = {},
    onOk,
    onCancel,
    categoryList,
    categoryPagination,
}) => {

    const modalOpts = {
        visible,
        onOk: onOk,
        onCancel,
        width: 600,
        title: '请选择类别'
    }

    const categorySelectGridProps = {
        dataSource: categoryList,
        pagination: categoryPagination,
        onSelect: onOk,
    }
    return (
        <Modal {...modalOpts}>
            <CategorySelectGrid {...categorySelectGridProps} />
        </Modal>
    )
}

export default Form.create()(CategorySelectModal);