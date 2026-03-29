/* ==========================================================================
   GLOBAL STATE & HELPERS
   ========================================================================== */
let activeTab = "parayana";
let currentView = "info"; 
let activePartKey = null;
let currentPhotoIndex = 0;

const area = document.getElementById('contentArea');
const gAudio = document.getElementById('globalAudio');
const aBar = document.getElementById('audioPlayerBar');
const aName = document.getElementById('audioName');
const mIcon = document.getElementById('masterPlayIcon');
const dIcon = document.getElementById('discIcon');

// EXTRACT YOUTUBE ID FROM ANY URL
function getYTID(url) {
    if (!url) return null;
    // Enhanced regex to specifically handle /shorts/ and standard watch?v=
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function switchTab(tab) {
    activeTab = tab; 
    currentView = "info"; 
    activePartKey = null;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    const targetTab = document.getElementById(tab + "Tab");
    if (targetTab) targetTab.classList.add('active-tab');
    
    const topNav = document.getElementById('topNav');
    if (topNav) topNav.style.display = (tab === "contact") ? "none" : "flex"; 

    const btn1 = document.getElementById('lang1Btn');
    const btn2 = document.getElementById('lang2Btn');
    if(btn1) btn1.innerText = "Details";
    if(btn2) btn2.innerText = "Gallery";

    render();
    if (area) area.scrollTo(0,0);
}

function handleTopBtn(num) {
    currentView = (num === 1) ? "info" : "gallery";
    const b1 = document.getElementById('lang1Btn');
    const b2 = document.getElementById('lang2Btn');
    if(b1) b1.classList.toggle('active', num === 1);
    if(b2) b2.classList.toggle('active', num === 2);
    render();
}

/* ==========================================================================
   MAIN RENDERER
   ========================================================================== */
function render() {
    if (!area) return;
    area.innerHTML = ""; 

    if (currentView === "sv-parts") { 
        if (typeof renderSVParts === 'function') renderSVParts(); 
        return; 
    }
    
    if (currentView === "gallery") {
        if (typeof renderGalleryUI === 'function') renderGalleryUI();
        else area.innerHTML = "<div class='p-10 text-center italic text-orange-500'>Gallery loading...</div>";
        return;
    }

    switch(activeTab) {
        case "stotras": if (typeof renderStotraUI === 'function') renderStotraUI(); break;
        case "learnings": if (typeof renderLearningsUI === 'function') renderLearningsUI(); break;
        case "contact": if (typeof renderContactUI === 'function') renderContactUI(); break;
        case "parayana": if (typeof renderParayanaUI === 'function') renderParayanaUI(); break;
        case "events": if (typeof renderEventsUI === 'function') renderEventsUI(); break;
        default: renderDefaultTabs();
    }
}

function renderDefaultTabs() {
    const dataMap = { bhajana: ["Bhajana Mandali"], seva: ["Annadhana"], about: ["Dharma Practice"] };
    const items = dataMap[activeTab] || [];
    area.innerHTML = `<h2 class='text-xl font-bold mb-4 text-orange-800 uppercase'>${activeTab}</h2><div class='space-y-2'>${items.map(d => `<div class='bg-yellow-50 p-3 rounded-lg border font-bold text-orange-900'>✦ ${d}</div>`).join('')}</div>`;
}

/* ==========================================================================
   LIGHTBOX & SLIDESHOW
   ========================================================================== */
function openLightbox(index) {
    const items = window.galleryData[activeTab] || [];
    if (!items.length) return;
    
    currentPhotoIndex = index;
    const item = items[currentPhotoIndex];

    let overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = "fixed inset-0 bg-black bg-opacity-95 z-[99999] flex items-center justify-center animate-fade-in";
        overlay.onclick = (e) => { if(e.target === overlay) closeLightbox(); };
        document.body.appendChild(overlay);
    }

    let mediaHTML = "";
    if (item.type === "video") {
        const vId = getYTID(item.url);
        mediaHTML = `
            <div class="w-full max-w-[350px] md:max-w-md aspect-[9/16] mx-auto rounded-lg overflow-hidden shadow-2xl bg-black border border-white/10">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube-nocookie.com/embed/${vId}?autoplay=1&mute=1&rel=0&modestbranding=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="mt-4 flex gap-4 justify-center">
                <a href="${item.url}" target="_blank" class="text-orange-400 text-xs underline font-medium">
                    <i class="fa-solid fa-external-link"></i> Open in YouTube
                </a>
            </div>`;
    }
    else {
        mediaHTML = `<img src="${item.url}" class="max-h-[80vh] max-w-full rounded-lg shadow-2xl border border-white/10">`;
    }

    overlay.innerHTML = `
        <div class="relative w-full h-full flex flex-col items-center justify-center p-4">
            <button onclick="closeLightbox()" class="absolute top-5 right-5 text-white text-5xl font-thin z-[100001] transition">&times;</button>
            <button onclick="changePhoto(-1)" class="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl p-4 z-[100001] transition"><i class="fa-solid fa-angle-left"></i></button>
            <button onclick="changePhoto(1)" class="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-5xl p-4 z-[100001] transition"><i class="fa-solid fa-angle-right"></i></button>

            <div class="w-full flex flex-col items-center" onclick="event.stopPropagation()">
                ${mediaHTML}
                <div class="mt-6 text-center">
                    <p class="text-white text-sm font-medium bg-white/10 px-6 py-2 rounded-full inline-block border border-white/10">${item.caption || ''}</p>
                    <p class="text-gray-500 text-[10px] mt-3 tracking-widest uppercase font-bold">Item ${currentPhotoIndex + 1} of ${items.length}</p>
                </div>
            </div>
        </div>
    `;

    document.onkeydown = (e) => {
        if (e.key === "ArrowLeft") changePhoto(-1);
        if (e.key === "ArrowRight") changePhoto(1);
        if (e.key === "Escape") closeLightbox();
    };
}

function closeLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) overlay.remove();
    document.onkeydown = null;
}

function changePhoto(step) {
    const items = window.galleryData[activeTab] || [];
    currentPhotoIndex += step;
    if (currentPhotoIndex >= items.length) currentPhotoIndex = 0;
    if (currentPhotoIndex < 0) currentPhotoIndex = items.length - 1;
    openLightbox(currentPhotoIndex);
}

/* ==========================================================================
   AUDIO PLAYER & UTILS
   ========================================================================== */
function playStream(url, name) {
    if (!url || url === "#") return;
    if (aName) aName.innerText = name; 
    if (gAudio) { gAudio.src = url; gAudio.play(); }
    if (aBar) aBar.style.display = "flex"; 
    if (mIcon) mIcon.className = "fa-solid fa-pause"; 
    if (dIcon) dIcon.classList.add('spinning-disc');
}

function toggleAudio() {
    if (!gAudio) return;
    if (gAudio.paused) { gAudio.play(); mIcon.className = "fa-solid fa-pause"; dIcon.classList.add('spinning-disc'); } 
    else { gAudio.pause(); mIcon.className = "fa-solid fa-play"; dIcon.classList.remove('spinning-disc'); }
}

function stopAudio() { if (gAudio) gAudio.pause(); if (aBar) aBar.style.display = "none"; }

function toggleDropdown(id, type) {
    const content = document.getElementById(`content-${type}-${id}`);
    const icon = document.getElementById(`icon-${type}-${id}`);
    if (content) content.classList.toggle('open');
    if (icon) icon.classList.toggle('active');
}

window.onload = render;