import { readFileSync } from "fs";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const postsDir = path.resolve('src/posts');

export async function getPostBySlug(slug: string) {
    const filePath = path.join(postsDir, `${slug}.md`);
    const file = readFileSync(filePath, 'utf-8')

    const processed = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(file)

    console.log(processed)
    console.log(processed.data)

    // return {
    //     slug,
    //     metadata: data,
    //     html: processed.toString()
    // };
}