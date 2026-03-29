const STOTRA_MAP = {
    vishnu: "Vishnu Sahasranamam",
    ramaa: "Ramaa Stotram",
    sundara: "Sundharakanda",
    vayu: "Hari Vayu Stuthi",
    rayara: "Raghavendra Stotram"
};

function renderStotraUI() {
    const area = document.getElementById('contentArea');
    
    const navHtml = Object.keys(STOTRA_MAP).map(key => `
        <button class="sub-tab-btn ${window.activeStotra === key ? 'active' : ''}" 
                onclick="window.activeStotra='${key}'; render();">
            ${STOTRA_MAP[key]}
        </button>
    `).join('');

    area.innerHTML = `
        <div class="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scroll">
            ${navHtml}
        </div>
        <div id="stotraTextContainer" class="stotra-content bg-white p-6 rounded-2xl shadow-inner border border-orange-100 min-h-[400px]">
            </div>
    `;

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
    } catch (err) {
        container.innerHTML = `<div class="p-10 text-center text-red-500 font-bold">File not found: ${stotraKey}-${lang}.txt</div>`;
    }
}