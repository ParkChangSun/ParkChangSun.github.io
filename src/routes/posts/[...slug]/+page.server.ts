import { getAllSlugs, getPostBySlug } from '$lib';
import type { EntryGenerator } from './$types.js';

export const entries: EntryGenerator = () => {
    return getAllSlugs().map(slug => ({ slug }))
}

export async function load({ params }) {
    return getPostBySlug(params.slug)
}
