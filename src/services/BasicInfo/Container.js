import request from '../../utils/request';
import qs from 'qs';
import {
  query,
  updateBase,
  addTokenToUrl
} from '../../utils/BaseService.js';

export async function queryContainers(params) {
  return request(query('basic/container/querybypage', params));
}

export async function queryContainerTypes(params) {
  return request(query('/basic/containertype/querycontainerTypesUcns', params));
}

export async function create(params) {
  return request(addTokenToUrl('/basic/container/savenew'), updateBase(params));
}