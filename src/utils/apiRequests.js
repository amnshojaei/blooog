import Axios from 'axios';

export const getRequest = function(url, params = {}, configs = {}) {
    const request = Axios.get(process.env.VUE_APP_API_URL + url, {
        params: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
                'Origin, Content-Type, X-Auth-Token',
            ...configs
        }
    });

    return request;
};

export const postRequest = function(url, body = {}, configs = {}) {
    const request = Axios.post(process.env.VUE_APP_API_URL + url, body, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
                'Origin, Content-Type, X-Auth-Token',
            ...configs
        }
    });

    return request;
};
