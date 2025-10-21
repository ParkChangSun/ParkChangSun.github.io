import { getNewestPosts } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { latestPosts: await getNewestPosts() }
};