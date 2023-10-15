<script lang="ts">
  import {me, saveCurrStatus, restoreStatus} from "$lib/auth"
	import type { GuildedMe } from "$lib/types/GuildedMe";
	import { Avatar } from "@skeletonlabs/skeleton";
  $: user = $me as GuildedMe
</script>

<!-- Display card with user details like name, avatar, banner etc. -->

<h1>Profile</h1>
<div class="container card flex flex-col items-center gap-4 p-4 m-4">
    <div class="flex flex-col items-center w-full">
      <Avatar src={user.user.profilePictureLg} width="w-16" />
      <div class="flex gap-2 items-center mt-2">
        {user.user.name}
      </div>
    </div>
    <button class="btn variant-ghost-surface" on:click={saveCurrStatus}>
			Save Current Status
		</button>
    <button class="btn variant-ghost-surface" on:click={restoreStatus}>
			Restore Status
		</button>
</div>
