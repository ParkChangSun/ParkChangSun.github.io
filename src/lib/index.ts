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

export interface PostTreeNode {
    name: string
    type: "directory" | "file"
    children?: PostTreeNode[]
    route?: string
}

export function getAllPosts(dir = postsDir, route = '/posts'): PostTreeNode {
    const entries = readdirSync(dir, { withFileTypes: true })

    const children: PostTreeNode[] = entries.map((entry) => {
        const entryPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            return getAllPosts(entryPath, path.join(route, entry.name))
        }

        if (entry.isFile() && entry.name.endsWith(".md")) {
            const slug = entry.name.replace(/\.md$/, '')
            return { name: slug, type: "file", route: path.join(route, slug) }
        }

        return null
    }).filter((child): child is PostTreeNode => child !== null)

    return { name: path.basename(dir), type: "directory", children }
}

export function getAllSlugs(dir = postsDir, route = ''): string[] {
    const entries = readdirSync(dir, { withFileTypes: true });
    const slugs: string[] = [];

    for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        const rawSlug = path.join(route, entry.name)

        if (entry.isDirectory()) {
            slugs.push(...getAllSlugs(entryPath, rawSlug));
        } else if (entry.name.endsWith('.md')) {
            slugs.push(rawSlug.replace(/\.md$/, ''))
        }
    }

    return slugs;
}

