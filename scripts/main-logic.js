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
   REVISED PDF Viewer Logic (Mobile & App Optimized)
================================================================ */
function openPDFViewer(pdfUrl, title) {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // 1. Prepare absolute URL
    // This is vital for external viewers like Google Docs to find your file
    const absoluteUrl = new URL(pdfUrl, window.location.href).href;
    
    // 2. Enhanced Environment Detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLocal = window.location.protocol === "file:";
    const isApp = document.body.classList.contains('is-median-app');

    /**
     * LOGIC: 
     * - If Desktop: Use standard <object> tag.
     * - If Mobile/App & Online: Use Google Docs Viewer for a smooth in-app experience.
     * - If Mobile/App & Local/Offline: Direct link (mobile browsers will usually open their native PDF viewer).
     */
    let finalSrc = absoluteUrl;
    
    if (isMobile && !isLocal) {
        // Google Docs Viewer provides a consistent UI on mobile browsers/apps
        finalSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
    }

    area.innerHTML = `
        <div class="flex flex-col h-full animate-fade-in bg-white overflow-hidden" style="height: 100%; width: 100%;">
            <div class="flex items-center justify-between p-3 bg-orange-800 text-white shrink-0">
                <button onclick="closePDFViewer()" class="flex items-center gap-2 bg-blue-700 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-all text-sm font-bold">
                    <i class="fa-solid fa-arrow-left"></i>
                    <span>BACK</span>
                </button>
                <h3 class="font-bold text-[10px] md:text-xs uppercase tracking-widest truncate px-2 flex-1 text-center">${title}</h3>
                <a href="${pdfUrl}" target="_blank" download class="p-2 bg-orange-700 rounded-lg">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
            
            <div class="flex-grow bg-gray-200 relative overflow-hidden">
                <iframe 
                    src="${finalSrc}" 
                    class="absolute inset-0 w-full h-full border-none"
                    style="width: 100%; height: 100%;"
                    allow="autoplay">
                </iframe>
                
                <div id="pdf-fallback" class="hidden absolute inset-0 flex flex-col items-center justify-center p-10 text-center bg-white">
                    <p class="mb-4 text-gray-600">If the PDF doesn't load automatically:</p>
                    <a href="${pdfUrl}" target="_blank" class="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
                        OPEN PDF MANUALLY
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Safety scroll to top
    area.scrollTop = 0;
}

// Ensure this helper exists in main-logic.js
function closePDFViewer() {
    render(); // Re-renders the current tab (Library)
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