import { timeStamp2datetime } from './DateUtils';
/**直接传入带有操作信息的对象 ,转换成name[code] yyyy-MM-dd HH:mm:ss形式*/
export function createInfo2String(item) {
    return item.createInfo.operator.fullName + "[" + item.createInfo.operator.code + "] " + timeStamp2datetime(item.createInfo.time);
}
export function lastModifyInfo2String(item) {
    return item.lastModifyInfo.operator.fullName + "[" + item.lastModifyInfo.operator.code + "] " + timeStamp2datetime(item.lastModifyInfo.time);
}

/**
 * 传入带有操作信息的对象，转换成name[code]形式，与createInfo2String 区别是不带有操作时间
 * @param {*包含有操作信息的对象} item 
 */
export function createInfo2StringWithoutTime(item) {
    return item.createInfo.operator.fullName + "[" + item.createInfo.operator.code + "] "
}

/**
 * 传入带有操作信息的对象，转换成name[code]lastModifyInfo2String 区别是不带有操作时间
 * @param {*包含有操作信息的对象} item 
 */
export function lastModifyInfo2StringWithoutTime(item) {
    return item.createInfo.operator.fullName + "[" + item.createInfo.operator.code + "] "
}