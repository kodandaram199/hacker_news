/**
 * Created by kodanda_rama on 5/25/17.
 */
import fetch from 'isomorphic-fetch';

export default function callApi(url, method = 'GET', headers, body) {
    return fetch(url, {
        headers,
        method,
        body: JSON.stringify(body),
        })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
        .then(
            response => response,
            error => error
        );
}

