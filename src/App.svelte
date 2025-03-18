<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { auth } from "./firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import Register from "./routes/Register.svelte";
  import AdminPanel from "./routes/AdminPanel.svelte";
  import Donate from "./routes/Donate.svelte";
  
  export let url = "";
  let user = null;
  let loading = true;

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
      loading = false;
    });

    return () => unsubscribe();
  });
</script>

<Router {url}>
  {#if loading}
    <div class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  {:else}
   

    <main>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/donate" component={Donate} />
    </main>
  {/if}
</Router> 