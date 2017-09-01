import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToParamsAndStringify } from '../../utils/BaseService.js';

export async function queryBin(params) {
  const url = "/swms/basicinfo/bin/query";
  return request(query(url, params));
}

export async function queryWrhs(params) {
  const url = "/swms/basicinfo/bin/queryWrhs";
  return request(query(url, params));
}

export async function queryZones(params) {
  const url = "/swms/basicinfo/bin/queryZones";
  return request(query(url, params));
}

export async function queryBinTypes(params) {
  const url = "/swms/basicinfo/bin/queryBinTypes";
  return request(query(url, params));
}

export async function createWrh(params) {
  return request(`/swms/basicinfo/bin/insertWrh?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createZone(params) {
  return request(`/swms/basicinfo/bin/insertZone?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createPath(params) {
  return request(`/swms/basicinfo/bin/insertPath?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createShelf(params) {
  return request(`/swms/basicinfo/bin/insertShelf?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createBin(params) {
  return request(`/swms/basicinfo/bin/insertBin?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function deleteBin(params) {
  return request(`/swms/basicinfo/bin/delete?${addTokenToParamsAndStringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function getBinByCode(params) {
  const url = '/swms/basicinfo/bin/getBinByCode';
  return request(query(url, params));
}

export async function getBinByWrhAndUsage(params) {
  const url = '/swms/basicinfo/bin/getbinbywrhandusage';
  return request(query(url, params));
}