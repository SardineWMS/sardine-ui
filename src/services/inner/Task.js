import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryTask(params) {
    const url = "/inner/task/query";
    return request(query(url, params));
}