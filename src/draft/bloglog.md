---
title: 블로그 개발 일지
date: 2025-10-17
---

# 블로그 개발 일지

## 2025-10-17 이전

블로그를 만들고 싶었다. 여러 책에서도 그렇고 기억하고 싶은 경험들이나 지식들을 담아두고 싶었다.

페이지를 직접 쓰기보다는 다른 프레임워크처럼 마크다운으로 쓰고 라이브러리를 통해 페이지로 띄우는 방식이 좋겠다고 생각했다.

그동안 개인 프로젝트에 많이 쓰기도 했고 힙스터답게 svelte 로 만들고 정적 빌드해서 github page에 띄우리고 했다.

mdsvex를 통해 svelte에서도 쉽게 마크다운을 띄울 수 있었다.

mdsvex는 마크다운 파일을 preprocess해서 svelte component처럼 import, render할 수 있게 한다.

얘는 한 가지 문제가 있었다. 알고리즘 풀이를 적을 때 latex를 사용해 수식을 적을 때가 있는데, 이건 이 기능이 없었다.

frontmatter도 알아서 파싱해주고 마크다운 띄우기도 편하고 다 좋았다.

rehype-katex-svelte는 디펜던시도 옛날 것을 사용해서 왠지 쓰기가 싫었다.

찾아보니까 unified라고 마크다운과 html을 처리하는 라이브러리가 있었다.

unified는 마크다운과 html을 ast로 처리한다. 처리 과정은 사용한 플러그인에 의해 결정된다.

remark는 마크다운, rehype은 html이다.

```
          +--------+                     +----------+
Input ->- | Parser | ->- Syntax Tree ->- | Compiler | ->- Output
          +--------+                     +----------+
```

여기서 파서는 마크다운 파서, 컴파일러는 html 컴파일러다.

그냥 설명 쓰는게 낫나
내가 쓴 코드 쓴다음에 리드미에 있는 설명 쓰는게 나은듯?

lib폴더에 모든 마크다운 파일들의 리스트를 얻는 함수와 마크다운을 html로 변환하는 함수를 만들었고 이를 +page.server.ts에 적용했다.

여기에코드

latex 변환

이제 latex 파트로 돌아가보자. unified는 여러 플러그인들을 제공한다. 여기서 사용할 플러그인은 remark-math rehype-katex 

post폴더에다가 마크다운 파일들을 몰아넣고 +page.server.js에서 entries를 사용해 마크다운 파일명을 slug로 하는 dynamic route를 prerender하고, load를 사용해 마크다운 파일을 import할 수 있다.

여기에코드
```ts
// $lib/index.ts
export function getAllSlugs() {
    return readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''));
}

// routes/+page.server.ts
export async function entries() {
    return getAllSlugs().map(slug => ({ slug }))
}
```

블로그 개발을 하면서 그걸로 글을 쓰면 무한동력 아님?

# 2025-10-

1022 최근글모음
1023typograhpy
1024토글