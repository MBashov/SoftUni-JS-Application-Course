import { get, post } from "./api.js"


const endpoints = {
    likeSolution: '/data/likes',
    likesForSolution: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    likesForUser: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeSolution(solutionId) {
    return post(endpoints.likeSolution, {solutionId});
}

export async function getLikesForSolution(solutionId) {
    return get(endpoints.likesForSolution(solutionId));
}

export async function getLikesForUser(solutionId, userId) {
    return get(endpoints.likesForUser(solutionId, userId));
}