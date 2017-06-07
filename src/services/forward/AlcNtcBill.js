import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function get(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/get';
=======
    const url = '/wms/out/alcNtc/get';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function insert(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/insert';
=======
    const url = '/wms/out/alcNtc/insert';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), createBase(params));
}

export async function update(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/update';
=======
    const url = '/wms/out/alcNtc/update';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), updateBase(params));
}


export async function queryAlcNtcBill(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/query';
=======
    const url = '/wms/out/alcNtc/query';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function remove(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/remove';
=======
    const url = '/wms/out/alcNtc/remove';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/audit';
=======
    const url = '/wms/out/alcNtc/audit';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody(null));
}

export async function abort(params) {
<<<<<<< HEAD
    const url = '/swms/out/alcNtc/abort';
=======
    const url = '/wms/out/alcNtc/abort';
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody(null));
}