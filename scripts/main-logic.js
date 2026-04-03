/* ================================================================
   1. GLOBAL STATE
================================================================ */
window.activeTab = "parayana"; 
window.currentView = "info";   
window.activeStotra = "vishnu"; 
window.activeLang = "telugu"; 
window.activePartKey = null; 

/* ================================================================
   2. NAVIGATION ENGINE
================================================================ */
function switchTab(tab) {
    const isNewTab = window.activeTab !== tab;
    
    if (isNewTab) {
        window.activeTab = tab;
        window.currentView = "info"; 
        window.activePartKey = null;
    }
    
    const btn1 = document.getElementById('lang1Btn');
    const btn2 = document.getElementById('lang2Btn');
    const btn3 = document.getElementById('lang3Btn');
    const topNav = document.getElementById('topNav');

    // Update Sidebar Active Class
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    const targetTab = document.getElementById(tab + "Tab");
    if (targetTab) targetTab.classList.add('active-tab');

    // HIDE TOP NAV for specific views/tabs
    const noNavTabs = ["contact", "bhajana", "about", "events", "library"];
    if (window.currentView === "sv-parts" || noNavTabs.includes(tab)) {
        if(topNav) topNav.style.display = "none";
    } else {
        if(topNav) topNav.style.display = "flex";
        
        // Contextual button labeling
        if (tab === "stotras") {
            if(btn1) { btn1.innerText = "Telugu"; btn1.classList.toggle('active', window.activeLang === 'telugu'); }
            if(btn2) { btn2.innerText = "Kannada"; btn2.classList.toggle('active', window.activeLang === 'kannada'); }
            if(btn3) {
                btn3.style.display = "block";
                btn3.innerText = "Sanskrit";
                btn3.classList.toggle('active', window.activeLang === 'sanskrit');
            }
        } else if (tab === "learnings") {
            if(btn1) { btn1.innerText = "Details"; btn1.classList.toggle('active', window.currentView === 'info'); }
            if(btn2) { btn2.innerText = "Library"; btn2.classList.toggle('active', window.currentView === 'library'); }
            if(btn3) btn3.style.display = "none";
        } else {
            if(btn1) { btn1.innerText = "Details"; btn1.classList.toggle('active', window.currentView === 'info'); }
            if(btn2) { btn2.innerText = "Gallery"; btn2.classList.toggle('active', window.currentView === 'gallery'); }
            if(btn3) btn3.style.display = "none"; 
        }
    }
    render();
}

function handleTopBtn(num) {
    if (window.activeTab === "stotras") {
        const langs = { 1: 'telugu', 2: 'kannada', 3: 'sanskrit' };
        window.activeLang = langs[num];
        window.currentView = "info";
    } else if (window.activeTab === "learnings") {
        window.currentView = (num === 1) ? "info" : "library";
    } else {
        window.currentView = (num === 1) ? "info" : "gallery";
    }
    
    switchTab(window.activeTab);
}

/* ================================================================
   3. CORE RENDERER
================================================================ */
function render() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    area.innerHTML = ""; 

    if (window.currentView === "sv-parts") {
        if (typeof renderSVParts === 'function') renderSVParts();
        return;
    }

    if (window.currentView === "gallery") {
        if (typeof renderGalleryUI === 'function') renderGalleryUI();
        return;
    }

    if (window.currentView === "library") {
        if (typeof renderLibraryUI === 'function') renderLibraryUI();
        return;
    }

    switch (window.activeTab) {
        case "parayana":  renderParayanaUI(); break;
        case "stotras":   renderStotraUI();   break;
        case "learnings": renderLearningsUI(); break;
		case "library":   renderLibraryUI();   break; 
        case "events":    renderEventsUI();    break;
        case "contact":   renderContactUI();   break;
        case "bhajana":   renderBhajanaUI();   break;
        case "seva":      renderSevaUI();      break;
        case "about": 
            area.innerHTML = `<h2 class='text-xl font-bold mb-4 text-orange-800 uppercase'>About</h2>
                              <div class='bg-yellow-50 p-3 rounded-lg border border-yellow-200 font-bold text-orange-900'>
                              ✦ Nurturing Dharma Through Practice</div>`;
            break;
    }
}

/* ================================================================
   4. LEARNINGS SUB-VIEW LOGIC
================================================================
*/
function switchToParts(partKey) {
    window.currentView = "sv-parts";
    window.activePartKey = partKey;
    
    const topNav = document.getElementById('topNav');
    if(topNav) topNav.style.display = "none";
    
    render();
    const area = document.getElementById('contentArea');
    if (area) area.scrollTo(0,0);
}

function goBackToLearnings() {
    window.currentView = "info";
    window.activePartKey = null;
    
    const topNav = document.getElementById('topNav');
    if(topNav) topNav.style.display = "flex";
    
    switchTab('learnings');
}

/* ================================================================
   5. AUDIO PLAYER CONTROLS
================================================================
*/
function playStream(url, name) {
    const gAudio = document.getElementById('globalAudio');
    const dIcon = document.getElementById('discIcon');
    
    window.currentPlayingUrl = url;

    if (gAudio) {
        if (gAudio.src.includes(url)) {
            toggleAudio();
            return;
        }
        gAudio.src = url;
        gAudio.play();
    }
    
    if (dIcon) dIcon.classList.add('rotating');
    document.getElementById('audioPlayerBar').style.display = "flex";
    document.getElementById('audioName').innerText = name;
    document.getElementById('masterPlayIcon').className = "fa-solid fa-pause";

    if (window.currentView === "sv-parts") renderSVParts();
}

