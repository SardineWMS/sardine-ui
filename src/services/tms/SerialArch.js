import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';


export async function createSerialArch(params) {
    const url = "/swms/tms/serialarch/createSerialArch";
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryTreeData(params) {
    const url = "/swms/tms/serialarch/queryTreeData";
    return request(query(url, params));
}

export async function createLine(params) {
    const url = "/swms/tms/serialarch/createLine";
    return request(addTokenToUrl(url), createBase(params));
}

export async function getLineByCode(params) {
    const url = "/swms/tms/serialarch/getLineByCode";
    return request(query(url, params));
}

export async function addCustomer(params) {
    const url = "/swms/tms/serialarch/addCustomer";
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryCustomerWithoutLine(params) {
    const url = "/swms/tms/serialarch/queryCustomerWithoutLine";
    return request(query(url, params));
}

export async function getLine(params) {
    const url = "/swms/tms/serialarch/getLine";
    return request(query(url, params));
}

export async function removeCustomer(params) {
    const url = "/swms/tms/serialarch/removeCustomer";
    return request(query(url, params), deleteBase(params));
}

export async function upOrder(params) {
    const url = "/swms/tms/serialarch/upOrder";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function downOrder(params) {
    const url = "/swms/tms/serialarch/downOrder";
    return request(query(url, params), updateBaseNullBody(null));
}
export async function stickCustomer(params) {
    const url = "/swms/tms/serialarch/stickCustomer";
    return request(query(url, params), updateBaseNullBody(null));
}
export async function postponeCustomer(params) {
    const url = "/swms/tms/serialarch/postponeCustomer";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function queryCustomerByLine(params) {
    const url = "/swms/tms/serialarch/queryCustomerByLine";
    return request(query(url, params));
}

export async function querySerialArch(params) {
    const url = "/swms/tms/serialarch/querySerialArch";
    return request(query(url, params));
}