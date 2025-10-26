<script lang="ts">
	import PostTreeView from './PostTreeView.svelte';
	// let open = new Set<string>();

	// function toggle(path: string) {
	//   open.has(path) ? open.delete(path) : open.add(path);
	// }

	const { nodes } = $props();
</script>

<ul class="space-y-1">
	{#each nodes as node}
		{#if node.type === 'folder'}
			<li>
				<button class="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-200">
					<!-- {open.has(node.path) ? '📂' : '📁'}  -->
					{node.name}
				</button>

				<!-- {#if open.has(node.path)}
          <div class="pl-4 border-l border-gray-300 dark:border-gray-700 mt-1">
            <PostTreeView nodes={node.children} />
          </div>
        {/if} -->
			</li>
		{:else}
			<li>
				<a href={'/'} class="block text-gray-600 hover:text-blue-500 dark:text-gray-400">
					📄 {node.name}
				</a>
			</li>
		{/if}
	{/each}
</ul>
