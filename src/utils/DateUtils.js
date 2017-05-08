//timestamp类型转换成datetime类型
/***
 * 时间格式：yyyy-MM-dd HH:mm:ss
 */
export function timeStamp2datetime(timestamp) {
    const datetime = new Date();
    datetime.setTime(timestamp);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const second = datetime.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


/***
 * 时间格式：yyyy-MM-dd
 */
export function timeStamp2date(timestamp) {
    const datetime = new Date();
    datetime.setTime(timestamp);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();
    return year + "-" + month + "-" + day;
}
