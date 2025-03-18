<script>
    import { signOut } from "firebase/auth";
    import { auth } from "../firebase";
    import { navigate, Link } from "svelte-routing";
  
    async function handleSignOut() {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Çıkış yaparken hata:", error);
      }
    }
  </script>
  
 

<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <div class="flex items-center">
        <Link to="/" class="flex items-center">
          <img src="public/yetimLogo.png" alt="Logo" class="h-16 w-auto rounded-full mr-4">
          <span class="text-2xl font-bold text-gray-800">Yetim Takip</span>
        </Link>
      </div>
      <div class="hidden md:flex items-center space-x-8">
        <a href="#hakkimizda" class="text-gray-800 hover:text-gray-600 font-medium">Hakkımızda</a>
        <a href="#galeri" class="text-gray-800 hover:text-gray-600 font-medium">Galeri</a>
        <a href="#haberler" class="text-gray-800 hover:text-gray-600 font-medium">Haberler</a>
        <a href="#iletisim" class="text-gray-800 hover:text-gray-600 font-medium">İletişim</a>
      </div>
      <div class="flex items-center space-x-4">
        <Link to="/login" class="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-200 font-semibold shadow-md">Giriş Yap</Link>
        <Link to="/register" class="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-200 font-semibold shadow-md">Kayıt Ol</Link>
      </div>
    </div>
  </div>
</nav> 