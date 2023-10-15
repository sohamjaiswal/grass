<script lang="ts">
	import type { songsJSON } from "$lib/types/Spotify";
	import { SlideToggle } from "@skeletonlabs/skeleton";

	const offline = true;

	let nowPlaying: songsJSON | null = null

	$: nowPlaying

	let uploadStatus = false

	const testSong: songsJSON = {
	name: "夜に駆ける",
	album: {
		name: "THE BOOK",
		images: [
		{
			url: "https://th.bing.com/th/id/OIP.AnaXOLbg0j_gg9X586l5kAAAAA?pid=ImgDet&rs=1",
		},
		],
	},
	artists: [{ name: "YOASOBI" }],
	};

	if (offline) {
		nowPlaying = testSong
	}
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to GRASS.</h2>
		<section class="img-bg" />
		{#key nowPlaying}
			<!-- display song data -->
			{#if nowPlaying}
				<figure>
					{#if nowPlaying.album.images.length > 0}
						<img class="rounded-xl" src={nowPlaying.album.images[0].url} alt="Album Art" />
					{:else}
						<h1>
							🎶
						</h1>
					{/if}
					<figcaption class="mt-4">
						<h3 class="h3">{nowPlaying.name}</h3>
						<p class="text-secondary-400">
							{nowPlaying.artists[0].name} - {nowPlaying.album.name}
						</p>
					</figcaption>
				</figure>
				<div class="flex flex-col items-center">
					<SlideToggle name="uploadStatus" active="bg-secondary-400" bind:checked={uploadStatus} />
					<small>{uploadStatus ? "Uploading" : "Not uploading"} status to Guilded.</small>
				</div>
			{:else}
				<!-- message for nothing is playing -->
				<h3>Nothing is playing.</h3>
				{/if}
		{/key}
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] translate-y-3/4;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
