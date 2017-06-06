import request from '../../utils/request';
import qs from 'qs';
import {
  query,
  createBase,
  addTokenToUrl,
  updateBase,
  deleteBase,
} from '../../utils/BaseService.js';


export async function queryCategory(params) {
  return request(query('/basic/category/query', params));
}

export async function queryLastLower(params) {
  return request(query('/basic/category/queryLastLower', params));
}

export async function create(params) {
  return request(addTokenToUrl('/basic/category/savenew'), createBase(params));
}

export async function update(params) {
  return request(addTokenToUrl('/basic/category/savemodify'), updateBase(params));
}

export async function deleteCategory(params) {
  return request(query('/basic/category/remove', params), deleteBase(params));
}