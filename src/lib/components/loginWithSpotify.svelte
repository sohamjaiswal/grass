<script lang="ts">
    import 'iconify-icon'
    import { invoke } from '@tauri-apps/api';
    import { type Event, listen } from "@tauri-apps/api/event";
	import { spotifyCreds } from '$lib/spotify-auth';

    let authWindow: Window | null = null;

    const handleLogin = async () => {
        const generateParams = async(window: Window) => {
            const clientId: string = await invoke("get_client_id");
            const port: number | string = await invoke("start_server");
            const scope =
                "streaming user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state user-read-recently-played";
            let params = new URLSearchParams({
                response_type: "code",
                client_id: clientId,
                redirect_uri: `http://localhost:${port}/`,
                scope: scope,
            });
            return params;
        } 
        const params = await generateParams(window);
        authWindow = open(
        `https://accounts.spotify.com/authorize?${params.toString()}`,
        "_blank",
        "width=600,height=800"
        );
    }

    listen("redirect_uri", (event: Event<string[]>) => {
      spotifyCreds.set({
        authenticated: true,
        token: event.payload[0],
        refresh_token: event.payload[1],
      })
      authWindow?.close();
    });

</script>
  
<button class="btn variant-ghost-surface flex gap-2" on:click={handleLogin}>
    <iconify-icon icon="fa-brands:spotify" />
    Login with Spotify
</button>