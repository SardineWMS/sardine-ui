import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService.js';

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/in/order/querybypage";
  return request(query(url, params));
}

export async function queryCanReceiveOrderBills(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/in/order/querycanreceiveorderbills";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/swms/in/order/get";
  return request(query(url, params));
}

export async function create(params) {
  const url = "/swms/in/order/savenew";
  return request(addTokenToUrl(url), createBase(params));
}

export async function edit(params) {
  const url = "/swms/in/order/savemodify";
  return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
  const url = `/swms/in/order/remove?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), deleteBase(params));
}

export async function bookReg(params) {
  const url = "/swms/in/order/bookreg";
  // const newUrl = url + `?uuid=` + params.uuid + `&version=` + params.version;
  // var req = new Object();
  // req.method = 'put';
  // req.headers = {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // };
  // req.body = JSON.stringify(params.bookedDate);
  return request(query(url, params), updateBaseNullBody(null));
}

export async function check(params) {
  const url = `/swms/in/order/check?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function finish(params) {
  const url = `/swms/in/order/finish?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function abort(params) {
  const url = `/swms/in/order/abort?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function getArticle(params) {
  const url = `/swms/basicinfo/article/getbycode`;
  return request(query(url, params));
}

export async function getOrderBillByBillNo(params) {
  const url = "/swms/in/order/getByBillNo";
  return request(query(url, params));
}

export async function refreshCaseQtyAndAmount(params) {
  const url = "/swms/in/order/refreshcaseqtyandamount";
  const newUrl = url + `?line=` + params.line;

  var req = new Object();
  req.method = 'put';
  req.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  req.body = JSON.stringify(params.orderBill);
  return request(addTokenToUrl(newUrl), req);
}

export async function queryWrhs(params) {
  const url = "/swms/basicinfo/bin/queryWrhs";
  return request(query(url, params));
}

export async function querySuppliers(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/basicinfo/supplier/querybypage";
  return request(query(url, params));
}


