import request from '../../utils/request';
import qs from 'qs';

export async function queryCategory(params) {
  return request(`/api/category/query?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/api/category/savenew', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request('/api/category/savemodify', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function deleteCategory(params) {
  return request(`/api/category/remove?${qs.stringify(params)}`, {
    method: 'delete',
  });
}