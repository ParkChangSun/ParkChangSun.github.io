import { getAllPostsTree } from "$lib";

export const load = () => {
    return { postTree: getAllPostsTree() }
};

export const prerender = true;