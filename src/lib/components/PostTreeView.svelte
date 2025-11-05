<script lang="ts">
	import { page } from '$app/state';
	import type { PostDirTreeNode } from '$lib';
	import PostTreeView from './PostTreeView.svelte';

	const { dir }: { dir: PostDirTreeNode } = $props();

	let open = $state(page.url.pathname.includes(`/${dir.name}`));
</script>

<ul class="ml-5">
	<li>
		<button class="hover:cursor-pointer" onclick={() => (open = !open)}>
			{#if open}
				📂
			{:else}
				📁
			{/if}
			{dir.name}
		</button>
	</li>
	{#if open}
		{#each dir.children as c}
			<PostTreeView dir={c} />
		{/each}

		{#each dir.posts as p}
			<li class="ml-5">
				<a href={`/posts/${p.slug}`}>
					{#if page.url.pathname === `/posts/${p.slug}`}
						📜
					{:else}
						📄
					{/if}
					{p.metadata.title}
				</a>
			</li>
		{/each}
	{/if}
</ul>
