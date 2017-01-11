const qs = require('qs')
const Mock = require('mockjs')
const Cookie = require("js-cookie")

module.exports = {
  'GET /api/authen/login' (req, res) {
    const userItem = qs.parse(req.query);
    const response = {
      success: false,
      obj: {
        code: "",
      },
      token: "",
      message: ""
    }

    if (userItem.loginid === 'admin' && userItem.password === '123') {
      const now = new Date()
      now.setDate(now.getDate() + 1);
      response.message = "登录成功";
      response.success = true;
      response.obj.code = userItem.loginid;
      response.token = Math.random().toString(36).substring(7);
    } else if (userItem.loginid === 'admin') {
      response.message = "密码不正确";
    } else {
      response.message = "用户不存在"
    }

    res.json(response);
  },

  'POST /api/signIn' (req, res) {
    const {
      signItem
    } = qs.parse(req.body);
    const response = {
      success: true,
      message: "注册成功"
    }

    console.dir(qs.parse(req.body));
    setTimeout(function() {
      res.json(response);
    }, 2000);
  },

  'POST /api/authen/loginOut' (req, res) {
    res.json({
      success: true,
      message: "退出成功"
    })
  }
}