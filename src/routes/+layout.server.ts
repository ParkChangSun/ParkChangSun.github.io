import { getAllSlugs } from "$lib";

export const load = () => {
    return { posts: getAllSlugs() }
};

export const prerender = true;