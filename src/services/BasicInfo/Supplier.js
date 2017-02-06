import request from '../../utils/request';
import qs from 'qs';

/*export async function query(params){
	return request(`/supplier/query?${qs.stringify(params)}`);
}*/

export async function query(params) {
 return request(`/basic/supplier/querybypage?`);
}

export async function create(params) {
  return request('/basic/supplier/savenew', {
    method: 'post',
    headers:{
    	'Accept':'application/json',
    	'Content-Type':'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function get(params) {
 return request(`/basic/supplier/get?${qs.stringify(params)}`);
}

export async function edit(params) {
  return request('/basic/supplier/savemodify', {
    method: 'put',
    headers:{
    	'Accept':'application/json',
    	'Content-Type':'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`/basic/supplier/remove?${qs.stringify(params)}`, {
    method: 'delete',
  });
}




