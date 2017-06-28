import qs from 'qs';

export function query(url, params) {
    params.token = localStorage.getItem("token");
    localStorage.setItem("loginTime", new Date().getTime() + "");
    return url + `?${qs.stringify(params)}`;
}

export function addTokenToParamsAndStringify(params) {
   params.token = localStorage.getItem("token");
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
    localStorage.setItem("loginTime", new Date().getTime() + "");
    if(url.indexOf('?') >= 0)
        return url + `&token=` + localStorage.getItem("token");
    return url + `?token=` + localStorage.getItem("token");
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