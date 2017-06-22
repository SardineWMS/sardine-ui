import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl} from '../../utils/BaseService';


export async function queryOwnedMenuResourceByUser(params) {
  const url = "/swms/ia/resource/queryOwnedMenuByUpper";
  return request(query(url, params));
}