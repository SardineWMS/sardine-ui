import request from '../../utils/request';
import qs from 'qs';
import { query, createBase, addTokenToUrl, updateBaseNullBody } from '../../utils/BaseService.js';

export async function queryArticles(params) {
  const url = "/wms/basicinfo/article/querybypage";
  return request(query(url, params));
}

export async function get(params) {
  const url = "/wms/basicinfo/article/get";

  return request(query(url, params));
}

export async function getByCode(params) {
  const url = "/wms/basicinfo/article/getbycode";
  return request(query(url, params));
}

export async function create(params) {
  const url = '/wms/basicinfo/article/insert';
  return request(addTokenToUrl(url), createBase(params))
}

export async function getAndSaveSupplier(params) {
  const url = '/wms/basicinfo/article/getAndSaveSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleSupplier(params) {
  const url = '/wms/basicinfo/article/deleteArticleSupplier';
  return request(query(url, params), updateBaseNullBody(null))
}

export async function setDefaultSupplier(params) {
  const url = '/wms/basicinfo/article/setDefaultSupplier';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleSupplier(params) {
  const url = '/wms/basicinfo/article/addArticleSupplier';
  return request(query(url, params));
}

export async function saveArticleQpc(params) {
  const url = '/wms/basicinfo/article/saveArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleQpc(params) {
  const url = '/wms/basicinfo/article/deleteArticleQpc';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function setDefaultQpcStr(params) {
  const url = '/wms/basicinfo/article/setDefaultQpcStr';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleQpc(params) {
  const url = '/wms/basicinfo/article/addArticleQpc';
  return request(query(url, params));
}

export async function saveArticleBarcode(params) {
  const url = '/wms/basicinfo/article/saveArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function deleteArticleBarcode(params) {
  const url = '/wms/basicinfo/article/deleteArticleBarcode';
  return request(query(url, params), updateBaseNullBody(null));
}

export async function addArticleBarcode(params) {
  const url = '/wms/basicinfo/article/addArticleBarcode';
  return request(query(url, params));
}

export async function queryArticleInStocks(params) {
  const url = '/wms/basicinfo/article/queryInStocks';
  return request(query(url, params));
}

export async function setArticleFixedPickBin(params) {
  const url = '/wms/basicinfo/article/setArticleFixedPickBin';
  return request(query(url, params), updateBaseNullBody(null));
}