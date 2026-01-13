<script lang="ts">
	import { page } from '$app/state';

	const { data } = $props();
	const { posts } = data;
</script>

<div>
	<h1>{page.params.category}</h1>
	{#each posts as p}
		<a href={`${page.url}/${p.slug.replace('.md', '')}`}>{p.title}</a>
	{/each}
</div>
