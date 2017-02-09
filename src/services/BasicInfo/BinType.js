import request from '../../utils/request';
import qs from 'qs';

export async function queryBinType(params) {
    console.log("调用后台");
    console.dir(params);
    return request(`/api/binType/query?${qs.stringify(params)}`);
}

export async function create(params) {
    return request(`/api/binType/insert`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    })
}

export async function update(params) {
    console.log("update service");
    return request('/api/binType/update', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
}

export async function deleteBinType(params) {
    console.log("调用service");
    return request(`/api/binType/remove?${qs.stringify(params)}`, {
        method: 'delete',
    })
}