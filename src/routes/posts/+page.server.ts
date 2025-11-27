import { getAllPostsList } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { latestPosts: getAllPostsList().sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()).slice(0, 3) }
};