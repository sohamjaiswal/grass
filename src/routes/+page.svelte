<script lang="ts">
	import { restoreStatus, updateStatus, uploadImageFromLink } from "$lib/auth";
	import { getStatus } from "$lib/get-status";
	import type { UserStatus } from "$lib/types/GuildedMe";
	import type { songsJSON } from "$lib/types/Spotify";
	import { SlideToggle } from "@skeletonlabs/skeleton";

	const offline = true;

	let nowPlaying: songsJSON | null = null

	$: nowPlaying

	let uploadStatus = false

	let prevPollSong: songsJSON | null = null

	const testSong: songsJSON = {
	name: "夜に駆ける",
	album: {
		name: "THE BOOK",
		images: [
		{
			url: "https://img.guildedcdn.com/ContentMediaGenericFiles/8994c392e8e4caa000c1e94f603739f3-Full.webp",
		},
		],
	},
	artists: [{ name: "YOASOBI" }],
	};

	if (offline) {
		nowPlaying = testSong
	}

	let restored = false;
	const periodicCheck = async() => {
		if (nowPlaying && uploadStatus) {
			if (prevPollSong) {
				// json stringify it to compare without having memory reference as a param, as they are diff objects, it'll always be false otherwise
				if (JSON.stringify(prevPollSong) === JSON.stringify(nowPlaying)) {
					console.log("same song, did nothing")
					return null
				}
			}
			// upload image to guilded cdn
			let image = (await uploadImageFromLink(nowPlaying.album.images[0].url))?.url
			if (!image) {
				image = "https://img.guildedcdn.com/ContentMedia/a66d62f7476c5f7b63b6e16e3d77f23e-Full.webp?w=1200&h=1200"
			}
			const newStatus = getStatus("https://www.guilded.gg/i/2OOJz4Z2", `Listening to ${nowPlaying?.name} by ${nowPlaying?.artists[0].name}`, image)
			prevPollSong = nowPlaying
			updateStatus(newStatus)
			console.log("updated")
			restored = false
			return null
		} 
		if ((prevPollSong || prevPollSong === null) && !restored) {
			restoreStatus()
			console.log("restored")
			restored = true
		}
		console.log("not playing, restored, did nothing")
		return null
	}

	setInterval(periodicCheck, 10000)
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to GRASS.</h2>
		<section class="img-bg" />
		{#key nowPlaying}
			{#if nowPlaying}
				<figure>
					<div class="flex flex-col items-center">
						{#if nowPlaying.album.images.length > 0}
							<img class="rounded-xl aspect-square w-1/2" src={nowPlaying.album.images[0].url} alt="Album Art" />
						{:else}
							<h1>
								🎶
							</h1>
						{/if}
					</div>
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
