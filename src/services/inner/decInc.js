import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function get(params) {
    const url = '/swms/inner/decInc/get';
    return request(query(url, params));
}

export async function insert(params) {
    const url = '/swms/inner/decInc/insert';
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryDecInc(params) {
    const url = '/swms/inner/decInc/query';
    return request(query(url, params));
}

export async function update(params) {
    const url = '/swms/inner/decInc/update';
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = '/swms/inner/decInc/remove';
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
    const url = '/swms/inner/decInc/audit';
    return request(query(url, params), updateBaseNullBody(null));
}

export async function queryStockExtendInfo(params) {
    const url = '/swms/inner/decInc/queryStockExtendInfo';
    return request(query(url, params));
}

export async function refreshCaseQtyStrAndAmount(params) {
    const url = './swms/inner/decInc/refreshcaseqtystrandamount';
    return request(addTokenToUrl(url), updateBase(params));
}