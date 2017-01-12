import request from '../../utils/request';
import qs from 'qs';

export async function queryCustomer(params) {
    console.log('customer service');
    return request('/api/customer/query', {
        method: 'post',
        body: qs.stringify(params),
    });
}

