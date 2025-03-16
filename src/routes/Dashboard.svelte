<script>
  import { onMount } from "svelte";
  import { user } from "../stores/authStore";
  import { db } from "../firebase";
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { navigate } from "svelte-routing";
  
  let yetimler = [];
  let loading = true;
  
  onMount(async () => {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!$user) {
      navigate("/login");
      return;
    }

    try {
      console.log("Kullanıcı durumu:", $user);
      const yetimsRef = collection(db, "yetimler");
      const q = query(yetimsRef, where("sorumlu", "==", $user.email));
      const querySnapshot = await getDocs(q);
      yetimler = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Yüklenen yetimler:", yetimler);
      console.log("Kullanıcı email:", $user.email);
    } catch (error) {
      console.error("Veri çekerken hata:", error);
      console.error("Hata detayı:", error.message);
    } finally {
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Yetim Takip Paneli</h1>
  
  {#if !$user}
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <p class="text-yellow-700">
        Lütfen giriş yapın.
      </p>
    </div>
  {:else if loading}
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p class="mt-4">Yükleniyor...</p>
    </div>
  {:else if yetimler.length === 0}
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <p class="text-yellow-700">
        Henüz size atanmış yetim bulunmamaktadır.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each yetimler as yetim}
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-2">{yetim.ad} {yetim.soyad}</h2>
          <div class="space-y-2">
            <p><span class="font-medium">Yaş:</span> {yetim.yas}</p>
            <p><span class="font-medium">Okul:</span> {yetim.okul}</p>
            <p><span class="font-medium">Sağlık Durumu:</span> {yetim.saglikDurum}</p>
            <p><span class="font-medium">Adres:</span> {yetim.adres}</p>
            <p><span class="font-medium">Veli Adı:</span> {yetim.veliAdi}</p>
            <p><span class="font-medium">Veli Telefon:</span> {yetim.veliTelefon}</p>
            <p><span class="font-medium">Son Kontrol:</span> {new Date(yetim.sonKontrol?.seconds * 1000).toLocaleDateString('tr-TR')}</p>
          </div>
          <div class="mt-4">
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Detayları Görüntüle
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div> 