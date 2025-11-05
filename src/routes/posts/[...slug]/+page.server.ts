import { getAllPostsList, getPostBySlug } from '$lib';
import type { EntryGenerator } from './$types.js';

export const entries: EntryGenerator = () => {
    return getAllPostsList().map(p => ({ slug: p.slug }))
}

export async function load({ params }) {
    return getPostBySlug(params.slug)
}
