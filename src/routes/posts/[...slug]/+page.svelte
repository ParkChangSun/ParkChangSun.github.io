<script lang="ts">
	import { Calendar, CalendarSync, ChevronsUp, ListTree, Tags, X } from '@lucide/svelte';

	const { data } = $props();
	let { markdown, toc, metadata } = $derived(data);

	const depth = ['', '', 'ml-2'];

	let tocToggle = $state(false);
</script>

<svelte:head>
	<title>{metadata.title} | Space_Minesweeper's blog</title>
	<meta name="author" content="Space_Minesweeper - Park Chang Sun" />
</svelte:head>

<!-- Get the latest one from: https://katex.org/docs/browser -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />

<div class="mx-auto max-w-3xl">
	<div class="flex gap-3 py-5 text-gray-500 dark:text-gray-400">
		<div class="flex">
			<Calendar />
			<p>{metadata.post_date}</p>
		</div>
		<div class="flex">
			<CalendarSync />
			<p>{metadata.edit_date}</p>
		</div>
		<div class="flex">
			<Tags />
			<p>{metadata.tags}</p>
		</div>
	</div>

	<div class="fixed right-12 bottom-12 flex flex-col gap-1">
		<aside
			class={`flex flex-col rounded-lg border border-gray-400 p-3 text-sm ${tocToggle ? 'block' : 'hidden'}`}
		>
			{#each toc as c}
				<a class={`transition hover:text-blue-500 ${depth[c.depth]}`} href={`#${c.slug}`}>
					{c.value}
				</a>
			{/each}
		</aside>
		<div class="ml-auto flex">
			<button
				class="rounded-l-lg border p-1 hover:cursor-pointer"
				onclick={() => (tocToggle = !tocToggle)}
			>
				{#if tocToggle}
					<X />
				{:else}
					<ListTree />
				{/if}
			</button>
			<button
				class="rounded-r-lg border p-1 hover:cursor-pointer"
				onclick={() => window.scrollTo(0, 0)}
			>
				<ChevronsUp />
			</button>
		</div>
	</div>

	<main class="prose max-w-none dark:prose-invert prose-a:no-underline">
		{@html markdown}
	</main>
</div>

<style lang="postcss">
	.prose :global {
		code[data-line-numbers] {
			counter-reset: line;
		}

		code[data-line-numbers] > [data-line]::before {
			counter-increment: line;
			content: counter(line);

			display: inline-block;
			width: 0.75rem;
			margin-right: 1.25rem;
			text-align: right;
			color: gray;
		}

		code[data-line-numbers-max-digits='2'] > [data-line]::before {
			width: 1.25rem;
		}

		code[data-line-numbers-max-digits='3'] > [data-line]::before {
			width: 1.75rem;
		}
	}
</style>
