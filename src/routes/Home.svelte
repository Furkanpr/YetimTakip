<script>
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
  import Header from "../components/Header.svelte";
  import HelpOrphans from '../components/HelpOrphans.svelte';
  
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

<Header />

<div class="min-h-screen bg-white flex flex-col">
  <!-- Ana Bölüm -->
  <div class="relative pt-20">
    <div class="absolute inset-0">
      <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Yetim çocuklar">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-700/90"></div>
    </div>
    <div class="relative min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Yetim Takip Sistemi
        </h1>
        <p class="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
          Yetimlerin eğitim, sağlık ve genel durumlarını takip etmek için tasarlanmış kapsamlı bir platform.
        </p>
        <div class="mt-10 flex justify-center space-x-4">
          <a href="/login" class="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200">
            Sisteme Giriş Yap
          </a>
         
          <a href="/donate" class="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200">
            Destek Ol
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- İstatistikler -->
  {#if !loading}
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div class="bg-gradient-to-br from-green-100 to-green-200 overflow-hidden shadow-lg rounded-2xl border border-gray-200">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-200 rounded-xl p-4">
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

          <div class="bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden shadow-lg rounded-2xl border border-gray-200">
            <div class="p-8">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-200 rounded-xl p-4">
                  <svg class="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-6">
                  <h3 class="text-2xl font-medium text-gray-900">Toplam Sorumlu</h3>
                  <div class="mt-2 text-5xl font-bold text-blue-600">{sorumluSayisi}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}


  <!-- Sidebar -->



 <!-- Ekstra İçerik -->
 <div class="py-20 bg-primary/10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <HelpOrphans message="Yetimlere destek olmak, onların geleceğine ışık tutmaktır. Birlikte umut olalım." />
    <div class="mt-16 text-center bg-slate-100 rounded-lg p-10">
      <h2 class="text-3xl font-extrabold text-gray-900">Birlikte Umut Olalım</h2>
      <p class="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
        Yetim çocuklar sadece sevgi ve ilgiye değil, aynı zamanda güçlü bir geleceğe de ihtiyaç duyarlar. 
        Onlara eğitim, sağlık ve güvenli bir yaşam sunmak için el ele verelim. Küçük bir destek, büyük bir değişim yaratabilir.
      </p>
      <div class="mt-8 flex justify-center">
        <a href="/donate" class="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-green-700 transition-all">
          Destek Ol
        </a>
      </div>
    </div>
  </div>
</div>

  <!-- Galeri -->
  <div id="galeri" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Galeri</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="Yetim 1" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1" alt="Yetim 2" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg group">
          <div class="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1530023367847-4b8b0e4c6e8a" alt="Yetim 3" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
            <div class="text-sm text-gray-600 font-medium">12 Mart 2024</div>
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
            <div class="text-sm text-gray-600 font-medium">10 Mart 2024</div>
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
            <div class="text-sm text-gray-600 font-medium">8 Mart 2024</div>
            <h3 class="mt-2 text-xl font-semibold text-gray-900">Yeni Gönüllülerimiz Aramızda</h3>
            <p class="mt-3 text-gray-600">Sistemimize yeni katılan gönüllülerimizle büyümeye devam ediyoruz...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-2">
          <div class="flex items-center">
            <img src="/yetimLogoWeb.png" alt="Logo" class="h-12 w-auto mr-3">
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
      <div class="mt-8 pt-8 border-t border-gray-700 text-center">
        <p class="text-gray-300">EnderunSoft tarafından geliştirilmiştir. © 2024 Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>
</div> 