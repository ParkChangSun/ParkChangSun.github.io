import { getAllPostsTree, getAllSlugs } from "$lib";

export const load = () => {
    return { postTree: getAllPostsTree() }
};

export const prerender = true;