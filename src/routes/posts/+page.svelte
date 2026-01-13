<script>
	import { page } from '$app/state';

	const { data } = $props();
</script>

<div class="mx-auto flex max-w-3xl flex-col items-center">
	<h1 class="text-2xl">Space_Minesweeper's Posts</h1>
	{#each data.categories as c}
		<a href={`${page.url}/${c}`}>{c}</a>
	{/each}
	<!-- <h1 class="text-2xl">Space_Minesweeper's Posts</h1>
	<div class="h-[30vh] w-9/10 border">
		<PostTreeView dir={data.postTree} />
	</div>

	<h2 class="text-xl">Latest</h2>
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.latestPosts as p}
			<a
				href={`/posts/${p.slug}`}
				class="block rounded-2xl border border-transparent bg-white p-6 shadow transition hover:border-blue-500 hover:shadow-xl dark:bg-gray-800"
			>
				<h3 class="mb-2 text-xl font-semibold">{p.metadata.title}</h3>
				<p class="mb-3 text-gray-600 dark:text-gray-400">{p.metadata.tags}</p>
			</a>
		{/each}
	</div> -->
</div>
