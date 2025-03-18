<script>
import Header from "../components/Header.svelte";
let donationAmount = '';
  let donationType = '';

  function handleDonate(type, amount) {
    alert(`Bağış yapıldı: ${amount} TL, Tür: ${type}`);
  }
</script>
<Header />

<div class="min-h-screen bg-gray-100 py-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-center mb-10">Bağış Yap</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://via.placeholder.com/400x200" alt="Yetim (Yeni Sponsorluk)" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">Yetim (Yeni Sponsorluk)</h2>
          <p class="text-gray-700 mb-4">Yeni bir yetime sponsor olarak onların hayatında fark yaratın.</p>
          <button on:click={() => handleDonate('Yeni Sponsorluk', 100)} class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Sponsor Ol
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://via.placeholder.com/400x200" alt="Yetim (Mevcut Sponsorluk)" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">Yetim (Mevcut Sponsorluk)</h2>
          <p class="text-gray-700 mb-4">Mevcut bir yetime destek olmaya devam edin.</p>
          <input type="number" bind:value={donationAmount} placeholder="Bağış Miktarı (TL)" class="w-full p-2 border border-gray-300 rounded mb-4" />
          <button on:click={() => handleDonate('Mevcut Sponsorluk', donationAmount)} class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Bağış Yap
          </button>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://via.placeholder.com/400x200" alt="Yetimlerin Sofrasına Neşe Katın" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">Yetimlerin Sofrasına Neşe Katın</h2>
          <p class="text-gray-700 mb-4">Yetimlerin sofralarına neşe katmak için bağış yapın.</p>
          <input type="number" bind:value={donationAmount} placeholder="Bağış Miktarı (TL)" class="w-full p-2 border border-gray-300 rounded mb-4" />
          <button on:click={() => handleDonate('Sofra Neşe', donationAmount)} class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Bağış Yap
          </button>
        </div>
      </div>
    </div>
  </div>
</div> 