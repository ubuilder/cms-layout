<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { server } from "$lib/helpers/bridge";
  let user = {
    name: "jawad",
    password: "abc",
    token: 'something'
  };
  let dialog
  let dialogData = {}
  onMount(() => {
    server.listen((event)=>{
        if(event.data.name == "init"){
            server.respond(event, user)
        }else if (event.data.name == "user"){
            server.respond(event, user)
        }else if (event.data.name == "set_user"){
            user = event.data.data
            server.respond(event, {success : true})
        }else if (event.data.name == "openModal"){
            dialogData = event.data.data
            dialog.showModal()
            server.respond(event, {message: "success"})
        }
    })
    window.user = user
})
  $: console.log("user change", user)
</script>

Ubuilder layout
<br />
name: {user.name}
<br />

password: {user.password}
<br />

email: {user.email}
<br />

<select bind:value={user.name}>
  <option value="jawad">jawad</option>
  <option value="haki">haki</option>
  <option value="ediris">ediris</option>
</select>


<iframe src={"/apps/" + $page.params.url} />


<dialog bind:this ={dialog}  >
    {#if dialogData.title}
    <div>{dialogData.title}</div>
    {/if}
    {#if dialogData.body}
    <div>{dialogData.body}</div>
    {/if}
    <div>
        <button on:click={dialog.close()}>
            close
        </button>
    </div>
</dialog>