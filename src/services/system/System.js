import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryRole(params) {
<<<<<<< HEAD
    const url = '/swms/ia/role/querybypage';
=======
    const url = '/wms/ia/role/querybypage';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function create(params) {
    const companyUuid = localStorage.getItem("companyUuid");
<<<<<<< HEAD
    const url = "/swms/ia/company/createDC";
=======
    const url = "/wms/ia/company/createDC";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url),
        createBase(params));
}