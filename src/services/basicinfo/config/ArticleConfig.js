import request from '../../../utils/request';
import qs from 'qs';
import { query,addTokenToUrl,updateBaseNullBody} from '../../../utils/BaseService.js';

export async function getArticleConfig(params) {
  const url="/swms/basicinfo/articleconfig/get";
  return request(query(url, params));
}

export async function queryArticleConfigByPage(params) {
  if(params==null)
    params={token:''};
  const url="/swms/basicinfo/articleconfig/querybypage";
  return request(query(url,params));
}

export async function setArticleFixedPickBin(params) {
  const url=`/swms/basicinfo/articleconfig/setarticlefixedpickbin?${qs.stringify(params)}`;
  return request(addTokenToUrl(url),updateBaseNullBody(params));
}

export async function setArticleStorageArea(params) {
  const url=`/swms/basicinfo/articleconfig/setarticlestoragearea?${qs.stringify(params)}`;
  return request(addTokenToUrl(url),updateBaseNullBody(params));
}

export async function setPickBinStockLimit(params) {
  const url = "/swms/basicinfo/articleconfig/setpickbinstocklimit";
  const newUrl=addTokenToUrl(url)+`&articleUuid=` + params.articleUuid+`&version=`+params.version;

  var req = new Object();
  req.method = 'put';
  req.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  req.body = JSON.stringify(params.pickBinStockLimit);
  return request(addTokenToUrl(newUrl), req);
}