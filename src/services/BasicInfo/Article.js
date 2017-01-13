import request from '../../utils/request';
import qs from 'qs';

export async function queryArticles(params) {
  return request(`/api/article/querybypage?token=localStorage.getItem("token")&${qs.stringify(params)}`);
}

export async function get(params) {
  return request(`/api/article/get?${qs.stringify(params)}`);
}

export async function getByCode(params) {
  return request(`/api/article/getByCode?${qs.stringify(params)}`);
}

export async function create(params) {
  console.log("hello create!!!");
    console.log(params);
  params.category = null;
  return request(`/api/article/insert`, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}