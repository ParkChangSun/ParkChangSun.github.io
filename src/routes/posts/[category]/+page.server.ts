import { getCategoryPosts } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        posts: await getCategoryPosts(params.category)
    }
};