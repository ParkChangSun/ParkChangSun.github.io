<script>
	import { page } from '$app/state';

	const { data } = $props();
</script>

<div class="mx-auto max-w-5xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Space_Minesweeper's Posts</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.categories as c}
			<a
				href={`${page.url}/${c}`}
				class="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="text-xl font-semibold transition-colors group-hover:text-blue-500">{c}</h2>
				<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">description</p>
			</a>
		{/each}
	</div>
</div>
