import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody } from '../../utils/BaseService.js';

export async function queryArticles(params) {
  const url = "/swms/basicinfo/article/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/swms/basicinfo/article/get";

  return request(query(url, params));
}

export async function getByCode(params) {
  const url = "/swms/basicinfo/article/getbycode";
  return request(query(url, params));
}

export async function create(params) {
  const url = '/swms/basicinfo/article/insert';
  return request(addTokenToUrl(url), createBase(params))
}

export async function getAndSaveSupplier(params) {
  const url = '/swms/basicinfo/article/getAndSaveSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleSupplier(params) {
  const url = '/swms/basicinfo/article/deleteArticleSupplier';
  return request(query(url, params), updateBaseNullBody(null))
}

export async function setDefaultSupplier(params) {
  const url = '/swms/basicinfo/article/setDefaultSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleSupplier(params) {
  const url = '/swms/basicinfo/article/addArticleSupplier';
  return request(query(url, params));
}

export async function saveArticleQpc(params) {
  const url = '/swms/basicinfo/article/saveArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleQpc(params) {
  const url = '/swms/basicinfo/article/deleteArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function setDefaultQpcStr(params) {
  const url = '/swms/basicinfo/article/setDefaultQpcStr';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleQpc(params) {
  const url = '/swms/basicinfo/article/addArticleQpc';
  return request(query(url, params));
}

export async function saveArticleBarcode(params) {
  const url = '/swms/basicinfo/article/saveArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleBarcode(params) {
  const url = '/swms/basicinfo/article/deleteArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleBarcode(params) {
  const url = '/swms/basicinfo/article/addArticleBarcode';
  return request(query(url, params));
}

export async function queryArticleInStocks(params) {
  const url = '/swms/basicinfo/article/queryInStocks';
  return request(query(url, params));
}

export async function setArticleFixedPickBin(params) {
  const url = '/swms/basicinfo/article/setArticleFixedPickBin';
  return request(query(url, params), updateBaseNullBody(null));
}