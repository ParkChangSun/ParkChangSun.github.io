import { getAllSlugs, getPostBySlug } from '$lib';

export async function entries() {
    return getAllSlugs().map(slug => ({ slug }))
}

export async function load({ params }) {
    return getPostBySlug(params.slug)
}
