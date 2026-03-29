/* ================================================================
   1. BHAJANA DATA (Database of Songs)
   ================================================================
   Note: IDs must be unique. Files should be in a folder named 'lyrics'.
*/
window.bhajanaData = {
    purandara: {
        name: "Purandara Dasaru",
        songs: [
            { id: "p1", title: "Pandarapura", file: "lyrics/purandara-ramamantrava-japiso.txt" },
            { id: "p2", title: "Jagadoddharana", file: "lyrics/purandara-jagadodharana.txt" },
            { id: "p3", title: "Gajavadana Beduve", file: "lyrics/p3.txt" }
        ]
    },
    vijaya: {
        name: "Vijaya Dasaru",
        songs: [
            { id: "v1", title: "Pavamana Pavamana", file: "lyrics/vijaya-pavamana.txt" },
            { id: "v2", title: "Vijayadasara Kavacha", file: "lyrics/vijaya-smarisi.txt" }
        ]
    },
	jagannatha: {
        name: "Jagannatha Dasaru",
        songs: [
            { id: "v1", title: "Pavamana Pavamana", file: "lyrics/vijaya-pavamana.txt" },
            { id: "v2", title: "Vijayadasara Kavacha", file: "lyrics/v2.txt" }
        ]
    },
	gopala: {
        name: "Gopala Dasaru",
        songs: [
            { id: "v1", title: "Pavamana Pavamana", file: "lyrics/vijaya-pavamana.txt" },
            { id: "v2", title: "Vijayadasara Kavacha", file: "lyrics/gopala-barayyababa.txt" }
        ]
    },
    kanaka: {
        name: "Kanaka Dasaru",
        songs: [
            { id: "k1", title: "Bagilanu Teredu", file: "lyrics/kanaka-ishaninna.txt.txt" }
        ]
    },
	prasanna: {
        name: "Prasanna Venkata Dasaru",
        songs: [
            { id: "k1", title: "Bagilanu Teredu", file: "lyrics/prasanna-yentha-srimantha.txt" }
        ]
    },
	others: {
        name: "others",
        songs: [
            { id: "k1", title: "Bagilanu Teredu", file: "lyrics/k1.txt" }
        ]
    }
};

/* --- Global State for Bhajana --- */
window.activeBhajanaCategory = "purandara";
window.activeSongId = null;

/* ================================================================
   2. BHAJANA RENDERER
   ================================================================
*/
async function renderBhajanaUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // View 1: Detailed Song Lyrics (Fetching from external .txt file)
    if (window.activeSongId) {
        const cat = window.bhajanaData[window.activeBhajanaCategory];
        const song = cat.songs.find(s => s.id === window.activeSongId);
        
        // Loading Placeholder
        area.innerHTML = `
            <div class="flex flex-col items-center justify-center p-20 text-orange-800 animate-pulse">
                <i class="fa-solid fa-spinner fa-spin text-3xl mb-4"></i>
                <p class="font-bold">Fetching Lyrics...</p>
            </div>`;

        try {
            const response = await fetch(song.file);
            if (!response.ok) throw new Error("File not found");
            const lyrics = await response.text();

            area.innerHTML = `
                <div class="animate-fade-in">
                    <button onclick="closeSong()" class="mb-6 text-orange-700 font-bold flex items-center gap-2 hover:text-orange-900 transition-all active:scale-95">
                        <i class="fa-solid fa-circle-arrow-left text-xl"></i> Back to ${cat.name}
                    </button>

                    <div class="bg-white border border-orange-100 rounded-3xl p-6 md:p-10 shadow-sm border-t-8 border-t-orange-500">
                        <h2 class="text-3xl font-black text-orange-900 mb-6 border-b border-orange-100 pb-4 italic">
                            ${song.title}
                        </h2>
                        <div class="stotra-content whitespace-pre-wrap italic text-lg md:text-xl leading-relaxed text-gray-800">
                            ${lyrics}
                        </div>
                    </div>
                    <div class="py-10 text-center text-gray-400 text-xs">End of Lyrics</div>
                </div>
            `;
        } catch (err) {
            area.innerHTML = `
                <div class="p-10 text-center">
                    <i class="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-4"></i>
                    <p class="text-red-600 font-bold mb-6">Lyrics for "${song.title}" are currently unavailable.</p>
                    <button onclick="closeSong()" class="top-btn active">Return to List</button>
                </div>`;
        }
        return;
    }

    // View 2: Compact Song List with Sub-Tabs
    let html = `
        <div class="mb-6">
            <h2 class="text-2xl font-black text-orange-900 uppercase tracking-tighter italic mb-4">Bhajane & Keertane</h2>
            
            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-orange-50">
    `;

    for (let key in window.bhajanaData) {
        const isActive = window.activeBhajanaCategory === key;
        html += `
            <button onclick="switchBhajanaCat('${key}')" 
                    class="sub-tab-btn ${isActive ? 'active' : ''} whitespace-nowrap px-4 py-2 rounded-full border transition-all text-sm">
                ${window.bhajanaData[key].name}
            </button>`;
    }

    html += `</div></div>`;

    // Category Header
    const currentCat = window.bhajanaData[window.activeBhajanaCategory];
    html += `
        <div class="flex justify-between items-center mb-4 px-2">
            <span class="text-xs font-black uppercase tracking-widest text-orange-400">${currentCat.name}</span>
            <span class="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">${currentCat.songs.length} Songs</span>
        </div>
    `;

    // Compact List View (Designed for 1000+ songs)
    html += `<div class="divide-y divide-orange-50 border-t border-b border-orange-50">`;
    
    currentCat.songs.forEach((song, index) => {
        html += `
            <div onclick="openSong('${song.id}')" 
                 class="group flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-orange-50/50 transition-colors">
                
                <div class="flex items-center gap-4">
                    <span class="text-[10px] font-bold text-orange-200 w-5">${index + 1}</span>
                    <span class="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                        ${song.title}
                    </span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-chevron-right text-[10px] text-orange-200 group-hover:text-orange-500 transition-transform group-hover:translate-x-1"></i>
                </div>
            </div>`;
    });
    
    html += `</div><div class="pb-20"></div>`;
    area.innerHTML = html;
}

/* ================================================================
   3. HELPERS
   ================================================================
*/
function switchBhajanaCat(key) {
    window.activeBhajanaCategory = key;
    window.activeSongId = null; // Reset view to list
    renderBhajanaUI();
}

function openSong(id) {
    window.activeSongId = id;
    renderBhajanaUI();
    // Scroll to top of content area
    const area = document.getElementById('contentArea');
    if (area) area.scrollTo(0, 0);
}

function closeSong() {
    window.activeSongId = null;
    renderBhajanaUI();
}