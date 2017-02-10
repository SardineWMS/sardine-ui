import timeStamp2datetime from './DateUtils';
/**直接传入带有操作信息的对象 ,转换成name[code] xxxx-xx-xx xx:xx:xx形式*/
export function createInfo2String(item) {
    return item.createInfo.operator.fullName + "[" + item.createInfo.operator.code + "] " + timeStamp2datetime(item.createInfo.time);
}
export function lastModifyInfo2String(item) {
    return item.lastModifyInfo.operator.fullName + "[" + item.lastModifyInfo.operator.code + "] " + timeStamp2datetime(item.lastModifyInfo.time);
}