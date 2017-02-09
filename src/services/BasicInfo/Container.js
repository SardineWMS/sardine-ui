import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/api/container/querybypage?${qs.stringify(params)}`);
}


export async function queryContainerTypes() {
  return request('/api/containertype/query');
}

export async function create(params) {
  return request('/api/container/savenew', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}