import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryTask(params) {
    const url = "/swms/inner/task/query";
    return request(query(url, params));
}

export async function queryStocks(params) {
    const url = "/swms/inner/task/queryStocks";
    return request(query(url, params));
}

export async function saveArticleMoveRule(params) {
    const url = '/swms/inner/decInc/saveArticleMoveRule';
    return request(addTokenToUrl(url), createBase(params));
}

export async function saveAndMoveArticleMoveRule(params) {
    const url = '/swms/inner/decInc/saveAndMoveArticleMoveRule';
    return request(addTokenToUrl(url), createBase(params));
}

export async function saveContainerMoveRule(params) {
    const url = '/swms/inner/decInc/saveContainerMoveRule';
    return request(addTokenToUrl(url), createBase(params));
}

export async function saveAndMoveContainerMoveRule(params) {
    const url = '/swms/inner/decInc/saveAndMoveContainerMoveRule';
    return request(addTokenToUrl(url), createBase(params));
}

export async function articleMove(params) {
    const url = '/swms/inner/decInc/articleMove';
    return request(addTokenToUrl(url), createBase(params));
}

export async function containerMove(params) {
    const url = '/swms/inner/decInc/containerMove';
    return request(addTokenToUrl(url), createBase(params));
}