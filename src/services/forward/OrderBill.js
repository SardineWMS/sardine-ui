import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService.js';

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
  const url = "/forward/order/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/forward/order/get";
  return request(query(url, params));
}

export async function create(params) {
  const url = "/forward/order/savenew";
  return request(addTokenToUrl(url), createBase(params));
}

export async function edit(params) {
  const url = "/forward/order/savemodify";
  return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
  const url = `/forward/order/remove?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), deleteBase(params));
}

export async function bookReg(params) {
  const url = `/forward/order/bookreg?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function check(params) {
  const url = `/forward/order/check?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function finish(params) {
  const url = `/forward/order/finish?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function abort(params) {
  const url = `/forward/order/abort?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function getArticle(params) {
  const url = `/basic/article/getbycode`;
  return request(query(url, params));
}

export async function getOrderBillByBillNo(params) {
  const url = "/forward/order/getByBillNo";
  return request(query(url, params));
}
