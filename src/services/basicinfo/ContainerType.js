import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService.js';

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
  const url = "/basic/containertype/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/basic/containertype/get";
  return request(query(url, params));
}

export async function create(params) {
  const url = `/basic/containertype/savenew`;
  return request(addTokenToUrl(url), createBase(params));
}

export async function edit(params) {
  const url = `/basic/containertype/savemodify`;
  return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
  const url = "/basic/containertype/remove"
  return request(query(url, params), deleteBase(params));
}