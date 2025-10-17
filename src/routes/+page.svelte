<script lang="ts">
	export let data;
	const { posts } = data;
</script>

<h1>Welcome to ParkChangSun.github.io</h1>

{#each posts as p}
	<a href={`/posts/${p}`}>{p}</a>
{/each}

<p>note - pnpm svelte init (sv) plugins</p>
edgeless graph making problem 그 뭐냐 10217 같은 다익 문제 풀때 힙써보고 또 메모리초과나는지 보기 remarklint?
블로그글쓰기를 글쓰기
