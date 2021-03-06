import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select
} from 'antd'
import {
  config
} from '../../../utils'
import styles from '../../less/login.less'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  loading,
  onOk,
  onRegister,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      };
      onOk(values);
    });
  };

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>Sardine-WMS</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('loginid', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size="large" type="password" placeholder="密码" onPressEnter={() => handleOk()} />)}
        </FormItem>
        <Row>
          <Link onClick={onRegister}>注册</Link>
          <Button type="primary" size="large" onClick={handleOk} loading={loading}>
            登录
          </Button>
        </Row>
      </form>
    </div>
  );
};

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
  onRegister: PropTypes.func
};

export default Form.create()(login);