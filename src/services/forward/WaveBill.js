import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function insert(params) {
    const url = "/swms/out/wave/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function getWaveBill(params) {
    const url = "/swms/out/wave/get";
    return request(query(url, params));
}

export async function queryWaveBill(params) {
    const url = "/swms/out/wave/query";
    return request(query(url, params));
}

export async function update(params) {
    const url = '/swms/out/wave/update';
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = '/swms/out/wave/remove';
    return request(query(url, params), deleteBase(params));
}