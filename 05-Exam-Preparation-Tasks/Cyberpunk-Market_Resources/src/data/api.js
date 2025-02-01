import { html, renderBase } from "../lib.js";
import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}, 
    }

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);    
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);
        
        if (!response.ok) {
            const err = await response.json();

            if (response.status == 403 && err.message == 'Invalid access token') {
                clearUserData();
            }
            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        //TODO use error reporting technique as described in exam requirments 
        // alert(err.message);
        // throw err;

        const rootEl = document.getElementById('errorBox');
    
        renderBase(html`
            <span class="msg">${err.message}</span>
        `, rootEl);
        rootEl.style.display = 'block';

        setTimeout(() => {
            rootEl.style.display = 'none';
        }, 3000);
    }
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);