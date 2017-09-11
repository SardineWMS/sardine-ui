import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, updateBaseNullBody, createBase, updateBase } from '../../utils/BaseService';

export async function get(params) {
  const url = "/swms/tms/shipbill/get";
  return request(query(url, params));
}

export async function querybypage(params) {
  if (params == null)
    params = { token: '' };
  const url = "/swms/tms/shipbill/query";
  return request(query(url, params));
}

export async function finish(params) {
  const url = `/swms/tms/shipbill/finish?${qs.stringify(params)}`;
  return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function insert(params) {
  const url = '/swms/tms/shipbill/insert';
  return request(url, createBase(params));
}

export async function update(params) {
  const url = '/swms/tms/shipbill/update';
  return request(url, updateBase(params));
}

export async function getByBillNumber(params) {
  const url = "/swms/tms/shipbill/getbybillnumber";
  return request(query(url, params));
}

export async function calculateWeight(params) {
  const url = "/swms/tms/shipbill/calculateweight";
  return request(query(url, params));
}

export async function calculateVolume(params) {
  const url = "/swms/tms/shipbill/calculatevolume";
  return request(query(url, params));
}
