<script>
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
  import { Link } from "svelte-routing";
  
  let yetimSayisi = 0;
  let sorumluSayisi = 0;
  let loading = true;

  onMount(async () => {
    try {
      const [yetimsSnapshot, sorumlularSnapshot] = await Promise.all([
        getDocs(collection(db, "yetimler")),
        getDocs(collection(db, "users"))
      ]);
      
      yetimSayisi = yetimsSnapshot.docs.length;
      sorumluSayisi = sorumlularSnapshot.docs.length;
    } catch (error) {
      console.error("Veri yüklenirken hata:", error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="min-h-screen bg-white flex flex-col">
  <!-- Üst Menü -->
  <nav class="bg-gradient-to-r from-green-400 to-green-500 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center">
          <Link to="/" class="flex items-center">
            <img src="public/yetimLogo.png" alt="Logo" class="h-16 w-auto rounded-full mr-4">
            <span class="text-2xl font-bold text-white">Yetim Takip</span>
          </Link>
          <div class="hidden md:block ml-12">
            <div class="flex items-center space-x-8">
              <a href="#hakkimizda" class="text-white hover:text-green-200 font-medium">Hakkımızda</a>
              <a href="#galeri" class="text-white hover:text-green-200 font-medium">Galeri</a>
              <a href="#haberler" class="text-white hover:text-green-200 font-medium">Haberler</a>
              <a href="#iletisim" class="text-white hover:text-green-200 font-medium">İletişim</a>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <Link to="/login" class="bg-white text-green-700 px-8 py-3 rounded-full hover:bg-green-50 transition-colors duration-200 font-semibold shadow-md">Giriş Yap</Link>
        </div>
      </div>
    </div>
  </nav>

  <!-- Ana Bölüm -->
  <div class="relative pt-20">
    <div class="absolute inset-0">
      <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Yetim çocuklar">
      <div class="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90"></div>
    </div>
    <div class="relative min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Yetim Takip Sistemi
        </h1>
        <p class="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
          Yetimlerin eğitim, sağlık ve genel durumlarını takip etmek için tasarlanmış kapsamlı bir platform.
        </p>
        <div class="mt-10">
          <Link to="/login" class="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-green-600 hover:border-green-600 transition-colors duration-200">
            Sisteme Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  </div>

  <!-- İstatistikler -->
  {#if !loading}
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div class="bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden shadow-lg rounded-2xl border border-green-100">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-100 rounded-xl p-4">
                  <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="ml-6">
                  <h3 class="text-2xl font-medium text-gray-900">Toplam Yetim</h3>
                  <div class="mt-2 text-5xl font-bold text-green-600">{yetimSayisi}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden shadow-lg rounded-2xl border border-green-100">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-100 rounded-xl p-4">
                  <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-6">
                  <h3 class="text-2xl font-medium text-gray-900">Toplam Sorumlu</h3>
                  <div class="mt-2 text-5xl font-bold text-green-600">{sorumluSayisi}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Ekstra İçerik -->
  <div class="py-20 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Ekstra İçerik</h2>
      <p class="text-lg text-gray-700 text-center">Yetimlerin hayatlarını iyileştirmek için yaptığımız çalışmalar hakkında daha fazla bilgi edinin.</p>
    </div>
  </div>

  <!-- Galeri -->
  <div id="galeri" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Galeri</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1597476934600-ef660b4ce617" alt="Yetim 1" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6 bg-white">
            <h3 class="text-xl font-semibold text-gray-900">Eğitim Desteği</h3>
            <p class="mt-2 text-gray-600">Her çocuğun eğitim hakkını destekliyoruz.</p>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce" alt="Yetim 2" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6 bg-white">
            <h3 class="text-xl font-semibold text-gray-900">Sağlık Hizmetleri</h3>
            <p class="mt-2 text-gray-600">Düzenli sağlık kontrolleri sağlıyoruz.</p>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1599059813109-3c1544f69cd5" alt="Yetim 3" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6 bg-white">
            <h3 class="text-xl font-semibold text-gray-900">Sosyal Aktiviteler</h3>
            <p class="mt-2 text-gray-600">Sosyal gelişim için etkinlikler düzenliyoruz.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Haberler -->
  <div id="haberler" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Son Haberler</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixlib=rb-4.0.3" alt="Haber 1" class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6">
            <div class="text-sm text-green-600 font-medium">12 Mart 2024</div>
            <h3 class="mt-2 text-xl font-semibold text-gray-900">Yeni Eğitim Programı Başladı</h3>
            <p class="mt-3 text-gray-600">Yetimlerimiz için yeni eğitim programımız başarıyla başladı...</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3" alt="Haber 2" class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6">
            <div class="text-sm text-green-600 font-medium">10 Mart 2024</div>
            <h3 class="mt-2 text-xl font-semibold text-gray-900">Sağlık Taramaları Tamamlandı</h3>
            <p class="mt-3 text-gray-600">Aylık düzenli sağlık taramalarımız başarıyla tamamlandı...</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-4.0.3" alt="Haber 3" class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="p-6">
            <div class="text-sm text-green-600 font-medium">8 Mart 2024</div>
            <h3 class="mt-2 text-xl font-semibold text-gray-900">Yeni Gönüllülerimiz Aramızda</h3>
            <p class="mt-3 text-gray-600">Sistemimize yeni katılan gönüllülerimizle büyümeye devam ediyoruz...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-green-800 to-green-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-2">
          <div class="flex items-center">
            <img src="public/yetimLogoWeb.png" alt="Logo" class="h-12 w-auto mr-3">
            <span class="text-xl font-bold">Yetim Takip</span>
          </div>
          <p class="mt-4 text-gray-300 max-w-md">
            Yetimlerin eğitim ve sağlık durumlarını takip etmek, onların ihtiyaçlarını karşılamak ve
            hayatlarını kolaylaştırmak için çalışıyoruz.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">İletişim</h3>
          <ul class="space-y-3 text-gray-300">
            <li>Email: info@yetimsistemi.com</li>
            <li>Tel: +90 555 123 4567</li>
            <li>Adres: Ankara, Türkiye</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Bağlantılar</h3>
          <ul class="space-y-3">
            <li><a href="#hakkimizda" class="text-gray-300 hover:text-white">Hakkımızda</a></li>
            <li><a href="#galeri" class="text-gray-300 hover:text-white">Galeri</a></li>
            <li><a href="#haberler" class="text-gray-300 hover:text-white">Haberler</a></li>
            <li><a href="#iletisim" class="text-gray-300 hover:text-white">İletişim</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-green-700 text-center">
        <p class="text-gray-300">EnderunSoft tarafından geliştirilmiştir. © 2024 Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>
</div> 