<script lang="ts">
	const { data } = $props();
	let { markdown, metadata } = $derived(data);
</script>

<svelte:head>
	<title>{metadata.title} | Space_Minesweeper's blog</title>
	<meta name="description" content={metadata.description} />
	<meta name="author" content="Space_Minesweeper - Park Chang Sun" />
</svelte:head>

<!-- Get the latest one from: https://katex.org/docs/browser -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />

<div class="prose max-w-none dark:prose-invert">
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
