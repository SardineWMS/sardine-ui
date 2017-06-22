import request from '../../../utils/request';
import qs from 'qs';
import { query,addTokenToUrl,createBase,updateBase,deleteBase} from '../../../utils/BaseService.js';

export async function queryTaskAreaConfigByPage(params) {
  if(params==null)
    params={token:''};
  const url="/swms/basicinfo/taskareaconfig/querybypage";
  return request(query(url,params));
}

export async function createTaskAreaConfig(params) {
  const url="/swms/basicinfo/taskareaconfig/savenew";
  return request(addTokenToUrl(url),createBase(params));
}

export async function updateTaskAreaConfig(params) {
  const url="/swms/basicinfo/taskareaconfig/savemodify";
  return request(addTokenToUrl(url),updateBase(params));
}

export async function removeTaskAreaConfig(params) {
  const url=`/swms/basicinfo/taskareaconfig/remove?${qs.stringify(params)}`;
  return request(addTokenToUrl(url),deleteBase(params));
}
