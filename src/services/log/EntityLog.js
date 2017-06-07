import request from '../../utils/request';
import { query} from '../../utils/BaseService.js';
export async function queryEntityLogs(params) {
<<<<<<< HEAD
  const url = "/swms/log/entitylog/querybypage";
=======
  const url = "/wms/log/entitylog/querybypage";
>>>>>>> 219f308b4a7a553920c22ca1e27b19d4317f35f3
  return request(query(url, params));
}