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

import { config } from '../utils';
import styles from '../Components/less/login.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Register1 = ({
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

  // document.onKeyup = e => e.keyCode === 13 && handleOk();
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
        <span>用户注册</span>
      </div>
      <Form onSubmit={handleSign}>
        <FormItem
          {...formItemLayout}
          label="用户代码"
          hasFeedback
        >
          {getFieldDecorator('code', {
            rules: [{
              required: true, message: 'Please input your code!',
            }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="用户名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="密码" hasFeedback>
          {getFieldDecorator('passwd', {
            rules: [{
              required: true, message: 'Please input your password!',
            }],
          })(
            <Input type="password" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="企业类型">
          {getFieldDecorator('companyType', {
            /**
             * RadioGroup组件因为被getFieldDecorator修饰，导致defaultValue属性失效，因此要用initialValue来指定。
             */
            rules: [{ required: true, message: 'Please select your phone number!' }],
            initialValue: "deliveryCenter"
          })(
            <RadioGroup>
              <Radio value="deliveryCenter" defaultChecked={true}>配送中心</Radio>
              <Radio value="supplier">供应商</Radio>
              <Radio value="carrier">承运商</Radio>
            </RadioGroup>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="企业名称">
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: 'Please input your companyName!' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="地址">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your address!' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="主页">
          {getFieldDecorator('homePage', {
            rules: [{ required: true, message: 'Please input your homePage!' }],
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

Register1.propTypes = {
  form: PropTypes.object,
  onSignIn: PropTypes.func,
  onBack: PropTypes.func,
  signInButtonLoading: PropTypes.bool
};

export default Form.create()(Register1);
