<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { auth } from "./firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import Register from "./routes/Register.svelte";
  import AdminPanel from "./routes/AdminPanel.svelte";
  
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
    <nav class="bg-green-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <Link to="/" class="text-xl font-bold">Yetim Takip Sistemi</Link>
          </div>
          <div class="flex items-center space-x-4">
            {#if user}
              <Link to="/admin" class="hover:text-green-200">Admin Panel</Link>
            {:else}
              <Link to="/login" class="hover:text-green-200">Giriş Yap</Link>
              <Link to="/register" class="hover:text-green-200">Kayıt Ol</Link>
            {/if}
          </div>
        </div>
      </div>
    </nav>

    <main>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminPanel} />
    </main>
  {/if}
</Router> 