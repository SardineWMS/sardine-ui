import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function insert(params) {
    const url = "/swms/rtn/customerrtn/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryBill(params) {
    const url = "/swms/rtn/customerrtn/query";
    return request(query(url, params));
}

export async function getRtnBill(params) {
    const url = "/swms/rtn/customerrtn/getRtnBill";
    return request(query(url, params));
}

export async function update(params) {
    const url = "/swms/rtn/customerrtn/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = "/swms/rtn/customerrtn/remove";
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
    const url = "/swms/rtn/customerrtn/audit";
    return request(query(url, params), updateBaseNullBody(null));
}
