import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUl, updateBaseNullBody } from '../../utils/BaseService.js';

export async function queryArticles(params) {
  const url = "/api/article/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/api/article/get";

  return request(query(url, params));
}

export async function getByCode(params) {
  const url = "/api/article/getByCode";
  return request(query(url, params));
}

export async function create(params) {
  params.category = null;
  const url = '/api/article/insert';
  return request(addTokenToUl(url), createBase(params))
}

export async function getAndSaveSupplier(params) {
  const url = '/api/article/getAndSaveSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleSupplier(params) {
  const url = '/api/article/deleteArticleSupplier';
  return request(query(url, params), updateBaseNullBody(null))
}

export async function setDefaultSupplier(params) {
  const url = '/api/article/setDefaultSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleSupplier(params) {
  const url = '/api/article/addArticleSupplier';
  return request(query(url, params));
}

export async function saveArticleQpc(params) {
  const url = '/api/article/saveArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleQpc(params) {
  const url = '/api/article/deleteArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function setDefaultQpcStr(params) {
  const url = '/api/article/setDefaultQpcStr';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleQpc(params) {
  const url = '/api/article/addArticleQpc';
  return request(query(url, params));
}

export async function saveArticleBarcode(params) {
  const url = '/api/article/saveArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleBarcode(params) {
  const url = '/api/article/deleteArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleBarcode(params) {
  const url = '/api/article/addArticleBarcode';
  return request(query(url, params));
}