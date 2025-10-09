// A glob import reads all markdown files from the content directory.
const allMarkdownFiles = import.meta.glob('../../../contents/*.md');

export async function entries() {
    const entries = Object.keys(allMarkdownFiles).map((path) => {
        const slug = path.replace('../../../contents/', '').replace('.md', '');
        return { slug };
    });
    return entries;
}

export async function load({ params }) {
    const post = await import(`../../../contents/${params.slug}.md`);

    return {
        Content: post.default,
        meta: post.metadata,
    };
}
