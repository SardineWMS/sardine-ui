import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryUser(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/querybypage";
=======
  const url = "/wms/ia/user/querybypage";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function login(params) {
<<<<<<< HEAD
  return request(`/swms/ia/authen/login?${qs.stringify(params)}`);
}

export async function register(params) {
  return request('/swms/ia/register', {
=======
  return request(`/wms/ia/authen/login?${qs.stringify(params)}`);
}

export async function register(params) {
  return request('/wms/ia/register', {
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function createUser(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/insert";
=======
  const url = "/wms/ia/user/insert";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), createBase(params));
}

export async function remove(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/remove";
=======
  const url = "/wms/ia/user/remove";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params), deleteBase(params));
}

export async function update(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/update";
=======
  const url = "/wms/ia/user/update";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), updateBase(params));
}

export async function get(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/get";
=======
  const url = "/wms/ia/user/get";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function onlineUser(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/online";
=======
  const url = "/wms/ia/user/online";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params), updateBaseNullBody(null));
}

export async function offlineUser(params) {
<<<<<<< HEAD
  const url = "/swms/ia/user/offline";
=======
  const url = "/wms/ia/user/offline";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params), updateBaseNullBody(null));
}

export async function queryAllResourceByUser(params) {
<<<<<<< HEAD
  const url = "/swms/ia/resource/queryAllResourceByUser";
=======
  const url = "/wms/ia/resource/queryAllResourceByUser";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function saveUserResource(params) {
  const userUuid = params.userUuid;
<<<<<<< HEAD
  const url = "/swms/ia/resource/saveUserResource";
=======
  const url = "/wms/ia/resource/saveUserResource";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params), createBase(params.resourceUuids));
}

export async function saveUserRole(params) {
  const roleUuids = params.roleUuids;
  delete params.roleUuids;
<<<<<<< HEAD
  const url = "/swms/ia/user/saveUserRoles";
=======
  const url = "/wms/ia/user/saveUserRoles";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params), createBase(roleUuids));
}