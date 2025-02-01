import { del, get, put, post } from "./api.js"

const endpoints = {
    catalog: '/data/motorcycles?sortBy=_createdOn%20desc',
    motorcycles: '/data/motorcycles',
    getMotorcycleById: '/data/motorcycles/',
    search: (query) => `/data/motorcycles?where=model%20LIKE%20%22${query}%22` 
}

export async function getAllMotorsycles() {
    return get(endpoints.catalog);
}

export async function getMotorcycleById(id) {
    return get(endpoints.getMotorcycleById + id);
}

export async function createMotorsycle(data) {
    return post(endpoints.motorcycles, data);
}

export async function updateMotorsycle(id, data) {
    return put(endpoints.getMotorcycleById + id, data);
}

export async function deleteMotorcycle(id) {
    return del(endpoints.getMotorcycleById + id);
}

export async function searchMotorcycle(query) {
    return get(endpoints.search(query));
}