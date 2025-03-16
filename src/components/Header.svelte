<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { navigate } from "svelte-routing";

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  }
</script>

<header class="bg-white shadow">
  <div class="flex justify-between items-center px-6 py-4">
    <h1 class="text-2xl font-bold text-gray-900">Yetim Takip Sistemi</h1>
    <div class="flex items-center space-x-4">
      <button
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        on:click={handleSignOut}
      >
        Çıkış Yap
      </button>
    </div>
  </div>
</header> 