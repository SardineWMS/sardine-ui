import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, updateBaseNullBody} from '../../utils/BaseService';

export async function get(params) {
    const url = "/swms/rtn/returnsupplier/get";
    return request(query(url, params));
}

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
    const url = "/swms/rtn/returnsupplier/query";
  return request(query(url, params));
}

export async function finish(params) {
  const url = `/swms/rtn/returnsupplier/finish?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}