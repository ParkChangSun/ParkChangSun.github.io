<script lang="ts">
	const { data } = $props();
	let { markdown, toc, metadata } = $derived(data);

	const depth = ['', '', 'ml-2'];
</script>

<svelte:head>
	<title>{metadata.title} | Space_Minesweeper's blog</title>
	<meta name="description" content={metadata.description} />
	<meta name="author" content="Space_Minesweeper - Park Chang Sun" />
</svelte:head>

<!-- Get the latest one from: https://katex.org/docs/browser -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />

<ol class="sticky top-10 w-50 self-start rounded-xl border border-gray-400 p-3">
	{#each toc as c}
		<li class={depth[c.depth]}>
			<a class="transition hover:text-blue-500" href={`#${c.slug}`}>{c.value}</a>
		</li>
	{/each}
</ol>

<h1>{metadata.title}</h1>
<h1>{metadata.post_date}</h1>

<div class="prose max-w-none dark:prose-invert prose-a:no-underline">
	{@html markdown}
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
