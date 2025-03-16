<script>
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { navigate } from "svelte-routing";
  
  let email = "";
  let password = "";
  let error = "";
  
  async function handleLogin() {
    try {
      error = "";
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (e) {
      error = "Giriş yapılırken bir hata oluştu: " + e.message;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-green-800">
        Hesabınıza Giriş Yapın
      </h2>
      <p class="mt-2 text-center text-sm text-green-600">
        Yetim çocuklarımızı takip etmek için giriş yapın
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" class="sr-only">E-posta</label>
          <input
            bind:value={email}
            id="email"
            name="email"
            type="email"
            required
            class="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="E-posta adresi"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Şifre</label>
          <input
            bind:value={password}
            id="password"
            name="password"
            type="password"
            required
            class="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Şifre"
          />
        </div>
      </div>

      {#if error}
        <div class="bg-red-50 border-l-4 border-red-400 p-4">
          <p class="text-red-700 text-sm">{error}</p>
        </div>
      {/if}

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Giriş Yap
        </button>
      </div>
    </form>
  </div>
</div> 