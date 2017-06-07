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
  return request(query('/wms/basicinfo/category/query', params));
}

export async function queryLastLower(params) {
  return request(query('/wms/basicinfo/category/queryLastLower', params));
}

export async function create(params) {
  return request(addTokenToUrl('/wms/basicinfo/category/savenew'), createBase(params));
}

export async function update(params) {
  return request(addTokenToUrl('/wms/basicinfo/category/savemodify'), updateBase(params));
}

export async function deleteCategory(params) {
  return request(query('/wms/basicinfo/category/remove', params), deleteBase(params));
}

export async function getCategoryByCode(params) {
  return request(query('/wms/basicinfo/category/getByCode', params), params);
}