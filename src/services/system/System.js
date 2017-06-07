import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryRole(params) {
    const url = '/swms/ia/role/querybypage';
    return request(query(url, params));
}

export async function create(params) {
    const companyUuid = localStorage.getItem("companyUuid");
    const url = "/swms/ia/company/createDC";
    return request(addTokenToUrl(url),
        createBase(params));
}