import request from '../../../utils/request';
import qs from 'qs';
import { query,addTokenToUrl,updateBaseNullBody} from '../../../utils/BaseService.js';

export async function queryPickAreaStorageAreaConfigByPage(params) {
  if(params==null)
    params={token:''};
  const url="/swms/basicinfo/pickareastorageareaconfig/querybypage";
  return request(query(url,params));
}

export async function setPickAreaStorageArea(params) {
  const url=`/swms/basicinfo/pickareastorageareaconfig/setpickareastorageareaconfig?${qs.stringify(params)}`;
  return request(addTokenToUrl(url),updateBaseNullBody(params));
}
