import React, { PropTypes } from 'react';
import { Form, InputNumber, Modal,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ContainerModal = ({
  visible,
  containerTypes,
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
        onOk(data);
      });
  }

  const modalOpts = {
    title: '容器新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const options = [];
  if(containerTypes){

  for (let i = 0; i < containerTypes.length; i++) {
    let option = containerTypes[i];
    options.push(
      <Option key={option.uuid}>{option.name}</Option>
    );
  }
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem {...formItemLayout} label="容器类型：" hasFeedback>
            {getFieldDecorator('containerType' ,{
            rules: [{ required: true, message: '地址不能为空' },],
        })(
        <Select size="large" style={{ width: 200 }} >
          {options}
        </Select>
        )}
        </FormItem>
        <FormItem {...formItemLayout} label="生成个数：" hasFeedback>
         {getFieldDecorator('count')(
            <InputNumber min={1} max={100} />
             )}
        </FormItem>
      </Form>
    </Modal>
  )
}

ContainerModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  containerTypes: PropTypes.array,
}

export default Form.create()(ContainerModal);
