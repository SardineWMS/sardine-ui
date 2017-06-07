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
<<<<<<< HEAD
    const url = "/swms/ia/role/insert";
=======
    const url = "/wms/ia/role/insert";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url),
        createBase(params));
}

export async function online(params) {
<<<<<<< HEAD
    const url = '/swms/ia/role/online';
=======
    const url = '/wms/ia/role/online';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody());
}

export async function offline(params) {
<<<<<<< HEAD
    const url = '/swms/ia/role/offline';
=======
    const url = '/wms/ia/role/offline';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody());
}

export async function update(params) {
<<<<<<< HEAD
    const url = '/swms/ia/role/update';
=======
    const url = '/wms/ia/role/update';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
<<<<<<< HEAD
    const url = "/swms/ia/role/remove";
=======
    const url = "/wms/ia/role/remove";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), deleteBase(params));
}

export async function queryAllResourceByRole(params) {
<<<<<<< HEAD
    const url = "/swms/ia/resource/queryAllResourceByRole";
=======
    const url = "/wms/ia/resource/queryAllResourceByRole";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

/**
 * 不分页查所有角色,包括用户包含和未包含的。
 * @param {* 查询参数} params 
 */
export async function queryAllRole(params) {
<<<<<<< HEAD
    const url = "/swms/ia/role/queryAllRole";
=======
    const url = "/wms/ia/role/queryAllRole";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function queryAllRoleByCompany() {
<<<<<<< HEAD
    const url = '/swms/ia/role/queryAllRoleByCompany';
=======
    const url = '/wms/ia/role/queryAllRoleByCompany';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url));
}

export async function saveRoleResource(params) {
    const roleUuid = params.roleUuid;
<<<<<<< HEAD
    const url = "/swms/ia/resource/saveRoleResource";
=======
    const url = "/wms/ia/resource/saveRoleResource";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), createBase(params.resourceUuids));
}

export async function queryOwnedResourceByRole(params) {
<<<<<<< HEAD
    const url = "/swms/ia/resource/queryOwnedResourceByRole";
=======
    const url = "/wms/ia/resource/queryOwnedResourceByRole";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}