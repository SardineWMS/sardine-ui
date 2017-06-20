import React, { PropTypes } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Radio
} from 'antd';

import { config } from '../../../utils';
import styles from '../../less/login.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Register = ({
	onSignIn,
  onBack,
  signInButtonLoading,
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
      onSignIn(values);
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
        <span>Sardine注册</span>
      </div>
      <Form onSubmit={handleSign}>
        <FormItem
          {...formItemLayout}
          label="登录ID"
          hasFeedback
        >
          {getFieldDecorator('loginId', {
            rules: [{
              required: true, message: '请输入登录ID！',
            }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="密码" hasFeedback>
          {getFieldDecorator('passwd', {
            rules: [{
              required: true, message: '请输入密码！',
            }],
          })(
            <Input type="password" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码" hasFeedback>
          {getFieldDecorator('confirmPasswd', {
            rules: [{
              required: true, message: '请确认密码！',
            }],
          })(
            <Input type="password" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="企业名称">
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: '请输入企业名称！' }],
          })(
            <Input />
            )}
        </FormItem>
        <div className={styles.loginFormForgot}>
          <Button type="primary" htmlType="submit" size="large" loading={signInButtonLoading}>注册</Button>
          <Button size="large" onClick={handleCancel}>取消</Button>
        </div>
      </Form>
    </div>
  );
};

Register.propTypes = {
  form: PropTypes.object,
  onSignIn: PropTypes.func,
  onBack: PropTypes.func,
  signInButtonLoading: PropTypes.bool
};

export default Form.create()(Register);
