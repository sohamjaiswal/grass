<script lang="ts">
	import { login } from '$lib/auth';

  let email = "";
  let password = "";

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    await login(email, password);
    window.location.href = "/";
  }
</script>

<form class="container card flex flex-col items-center gap-4 p-4 m-4" on:submit={handleSubmit}>
    <h1>Login</h1>
    <small>
      Use your Guilded credentials, GRASS does not store your data.
    </small>
    <input type="text" class="rounded" placeholder="Email" bind:value={email} />
    <input type="password" class="rounded" placeholder="Password" bind:value={password} />
    <button type="submit" class="variant-outline-surface">Login</button>
</form>
