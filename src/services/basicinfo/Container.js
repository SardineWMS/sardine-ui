import request from '../../utils/request';
import qs from 'qs';
import {
  query,
  updateBaseNullBody,
  addTokenToUrl
} from '../../utils/BaseService.js';

export async function queryContainers(params) {
  return request(query('/wms/basicinfo/container/querybypage', params));
}

export async function queryContainerTypes(params) {
  return request(query('/wms/basicinfo/containertype/querycontainerTypesUcns', params));
}

export async function create(params) {
  return request(query('/wms/basicinfo/container/savenew', params), updateBaseNullBody(params));
}

export async function queryContainerStockInfo(params){
  return request(query('/wms/basicinfo/container/queryContainerStockInfo',params));
}