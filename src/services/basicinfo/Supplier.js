import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody,updateBase ,deleteBase} from '../../utils/BaseService.js';

export async function querybypage(params) {
  if(params==null)
    params={token:''};
  const url="/swms/basicinfo/supplier/querybypage";
  return request(query(url,params));
}

export async function create(params) {
  const url="/swms/basicinfo/supplier/savenew";
  return request(addTokenToUrl(url),createBase(params));
}

export async function get(params) {
  const url="/swms/basicinfo/supplier/get";
  return request(query(url,params));
}

export async function edit(params) {
  const url="/swms/basicinfo/supplier/savemodify";
  return request(addTokenToUrl(url),updateBase(params));
}

export async function remove(params) {
  const url=`/swms/basicinfo/supplier/remove?${qs.stringify(params)}`;
  return request(url,deleteBase(params));
}

export async function recover(params) {
  const url=`/swms/basicinfo/supplier/recover?${qs.stringify(params)}`;
  return request(url,updateBaseNullBody(params));
}




