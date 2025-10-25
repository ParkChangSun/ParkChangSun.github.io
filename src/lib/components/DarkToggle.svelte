<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		dark =
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}
</script>

<button
	onclick={toggle}
	class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl hover:bg-gray-400"
>
	{#if dark}
		<Moon />
	{:else}
		<Sun />
	{/if}
</button>
