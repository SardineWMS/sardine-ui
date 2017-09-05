import request from '../../utils/request';
import React from 'react';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBase, deleteBase, updateBaseNullBody } from '../../utils/BaseService';

export async function queryTask(params) {
    const url = "/swms/inner/task/query";

    var req = new Object();
    req.method = 'post';
    req.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    req.body = JSON.stringify(params.states ? params.states : []);

    return request(query(url, params), req);
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

export async function execute(params) {
    const url = 'swms/inner/task/execute';
}

export async function abort(params) {
    const url = `/swms/inner/task/abort?${qs.stringify(params)}`;
    return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function putaway(params) {
    const url = `/swms/inner/task/putaway?${qs.stringify(params)}`;
    return request(addTokenToUrl(url), updateBaseNullBody(params));
}

export async function rpl(params) {
    const url = `/swms/inner/task/rpl?rplBillUuid=${params.rplBillUuid}&version=${params.version}`;
    return request(addTokenToUrl(url), createBase(params.rpler));
}

export async function batchPick(params) {
    const url = `/swms/inner/task/batchpick?toBinCode=${params.toBinCode}&toContainerBarcode=${params.toContainerBarcode}`;
    return request(addTokenToUrl(url), createBase(params.pickItemUuids));
}