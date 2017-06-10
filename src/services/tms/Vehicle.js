import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryVehicleType(params) {
    const url = "/swms/tms/vehicletype/queryType";
    return request(query(url, params));
}

export async function queryVehicle(params) {
    const url = "/swms/tms/vehicle/query";
    return request(query(url, params));
}

export async function createVehicleType(params) {
    const url = "/swms/tms/vehicletype/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function updateVehicleType(params) {
    const url = "/swms/tms/vehicletype/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function deleteVehicleType(params) {
    const url = "/swms/tms/vehicletype/remove";
    return request(query(url, params), deleteBase(params));
}

export async function insert(params) {
    const url = "/swms/tms/vehicle/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function get(params) {
    const url = "/swms/tms/vehicle/get";
    return request(query(url, params));
}

export async function update(params) {
    const url = "/swms/tms/vehicle/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function offline(params) {
    const url = "/swms/tms/vehicle/offline";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function online(params) {
    const url = "/swms/tms/vehicle/online";
    return request(query(url, params), updateBaseNullBody(null));
}