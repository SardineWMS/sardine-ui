import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, } from '../../utils/BaseService';

export async function qtyToCaseQtyStr(params) {
    const url = "/util/helper/qtyToCaseQtyStr";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function caseQtyStrAdd(params) {
    const url = "/util/helper/caseQtyStrAdd";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function queryStock(params) {
    const url = '/util/helper/queryStock';
    return request(query(url, params));
}