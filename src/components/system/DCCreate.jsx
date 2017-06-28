import React, { PropTypes } from 'react';
import {
  Form,
  Input,
  Button
} from 'antd';

import { config } from '../../utils';
import styles from '../less/login.less';

const FormItem = Form.Item;
const DCCreate = ({
  onCreate,
  onBack,
  creatingButtonLoading,
  form: {
		getFieldDecorator,
    validateFieldsAndScroll
	}
}) => {
  function handleSign() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      };
      onCreate(values);
    });
  };

  function handleCancel() {
    onBack();
  };

  document.onKeyup = e => e.keyCode === 13 && handleOk();
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
  const ButtonGroup = Button.Group;

  return (
    <div className={styles.signInForm}>
      <div className={styles.logo}>
        <span>新仓库</span>
      </div>
      <Form onSubmit={handleSign}>
        <FormItem
          {...formItemLayout}
          label="仓库名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入仓库名称！',
            }, { max: 100, message: '仓库名称最大长度是100！' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="面积" hasFeedback>
          {getFieldDecorator('acreage', {
            rules: [{
              required: true, message: '请输入仓库面积！',
            }, { max: 12, message: '面积最大长度是12！' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="管理员代码" hasFeedback>
          {getFieldDecorator('adminCode', {
            rules: [{
              required: true, message: '请确认管理员代码！',
            }, { max: 30, message: '管理员代码最大长度是30！' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="管理员名称">
          {getFieldDecorator('adminName', {
            rules: [{ required: true, message: '请输入管理员名称！' },
            { max: 100, message: '管理员名称最大长度是100！' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="地址">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: '请输入地址！' },
            { max: 100, message: '地址最大长度是100！' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="主页">
          {getFieldDecorator('homePage', {
            rules: [{ required: false }, { max: 100, message: '主页最大长度是100！' }],
          })(
            <Input />
            )}
        </FormItem>
        <div className={styles.loginFormForgot}>
          <Button type="primary" htmlType="submit" size="large" loading={creatingButtonLoading}>创建</Button>
          <Button size="large" onClick={handleCancel}>取消</Button>
        </div>
      </Form>
    </div>
  );
};

DCCreate.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onBack: PropTypes.func,
  creatingButtonLoading: PropTypes.bool
};

export default Form.create()(DCCreate);
