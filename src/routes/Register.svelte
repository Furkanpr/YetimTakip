<script>
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  import { navigate } from "svelte-routing";
  import Header from "../components/Header.svelte";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  let loading = false;

  async function handleRegister() {
    if (password !== confirmPassword) {
      error = "Şifreler eşleşmiyor.";
      return;
    }
    loading = true;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      error = "Kayıt sırasında bir hata oluştu: " + err.message;
    } finally {
      loading = false;
    }
  }
</script>

<Header />

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Hesap Oluştur</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Zaten bir hesabınız var mı?
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Giriş Yap</a>
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email adresi</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required bind:value={email} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email adresi" />
        </div>
        <div>
          <label for="password" class="sr-only">Şifre</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required bind:value={password} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Şifre" />
        </div>
        <div>
          <label for="confirm-password" class="sr-only">Şifreyi Onayla</label>
          <input id="confirm-password" name="confirm-password" type="password" required bind:value={confirmPassword} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Şifreyi Onayla" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Beni Hatırla</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Şifrenizi mi unuttunuz?</a>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
          {#if loading}
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Yükleniyor...</span>
          {:else}
            Kayıt Ol
          {/if}
        </button>
      </div>

      {#if error}
        <div class="text-red-500 text-sm mt-2">{error}</div>
      {/if}
    </form>
  </div>
</div> 