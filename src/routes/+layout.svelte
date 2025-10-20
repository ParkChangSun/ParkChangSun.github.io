<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	const { data, children } = $props();
	const { posts } = data;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#each posts as p}
	<a href={`/posts/${p}`}>{p}</a>
{/each}

<div
	class="flex min-h-screen flex-col bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"
>
	<!-- Header -->
	<header
		class="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-gray-700"
	>
		<h1 class="text-3xl font-extrabold tracking-tight">
			<span class="text-blue-500">&lt;</span>DevLog<span class="text-blue-500">/&gt;</span>
		</h1>
		<nav class="flex gap-6 text-lg">
			<!-- <a href="/" class="transition hover:text-blue-500">Home</a>
			<a href="/tags" class="transition hover:text-blue-500">Tags</a>
			<a href="/about" class="transition hover:text-blue-500">About</a> -->
			<!-- <button on:click={toggleTheme} class="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        {#if dark}
          <Sun size="20" />
        {:else}
          <Moon size="20" />
        {/if}
      </button> -->
		</nav>
	</header>

	<!-- Main -->
	<main class="mx-auto w-full max-w-5xl flex-grow px-8 py-12">
		<div>
			<h2 class="mb-10 text-center text-4xl font-bold">Latest Posts</h2>
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _, i}
					<!-- <a
						href={`/blog/post-${i}`}
						class="block rounded-2xl border border-transparent bg-white p-6 shadow transition hover:border-blue-500 hover:shadow-xl dark:bg-gray-800"
					>
						<h3 class="mb-2 text-2xl font-semibold">Post Title {i + 1}</h3>
						<p class="mb-3 text-gray-600 dark:text-gray-400">
							This is a short summary of the post, giving a preview of its content.
						</p>
						<span class="text-sm font-semibold text-blue-500">Read more →</span>
					</a> -->
				{/each}
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer
		class="flex flex-col items-center justify-between border-t border-gray-200 px-8 py-6 text-sm text-gray-500 sm:flex-row dark:border-gray-700 dark:text-gray-400"
	>
		<p>© {new Date().getFullYear()} DevLog. All rights reserved.</p>
		<div class="mt-3 flex gap-4 sm:mt-0">
			<!-- <a href="https://github.com" target="_blank" class="hover:text-blue-500"><Github size="18" /></a>
      <a href="https://twitter.com" target="_blank" class="hover:text-blue-500"><Twitter size="18" /></a> -->
		</div>
	</footer>
</div>

{@render children?.()}
