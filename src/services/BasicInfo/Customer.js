import request from '../../utils/request';
import qs from 'qs';


export async function queryCustomer(params) {
    return request(`/api/customer/query?${qs.stringify(params)}`);
}

export async function create(params) {
    params.customer = null;
    return request(`/api/customer/insert`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    })
}

export async function get(params) {
    console.log("get service...");
    console.dir(params);
    return request(`/api/customer/get?${qs.stringify(params)}`);
}

export async function remove(params) {
    return request(`/api/customer/remove?${qs.stringify(params)}`, {
        method: 'put',
    });
}

export async function recover(params) {
    return request(`/api/customer/recover?${qs.stringify(params)}`, {
        method: 'put',
    });
}

export async function updateCustomer(params) {
    console.log("updata service...");
    console.dir(params);
    return request('/api/customer/update', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
}


