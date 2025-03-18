<script>
  import { onMount } from "svelte";
  import { db, auth } from "../firebase";
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
  import { signOut } from "firebase/auth";
  import { navigate } from "svelte-routing";
  import Sidebar from "../components/Sidebar.svelte";
  
  let activeTab = "dashboard";
  let yetimler = [];
  let sorumlular = [];
  let loading = true;
  let sidebarOpen = true;
  
  let yeniYetim = {
    ad: "",
    soyad: "",
    yas: "",
    okul: "",
    saglikDurumu: "İyi",
    sorumlu: "",
    adres: "",
    veliAdi: "",
    veliTelefon: "",
    notlar: "",
    foto: ""
  };

  let istatistikler = {
    toplamYetim: 0,
    aktifSorumlu: 0,
    bekleyenYetim: 0,
    saglikSorunuOlan: 0
  };

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  }
  
  onMount(async () => {
    await loadData();
  });
  
  async function loadData() {
    try {
      const yetimsRef = collection(db, "yetimler");
      const sorumlularRef = collection(db, "users");
      
      const [yetimsSnapshot, sorumlularSnapshot] = await Promise.all([
        getDocs(yetimsRef),
        getDocs(sorumlularRef)
      ]);
      
      yetimler = yetimsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      sorumlular = sorumlularSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      istatistikler = {
        toplamYetim: yetimler.length,
        aktifSorumlu: sorumlular.length,
        bekleyenYetim: yetimler.filter(y => !y.sorumlu).length,
        saglikSorunuOlan: yetimler.filter(y => y.saglikDurumu === "Kötü").length
      };
    } catch (error) {
      console.error("Veri yüklenirken hata:", error);
    } finally {
      loading = false;
    }
  }
  
  async function yetimEkle() {
    try {
      const yetimsRef = collection(db, "yetimler");
      await addDoc(yetimsRef, {
        ...yeniYetim,
        sonKontrol: new Date(),
        kayitTarihi: new Date()
      });
      await loadData();
      yeniYetim = {
        ad: "",
        soyad: "",
        yas: "",
        okul: "",
        saglikDurumu: "İyi",
        sorumlu: "",
        adres: "",
        veliAdi: "",
        veliTelefon: "",
        notlar: "",
        foto: ""
      };
    } catch (error) {
      console.error("Yetim eklenirken hata:", error);
    }
  }
  
  async function yetimSil(id) {
    if (confirm("Bu yetimi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "yetimler", id));
        await loadData();
      } catch (error) {
        console.error("Yetim silinirken hata:", error);
      }
    }
  }
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar bind:activeTab bind:sidebarOpen />

  <div class="flex-1 flex flex-col overflow-hidden">

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
      <!-- İstatistik Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Toplam Yetim</dt>
                  <dd class="text-lg font-semibold text-gray-900">{istatistikler.toplamYetim}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Aktif Sorumlu</dt>
                  <dd class="text-lg font-semibold text-gray-900">{istatistikler.aktifSorumlu}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Bekleyen Yetim</dt>
                  <dd class="text-lg font-semibold text-gray-900">{istatistikler.bekleyenYetim}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Sağlık Sorunu</dt>
                  <dd class="text-lg font-semibold text-gray-900">{istatistikler.saglikSorunuOlan}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {#if loading}
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p class="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      {:else}
        <!-- Yeni Yetim Ekleme Formu -->
        {#if activeTab === 'yeniYetim'}
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-6">Yeni Yetim Ekle</h2>
            <form on:submit|preventDefault={yetimEkle} class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Ad</label>
                  <input
                    type="text"
                    bind:value={yeniYetim.ad}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Soyad</label>
                  <input
                    type="text"
                    bind:value={yeniYetim.soyad}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Yaş</label>
                  <input
                    type="number"
                    bind:value={yeniYetim.yas}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Okul</label>
                  <input
                    type="text"
                    bind:value={yeniYetim.okul}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Sağlık Durumu</label>
                  <select
                    bind:value={yeniYetim.saglikDurumu}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="İyi">İyi</option>
                    <option value="Orta">Orta</option>
                    <option value="Kötü">Kötü</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Sorumlu</label>
                  <select
                    bind:value={yeniYetim.sorumlu}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Seçiniz...</option>
                    {#each sorumlular as sorumlu}
                      <option value={sorumlu.email}>{sorumlu.ad} {sorumlu.soyad}</option>
                    {/each}
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Adres</label>
                  <textarea
                    bind:value={yeniYetim.adres}
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Veli Adı</label>
                  <input
                    type="text"
                    bind:value={yeniYetim.veliAdi}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Veli Telefon</label>
                  <input
                    type="tel"
                    bind:value={yeniYetim.veliTelefon}
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Notlar</label>
                  <textarea
                    bind:value={yeniYetim.notlar}
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Yetim Ekle
                </button>
              </div>
            </form>
          </div>
        {/if}

        <!-- Yetimler Listesi -->
        {#if activeTab === 'yetimler'}
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yaş</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Okul</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sağlık Durumu</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sorumlu</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each yetimler as yetim}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{yetim.ad} {yetim.soyad}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{yetim.yas}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{yetim.okul}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        {yetim.saglikDurumu === 'İyi' ? 'bg-green-100 text-green-800' : 
                         yetim.saglikDurumu === 'Orta' ? 'bg-yellow-100 text-yellow-800' : 
                         'bg-red-100 text-red-800'}">
                        {yetim.saglikDurumu}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{yetim.sorumlu}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        class="text-red-600 hover:text-red-900"
                        on:click={() => yetimSil(yetim.id)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}

        <!-- Sorumlular Listesi -->
        {#if activeTab === 'sorumlular'}
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sorumlu Olduğu Yetim Sayısı</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each sorumlular as sorumlu}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{sorumlu.ad} {sorumlu.soyad}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sorumlu.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {yetimler.filter(y => y.sorumlu === sorumlu.email).length}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}

        <!-- Gösterge Paneli -->
        {#if activeTab === 'dashboard'}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Son Eklenen Yetimler -->
            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Son Eklenen Yetimler</h3>
              <div class="space-y-4">
                {#each yetimler.slice(0, 5) as yetim}
                  <div class="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-sm font-medium text-gray-900">{yetim.ad} {yetim.soyad}</p>
                        <p class="text-sm text-gray-500">{yetim.okul}</p>
                      </div>
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        {yetim.saglikDurumu === 'İyi' ? 'bg-green-100 text-green-800' : 
                         yetim.saglikDurumu === 'Orta' ? 'bg-yellow-100 text-yellow-800' : 
                         'bg-red-100 text-red-800'}">
                        {yetim.saglikDurumu}
                      </span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Sağlık Durumu Dağılımı -->
            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Sağlık Durumu Dağılımı</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-green-600 h-2.5 rounded-full" style="width: {(yetimler.filter(y => y.saglikDurumu === 'İyi').length / yetimler.length * 100)}%"></div>
                  </div>
                  <span class="ml-2 text-sm text-gray-500">İyi ({yetimler.filter(y => y.saglikDurumu === 'İyi').length})</span>
                </div>
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-yellow-600 h-2.5 rounded-full" style="width: {(yetimler.filter(y => y.saglikDurumu === 'Orta').length / yetimler.length * 100)}%"></div>
                  </div>
                  <span class="ml-2 text-sm text-gray-500">Orta ({yetimler.filter(y => y.saglikDurumu === 'Orta').length})</span>
                </div>
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-red-600 h-2.5 rounded-full" style="width: {(yetimler.filter(y => y.saglikDurumu === 'Kötü').length / yetimler.length * 100)}%"></div>
                  </div>
                  <span class="ml-2 text-sm text-gray-500">Kötü ({yetimler.filter(y => y.saglikDurumu === 'Kötü').length})</span>
                </div>
              </div>
            </div>
          </div>
        {/if}
      {/if}
    </main>
  </div>
</div> 