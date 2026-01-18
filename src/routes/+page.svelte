<script lang="ts">
	const pseudoClasses =
		'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
		'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before';

	const glitch =
		"after:text-shadow-[-5px_0_red] after:absolute after:top-0 after:left-[10px] after:animate-glitch-after after:overflow-hidden after:bg-[#060010] after:text-white after:content-['hello'] " +
		"before:text-shadow-[5px_0_cyan] before:absolute before:top-0 before:left-[-10px] before:animate-glitch-before before:overflow-hidden before:bg-[#060010] before:text-white before:content-['hello'] ";
</script>

<svelte:head>
	<title>Space_Minesweeper's blog</title>
</svelte:head>

<div>
	<h1 class={`relative text-9xl font-black text-white ${glitch}`}>hello</h1>

	<h1>Welcome to Space_Minesweeper's blog!</h1>

	https://minesweeper.online/player/7098734
</div>
