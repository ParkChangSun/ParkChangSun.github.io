<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	import DarkToggle from '$lib/components/DarkToggle.svelte';

	const { children } = $props();
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
			<a href="/posts" class="transition hover:text-blue-500">Blog</a>
			<DarkToggle />
		</nav>
	</header>

	<div class="flex grow">
		{@render children?.()}
	</div>

	<footer
		class="flex flex-col items-center justify-between border-t border-gray-200 px-8 py-6 text-sm text-gray-500 sm:flex-row dark:border-gray-700 dark:text-gray-400"
	>
		<p>© {new Date().getFullYear()} Space_Minesweeper. All rights reserved.</p>
		<a href="https://github.com/ParkChangSun/ParkChangSun.github.io"> Github</a>
	</footer>
</div>
