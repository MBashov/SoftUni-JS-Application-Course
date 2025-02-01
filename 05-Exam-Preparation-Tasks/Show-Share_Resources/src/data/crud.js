import { del, get, post, put } from "./api.js";

const endpoints = {
    catalog: '/data/shows?sortBy=_createdOn%20desc',
    showById: '/data/shows/',
    shows: '/data/shows',
    search: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22` 
}

export async function getAllShows() {
    return get(endpoints.catalog);
}

export async function getShowById(id) {
    return get(endpoints.showById + id);
}

export async function createShow(showData) {
    return post(endpoints.shows, showData);
}

export async function updateShow(id, showData) {
    return put(endpoints.showById + id, showData);
}

export async function deleteShow(id) {
    return del(endpoints.showById + id);
}

export async function searchshow(query) {
    return get(endpoints.search(query));
}