<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import DarkToggle from '$lib/components/DarkToggle.svelte';

	const { data, children } = $props();
	const { posts } = data;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"
>
	<header
		class="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-gray-700"
	>
		<a href="/"><h1 class="text-3xl">🌌💣🧹</h1></a>
		<nav class="flex gap-6 text-lg">
			<!-- <button on:click={toggleTheme} class="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        {#if dark}
          <Sun size="20" />
        {:else}
          <Moon size="20" />
        {/if}
      </button> -->
			<DarkToggle />
			<a href="/" class="transition hover:text-blue-500">Dummy</a>
		</nav>
	</header>

	<main class="mx-auto w-full max-w-5xl flex-grow px-8 py-12">
		{@render children?.()}
	</main>

	<!-- Footer -->
	<footer
		class="flex flex-col items-center justify-between border-t border-gray-200 px-8 py-6 text-sm text-gray-500 sm:flex-row dark:border-gray-700 dark:text-gray-400"
	>
		<p>© {new Date().getFullYear()} DevLog. All rights reserved.</p>
		<div class="mt-3 flex gap-4 sm:mt-0">
			<!-- <a href="https://github.com" target="_blank" class="hover:text-blue-500"><Github size="18" /></a> -->
		</div>
	</footer>
</div>
