import React, { PropTypes } from 'react';
import { Form, Input , Modal,Select } from 'antd';
import BaseFormItem from '../../Widget/BaseFormItem';
const Option = Select.Option;

const SetFixedPickBinModal = ({
  visible,
  articles,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
         ...getFieldsValue(),
        }
        articles.map(function(article){
          article.fixedPickBin=data.fixedPickBin;
        });
        onOk(articles);
      });
  }

  const modalOpts = {
    title: '固定存储位设置',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
        <BaseFormItem label="固定拣货位">
          {getFieldDecorator('fixedPickBin', {
              initialValue: null,
              rules: [
                {
                  required: true,
                  message: '固定拣货位未填写',
                },
              ],
            })
            (<Input />)
          }
      </BaseFormItem>
   </Modal>
  )
}

SetFixedPickBinModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  containerTypes: PropTypes.array,
}

export default Form.create()(SetFixedPickBinModal);
