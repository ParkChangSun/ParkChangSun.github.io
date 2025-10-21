<script lang="ts">
	const { data } = $props();
	const { latestPosts } = data;
</script>

<svelte:head>
	<title>Space_Minesweeper's blog</title>
</svelte:head>

<h1>Welcome to Space_Minesweeper's blog!</h1>

<div>
	<h2 class="mb-10 text-center text-4xl font-bold">Latest Posts</h2>
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each latestPosts as p}
			<a
				href={`/posts/${p.slug}`}
				class="block rounded-2xl border border-transparent bg-white p-6 shadow transition hover:border-blue-500 hover:shadow-xl dark:bg-gray-800"
			>
				<h3 class="mb-2 text-2xl font-semibold">{p.metadata.title}</h3>
				<p class="mb-3 text-gray-600 dark:text-gray-400">
					This is a short summary of the post, giving a preview of its content.
				</p>
				<span class="text-sm font-semibold text-blue-500">Read more →</span>
			</a>
		{/each}
	</div>
</div>

sv plugins edgeless graph making 다익 문제 풀때 힙써보고 또 메모리초과나는지 보기 remarklint?
