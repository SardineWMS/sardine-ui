import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody,updateBase ,deleteBase} from '../../utils/BaseService.js';

export async function querybypage(params) {
  if(params==null)
    params={token:''};
  const url="/basic/supplier/querybypage";
  return request(query(url,params));
}

export async function create(params) {
  const url="/basic/supplier/savenew";
  return request(addTokenToUrl(url),createBase(params));
}

export async function get(params) {
  const url="/basic/supplier/get";
  return request(query(url,params));
}

export async function edit(params) {
  const url="/basic/supplier/savemodify";
  return request(addTokenToUrl(url),updateBase(params));
}

export async function remove(params) {
  const url=`/basic/supplier/remove?${qs.stringify(params)}`;
  return request(url,deleteBase(params));
}

export async function recover(params) {
  const url=`/basic/supplier/recover?${qs.stringify(params)}`;
  return request(url,updateBaseNullBody(params));
}




