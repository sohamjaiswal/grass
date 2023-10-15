// import { Body, fetch } from '@tauri-apps/api/http'
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import type { SpotifyToken } from './types/Spotify';

export const spotifyCreds: Writable<SpotifyToken> = localStorageStore("spotifyCreds", {
    authenticated: false,
    token: "",
    refresh_token: ""
})


