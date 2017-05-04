import request from '../../utils/request';
import { query} from '../../utils/BaseService.js';
export async function queryEntityLogs(params) {
  const url = "/Log/entitylog/querybypage";
  return request(query(url, params));
}