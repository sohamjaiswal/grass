<script lang="ts">
  import {me} from "$lib/auth"
	import type { GuildedMe } from "$lib/types/GuildedMe";
	import { Avatar } from "@skeletonlabs/skeleton";
  $: user = $me as GuildedMe
</script>

<!-- Display card with user details like name, avatar, banner etc. -->

<div class="container card flex flex-col items-center gap-4 p-4 m-4">
  <h1>Profile</h1>
    <div class="flex flex-col items-center w-full">
      <Avatar src={user.user.profilePictureLg} width="w-16" />
      <div class="flex gap-2 items-center mt-2">
        {user.user.name}
      </div>
    </div>
</div>
