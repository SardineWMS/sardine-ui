import request from '../utils/request';
import qs from 'qs';
import { query } from '../utils/BaseService';

export async function queryUser(params) {
  const url = "/api/user/querybypage";
  return request(query(url, params));
}

export async function login(params) {
  console.log('service ');
  return request(`/api/ia/authen/login?${qs.stringify(params)}`);
}

export async function register(params) {
  console.log('注册用户 ');
  return request('/api/register', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function create(params) {
  return request('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/users', {
    method: 'delete',
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}