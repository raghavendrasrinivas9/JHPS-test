/* ================================================================
   1. BHAJANA DATA (Database of Songs)
   ================================================================
*/
window.bhajanaData = {
    purandara: {
        name: "Purandara Dasaru",
        songs: [
            { id: "p1", title: "Rama Mantrava Japiso", file: "lyrics/purandara-ramamantrava-japiso.txt" },
            { id: "p2", title: "Jagadoddharana", file: "lyrics/purandara-jagadodharana.txt" },
        ]
    },
    vijaya: {
        name: "Vijaya Dasaru",
        songs: [
            { id: "v1", title: "Pavamana Pavamana", file: "lyrics/vijaya-pavamana.txt" },
            { id: "v2", title: "Vijayadasara Kavacha (Smarisi Badukiro", file: "lyrics/vijaya-smarisi.txt" }
        ]
    },
    jagannatha: {
        name: "Jagannatha Dasaru",
        songs: [
            { id: "j1", title: "Namisi Beduve", file: "lyrics/jagannatha-namisibeduve.txt" },
        ]
    },
    gopala: {
        name: "Gopala Dasaru",
        songs: [
            { id: "g1", title: "Barayya Ba Ba", file: "lyrics/gopala-barayyababa.txt" }
        ]
    },
    kanaka: {
        name: "Kanaka Dasaru",
        songs: [
            { id: "k1", title: "Isha Ninna", file: "lyrics/kanaka-ishaninna.txt" }
        ]
    },
    prasanna: {
        name: "Prasanna Venkata Dasaru",
        songs: [
            { id: "pr1", title: "Yentha Srimantha", file: "lyrics/prasanna-yentha-srimantha.txt" }
        ]
    },
    others: {
        name: "Others",
        songs: [
            { id: "o1", title: "Krishna Krishna Krishna", file: "lyrics/others-krishna-krishna.txt" }
        ]
    }
};

/* --- Global State for Bhajana --- */
window.activeBhajanaCategory = "purandara";
window.activeSongId = null;
window.bhajanaSearchQuery = ""; // Tracks search input

/* ================================================================
   2. BHAJANA RENDERER
   ================================================================
*/
async function renderBhajanaUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // View 1: Detailed Song Lyrics
    if (window.activeSongId) {
        // Find song across all categories for search compatibility
        let song = null;
        for (let catKey in window.bhajanaData) {
            const found = window.bhajanaData[catKey].songs.find(s => s.id === window.activeSongId);
            if (found) { song = found; break; }
        }
        
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
                        <i class="fa-solid fa-circle-arrow-left text-xl"></i> Back to List
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

    // View 2: List View with Search and Tabs
    let html = `
        <div class="mb-6">
            <h2 class="text-2xl font-black text-orange-900 uppercase tracking-tighter italic mb-4">Bhajane & Keertane</h2>
            
            <div class="relative mb-6">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-orange-300"></i>
                <input type="text" 
                       id="bhajanaSearchInput" 
                       placeholder="Search songs by title..." 
                       value="${window.bhajanaSearchQuery}"
                       oninput="handleBhajanaSearch(this.value)"
                       class="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-orange-50 focus:border-orange-400 outline-none transition-all shadow-sm text-gray-800">
            </div>

            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-orange-50 ${window.bhajanaSearchQuery ? 'hidden' : ''}">
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

    // Filter Logic
    let displaySongs = [];
    if (window.bhajanaSearchQuery) {
        // Global Search across ALL categories
        Object.keys(window.bhajanaData).forEach(key => {
            const cat = window.bhajanaData[key];
            cat.songs.forEach(s => {
                if (s.title.toLowerCase().includes(window.bhajanaSearchQuery.toLowerCase())) {
                    displaySongs.push({ ...s, categoryName: cat.name, catKey: key });
                }
            });
        });
    } else {
        // Tab-specific view
        const currentCat = window.bhajanaData[window.activeBhajanaCategory];
        displaySongs = currentCat.songs.map(s => ({ ...s, categoryName: currentCat.name, catKey: window.activeBhajanaCategory }));
    }

    // Category Info Header
    html += `
        <div class="flex justify-between items-center mb-4 px-2">
            <span class="text-xs font-black uppercase tracking-widest text-orange-400">
                ${window.bhajanaSearchQuery ? 'Search Results' : window.bhajanaData[window.activeBhajanaCategory].name}
            </span>
            <span class="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                ${displaySongs.length} Songs
            </span>
        </div>
    `;

    // Compact List View
    html += `<div class="divide-y divide-orange-50 border-t border-b border-orange-50">`;
    
    if (displaySongs.length === 0) {
        html += `<div class="p-10 text-center text-gray-400 italic font-medium">No songs found matching "${window.bhajanaSearchQuery}"</div>`;
    } else {
        displaySongs.forEach((song, index) => {
            html += `
                <div onclick="openSong('${song.id}', '${song.catKey}')" 
                     class="group flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-orange-50/50 transition-colors">
                    
                    <div class="flex items-center gap-4">
                        <span class="text-[10px] font-bold text-orange-200 w-5">${index + 1}</span>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                                ${song.title}
                            </span>
                            ${window.bhajanaSearchQuery ? `<span class="text-[9px] text-orange-400 font-bold uppercase tracking-tighter">${song.categoryName}</span>` : ''}
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-chevron-right text-[10px] text-orange-200 group-hover:text-orange-500 transition-transform group-hover:translate-x-1"></i>
                    </div>
                </div>`;
        });
    }
    
    html += `</div><div class="pb-20"></div>`;
    area.innerHTML = html;

    // Maintain focus on search bar if user is typing
    if (window.bhajanaSearchQuery) {
        const input = document.getElementById('bhajanaSearchInput');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    }
}

/* ================================================================
   3. HELPERS
   ================================================================
*/
function handleBhajanaSearch(val) {
    window.bhajanaSearchQuery = val;
    renderBhajanaUI();
}

function switchBhajanaCat(key) {
    window.activeBhajanaCategory = key;
    window.activeSongId = null;
    window.bhajanaSearchQuery = ""; // Reset search when switching tabs
    renderBhajanaUI();
}

function openSong(id, catKey) {
    window.activeSongId = id;
    if (catKey) window.activeBhajanaCategory = catKey; // Ensure correct category context for the "Back" button
    renderBhajanaUI();
    const area = document.getElementById('contentArea');
    if (area) area.scrollTo(0, 0);
}

function closeSong() {
    window.activeSongId = null;
    renderBhajanaUI();
}