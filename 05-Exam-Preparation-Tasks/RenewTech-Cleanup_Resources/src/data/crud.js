import { get, post, put, del } from "./api.js";

const endpoints = {
    catalog: '/data/solutions?sortBy=_createdOn%20desc',
    solutionById: '/data/solutions/',
    solutions: '/data/solutions'
}

export async function getAllSolutions() {
    return get(endpoints.catalog);
}

export async function getSolutionById(id) {
    return get(endpoints.solutionById + id);
}

export async function createSolution(solutionData) {

    return post (endpoints.solutions, solutionData);   
}

export async function updateSolution(id, solutionData) {

    return put (endpoints.solutionById + id, solutionData);   
}

export async function deleteSolution(id) {
    return del(endpoints.solutionById + id);
}