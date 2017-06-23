import request from '../../../utils/request';
import qs from 'qs';
import { query,addTokenToUrl,updateBaseNullBody} from '../../../utils/BaseService.js';

export async function queryReasonConfig(params) {
  const url="/swms/basicinfo/reasonConfig/queryreasons";
  return request(query(url,params));
}

export async function setReasonConfig(params) {
  const url=`/swms/basicinfo/reasonConfig/setreasonconfig`;
  const newUrl=addTokenToUrl(url)+`&reasonType=` + params.reasonType;

  var req = new Object();
  req.method = 'put';
  req.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  req.body = JSON.stringify(params.reasons);
  return request(addTokenToUrl(newUrl), req);
}