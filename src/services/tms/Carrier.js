import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function create(params) {
    const url = "/swms/tms/carrier/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryCarrier(params) {
    const url = '/swms/tms/carrier/query';
    return request(query(url, params));
}

export async function update(params) {
    const url = "/swms/tms/carrier/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function deleteCarrier(params) {
    const url = "/swms/tms/carrier/remove";
    return request(query(url, params), deleteBase(params));
}

export async function online(params) {
    const url = "/swms/tms/carrier/online";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function offline(params) {
    const url = "/swms/tms/carrier/offline";
    return request(query(url, params),
        updateBaseNullBody(null));
}