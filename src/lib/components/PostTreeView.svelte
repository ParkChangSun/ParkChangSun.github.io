<script lang="ts">
	import { page } from '$app/state';
	import type { PostTreeNode } from '$lib';
	import PostTreeView from './PostTreeView.svelte';

	const { tree }: { tree: PostTreeNode } = $props();

	let open = $state(page.url.pathname.includes(`/${tree.name}`));
</script>

<ul class="ml-5">
	<li>
		<button class="hover:cursor-pointer" onclick={() => (open = !open)}>
			{#if open}
				📂
			{:else}
				📁
			{/if}
			{tree.name}
		</button>
	</li>
	{#if open}
		{#each tree.children as child}
			{#if child.type === 'directory'}
				<PostTreeView tree={child} />
			{:else}
				<li class="ml-5">
					<a href={child.route}>
						{#if page.url.pathname === child.route}
							📜
						{:else}
							📄
						{/if}
						{child.name}
					</a>
				</li>
			{/if}
		{/each}
	{/if}
</ul>
