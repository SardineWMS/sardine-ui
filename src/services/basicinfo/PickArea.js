import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function insert(params) {
    const url = "/swms/basicinfo/pickarea/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function get(params) {
    const url = "/swms/basicinfo/pickarea/get";
    return request(query(url, params));
}

export async function queryPickArea(params) {
    const url = "/swms/basicinfo/pickarea/query";
    return request(query(url, params));
}

export async function update(params) {
    const url = "/swms/basicinfo/pickarea/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = "/swms/basicinfo/pickarea/remove";
    return request(query(url, params), deleteBase(params));
}