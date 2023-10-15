<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, Avatar, initializeStores, getDrawerStore, type DrawerSettings, Toast, Drawer } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import LoginWithGuilded from '$lib/components/loginWithGuilded.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { getSelf, logout, me } from '$lib/auth';
	initializeStores()
	
	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
	}

	// try to get self from using guilded creds in localstorage
	const cookies = localStorage.getItem("guildedCookies")
	$: user = $me
	const initialUserLoad = async() => {
		if (cookies) {
			await getSelf()
		} else {
			console.log("no cookies")
		}
	}
	initialUserLoad()
</script>

<Toast />

<Drawer position="right">
	<div class="flex flex-col h-full p-4 justify-between">
		<div class="flex flex-col gap-4 mt-4 items-center w-full">
			<a href="/">
				<h2>
					GRASS
				</h2>
			</a>
			{#if user?.user}
			<a href="profile" on:click={() => drawerStore.close()} >
			<div class="flex flex-col items-center w-full">
					<Avatar src={user.user.profilePictureLg} width="w-16" />
					<div class="flex gap-2 items-center mt-2">
						{user.user.name}
					</div>
				</div>
			</a>
			{/if}
			<hr class="w-2/3" />
			<a href="/tips" target="_blank" rel="noopener noreferrer">Tips</a>
			<a href="/leaderboard" target="_blank" rel="noopener noreferrer">Leaderboard</a>
			{#if user?.user}
			<a href="settings" on:click={() => drawerStore.close()}>
				Settings
			</a>
			<LightSwitch />
			<hr class="w-2/3" />
			<button class="btn variant-ghost-error mb-4" on:click={logout}>
				Logout
			</button>
			{:else}
			<hr class="w-2/3" />
				<LoginWithGuilded />
			{/if}
		</div>
		<footer class="flex flex-col gap-4 mt- items-center w-full">
			<hr class="w-2/3" />
			<p>
				Join our
				<a href="https://www.guilded.gg/i/EzrJGDdE" target="_blank">
					Guilded Server!
				</a>
			</p>
		</footer>
	</div>
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">Grass</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button on:click={() => drawerStore.open(drawerSettings)} class="btn">
					<iconify-icon icon="fa-solid:bars" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="flex flex-col gap-4 items-center mt-20">
		<slot />
	</div>
</AppShell>
