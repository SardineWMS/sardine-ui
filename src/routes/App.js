import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'dva'
import Login from './Login';
import Header from '../components/Layout/Header';
import Bread from '../components/Layout/bread';
import Footer from '../components/Layout/Footer';
import Sider from '../components/Layout/sider';
import Nav from '../components/Layout/Nav';
import styles from '../components/Layout/main.less';
import '../components/Layout/common.less';
import Register from './Register';
import '../components/Layout/antMotion_style.less';
import UpdatePasswd from '../components/UpdatePasswd';

import {
  Spin,
  message
} from 'antd'
import {
  classnames
} from '../utils'

function App({
  children,
  location,
  dispatch,
  app,
  loading
}) {
  const {
    login,
    registerLoading,
    signInButtonLoading,
    loginButtonLoading,
    modifyLoading,
    user,
    token,
    siderFold,
    darkTheme,
  } = app;

  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({
        type: 'app/login',
        payload: data
      })
    },
    onRegister() {
      dispatch({
        type: 'app/showRegister'
      })
    }
  }

  const registerProps = {
    signInButtonLoading,
    onSignIn(data) {
      dispatch({
        type: 'app/register',
        payload: data
      })
    },
    onBack() {
      dispatch({
        type: 'app/registerBack'
      })
    }
  }

  const headerProps = {
    user,
    siderFold,
    logout() {
      dispatch({
        type: 'app/logout',
        payload: token
      })
    },
    switchSider() {
      dispatch({
        type: 'app/switchSider'
      })
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme() {
      dispatch({
        type: 'app/changeTheme'
      })
    }
  }

  const navProps = {
    id: 'nav_1_0',
    key: 'nav_1_0',
    user,
    siderFold,
    modifyPasswd() {
      dispatch({
        type: 'app/showModify'
      })
    },
    logout() {
      dispatch({
        type: 'app/logout'
      })
    },
  }

  const updatePasswdProps = {
    visible: modifyLoading,
    onOk(data) {
      dispatch({
        type: 'app/updatePasswd',
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: 'app/hideModify'
      })
    }
  }

  return (
    <div>
      {login ?
        <div className={classnames(styles.layout, { [styles.fold]: siderFold })}>
          <Nav {...navProps} />
          <UpdatePasswd {...updatePasswdProps} />
          <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
            <Sider {...siderProps} />
          </aside>
          <div className={styles.main}>
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                <Spin spinning={loading}>
                  {children}
                </Spin>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        : (registerLoading ?
          <div className={styles.reg}>
            <Spin spinning={loading}>
              <Register {...registerProps} />
            </Spin>
          </div>
          :
          <div className={styles.spin}><Spin tip="加载用户信息..." spinning={loading} size="large">
            <Login {...loginProps} /></Spin>
          </div>
        )}
    </div>)
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  registerLoading: PropTypes.bool,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object,
  token: PropTypes.string,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
}

function mapStateToProps({ loading, app }) {
  return {
    loading: loading.global,
    app,
  };
}

export default connect(mapStateToProps)(App)