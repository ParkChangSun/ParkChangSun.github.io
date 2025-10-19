<script lang="ts">
	const { data } = $props();
	const { markdown, metadata } = data;
</script>

<svelte:head>
	<title>{metadata.title}</title>
</svelte:head>

<!-- Get the latest one from: https://katex.org/docs/browser -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />

{@html markdown}
