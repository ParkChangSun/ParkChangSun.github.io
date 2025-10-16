import { getPostBySlug } from '$lib';

// A glob import reads all markdown files from the content directory.
const allMarkdownFiles = import.meta.glob('../../../posts/*.md');

export async function entries() {
    const entries = Object.keys(allMarkdownFiles).map((path) => {
        const slug = path.replace('../../../posts/', '').replace('.md', '');
        return { slug };
    });
    return entries;
}

export async function load({ fetch, params }) {
    getPostBySlug("baek10217")
    const post = await import(`../../../posts/${params.slug}.md`);

    // console.log(post)

    return {
        Content: post.default,
        meta: post.metadata,
    };
}
