import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryRole(params) {
    const url = '/api/role/querybypage';
    return request(query(url, params));
}

export async function create(params) {
    const companyUuid = localStorage.getItem("companyUuid");
    params.companyUuid = companyUuid;
    const url = "/api/role/insert";
    return request(addTokenToUrl(url),
        createBase(params));
}

export async function online(params) {
    const url = '/api/role/online';
    return request(query(url, params), updateBaseNullBody());
}

export async function offline(params) {
    const url = '/api/role/offline';
    return request(query(url, params), updateBaseNullBody());
}

export async function update(params) {
    const url = '/api/role/update';
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = "/api/role/remove";
    return request(query(url, params), deleteBase(params));
}

export async function queryAllResourceByRole(params) {
    const url = "/api/resource/queryAllResourceByRole";
    return request(query(url, params));
}