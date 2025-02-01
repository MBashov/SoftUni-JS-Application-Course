import { clearUserData, getUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
    'like': '/data/likes',
    'getAllLikes': (tattooId) => `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`,
    'hasLiked': (tattooId, userId) => `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}    
    

export async function login(email, password) {
    const result = await post (endpoints.login, {email, password});

    setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

export async function register(email, password) {
    const result = await post (endpoints.register, {email, password});

    setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

export async function logout() {
    const promise = get(endpoints.logout);  
    clearUserData();
    
    await promise;
}

export async function getAllLikes(tattooId) {
   const response = await get(endpoints.getAllLikes(tattooId));
   return response;
}

export async function hasLiked(tattooId, userId) {
    const response =  await get(endpoints.hasLiked(tattooId, userId));
    return response;
}

export async function postLike(tattooId) {
    return post(endpoints.like, {tattooId});
}

