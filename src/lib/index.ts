import { readdirSync, readFileSync } from "fs";
import { toc } from "mdast-util-toc";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { matter } from "vfile-matter";

import type { Root } from 'mdast'
import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";
import { heading } from "hast-util-heading";

import GithubSlugger from 'github-slugger'
import { headingRank } from "hast-util-heading-rank";

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
        .use(function () {
            return function (tree, file) {
                const s = new GithubSlugger()
                interface TocItem {
                    depth: number
                    slug: string
                    value: string
                }
                let a: TocItem[] = []
                visit(tree, (node) => {
                    if (heading(node) && node.children?.[0].type === "text") {
                        const value = node.children[0].value
                        a.push({ depth: headingRank(node)!, slug: s.slug(value), value })
                    }
                })
                file.data.toc = a
            }
        })
        .use(rehypeSlug)
        .use(rehypeKatex)
        .use(rehypePrettyCode, {
            theme: "dark-plus"
        })
        .use(rehypeStringify)
        .process(file)

    console.log(processed.data.toc)
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
            .use(remarkFrontmatter)
            .use(function () {
                return function (tree, file) {
                    matter(file)
                }
            })
            .use(remarkStringify)
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

export function getAllPostsTree(dir = postsDir, route = '/posts'): PostTreeNode {
    const entries = readdirSync(dir, { withFileTypes: true })

    const children: PostTreeNode[] = entries.map((entry) => {
        const entryPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            return getAllPostsTree(entryPath, path.join(route, entry.name))
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

