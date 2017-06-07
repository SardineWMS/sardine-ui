import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, } from '../../utils/BaseService';


export async function queryCustomer(params) {
    const url = "/wms/basicinfo/customer/query";
    return request(query(url, params));
}

export async function create(params) {
    params.customer = null;
    const url = "/wms/basicinfo/customer/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function get(params) {
    const url = "/wms/basicinfo/customer/get";
    return request(query(url, params));
}

export async function remove(params) {
    const url = "/wms/basicinfo/customer/remove";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function recover(params) {
    const url = "/wms/basicinfo/customer/recover";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function updateCustomer(params) {
    const url = "/wms/basicinfo/customer/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function getByCode(params) {
    const url = "/wms/basicinfo/customer/getbycode";
    return request(query(url, params));
}


