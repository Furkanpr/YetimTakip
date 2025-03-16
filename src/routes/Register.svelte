<script>
  import { auth } from "../firebase";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { navigate } from "svelte-routing";
  
  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  
  async function handleRegister() {
    try {
      error = "";
      if (password !== confirmPassword) {
        error = "Şifreler eşleşmiyor";
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (e) {
      error = "Kayıt olurken bir hata oluştu: " + e.message;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-green-800">
        Yeni Hesap Oluştur
      </h2>
      <p class="mt-2 text-center text-sm text-green-600">
        Yetim takip sistemine katılmak için kayıt olun
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
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
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Şifre"
          />
        </div>
        <div>
          <label for="confirmPassword" class="sr-only">Şifre Tekrar</label>
          <input
            bind:value={confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            class="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Şifre Tekrar"
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
            <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </span>
          Kayıt Ol
        </button>
      </div>
    </form>
  </div>
</div> 