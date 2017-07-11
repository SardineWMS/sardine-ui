import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Modal } from 'antd';
import BaseFormItem from '../Widget/BaseFormItem';
import SInput from '../Widget/SInput';

const FormItem = Form.Item;
const CreateDCModal = ({
  title,
  onOk,
  onCancel,
  visible,
  wareHouse,
  uuid,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
  }
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(), uuid: wareHouse.uuid, version: wareHouse.version, code: wareHouse.code, companyType: wareHouse.companyType
      };
      onOk(data);
    });
  };

  const modalOpts = {
    title: title,
    onOk: handleOk,
    visible,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 6,
      offset: 6
    }
  };

  const items = [];
  items.push(<SInput key="name" label="仓库名称" fieldName="name" getFieldDecorator={getFieldDecorator} isTop rules="[{
              required: true, message: '请输入仓库名称！',
            }, { max: 100, message: '仓库名称最大长度是100！' }]" value={wareHouse ? wareHouse.name : null} />);
  items.push(<SInput key="shortName" label="仓库简称" fieldName="shortName" getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '请输入仓库简称！',
            }, { max: 6, message: '仓库名称最大长度是6！' }]" value={wareHouse ? wareHouse.shortName : null} />);
  items.push(<BaseFormItem {...formItemLayout} label="仓库类型" hasFeedback key="dcType">
          {getFieldDecorator('dcType', {
            initialValue: wareHouse ? wareHouse.dcType : '常温配送',
            rules: [{
              required: true, message: '请选择仓库类型！',
            }],
          })(
            <Select>
              <Select.Option key="常温配送">常温配送</Select.Option>
              <Select.Option key="生鲜配送">生鲜配送</Select.Option>
              <Select.Option key="混合配送">混合配送</Select.Option>
            </Select>
            )}
        </BaseFormItem>);
  items.push(<SInput key="adminCode" label="管理员代码" fieldName="adminCode" getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '请确认管理员代码！',
            }, { max: 30, message: '管理员代码最大长度是30！' }]" value={wareHouse ? wareHouse.adminCode : null} />);
  items.push(<SInput key="adminName" label="管理员名称" fieldName="adminName" getFieldDecorator={getFieldDecorator} rules="[{ required: true, message: '请输入管理员名称！' },
            { max: 100, message: '管理员名称最大长度是100！' }]" value={wareHouse ? wareHouse.adminName : null} />);
  items.push(<SInput key="password" label="管理员密码" fieldName="password" getFieldDecorator={getFieldDecorator} rules="[{ required: true, message: '请输入管理员密码！' },
            { max: 30, message: '管理员密码最大长度是30！' }]" value={wareHouse ? wareHouse.password : null} />);
  items.push(<SInput key="adminPhone" label="管理员联系方式" fieldName="adminPhone" getFieldDecorator={getFieldDecorator} rules="[{ required: true, message: '请输入管理员联系方式！' },
            { max: 100, message: '管理员联系方式最大长度是100！' }]" value={wareHouse ? wareHouse.adminPhone : null} />);
  items.push(<SInput key="address" label="地址" fieldName="address" getFieldDecorator={getFieldDecorator} rules="[{ required: true, message: '请输入地址！' },
            { max: 100, message: '地址最大长度是100！' }]" value={wareHouse ? wareHouse.address : null} />);
  items.push(<SInput key="acreage" label="面积" fieldName="acreage" getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '请输入仓库面积！',
            }, { pattern: /^[+]?[\d]+(([\.]{1}[\d]+)|([\d]*))$/,
                 message: '面积必须为数字且大于0！',}]" value={wareHouse ? wareHouse.acreage : null} addonAfter="㎡" />);
  items.push(<SInput key="homePage" label="主页" fieldName="homePage" getFieldDecorator={getFieldDecorator} rules="[{ max: 100, message: '主页最大长度是100！' }]" 
             value={wareHouse ? wareHouse.homePage : null} isBottom />);

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        {items}
      </Form>
    </Modal>
  );
};

CreateDCModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  wareHouse: PropTypes.object,
  title: PropTypes.any
};

export default Form.create()(CreateDCModal);
