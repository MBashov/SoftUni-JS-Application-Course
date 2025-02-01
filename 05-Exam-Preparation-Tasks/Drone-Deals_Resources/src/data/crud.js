import { get, post, put, del } from "./api.js";

const endpoints = {
    'catalog': 'data/drones?sortBy=_createdOn%20desc',
    'droneById': 'data/drones/',
    'drones': 'data/drones'
}


export async function getAllDrones() {
    return get(endpoints.catalog);
}

export async function getDroneById(id) {
    return get(endpoints.droneById + id);
}


export async function createDrone(dronesData) {
    return post(endpoints.drones, dronesData);
}


export async function updateDrone(id, dronesData) {
    return put(endpoints.droneById + id, dronesData);
}

export async function deleteDrone(id) {
    return del(endpoints.droneById + id);
}