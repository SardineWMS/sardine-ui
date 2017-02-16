import request from '../../utils/request';
import qs from 'qs';

export async function queryArticles(params) {
  return request(`/api/article/querybypage?token=localStorage.getItem("token")&${qs.stringify(params)}`);
}

export async function get(params) {
  return request(`/api/article/get?${qs.stringify(params)}`);
}

export async function getByCode(params) {
  return request(`/api/article/getByCode?${qs.stringify(params)}`);
}

export async function create(params) {
  params.category = null;
  return request(`/api/article/insert`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}

export async function getAndSaveSupplier(params) {
  return request(`/api/article/getAndSaveSupplier?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function deleteArticleSupplier(params) {
  return request(`/api/article/deleteArticleSupplier?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function setDefaultSupplier(params) {
  return request(`/api/article/setDefaultSupplier?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function addArticleSupplier(params) {
  return request(`/api/article/addArticleSupplier?${qs.stringify(params)}`);
}

export async function saveArticleQpc(params) {
  return request(`/api/article/saveArticleQpc?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function deleteArticleQpc(params) {
  return request(`/api/article/deleteArticleQpc?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function setDefaultQpcStr(params) {
  return request(`/api/article/setDefaultQpcStr?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function addArticleQpc(params) {
  return request(`/api/article/addArticleQpc?${qs.stringify(params)}`);
}

export async function saveArticleBarcode(params) {
  return request(`/api/article/saveArticleBarcode?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function deleteArticleBarcode(params) {
  return request(`/api/article/deleteArticleBarcode?${qs.stringify(params)}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
  })
}

export async function addArticleBarcode(params) {
  return request(`/api/article/addArticleBarcode?${qs.stringify(params)}`);
}