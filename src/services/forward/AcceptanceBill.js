import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody, updateBase } from '../../utils/BaseService.js';

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/out/acceptance/query";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/swms/out/acceptance/get";
  return request(query(url, params));
}

export async function create(params) {
  const url = "/swms/out/acceptance/savenew";
  return request(addTokenToUrl(url), createBase(params));
}

export async function edit(params) {
  const url = `/swms/out/acceptance/savemodify`;
  return request(addTokenToUrl(url), updateBase(params));
}

export async function approve(params) {
  const url = `/swms/out/acceptance/approve?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function beginalc(params) {
  const url = `/swms/out/acceptance/beginalc?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function abort(params) {
  const url = `/swms/out/acceptance/abort?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function queryWrhs(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/basicinfo/bin/queryWrhs";
  return request(query(url, params));
}

export async function refreshCaseQtyAndAmount(params) {
  const url = "/swms/out/acceptance/refreshcaseqtyandamount";
  const newUrl=url+`?line=` + params.line;

  console.log(params);

  var req = new Object();
  req.method = 'put';
  req.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  req.body = JSON.stringify(params.acceptanceBill);
  return request(addTokenToUrl(newUrl), req);
}





