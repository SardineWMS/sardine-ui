import {
  login,
  userInfo,
  logout,
  signIn,
  updatePasswd
} from '../services/app'
import {
  parse
} from 'qs'
import Cookie from 'js-cookie'

export default {
  namespace: 'app',
  state: {
    login: false,
    token: localStorage.getItem("token"),
    user: {
      name: localStorage.getItem("loginId")
    },
    loginButtonLoading: false,
    signInButtonLoading: false,
    registerLoading: false,
    modifyLoading: false,
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
      call, put
    }) {
      yield put({
        type: 'showLoginButtonLoading'
      })
      const
        { data }
          = yield call(login, payload);
      yield put({
        type: 'hideLoginButtonLoading',
      })
      if (data.token) {
        const loginUser = new Object();
        loginUser.uuid = data.obj.uuid;
        loginUser.code = data.obj.code;
        loginUser.name = data.obj.name;
        localStorage.setItem("loginUser", loginUser);
        localStorage.setItem("loginCode", data.obj.code);
        localStorage.setItem("loginId", data.obj.uuid);
        localStorage.setItem("loginName", data.obj.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", data.obj.administrator);
        localStorage.setItem("companyUuid", data.obj.companyUuid);
        localStorage.setItem("ownedMenus", data.obj.ownedMenus);
        localStorage.setItem("ownedResources", data.obj.ownedResources);
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
    },

    * register({
      payload
    }, {
      call,
        put
    }) {
      const {
        data
      } = yield call(signIn, parse(payload));
      console.log("data 数据");
      console.dir(data);
      if (data.status === "200") {
        console.log("判断正确");
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
      yield put({
        type: 'handleSwitchSider'
      })
    },
    * changeTheme({
      payload
    }, {
      put
    }) {
      yield put({
        type: 'handleChangeTheme'
      })
    },

    * updatePasswd({
      payload
    }, {
      call,
        put
    }) {
      const data = yield call(updatePasswd, {
        oldPasswd: payload.oldPasswd,
        newPasswd: payload.newPasswd,
        token: payload.token
      });
      if (data) {
        localStorage.removeItem("token");
        localStorage.removeItem("loginId");
        yield put({
          type: 'hideModify'
        });
        yield put({
          type: 'logoutSuccess'
        });
      }
    },

  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
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
        registerLoading: false,
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

    showModify(state) {
      return {
        ...state,
        modifyLoading: true
      }
    },

    hideModify(state) {
      return {
        ...state,
        modifyLoading: false
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
    hideLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: false
      }
    },
  }
}