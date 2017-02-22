import {
  login,
  userInfo,
  logout,
  signIn
} from '../services/app'
import {
  parse
} from 'qs'
import Cookie from 'js-cookie'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    token: localStorage.getItem("token"),
    user: {
      name: localStorage.getItem("loginId")
    },
    loginButtonLoading: false,
    signInButtonLoading: false,
    registerLoading: false,
    siderFold: localStorage.getItem("antdAdminSiderFold") === "true" ? true : false,
    darkTheme: localStorage.getItem("antdAdminDarkTheme") === "false" ? false : true,
  },

  /*  subscriptions: {
      setup({
        dispatch
      }) {
        dispatch({
          type: 'queryUser'
        })
      }
    },*/

  effects: {
    * login({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoginButtonLoading'
      })
      try {
        const {
          data
        } = yield call(login, payload);
        if (data.status != 200) {
          const message = data.obj;
          const simpleMessage = message.substring(message.indexOf("errorMsg='") + 10, message.indexOf("', field"));
          if (message.indexOf("errorMsg") === -1) {
            alert(data.message + "：" + message);
            return;
          }
          else {
            alert(data.message + "：" + simpleMessage);
            return;
          }
        }
        if (data.token) {
          console.dir(data);
          localStorage.setItem("loginId", data.obj.code);
          localStorage.setItem("token", data.token);
          localStorage.setItem("admin", data.obj.administrator);
          yield put({
            type: 'loginSuccess',
            payload: {
              data
            }
          })
        } else {
          yield put({
            type: 'loginFail',
            payload: {
              data
            }
          })
        }
      } catch (error) {
        console.log("登录...");
        alert("登录失败" + error.message);
      }
    },

    * register({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'showRegisterButtonLoading'
      });
      const {
        data
      } = yield call(signIn, parse(payload));
      if (data.success) {
        yield put({
          type: 'signInSuccess',
          payload: {
            data
          }
        });
      } else {
        yield put({
          type: 'signInFail',
          payload: {
            data
          }
        })
      }
    },

    * queryUser({
      payload
    }, {
      call,
      put
    }) {
      yield put({
        type: 'showLoading'
      })
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            }
          }
        })
      } else {
        yield put({
          type: 'hideLoading'
        })
      }
    },

    * logout({
      payload
    }, {
      call,
      put
    }) {
      const data = yield call(logout, {
        token: localStorage.getItem("token"),
      });
      if (!data.token) {
        localStorage.removeItem("token");
        localStorage.removeItem("loginId");
        yield put({
          type: 'logoutSuccess'
        });
      }
    },

    * switchSider({
      payload
    }, {
      put
    }) {
      console.log("switchSider");
      yield put({
        type: 'handleSwitchSider'
      })
    },
    * changeTheme({
      payload
    }, {
      put
    }) {
      console.log("changeTheme");
      yield put({
        type: 'handleChangeTheme'
      })
    },
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    signInSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        registerLoading: true,
        signInButtonLoading: false
      }
    },
    signInFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showRegister(state) {
      return {
        ...state,
        registerLoading: true
      }
    },

    registerBack(state) {
      return {
        ...state,
        registerLoading: false
      }
    },

    showSignInButtonLoading(state) {
      return {
        ...state,
        signInButtonLoading: true
      }
    },

    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem("antdAdminSiderFold", !state.darkTheme)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme(state) {
      localStorage.setItem("antdAdminDarkTheme", !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
  }
}