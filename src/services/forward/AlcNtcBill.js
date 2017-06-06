import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function get(params) {
    const url = '/forward/alcNtc/get';
    return request(query(url, params));
}

export async function insert(params) {
    const url = '/forward/alcNtc/insert';
    return request(addTokenToUrl(url), createBase(params));
}

export async function update(params) {
    const url = '/forward/alcNtc/update';
    return request(addTokenToUrl(url), updateBase(params));
}


export async function queryAlcNtcBill(params) {
    const url = '/forward/alcNtc/query';
    return request(query(url, params));
}

export async function remove(params) {
    const url = '/forward/alcNtc/remove';
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
    const url = '/forward/alcNtc/audit';
    return request(query(url, params), updateBaseNullBody(null));
}

export async function abort(params) {
    const url = '/forward/alcNtc/abort';
    return request(query(url, params), updateBaseNullBody(null));
}