import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryRole(params) {
    const url = '/swms/ia/role/querybypage';
    return request(query(url, params));
}

export async function create(params) {
    const companyUuid = localStorage.getItem("companyUuid");
    params.companyUuid = companyUuid;
    const url = "/swms/ia/role/insert";
    return request(addTokenToUrl(url),
        createBase(params));
}

export async function online(params) {
    const url = '/swms/ia/role/online';
    return request(query(url, params), updateBaseNullBody());
}

export async function offline(params) {
    const url = '/swms/ia/role/offline';
    return request(query(url, params), updateBaseNullBody());
}

export async function update(params) {
    const url = '/swms/ia/role/update';
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
    const url = "/swms/ia/role/remove";
    return request(query(url, params), deleteBase(params));
}

export async function queryAllResourceByRole(params) {
    const url = "/swms/ia/resource/queryAllResourceByRole";
    return request(query(url, params));
}

/**
 * 不分页查所有角色,包括用户包含和未包含的。
 * @param {* 查询参数} params 
 */
export async function queryAllRole(params) {
    const url = "/swms/ia/role/queryAllRole";
    return request(query(url, params));
}

export async function queryAllRoleByCompany() {
    const url = '/swms/ia/role/queryAllRoleByCompany';
    return request(addTokenToUrl(url));
}

export async function saveRoleResource(params) {
    const roleUuid = params.roleUuid;
    const url = "/swms/ia/resource/saveRoleResource";
    return request(query(url, params), createBase(params.resourceUuids));
}

export async function queryOwnedResourceByRole(params) {
    const url = "/swms/ia/resource/queryOwnedResourceByRole";
    return request(query(url, params));
}