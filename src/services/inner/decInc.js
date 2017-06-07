import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function get(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/get';
=======
    const url = '/wms/inner/decInc/get';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function insert(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/insert';
=======
    const url = '/wms/inner/decInc/insert';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), createBase(params));
}

export async function queryDecInc(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/query';
=======
    const url = '/wms/inner/decInc/query';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function update(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/update';
=======
    const url = '/wms/inner/decInc/update';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), updateBase(params));
}

export async function remove(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/remove';
=======
    const url = '/wms/inner/decInc/remove';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
<<<<<<< HEAD
    const url = '/swms/inner/decInc/audit';
=======
    const url = '/wms/inner/decInc/audit';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody(null));
}