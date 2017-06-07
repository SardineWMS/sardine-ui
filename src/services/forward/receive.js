import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryReceiveBill(params) {
<<<<<<< HEAD
    const url = "/swms/in/receive/query";
=======
    const url = "/wms/in/receive/query";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function insetReceiveBill(params) {
    params.receiveBill = null;
<<<<<<< HEAD
    const url = "/swms/in/receive/insert";
=======
    const url = "/wms/in/receive/insert";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), createBase(params));
}

export async function getReceiveBillByBillNo(params) {
<<<<<<< HEAD
    const url = "/swms/in/receive/getByBillNo";
=======
    const url = "/wms/in/receive/getByBillNo";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params));
}

export async function remove(params) {
<<<<<<< HEAD
    const url = "/swms/in/receive/remove";
=======
    const url = "/wms/in/receive/remove";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
<<<<<<< HEAD
    const url = "/swms/in/receive/audit";
=======
    const url = "/wms/in/receive/audit";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(query(url, params), updateBaseNullBody(null))
}

export async function update(params) {
<<<<<<< HEAD
    const url = "/swms/in/receive/update";
=======
    const url = "/wms/in/receive/update";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
    return request(addTokenToUrl(url), updateBase(params))
}