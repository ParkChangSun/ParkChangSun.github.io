import { readdirSync, readFileSync } from "fs";
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
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { heading } from "hast-util-heading";
import GithubSlugger from 'github-slugger'
import { headingRank } from "hast-util-heading-rank";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const postsDir = path.resolve('src/posts');

export interface Toc {
    depth: number
    slug: string
    value: string
}

export interface Metadata {
    title: string
    tags: string[]
    post_date?: string
    edit_date?: string
    slug: string
}

const markdownTransformer = unified()
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
            let a: Toc[] = []
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
    .use(rehypeAutolinkHeadings, {
        behavior: 'append',
        content: { type: 'text', value: '🔗' }
    })
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
        theme: "dark-plus"
    })
    .use(rehypeStringify)

const metadataExtractor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(function () {
        return function (tree, file) {
            matter(file)
        }
    })
    .use(remarkStringify)

export function getAllCategories() {
    const res: string[] = []
    const entries = readdirSync(postsDir, { withFileTypes: true });
    entries.forEach(entry => {
        if (entry.isDirectory()) {
            res.push(entry.name)
        }
    })
    return res
}

export async function getCategoryPosts(category: string) {
    const res: Metadata[] = []

    const entries = readdirSync(path.join(postsDir, category))
    const b = entries.map(async entry => {
        const raw = readFileSync(path.join(postsDir, category, entry), "utf-8");
        const processed = await metadataExtractor.process(raw)
        const a = processed.data.matter as Metadata
        a.slug = entry
        res.push(a)
    })
    await Promise.all(b)

    return res
}

export async function parseMarkdown(category: string, post: string) {
    const raw = readFileSync(path.join(postsDir, category, post), "utf-8");
    const processed = await markdownTransformer.process(raw)

    return {
        metadata: processed.data.matter as Metadata,
        toc: processed.data.toc as Toc[],
        content: processed.toString()
    };
}
