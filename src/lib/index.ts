import { readdirSync, readFileSync } from "fs";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { matter } from "vfile-matter";

const postsDir = path.resolve('src/posts');

export async function getPostBySlug(slug: string) {
    const filePath = path.join(postsDir, `${slug}.md`);
    const file = readFileSync(filePath, 'utf-8')

    const markdown = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(file)

    const metadata = await unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter)
        .use(function () {
            return function (tree, file) {
                matter(file)
            }
        })
        .process(file)


    return {
        metadata: metadata.data.matter as Record<string, string>,
        markdown: markdown.toString()
    };
}

export function getAllSlugs() {
    return readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''));
}