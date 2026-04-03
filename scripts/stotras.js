const STOTRA_MAP = {
    vishnu: "Vishnu Sahasranamam",
    manyu: "Manyu Suktam",
    ramaa: "Ramaa Stotram",
    sundara: "Sundharakanda",
    vayu: "Hari Vayu Stuthi",
    rayara: "Raghavendra Stotram"
};

/* --- Global State --- */
window.stotraSearchQuery = window.stotraSearchQuery || "";
window.stotraCursorPos = window.stotraCursorPos || 0;

function renderStotraUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    const filteredKeys = Object.keys(STOTRA_MAP).filter(key => 
        STOTRA_MAP[key].toLowerCase().includes(window.stotraSearchQuery.toLowerCase())
    );

    const navHtml = filteredKeys.map(key => `
        <button class="sub-tab-btn ${window.activeStotra === key ? 'active' : ''}" 
                onclick="window.activeStotra='${key}'; render();">
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
        <div id="stotraContainer" class="animate-fade-in px-2">
            <div id="stotraTextContainer" class="stotra-content bg-white p-6 rounded-2xl shadow-inner border border-orange-100 min-h-[400px]"></div>
        </div>
    `;

    const input = document.getElementById('stotraSearchInput');
    if (input && window.stotraSearchQuery !== "") {
        input.focus();
        input.setSelectionRange(window.stotraCursorPos, window.stotraCursorPos);
    }

    loadStotraContent(window.activeStotra, window.activeLang);
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