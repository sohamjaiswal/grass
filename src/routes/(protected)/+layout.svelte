<script lang="ts">
  import {me} from '$lib/auth'

  $: user = $me
</script>

{#if user}
  <slot />
{:else}
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">GRASS</h1>
    <p class="text-xl">Login with Guilded to continue</p>
    <a href="/login">
      <button class="btn variant-ghost-surface flex gap-2">
        <iconify-icon icon="fa-brands:guilded" />
        Login with Guilded
      </button>
    </a>
  </div>
{/if}