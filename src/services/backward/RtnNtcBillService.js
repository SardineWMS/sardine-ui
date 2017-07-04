import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function insertRtnNtcBill(params) {
    const url = "/swms/rtn/ntc/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryRtnNtcBill(params) {
    const url = "/swms/rtn/ntc/query";
    return request(query(url, params));
}

export async function getRtnNtcBill(params) {
    const url = "/swms/rtn/ntc/getRtnNtcBill";
    return request(query(url, params));
}

export async function updateRtnNtcBill(params) {
    const url = "/swms/rtn/ntc/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = "/swms/rtn/ntc/remove";
    return request(query(url, params), deleteBase(params));
}

export async function finish(params) {
    const url = "/swms/rtn/ntc/finish";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function abort(params) {
    const url = "/swms/rtn/ntc/abort";
    return request(query(url, params), updateBaseNullBody(null));
}