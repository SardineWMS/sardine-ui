import qs from 'qs';
let token = localStorage.getItem("token");

export function query(url, params) {
    params.token = token;
    return url + `?${qs.stringify(params)}`;
}

export function addTokenToParamsAndStringify(params) {
   params.token = token;
   return qs.stringify(params);
}

export function createBase(params) {
    var req = new Object();
    req.method = 'post';
    req.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    req.body = JSON.stringify(params);
    return req;
}

export function addTokenToUrl(url) {
    if(url.indexOf('?') >= 0)
        return url + `&token=` + token;
    return url + `?token=` + token;
}

export function deleteBase(params) {
    var req = new Object();
    req.method = 'delete';
    return req;
}

export function updateBase(params) {
    var req = new Object();
    req.method = 'put';
    req.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    req.body = JSON.stringify(params);
    return req;
}

export function updateBaseNullBody(params) {
    var req = updateBase(params);
    req.body = null;
    return req;
}