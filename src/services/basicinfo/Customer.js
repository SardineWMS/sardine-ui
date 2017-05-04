import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, } from '../../utils/BaseService';


export async function queryCustomer(params) {
    const url = "/basic/customer/query";
    return request(query(url, params));
}

export async function create(params) {
    params.customer = null;
    const url = "/basic/customer/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function get(params) {
    const url = "/basic/customer/get";
    return request(query(url,params));
}

export async function remove(params) {
    const url = "/basic/customer/remove";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function recover(params) {
    const url = "/basic/customer/recover";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function updateCustomer(params) {
    const url = "/basic/customer/update";
    return request(addTokenToUrl(url), updateBase(params));
}


