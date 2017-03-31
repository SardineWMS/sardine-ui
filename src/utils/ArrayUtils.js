/**
 * 根据元素值将元素从数组中移除
 * @param {*原数组} arr 
 * @param {*要移除的元素} val 
 */
export function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};