import { getAllCategories } from "$lib";
import type { PageServerLoad } from "../$types";


export const load: PageServerLoad = async () => {
    return {
        categories: getAllCategories()
    }
};
