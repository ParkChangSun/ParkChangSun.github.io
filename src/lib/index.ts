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

export interface TocItem {
    depth: number
    slug: string
    value: string
}

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
        .use(rehypeAutolinkHeadings, {
            behavior: 'append',
            content: { type: 'text', value: '🔗' }
        })
        .use(rehypeKatex)
        .use(rehypePrettyCode, {
            theme: "dark-plus"
        })
        .use(rehypeStringify)
        .process(file)

    return {
        metadata: processed.data.matter as Record<string, string>,
        toc: processed.data.toc as TocItem[],
        markdown: processed.toString()
    };
}

export interface PostListItem {
    slug: string
    metadata: Record<string, string>
}

export interface PostDirTreeNode {
    name: string
    children: PostDirTreeNode[]
    posts: PostListItem[]
}

export function getAllPostsList(dir = postsDir) {
    const posts: PostListItem[] = []

    const entries = readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
        const itemPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            posts.push(...getAllPostsList(itemPath))
            return
        }

        if (entry.isFile()) {
            posts.push({ slug: path.relative(postsDir, itemPath).replace(/\.md$/, ''), metadata: getFrontmatter(itemPath) })
        }
    })

    return posts
}

export function getAllPostsTree(dir = postsDir): PostDirTreeNode {
    const children: PostDirTreeNode[] = []
    const posts: PostListItem[] = []

    const entries = readdirSync(dir, { withFileTypes: true })

    entries.forEach(entry => {
        const entryPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            children.push(getAllPostsTree(entryPath))
        }

        if (entry.isFile()) {
            posts.push({ slug: path.relative(postsDir, entryPath).replace(/\.md$/, ''), metadata: getFrontmatter(entryPath) })
        }
    })

    return { name: path.basename(dir), children, posts }
}

function getFrontmatter(p: string) {
    const raw = readFileSync(p, "utf-8");
    const processed = unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(function () {
            return function (tree, file) {
                matter(file)
            }
        })
        .use(remarkStringify)
        .processSync(raw)
    return processed.data.matter as Record<string, string>
}

