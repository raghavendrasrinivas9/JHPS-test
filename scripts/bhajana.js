/* ================================================================
   1. BHAJANA DATA (Database of Songs)
   ================================================================ */
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
            { id: "v2", title: "Vijayadasara Kavacha (Smarisi Badukiro)", file: "lyrics/vijaya-smarisi.txt" }
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

/* --- Global State --- */
window.activeBhajanaCategory = "purandara";
window.activeSongId = null;
window.bhajanaSearchQuery = ""; 
window.lastCursorPos = 0; 

/* ================================================================
   2. BHAJANA RENDERER
   ================================================================ */
async function renderBhajanaUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // View 1: Detailed Song Lyrics View
    if (window.activeSongId) {
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
                <div class="animate-fade-in px-2">
                    <button onclick="closeSong()" class="mb-6 text-orange-700 font-bold flex items-center gap-2 hover:text-orange-900 transition-all active:scale-95">
                        <i class="fa-solid fa-circle-arrow-left text-xl"></i> Back to List
                    </button>

                    <div class="bg-white border border-orange-100 rounded-3xl p-6 md:p-10 shadow-sm border-t-8 border-t-orange-500">
                        <h2 class="text-2xl font-bold text-orange-900 mb-6 border-b border-orange-100 pb-4 italic">
                            ${song.title}
                        </h2>
                        <div class="stotra-content whitespace-pre-wrap italic text-lg md:text-xl leading-relaxed text-gray-800">
                            ${lyrics}
                        </div>
                    </div>
                    <div class="py-10 text-center text-gray-400 text-xs tracking-widest uppercase font-bold opacity-50">End of Lyrics</div>
                </div>`;
        } catch (err) {
            area.innerHTML = `
                <div class="p-10 text-center bg-white rounded-3xl border border-orange-100">
                    <i class="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-4"></i>
                    <p class="text-red-600 font-bold mb-6">Lyrics for "${song.title}" are currently unavailable.</p>
                    <button onclick="closeSong()" class="px-6 py-2 bg-orange-500 text-white rounded-full font-bold shadow-md active:scale-95">Return to List</button>
                </div>`;
        }
        return;
    }

    // View 2: Main List View (Search + Tabs + Cards)
    let html = `
        <div class="mb-6 px-2">
            <h2 class="text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-music"></i> Bhajane & Keertane
            </h2>
            
            <div class="relative mb-6">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-orange-300"></i>
                <input type="text" 
                       id="bhajanaSearchInput" 
                       placeholder="Search songs by title..." 
                       value="${window.bhajanaSearchQuery}"
                       oninput="handleBhajanaSearch(this)"
                       class="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-orange-50 focus:border-orange-400 focus:bg-white outline-none transition-all shadow-sm bg-orange-50/30 text-gray-800 text-sm">
            </div>

            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-orange-50 ${window.bhajanaSearchQuery ? 'hidden' : ''}">
    `;

    for (let key in window.bhajanaData) {
        const isActive = window.activeBhajanaCategory === key;
        html += `
            <button onclick="switchBhajanaCat('${key}')" 
                    class="sub-tab-btn ${isActive ? 'active' : ''} whitespace-nowrap px-4 py-2 rounded-full border transition-all text-sm font-medium">
                ${window.bhajanaData[key].name}
            </button>`;
    }

    html += `</div></div>`;

    // Filter Logic
    let displaySongs = [];
    if (window.bhajanaSearchQuery) {
        Object.keys(window.bhajanaData).forEach(key => {
            const cat = window.bhajanaData[key];
            cat.songs.forEach(s => {
                if (s.title.toLowerCase().includes(window.bhajanaSearchQuery.toLowerCase())) {
                    displaySongs.push({ ...s, categoryName: cat.name, catKey: key });
                }
            });
        });
    } else {
        const currentCat = window.bhajanaData[window.activeBhajanaCategory];
        displaySongs = currentCat.songs.map(s => ({ ...s, categoryName: currentCat.name, catKey: window.activeBhajanaCategory }));
    }

    html += `
        <div class="flex justify-between items-center mb-4 px-3">
            <span class="text-[10px] font-black uppercase tracking-widest text-orange-400">
                ${window.bhajanaSearchQuery ? 'Search Results' : window.bhajanaData[window.activeBhajanaCategory].name}
            </span>
            <span class="text-[10px] bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                ${displaySongs.length} Songs
            </span>
        </div>
    `;

    html += `<div class="grid gap-3 px-2">`;
    
    if (displaySongs.length === 0) {
        html += `<div class="p-12 text-center text-gray-400 italic bg-white rounded-3xl border-2 border-dashed border-orange-50">No songs match your search.</div>`;
    } else {
        displaySongs.forEach((song, index) => {
            html += `
                <div onclick="openSong('${song.id}', '${song.catKey}')" 
                     class="group relative flex items-center justify-between p-4 cursor-pointer 
                            bg-gradient-to-r from-orange-50/40 to-white 
                            hover:from-orange-100/60 hover:to-orange-50 
                            border border-orange-100 rounded-2xl 
                            transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-full bg-white border border-orange-100 flex items-center justify-center shadow-sm group-hover:border-orange-400 transition-colors">
                            <i class="fa-solid fa-music text-[10px] text-orange-300 group-hover:text-orange-600"></i>
                        </div>

                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800 group-hover:text-orange-900 transition-colors">
                                ${song.title}
                            </span>
                        </div>
                    </div>

                    <div class="w-7 h-7 rounded-full flex items-center justify-center bg-orange-50 group-hover:bg-orange-500 transition-all">
                        <i class="fa-solid fa-chevron-right text-[10px] text-orange-300 group-hover:text-white transition-transform group-hover:translate-x-0.5"></i>
                    </div>
                </div>`;
        });
    }
    
    html += `</div><div class="pb-20"></div>`;
    area.innerHTML = html;

    // Restore Focus & Cursor Position
    const input = document.getElementById('bhajanaSearchInput');
    if (input && window.bhajanaSearchQuery !== "") {
        input.focus();
        input.setSelectionRange(window.lastCursorPos, window.lastCursorPos);
    }
}

/* ================================================================
   3. HELPERS
   ================================================================ */
function handleBhajanaSearch(inputElement) {
    window.bhajanaSearchQuery = inputElement.value;
    window.lastCursorPos = inputElement.selectionStart; 
    renderBhajanaUI();
}

function switchBhajanaCat(key) {
    window.activeBhajanaCategory = key;
    window.activeSongId = null;
    window.bhajanaSearchQuery = "";
    renderBhajanaUI();
}

function openSong(id, catKey) {
    window.activeSongId = id;
    if (catKey) window.activeBhajanaCategory = catKey;
    renderBhajanaUI();
    const area = document.getElementById('contentArea');
    if (area) area.scrollTo(0, 0);
}

function closeSong() {
    window.activeSongId = null;
    renderBhajanaUI();
}