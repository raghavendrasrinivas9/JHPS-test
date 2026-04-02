/* ================================================================
   1. GLOBAL STATE
================================================================
*/
window.activeTab = "parayana"; 
window.currentView = "info";   
window.activeStotra = "vishnu"; 
window.activeLang = "telugu"; 
window.activePartKey = null; 

/* ================================================================
   2. NAVIGATION ENGINE
================================================================
*/

/**
 * Updated handleMenuClick to ensure the sidebar closes on mobile browsers
 */
function handleMenuClick(tab) {
    // 1. Execute the existing tab switching logic
    switchTab(tab);

    // 2. Force the sidebar to close by removing the 'mobile-open' class
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }

    // 3. Native App haptic feedback
    if (window.median && window.median.haptic) {
        window.median.haptic.vibrate();
    }
}

/**
 * Toggles the mobile sidebar visibility for direct URL/Browser access.
 */
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

function switchTab(tab) {
    // Reset view state when switching main tabs
    if (window.activeTab !== tab) {
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
    const noNavTabs = ["contact", "bhajana", "about", "events"];
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
    } else {
        window.currentView = (num === 1) ? "info" : "gallery";
    }
    switchTab(window.activeTab);
    
    if (window.activeStotra === 'gita' && window.expandedGitaId !== null) {
        refreshGitaContent(window.expandedGitaId);
    } else {
        if (typeof resetExpansions === "function") resetExpansions();
    }

    render();
}

/* ================================================================
   3. CORE RENDERER
================================================================
*/
function render() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    area.innerHTML = ""; 

    if (window.currentView === "sv-parts") {
        if (typeof renderSVParts === 'function') renderSVParts();
        else area.innerHTML = `<div class="p-10 text-center text-red-500 italic">Parts renderer not found.</div>`;
        return;
    }

    if (window.currentView === "gallery") {
        if (typeof renderGalleryUI === 'function') renderGalleryUI();
        else area.innerHTML = `<div class="p-10 text-center text-gray-400 italic">Gallery coming soon...</div>`;
        return;
    }

    switch (window.activeTab) {
        case "parayana":  renderParayanaUI(); break;
        case "stotras":   renderStotraUI();   break;
        case "learnings": renderLearningsUI(); break;
        case "events":    renderEventsUI();    break;
        case "contact":   renderContactUI();   break;
        case "bhajana":   renderBhajanaUI();   break;
        case "seva":      renderSevaUI();      break;
        case "about": 
            area.innerHTML = `
                <h2 class='text-xl font-bold mb-4 text-orange-800 uppercase'>About</h2>
                <div class='space-y-2'>
                    <div class='bg-yellow-50 p-3 rounded-lg border border-yellow-200 font-bold text-orange-900'>
                        ✦ Nurturing Dharma Through Practice
                    </div>
                </div>`;
            break;
        default: 
            area.innerHTML = `<div class="p-10 text-center text-gray-400">Section coming soon...</div>`;
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
   6. UI HELPERS
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

// Global Initialization - Unified to prevent conflicts
window.onload = () => {
    switchTab(window.activeTab);

    // Detect environment
    const isApp = navigator.userAgent.includes('median') || navigator.userAgent.includes('gonative');
    const mobileWebNav = document.getElementById('mobileWebNav');

    if (isApp) {
        // Add class to body so CSS can hide Web-only buttons (Hamburger/Tabs)
        document.body.classList.add('is-native-app');
        
        if (mobileWebNav) mobileWebNav.style.display = 'none';
        
        // Median Sidebar remains as you have it...
        if (window.median) {
            median.sidebar.setItems({
                "items": [
                    { label: "📖 Parayana", url: "javascript:handleMenuClick('parayana')", icon: "fas fa-book-open" },
                    { label: "📜 Stotras", url: "javascript:handleMenuClick('stotras')", icon: "fas fa-scroll" },
                    { label: "🎵 Bhajana", url: "javascript:handleMenuClick('bhajana')", icon: "fas fa-music" },
                    { label: "🎓 Learnings", url: "javascript:handleMenuClick('learnings')", icon: "fas fa-graduation-cap" },
                    { label: "❤️ Seva", url: "javascript:handleMenuClick('seva')", icon: "fas fa-heart" },
                    { label: "📅 Events", url: "javascript:handleMenuClick('events')", icon: "fas fa-calendar-alt" },
                    { label: "ℹ️ About", url: "javascript:handleMenuClick('about')", icon: "fas fa-info-circle" },
                    { label: "📞 Contact", url: "javascript:handleMenuClick('contact')", icon: "fas fa-phone" }
                ],
                "enabled": true,
                "persist": true
            });
        }
    }
};