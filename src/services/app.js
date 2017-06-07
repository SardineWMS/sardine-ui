import request from '../utils/request';
import qs from 'qs';
import fetch from 'dva/fetch';
import {addTokenToUrl,updateBaseNullBody,addTokenToParamsAndStringify} from '../utils/BaseService.js';


export async function login(params) {
<<<<<<< HEAD
  return request(`/swms/ia/authen/login?${qs.stringify(params)}`);
}

export async function logout(params) {
  return request(`/swms/ia/authen/loginOut?${qs.stringify(params)}`);
}

export async function signIn(params) {
  return request('/swms/ia/authen/register', {
=======
  return request(`/wms/ia/authen/login?${qs.stringify(params)}`);
}

export async function logout(params) {
  return request(`/wms/ia/authen/loginOut?${qs.stringify(params)}`);
}

export async function signIn(params) {
  return request('/wms/ia/authen/register', {
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function userInfo(params) {
<<<<<<< HEAD
  return request('/swms/ia/user/getbycode', {
=======
  return request('/wms/ia/user/getbycode', {
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    method: 'get',
    body: qs.stringify(params),
  })
}

export async function updatePasswd(params) {
<<<<<<< HEAD
  const url=`/swms/ia/authen/update_passwd?${qs.stringify(params)}`;
=======
  const url=`/wms/ia/authen/update_passwd?${qs.stringify(params)}`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(url,updateBaseNullBody(params));
}