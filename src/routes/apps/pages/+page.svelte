<script lang="ts">
  import { client } from "$lib/helpers/bridge";
  import { onMount } from "svelte";
  let user;
  async function getUser() {
    user = await client.get({ name: "user" });
  }
  async function setUser() {
    let user = { name: "user", data: { name: "jawad", password: "soemth", token: "fsd" } };
    const result = await client.set(user);
  }
  async function openModal() {
    user = await client.get({ name: "openModal" , data: {title: 'set name'}});
  }
  onMount(() => {
    user = window.parent.user;
  });
</script>

<div>
  <button on:click={getUser}> get users </button>
  <button on:click={setUser}> set user </button>
  <button on:click={openModal}> open modal </button>
  <br />
  name: {user?.name}
  <br />
  password: {user?.password}
  <br />
  email: {user?.email}
  <br />

  this is the pages app
</div>
