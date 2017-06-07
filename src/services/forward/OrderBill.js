import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService.js';

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
<<<<<<< HEAD
  const url = "/swms/in/order/querybypage";
=======
  const url = "/wms/in/order/querybypage";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function get(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/get";
=======
  const url = "/wms/in/order/get";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function create(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/savenew";
=======
  const url = "/wms/in/order/savenew";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), createBase(params));
}

export async function edit(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/savemodify";
=======
  const url = "/wms/in/order/savemodify";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
<<<<<<< HEAD
  const url = `/swms/in/order/remove?${qs.stringify(params)}`;
=======
  const url = `/wms/in/order/remove?${qs.stringify(params)}`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), deleteBase(params));
}

export async function bookReg(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/bookreg";
=======
  const url = "/wms/in/order/bookreg";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  const newUrl=url+`?uuid=` + params.uuid+`&version=`+params.version;
  var req = new Object();
  req.method = 'put';
  req.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };
  req.body = JSON.stringify(params.bookedDate);
  return request(addTokenToUrl(newUrl), req);
}

export async function check(params) {
<<<<<<< HEAD
  const url = `/swms/in/order/check?${qs.stringify(params)}`;
=======
  const url = `/wms/in/order/check?${qs.stringify(params)}`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function finish(params) {
<<<<<<< HEAD
  const url = `/swms/in/order/finish?${qs.stringify(params)}`;
=======
  const url = `/wms/in/order/finish?${qs.stringify(params)}`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function abort(params) {
<<<<<<< HEAD
  const url = `/swms/in/order/abort?${qs.stringify(params)}`;
=======
  const url = `/wms/in/order/abort?${qs.stringify(params)}`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function getArticle(params) {
<<<<<<< HEAD
  const url = `/swms/basicinfo/article/getbycode`;
=======
  const url = `/wms/basicinfo/article/getbycode`;
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function getOrderBillByBillNo(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/getByBillNo";
=======
  const url = "/wms/in/order/getByBillNo";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function refreshCaseQtyAndAmount(params) {
<<<<<<< HEAD
  const url = "/swms/in/order/refreshcaseqtyandamount";
=======
  const url = "/wms/in/order/refreshcaseqtyandamount";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  const newUrl=url+`?line=` + params.line;

  console.log(params);

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
<<<<<<< HEAD
  const url = "/swms/basicinfo/bin/queryWrhs";
=======
  const url = "/wms/basicinfo/bin/queryWrhs";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}

export async function querySuppliers(params) {
  if(params==null)
    params={token:''};
<<<<<<< HEAD
  const url="/swms/basicinfo/supplier/querybypage";
=======
  const url="/wms/basicinfo/supplier/querybypage";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url,params));
}


