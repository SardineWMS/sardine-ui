import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryBill(params) {
    const url = "/swms/rtn/rtnsupplierntc/query";
    return request(query(url, params));
}

export async function insertBill(params) {
    const url = "/swms/rtn/rtnsupplierntc/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function getRtnSupplierNtcBill(params) {
    const url = "/swms/rtn/rtnsupplierntc/getrtnsupplierntcbill";
    return request(query(url, params));
}

export async function updateBill(params) {
    const url = "/swms/rtn/rtnsupplierntc/updatebill";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function abort(params) {
    const url = "/swms/rtn/rtnsupplierntc/abort";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function remove(params) {
    const url = "/swms/rtn/rtnsupplierntc/remove";
    return request(query(url, params), deleteBase(params));
}

export async function finish(params) {
    const url = "/swms/rtn/rtnsupplierntc/finish";
    return request(query(url, params), updateBaseNullBody(null));
}