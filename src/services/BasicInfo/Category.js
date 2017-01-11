import request from '../../utils/request';
import qs from 'qs';

export async function queryCategory(params) {
  return request('/api/category/query', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function create(params) {
  return request('/api/category/create', {
    method: 'post',
    body: qs.stringify(params),
  })
}

export async function update(params) {
  return request('/api/category/update', {
    method: 'post',
    body: qs.stringify(params),
  })
}