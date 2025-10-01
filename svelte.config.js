import adapter from '@sveltejs/adapter-static';
import {mdsvex} from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
	},
	preprocess: [mdsvex({
		extensions: ['.md']
	})],
	extensions: ['.svelte', '.md']
};

export default config;