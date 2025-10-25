<script lang="ts">
	const { data } = $props();
	const { markdown, metadata } = data;
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
