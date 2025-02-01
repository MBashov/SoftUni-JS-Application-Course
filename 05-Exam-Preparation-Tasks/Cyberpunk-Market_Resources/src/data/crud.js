import { del, get, post, put } from "./api.js"

const endpoints ={
    'catalog': '/data/cyberpunk?sortBy=_createdOn%20desc',
    'items': '/data/cyberpunk',
    'itemById': '/data/cyberpunk/'
}

export async function getAllItems () {
    return get(endpoints.catalog);
}

export async function getItemByID(id) {
    return get(endpoints.itemById + id);
}

export async function createItem(data) {
    return post(endpoints.items, data);
}

export async function editItem(id, data) {
    return put(endpoints.itemById + id, data);
}

export async function deleteItem(id) {
    return del(endpoints.itemById + id);
}