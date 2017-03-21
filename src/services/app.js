import request from '../utils/request';
import qs from 'qs';
import fetch from 'dva/fetch';
import {addTokenToUrl,updateBaseNullBody,addTokenToParamsAndStringify} from '../utils/BaseService.js';


export async function login(params) {
  return request(`/api/authen/login?${qs.stringify(params)}`);
}

export async function logout(params) {
  return request(`api/authen/loginOut?${qs.stringify(params)}`);
}

export async function signIn(params) {
  return request('/api/authen/register', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function userInfo(params) {
  return request('/api/user/getbycode', {
    method: 'get',
    body: qs.stringify(params),
  })
}

export async function updatePasswd(params) {
  const url=`api/authen/update_passwd?${qs.stringify(params)}`;
  return request(url,updateBaseNullBody(params));
}