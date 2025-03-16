<script>
  export let activeTab;
  export let sidebarOpen = true;
</script>

<div class="{sidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 ease-in-out">
  <div class="p-4">
    <div class="flex items-center justify-between">
      <h2 class="{sidebarOpen ? 'block' : 'hidden'} text-xl font-bold">Admin Panel</h2>
      <button on:click={() => sidebarOpen = !sidebarOpen} class="p-2 rounded hover:bg-green-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>
  
  <nav class="mt-8">
    <button
      class="w-full flex items-center px-4 py-3 {activeTab === 'dashboard' ? 'bg-green-700' : 'hover:bg-green-700'}"
      on:click={() => activeTab = 'dashboard'}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span class="{sidebarOpen ? 'ml-3' : 'hidden'}">Gösterge Paneli</span>
    </button>
    
    <button
      class="w-full flex items-center px-4 py-3 {activeTab === 'yetimler' ? 'bg-green-700' : 'hover:bg-green-700'}"
      on:click={() => activeTab = 'yetimler'}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <span class="{sidebarOpen ? 'ml-3' : 'hidden'}">Yetimler</span>
    </button>
    
    <button
      class="w-full flex items-center px-4 py-3 {activeTab === 'sorumlular' ? 'bg-green-700' : 'hover:bg-green-700'}"
      on:click={() => activeTab = 'sorumlular'}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="{sidebarOpen ? 'ml-3' : 'hidden'}">Sorumlular</span>
    </button>
    
    <button
      class="w-full flex items-center px-4 py-3 {activeTab === 'yeniYetim' ? 'bg-green-700' : 'hover:bg-green-700'}"
      on:click={() => activeTab = 'yeniYetim'}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="{sidebarOpen ? 'ml-3' : 'hidden'}">Yeni Yetim Ekle</span>
    </button>
  </nav>
</div> 