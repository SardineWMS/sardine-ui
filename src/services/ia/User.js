import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryUser(params) {
  const url = "/swms/ia/user/querybypage";
  return request(query(url, params));
}

export async function login(params) {
  return request(`/swms/ia/authen/login?${qs.stringify(params)}`);
}

export async function register(params) {
  return request('/swms/ia/register', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function createUser(params) {
  const url = "/swms/ia/user/insert";
  return request(addTokenToUrl(url), createBase(params));
}

export async function remove(params) {
  const url = "/swms/ia/user/remove";
  return request(query(url, params), deleteBase(params));
}

export async function update(params) {
  const url = "/swms/ia/user/update";
  return request(addTokenToUrl(url), updateBase(params));
}

export async function get(params) {
  const url = "/swms/ia/user/get";
  return request(query(url, params));
}

export async function getByCode(params) {
  const url = "/swms/ia/user/getbycode";
  return request(query(url, params));
}

export async function onlineUser(params) {
  const url = "/swms/ia/user/online";
  return request(query(url, params), updateBaseNullBody(null));
}

export async function offlineUser(params) {
  const url = "/swms/ia/user/offline";
  return request(query(url, params), updateBaseNullBody(null));
}

export async function queryAllResourceByUser(params) {
  const url = "/swms/ia/resource/queryAllResourceByUser";
  return request(query(url, params));
}

export async function saveUserResource(params) {
  const userUuid = params.userUuid;
  const url = "/swms/ia/resource/saveUserResource";
  return request(query(url, params), createBase(params.resourceUuids));
}

export async function saveUserRole(params) {
  const roleUuids = params.roleUuids;
  delete params.roleUuids;
  const url = "/swms/ia/user/saveUserRoles";
  return request(query(url, params), createBase(roleUuids));
}