import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryRole(params) {
    const url = '/swms/ia/role/querybypage';
    return request(query(url, params));
}

export async function create(params) {
    const companyUuid = localStorage.getItem("companyUuid");
    const url = "/swms/ia/company/createDC";
    return request(addTokenToUrl(url),
        createBase(params));
}

export async function update(params) {
  const url = '/swms/ia/company/update';
  return request(addTokenToUrl(url), createBase(params))
}

export async function queryCompany(params) {
    const url = '/swms/ia/company/query';
    return request(query(url, params));
}

export async function get(params) {
    const url = '/swms/ia/company/get';
    return request(query(url, params));
}