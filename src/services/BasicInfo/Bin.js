import request from '../../utils/request';
import qs from 'qs';

export async function queryBin(params) {
  return request(`/api/bin/query?${qs.stringify(params)}`);
}

export async function queryWrhs(params) {
  return request(`/api/bin/queryWrhs?${qs.stringify(params)}`);
}

export async function queryZones(params) {
  return request(`/api/bin/queryZones?${qs.stringify(params)}`);
} 

export async function queryBinTypes(params) {
  return request(`/api/bin/queryBinTypes?${qs.stringify(params)}`);
}

export async function createWrh(params) {
  return request(`/api/bin/insertWrh?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createZone(params) {
  return request(`/api/bin/insertZone?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createPath(params) {
  return request(`/api/bin/insertPath?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createShelf(params) {
  return request(`/api/bin/insertShelf?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function createBin(params) {
  return request(`/api/bin/insertBin?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}

export async function deleteBin(params) {
  return request(`/api/bin/delete?${qs.stringify(params)}`, {
        method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
}