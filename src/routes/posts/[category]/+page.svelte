<script lang="ts">
	import { page } from '$app/state';

	const { data } = $props();
	const { posts } = data;
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-10">
		<a href="/posts" class="text-sm text-blue-500 hover:underline">← Back to Categories</a>
		<h1 class="mt-4 text-4xl font-extrabold text-gray-900 capitalize dark:text-white">
			{page.params.category} <span class="text-gray-400">Posts</span>
		</h1>
	</div>

	<div class="space-y-8">
		{#each posts as p}
			<article class="group border-b border-gray-100 pb-8 dark:border-gray-800">
				<a href={`${page.url}/${p.slug.replace('.md', '')}`} class="block">
					<time class="text-sm text-gray-500">{p.post_date}</time>
					<h2 class="mt-2 text-2xl font-bold transition-colors group-hover:text-blue-500">
						{p.title}
					</h2>
					<p class="mt-3 line-clamp-2 text-gray-600 dark:text-gray-400">{p.tags}</p>
				</a>
			</article>
		{/each}
	</div>
</div>
