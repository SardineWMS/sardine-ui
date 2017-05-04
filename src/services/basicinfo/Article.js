import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody } from '../../utils/BaseService.js';

export async function queryArticles(params) {
  const url = "/basic/article/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/basic/article/get";

  return request(query(url, params));
}

export async function getByCode(params) {
  const url = "/basic/article/getByCode";
  return request(query(url, params));
}

export async function create(params) {
  params.category = null;
  const url = '/basic/article/insert';
  return request(addTokenToUrl(url), createBase(params))
}

export async function getAndSaveSupplier(params) {
  const url = '/basic/article/getAndSaveSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleSupplier(params) {
  const url = '/basic/article/deleteArticleSupplier';
  return request(query(url, params), updateBaseNullBody(null))
}

export async function setDefaultSupplier(params) {
  const url = '/basic/article/setDefaultSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleSupplier(params) {
  const url = '/basic/article/addArticleSupplier';
  return request(query(url, params));
}

export async function saveArticleQpc(params) {
  const url = '/basic/article/saveArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleQpc(params) {
  const url = '/basic/article/deleteArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function setDefaultQpcStr(params) {
  const url = '/basic/article/setDefaultQpcStr';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleQpc(params) {
  const url = '/basic/article/addArticleQpc';
  return request(query(url, params));
}

export async function saveArticleBarcode(params) {
  const url = '/basic/article/saveArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleBarcode(params) {
  const url = '/basic/article/deleteArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleBarcode(params) {
  const url = '/basic/article/addArticleBarcode';
  return request(query(url, params));
}