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

    const processed = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(function () {
            return function (tree, file) {
                matter(file)
            }
        })
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(file)

    return {
        metadata: processed.data.matter as Record<string, string>,
        markdown: processed.toString()
    };
}

export function getAllSlugs() {
    return readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''));
}

export async function getNewestPosts() {
    const fileNames = readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
    const files = await Promise.all(fileNames.map(async (fileName) => {
        const filePath = path.join(postsDir, fileName)
        const file = readFileSync(filePath, 'utf-8')
        const processed = await unified()
            .use(remarkParse)
            .use(remarkStringify)
            .use(remarkFrontmatter)
            .use(function () {
                return function (tree, file) {
                    matter(file)
                }
            })
            .process(file)
        const slug = fileName.replace(/\.md$/, '')
        return { slug, metadata: processed.data.matter as Record<string, string> }
    }))
    return files.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()).slice(0, 3)
}