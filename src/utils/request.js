import fetch from 'dva/fetch';
import showErrorMessage from './showErrorMessage';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.status != 200) {
        const err = new Error(data.message, data.status);
        throw err;
      } else {
        return { data };
      }
    }).catch((err) => {
      throw err;
    });
}