function stopAudio() {
    const gAudio = document.getElementById('globalAudio');
    const aBar = document.getElementById('audioPlayerBar');
    const dIcon = document.getElementById('discIcon');
    const mIcon = document.getElementById('masterPlayIcon');

    if (gAudio) {
        gAudio.pause();
        gAudio.currentTime = 0;
        gAudio.src = "";
    }
    if (aBar) aBar.style.display = "none";
    if (dIcon) dIcon.classList.remove('rotating');
    if (mIcon) mIcon.className = "fa-solid fa-play";
    
    window.currentPlayingUrl = null;
    if (window.currentView === "sv-parts") renderSVParts();
}

function toggleAudio() {
    const gAudio = document.getElementById('globalAudio');
    const dIcon = document.getElementById('discIcon');
    const mIcon = document.getElementById('masterPlayIcon');
    
    if (gAudio.paused) {
        gAudio.play();
        if(dIcon) dIcon.classList.add('rotating');
        if(mIcon) mIcon.className = "fa-solid fa-pause";
    } else {
        gAudio.pause();
        if(dIcon) dIcon.classList.remove('rotating');
        if(mIcon) mIcon.className = "fa-solid fa-play";
    }
}

/* ================================================================
   REVISED PDF Viewer Logic (Online Optimized)
================================================================ */
function openPDFViewer(pdfUrl, title) {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // Create a clean Absolute URL
    const absoluteUrl = new URL(pdfUrl, window.location.href).href;
    
    // We use the Google Viewer Proxy only for remote web viewing. 
    // If testing locally, we use a direct embed.
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const googleProxy = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
    
    const finalSrc = (isLocal) ? absoluteUrl : googleProxy;

    area.innerHTML = `
        <div class="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="flex items-center justify-between p-3 bg-orange-800 text-white z-50 shadow-md">
                <button onclick="closePDFViewer()" class="flex items-center gap-2 bg-orange-700 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-all text-sm font-bold">
                    <i class="fa-solid fa-arrow-left"></i>
                    <span>BACK</span>
                </button>
                <h3 class="font-bold text-[10px] md:text-xs uppercase tracking-widest truncate px-2">${title}</h3>
                <div class="flex gap-2">
                    <a href="${pdfUrl}" target="_blank" class="p-2 bg-orange-700 rounded-lg shadow-inner">
                        <i class="fa-solid fa-expand"></i>
                    </a>
                </div>
            </div>
            
            <div class="flex-grow relative w-full h-full bg-gray-100">
                <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <i class="fa-solid fa-file-pdf text-5xl text-orange-200 mb-4"></i>
                    <p class="text-gray-500 text-sm mb-4">Device security may prevent in-app viewing.</p>
                    <a href="${pdfUrl}" target="_blank" class="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg animate-bounce">
                        CLICK TO READ PDF
                    </a>
                </div>

                <iframe 
                    src="${finalSrc}" 
                    class="pdf-frame absolute inset-0 z-10"
                    style="width: 100%; height: 100%;"
                    onload="this.style.background='white'">
                </iframe>
            </div>
        </div>
    `;
    
    area.scrollTop = 0;
}

function closePDFViewer() {
    // Simply return to the current view (Library, Stotra, etc.)
    render(); 
}

/* ================================================================
   7. UI HELPERS
================================================================
*/
function toggleDropdown(id, type) {
    const content = document.getElementById(`content-${type}-${id}`);
    const icon = document.getElementById(`icon-${type}-${id}`);
    if (content) content.classList.toggle('open');
    if (icon) icon.classList.toggle('active');
}

function openLightbox(index) {
    if (typeof window.galleryData === 'undefined') return;
    const items = (window.galleryData[window.activeTab] || []).filter(i => i.type === 'photo');
    if(!items[index]) return;

    let overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = "fixed inset-0 bg-black bg-opacity-95 z-[99999] flex items-center justify-center p-4";
        document.body.appendChild(overlay);
    }

    const item = items[index];
    const hasPrev = index > 0;
    const hasNext = index < items.length - 1;

    overlay.innerHTML = `
        <div class="relative max-w-5xl w-full flex flex-col items-center">
            <button onclick="document.getElementById('lightbox-overlay').remove()" class="absolute -top-12 right-0 text-white text-3xl hover:text-orange-400 transition">&times;</button>
            
            ${hasPrev ? `<button onclick="event.stopPropagation(); openLightbox(${index - 1})" class="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-orange-400 p-2 transition"><i class="fa-solid fa-chevron-left"></i></button>` : ''}
            ${hasNext ? `<button onclick="event.stopPropagation(); openLightbox(${index + 1})" class="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-orange-400 p-2 transition"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
            
            <img src="${item.url}" class="max-h-[80vh] rounded-lg shadow-2xl border-4 border-white/10 object-contain" onclick="event.stopPropagation()">
            
            <div class="mt-6 text-center">
                <p class="text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-1">JHPS Gallery</p>
                <p class="text-white text-xl font-bold">${item.caption || 'Sacred Moment'}</p>
                <p class="text-gray-400 text-sm mt-2">${index + 1} / ${items.length}</p>
            </div>
        </div>
    `;

    overlay.onclick = () => overlay.remove();
}

// Global Initialization
window.onload = () => {
    switchTab(window.activeTab);
};