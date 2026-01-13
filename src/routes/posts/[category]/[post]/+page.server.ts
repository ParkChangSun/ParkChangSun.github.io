import { parseMarkdown } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        ...await parseMarkdown(params.category, params.post.concat(".md"))
    }
};