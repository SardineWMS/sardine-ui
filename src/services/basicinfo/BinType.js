import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryBinType(params) {
    const url = "/basic/bintype/query";
    return request(query(url, params));
}

export async function create(params) {
    const url = "/basic/bintype/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function update(params) {
    const url = "/basic/bintype/update";
    return request(addTokenToUrl(url), updateBase(params));
}

export async function deleteBinType(params) {
    const url = "/basic/bintype/remove";
    return request(query(url, params), deleteBase(params));
}