import { del, get, post, put } from "./api.js"

const endpoits = {
    catalog: '/data/tattoos?sortBy=_createdOn%20desc',
    tattooByID: '/data/tattoos/',
    tattoos: '/data/tattoos'
}

export async function getAllTattoos() {
    return get(endpoits.catalog);
}

export async function getTattooByID(id) {
    return get(endpoits.tattooByID + id);
}

export async function createTatto(tattoData) {
    return post(endpoits.tattoos, tattoData)
}

export async function updateTatto(id, tattoData) {
    return put(endpoits.tattooByID + id, tattoData)
}

export async function deleteTatto(id) {
    return del(endpoits.tattooByID + id);
}