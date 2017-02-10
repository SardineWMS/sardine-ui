import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
 return request(`/basic/containertype/querybypage?`);
}

export async function get(params) {
   console.log("get>>>"+params.uuid);
 return request(`/basic/containertype/get?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/basic/containertype/savenew', {
    method: 'post',
    headers:{
    	'Accept':'application/json',
    	'Content-Type':'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function edit(params) {
  return request('/basic/containertype/savemodify', {
    method: 'put',
    headers:{
    	'Accept':'application/json',
    	'Content-Type':'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`/basic/containertype/remove?${qs.stringify(params)}`, {
    method: 'delete',
  });
}