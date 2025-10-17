import { getAllSlugs } from "$lib";

export const load = () => {
    return { posts: getAllSlugs() }
};