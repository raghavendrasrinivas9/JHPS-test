const STOTRA_MAP = {
    vishnu: "Vishnu Sahasranamam",
    manyu: "Manyu Suktam",
	ramaa: "Ramaa Stotram",
    sundara: "Sundharakanda",
    vayu: "Hari Vayu Stuthi",
    sumadhwa: "Sumadhwa Vijaya",
	rayara: "Raghavendra Stotram",
    gita: "Bhagavad Gita"
};

/* --- Global State --- */
window.stotraSearchQuery = window.stotraSearchQuery || "";
window.stotraCursorPos = window.stotraCursorPos || 0;
window.expandedSumadhwaId = window.expandedSumadhwaId || null;
window.sumadhwaTextContent = window.sumadhwaTextContent || "";
window.expandedGitaId = window.expandedGitaId || null;
window.gitaTextContent = window.gitaTextContent || "";

const GITA_DESCRIPTIONS = {
    1: "Arjuna Vishada Yoga - The distress of Arjuna.",
    2: "Sankhya Yoga - The Yoga of Knowledge.",
    3: "Karma Yoga - The Yoga of Action.",
    4: "Jnana-Karma-Sanyasa Yoga - Knowledge and Disciplined Action.",
    5: "Karma-Sanyasa Yoga - Action with Renunciation.",
    6: "Atma-Samyama Yoga - The Yoga of Self-Control.",
    7: "Jnana-Vijnana Yoga - Knowledge of the Ultimate Truth.",
    8: "Akshara-Brahma Yoga - The Yoga of the Imperishable Brahman.",
    9: "Raja-Vidya-Raja-Guhya Yoga - The Most Confidential Knowledge.",
    10: "Vibhuti Yoga - The Yoga of Divine Glories.",
    11: "Vishwarupa-Darshana Yoga - The Vision of the Universal Form.",
    12: "Bhakti Yoga - The Yoga of Devotion.",
    13: "Kshetra-Kshetrajna Vibhaga Yoga - The Field and the Knower of the Field.",
    14: "Gunatraya-Vibhaga Yoga - The Three Modes of Material Nature.",
    15: "Purushottama Yoga - The Yoga of the Supreme Person.",
    16: "Daivasura-Sampad-Vibhaga Yoga - The Divine and Demoniac Natures.",
    17: "Shraddhatraya-Vibhaga Yoga - The Three Divisions of Faith.",
    18: "Moksha-Sanyasa Yoga - The Yoga of Liberation and Renunciation."
};

function renderStotraUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    const filteredKeys = Object.keys(STOTRA_MAP).filter(key => 
        STOTRA_MAP[key].toLowerCase().includes(window.stotraSearchQuery.toLowerCase())
    );

    const navHtml = filteredKeys.map(key => `
        <button class="sub-tab-btn ${window.activeStotra === key ? 'active' : ''}" 
                onclick="window.activeStotra='${key}'; resetExpansions(); render();">
            ${STOTRA_MAP[key]}
        </button>
    `).join('');

    area.innerHTML = `
        <div class="mb-6 px-2">
            <h2 class="text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-scroll"></i> Stotras & Parayana
            </h2>
            <div class="relative mb-6">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-orange-300"></i>
                <input type="text" id="stotraSearchInput" placeholder="Search stotras..." 
                       value="${window.stotraSearchQuery}" oninput="handleStotraSearch(this)"
                       class="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-orange-50 focus:border-orange-400 focus:bg-white outline-none transition-all shadow-sm bg-orange-50/30 text-gray-800 text-sm">
            </div>
            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-orange-50">
                ${navHtml.length > 0 ? navHtml : '<p class="text-gray-400 italic text-sm py-2">No stotras found.</p>'}
            </div>
        </div>
        <div id="stotraContainer" class="animate-fade-in px-2"></div>
    `;

    const input = document.getElementById('stotraSearchInput');
    if (input && window.stotraSearchQuery !== "") {
        input.focus();
        input.setSelectionRange(window.stotraCursorPos, window.stotraCursorPos);
    }

    const container = document.getElementById('stotraContainer');
    if (window.activeStotra === 'sumadhwa') {
        renderSumadhwaBoxes(container);
    } else if (window.activeStotra === 'gita') {
        renderGitaBoxes(container);
    } else {
        container.innerHTML = `<div id="stotraTextContainer" class="stotra-content bg-white p-6 rounded-2xl shadow-inner border border-orange-100 min-h-[400px]"></div>`;
        loadStotraContent(window.activeStotra, window.activeLang);
    }
}

/* --- Improved Arrow Logic for Sumadhwa --- */
function renderSumadhwaBoxes(container) {
    let html = `<div class="grid gap-4">`;
    [1, 2, 3, 4].forEach(id => {
        const isExpanded = window.expandedSumadhwaId === id;
        html += `
            <div class="group overflow-hidden bg-white border ${isExpanded ? 'border-yellow-400 shadow-md ring-1 ring-yellow-100' : 'border-orange-100 shadow-sm'} rounded-2xl transition-all duration-300">
                <div onclick="toggleSumadhwa(${id})" class="p-4 cursor-pointer flex justify-between items-center transition-colors ${isExpanded ? 'bg-yellow-50/80' : 'hover:bg-yellow-50/50'}">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-yellow-100">
                            <i class="fa-solid fa-book-open text-[10px] text-orange-400 group-hover:text-yellow-700"></i>
                        </div>
                        <span class="font-bold ${isExpanded ? 'text-yellow-900' : 'text-orange-900'}">Sumadhwa Vijaya - ${id}</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-black text-sm transition-transform duration-300 inline-block" 
                       style="${isExpanded ? 'transform: rotate(90deg);' : ''}"></i>
                </div>
                ${isExpanded ? `<div class="px-5 pb-6 animate-fade-in border-t border-yellow-100 pt-4"><div class="stotra-content whitespace-pre-wrap leading-relaxed text-lg text-gray-800 italic">${window.sumadhwaTextContent || 'Loading...'}</div></div>` : ''}
            </div>`;
    });
    container.innerHTML = html + `</div><div class="pb-20"></div>`;
}

