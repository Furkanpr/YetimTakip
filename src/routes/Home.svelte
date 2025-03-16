<script>
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
  
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

<div class="min-h-screen bg-gray-100">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-green-800 mb-8">Yetim Takip Sistemine Hoş Geldiniz</h1>
      <p class="text-xl text-gray-600 mb-12">Yetimlere destek olmak için buradayız</p>
    </div>

    {#if loading}
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5">
                <h3 class="text-lg font-medium text-gray-900">Toplam Yetim</h3>
                <div class="mt-1 text-3xl font-semibold text-green-600">{yetimSayisi}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-5">
                <h3 class="text-lg font-medium text-gray-900">Toplam Sorumlu</h3>
                <div class="mt-1 text-3xl font-semibold text-blue-600">{sorumluSayisi}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Sistemin Amacı</h2>
        <div class="prose max-w-none">
          <p class="text-gray-600">
            Yetim Takip Sistemi, yetimlerin eğitim, sağlık ve genel durumlarını takip etmek,
            onlara destek olmak ve hayatlarını kolaylaştırmak için tasarlanmış bir platformdur.
            Sistem üzerinden:
          </p>
          <ul class="mt-4 space-y-2 text-gray-600">
            <li>• Yetimlerin düzenli takibini yapabilir</li>
            <li>• Sağlık durumlarını kontrol edebilir</li>
            <li>• Eğitim süreçlerini izleyebilir</li>
            <li>• Sorumluların koordinasyonunu sağlayabilirsiniz</li>
          </ul>
        </div>
      </div>
    {/if}
  </div>
</div> 