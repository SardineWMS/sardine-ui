import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/api/container/querybypage?${qs.stringify(params)}`);
}


export async function queryContainerTypes(params) {
  return request(`/basic/containertype/querycontainerTypesUcns?${qs.stringify(params)}`);
}

export async function create(params) {
  return request(`/api/container/savenew?${qs.stringify(params)}`, {
    method: 'put',
  });
}