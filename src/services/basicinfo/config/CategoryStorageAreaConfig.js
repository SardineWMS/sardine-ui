import request from '../../../utils/request';
import qs from 'qs';
import { query,addTokenToUrl,updateBaseNullBody} from '../../../utils/BaseService.js';

export async function queryCategoryStorageAreaConfigByPage(params) {
  if(params==null)
    params={token:''};
  const url="/swms/basicinfo/categorystorageareaconfig/querybypage";
  return request(query(url,params));
}

export async function setCategoryStorageArea(params) {
  const url=`/swms/basicinfo/categorystorageareaconfig/setcategorystoragearea?${qs.stringify(params)}`;
  return request(addTokenToUrl(url),updateBaseNullBody(params));
}
