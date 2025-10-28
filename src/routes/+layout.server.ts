import { getAllPosts, getAllSlugs } from "$lib";

export const load = () => {
    return { postTree: getAllPosts() }
};

export const prerender = true;