/* --- Improved Arrow Logic for Gita --- */
function renderGitaBoxes(container) {
    let html = `<div class="grid gap-3">`;
    for (let i = 1; i <= 18; i++) {
        const isExpanded = window.expandedGitaId === i;
        html += `
            <div class="group overflow-hidden bg-white border ${isExpanded ? 'border-yellow-400 shadow-md ring-1 ring-yellow-100' : 'border-orange-100 shadow-sm'} rounded-2xl transition-all duration-300">
                <div onclick="toggleGita(${i})" class="p-4 cursor-pointer flex justify-between items-center transition-colors ${isExpanded ? 'bg-yellow-50/80' : 'hover:bg-yellow-50/50'}">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-yellow-100">
                            <i class="fa-solid fa-dharmachakra text-[12px] text-orange-400 group-hover:text-yellow-700"></i>
                        </div>
                        <div>
                            <span class="font-bold block ${isExpanded ? 'text-yellow-900' : 'text-orange-900'}">Chapter - ${i}</span>
                            <span class="text-[10px] text-gray-500 italic">${GITA_DESCRIPTIONS[i]}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right text-black text-sm transition-transform duration-300 inline-block" 
                       style="${isExpanded ? 'transform: rotate(90deg);' : ''}"></i>
                </div>
                ${isExpanded ? `<div class="px-5 pb-6 animate-fade-in border-t border-yellow-100 pt-4"><div class="stotra-content whitespace-pre-wrap leading-relaxed text-lg text-gray-800 italic">${window.gitaTextContent || 'Loading...'}</div></div>` : ''}
            </div>`;
    }
    container.innerHTML = html + `</div><div class="pb-20"></div>`;
}

/* --- Logic Helpers --- */
async function toggleSumadhwa(id) {
    if (window.expandedSumadhwaId === id) {
        window.expandedSumadhwaId = null;
    } else {
        window.expandedSumadhwaId = id;
        window.sumadhwaTextContent = "";
        renderSumadhwaBoxes(document.getElementById('stotraContainer'));
        try {
            const resp = await fetch(`stotras/sumadhwavijaya${id}-${window.activeLang}.txt?t=${new Date().getTime()}`);
            if (!resp.ok) throw new Error();
            window.sumadhwaTextContent = await resp.text();
        } catch { window.sumadhwaTextContent = `<div class="text-orange-400 text-center py-4 font-bold uppercase tracking-widest">Coming Soon</div>`; }
    }
    renderSumadhwaBoxes(document.getElementById('stotraContainer'));
}

async function toggleGita(id) {
    // If clicking the same chapter, close it
    if (window.expandedGitaId === id && window.gitaTextContent !== "") {
        window.expandedGitaId = null;
        window.gitaTextContent = "";
    } else {
        window.expandedGitaId = id;
        window.gitaTextContent = ""; // Clear old language text
        
        // Show loading state immediately
        renderGitaBoxes(document.getElementById('stotraContainer'));
        
        try {
            // Ensure language is lowercase to match file names
            const lang = window.activeLang.toLowerCase(); 
            const resp = await fetch(`stotras/bg-chapter${id}-${lang}.txt?t=${new Date().getTime()}`);
            
            if (!resp.ok) throw new Error("File not found");
            
            window.gitaTextContent = await resp.text();
        } catch (err) {
            console.error(err);
            window.gitaTextContent = `<div class="text-orange-400 text-center py-4 font-bold uppercase tracking-widest">Coming Soon (${window.activeLang})</div>`;
        }
    }
    // Re-render the list to show the content or the "Coming Soon" message
    renderGitaBoxes(document.getElementById('stotraContainer'));
}

async function loadStotraContent(stotraKey, lang) {
    const container = document.getElementById('stotraTextContainer');
    if (!container) return;
    container.innerHTML = `<div class="p-10 text-center italic text-orange-400">Loading...</div>`;
    try {
        const response = await fetch(`stotras/${stotraKey}-${lang}.txt?t=${new Date().getTime()}`);
        if (!response.ok) throw new Error();
        const text = await response.text();
        container.innerHTML = `<div class="animate-fade-in whitespace-pre-wrap leading-relaxed text-lg">${text}</div>`;
    } catch {
        container.innerHTML = `<div class="p-20 text-center text-orange-400 font-bold text-xl uppercase tracking-widest">Coming Soon</div>`;
    }
}

function handleStotraSearch(inputElement) {
    window.stotraSearchQuery = inputElement.value;
    window.stotraCursorPos = inputElement.selectionStart;
    renderStotraUI();
}

function resetExpansions() {
    window.expandedSumadhwaId = null;
    window.sumadhwaTextContent = "";
    window.expandedGitaId = null;
    window.gitaTextContent = "";
}