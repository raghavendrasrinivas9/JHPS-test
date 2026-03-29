// stotras.js

const STOTRA_DATA = {
    vishnu: "Vishnu Sahasranamam",
    ramaa: "Ramaa Stotram",
    sundara: "Sundharakanda",
    vayu: "Hari Vayu Stuthi",
    rayara: "Raghavendra Stotram"
};

/**
 * Renders the main UI for the Stotras tab
 */
function renderStotraUI() {
    const area = document.getElementById('contentArea');
    
    // Generate Sub-navigation (The list of individual stotras)
    const stotraKeys = Object.keys(STOTRA_DATA);
    const navHtml = stotraKeys.map(key => `
        <button class="sub-tab-btn ${activeStotra === key ? 'active' : ''}" 
                onclick="activeStotra='${key}'; render();">
            ${STOTRA_DATA[key]}
        </button>
    `).join('');

    area.innerHTML = `
        <div class="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scroll">
            ${navHtml}
        </div>
        <div id="stotraTextContainer" class="stotra-content overflow-y-auto">
            </div>
    `;

    loadStotraContent(activeStotra, activeLang);
}

/**
 * Fetches the specific language file from the server
 */
async function loadStotraContent(stotraKey, lang) {
    const container = document.getElementById('stotraTextContainer');
    if (!container) return;

    container.innerHTML = `<div class="p-10 text-center italic text-orange-500">Loading ${STOTRA_DATA[stotraKey]}...</div>`;

    try {
        const response = await fetch(`stotras/${stotraKey}-${lang}.txt?t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();
        container.innerHTML = text;
    } catch (err) {
        container.innerHTML = `
            <div class="p-10 text-center text-red-500 font-bold">
                Content unavailable.<br>
                <span class="text-xs font-normal">Please ensure "stotras/${stotraKey}-${lang}.txt" exists.</span>
            </div>`;
    }
}