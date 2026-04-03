/* ================================================================
   LIBRARY DATA
================================================================ */
if (typeof window.GITA_DESCRIPTIONS === 'undefined') {
    window.GITA_DESCRIPTIONS = {
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
}

window.libraryData = {
    "Bhagavad Gita": Array.from({ length: 18 }, (_, i) => {
        const num = i + 1;
        return {
            id: `bg${num}`,
            title: `Chapter - ${num}`,
            description: window.GITA_DESCRIPTIONS[num],
            audio: `media/bg_ch${num}.mp3`,
            video: `https://www.youtube.com/results?search_query=bhagavad+gita+chapter+${num}`,
            pdfSanskrit: `downloads/bg_ch${num}_san.pdf`,
            pdfTelugu: `downloads/bg_ch${num}_tel.pdf`,
            pdfKannada: `downloads/bg_ch${num}_kan.pdf`,
            isFullPDF: false
        };
    }),
    "Mani Manjari": Array.from({ length: 8 }, (_, i) => ({
        id: `mm${i + 1}`,
        title: `Sarga - ${i + 1}`,
        description: `Historical account of the lineage and background - Sarga ${i + 1}.`,
        audio: `media/mm_s${i + 1}.mp3`,
        video: `https://www.youtube.com/results?search_query=Mani+Manjari+Sarga+${i+1}`,
        pdfSanskrit: `downloads/mm_s${i + 1}_san.pdf`,
        pdfTelugu: `downloads/mm_s${i + 1}_tel.pdf`,
        pdfKannada: `downloads/mm_s${i + 1}_kan.pdf`,
        isFullPDF: false
    })),
    "Sumadhwa Vijaya": Array.from({ length: 16 }, (_, i) => ({
        id: `smv${i + 1}`,
        title: `Sarga - ${i + 1}`,
        description: `Glories and life of Sri Madhvacharya - Sarga ${i + 1}.`,
        audio: `media/smv_s${i + 1}.mp3`,
        video: `https://www.youtube.com/results?search_query=Sumadhwa+Vijaya+Sarga+${i+1}`,
        // Single PDF for all Sargas
        pdfSanskrit: `downloads/Sumadhwa_Vijaya_Full_Sanskrit.pdf`,
        pdfTelugu: `downloads/Sumadhwa_Vijaya_Full_Telugu.pdf`,
        pdfKannada: `downloads/Sumadhwa_Vijaya_Full_Kannada.pdf`,
        isFullPDF: true
    }))
};

window.activeLibrarySubTab = window.activeLibrarySubTab || "Bhagavad Gita";

/* ================================================================
   LIBRARY RENDERER
================================================================ */
function renderLibraryUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    let html = `
        <div class="mb-6 px-2">
            <h2 class="text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2">
                <i class="fa-solid fa-book-open"></i> Sacred Library
            </h2>
            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-orange-50">
    `;

    Object.keys(window.libraryData).forEach(tab => {
        const isActive = window.activeLibrarySubTab === tab;
        html += `
            <button onclick="switchLibrarySubTab('${tab}')" 
                    class="sub-tab-btn ${isActive ? 'active' : ''} whitespace-nowrap px-4 py-2 rounded-full border transition-all text-sm font-medium">
                ${tab}
            </button>`;
    });

    html += `</div></div><div class="grid gap-3 px-2">`;

    const items = window.libraryData[window.activeLibrarySubTab] || [];
    
    /* Inside renderLibraryUI loop */
items.forEach(item => {
    const pdfLabel = item.isFullPDF ? "Full Book" : item.title;

    html += `
        <div class="group relative bg-white border border-orange-100 hover:border-yellow-400 
                    hover:bg-yellow-50/80 rounded-2xl overflow-hidden shadow-sm 
                    hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            
            <button onclick="toggleDropdown('${item.id}', 'lib')" 
                    class="w-full flex justify-between items-center p-4 text-left transition-colors">
                
                <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 
                                group-hover:bg-yellow-100 group-hover:border-yellow-300 transition-colors">
                         <i class="fa-solid fa-dharmachakra text-[10px] text-orange-400 group-hover:text-yellow-700"></i>
                    </div>
                    
                    <div class="flex flex-col">
                        <span class="font-bold text-gray-800 group-hover:text-yellow-900 transition-colors">${item.title}</span>
                        <span class="text-[10px] text-gray-500 italic block mt-0.5">${item.description}</span>
                    </div>
                </div>

                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-orange-50 group-hover:bg-yellow-400 transition-all shadow-sm">
                    <i id="icon-lib-${item.id}" class="fa-solid fa-chevron-right text-[10px] text-orange-400 group-hover:text-white transition-transform duration-300"></i>
                </div>
            </button>
            
            <div id="content-lib-${item.id}" class="dropdown-content bg-white">
                <div class="p-4 border-t border-orange-50">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button onclick="playStream('${item.audio}', '${item.title}')" class="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors">
                            <i class="fa-solid fa-circle-play text-lg"></i>
                            <span class="text-xs font-bold uppercase">Listen</span>
                        </button>

                        <a href="${item.video}" target="_blank" class="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-xl text-red-700 hover:bg-red-100 transition-colors">
                            <i class="fa-brands fa-youtube text-lg"></i>
                            <span class="text-xs font-bold uppercase">Watch</span>
                        </a>

                        <div class="flex flex-col gap-2 p-3 bg-green-50 rounded-xl">
                            <div class="flex items-center justify-center gap-2 text-green-700 mb-1">
                                <i class="fa-solid fa-file-pdf text-lg"></i>
                                <span class="text-xs font-bold uppercase">Read PDF</span>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button onclick="openPDFViewer('${item.pdfSanskrit}', '${window.activeLibrarySubTab} ${pdfLabel} - San')" class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100">Sanskrit</button>
                                <button onclick="openPDFViewer('${item.pdfTelugu}', '${window.activeLibrarySubTab} ${pdfLabel} - Tel')" class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100">Telugu</button>
                                <button onclick="openPDFViewer('${item.pdfKannada}', '${window.activeLibrarySubTab} ${pdfLabel} - Kan')" class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100">Kannada</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});

    html += `</div><div class="pb-20"></div>`;
    area.innerHTML = html;
}

function switchLibrarySubTab(tabName) {
    window.activeLibrarySubTab = tabName;
    renderLibraryUI();
}

function toggleDropdown(id, type) {
    const content = document.getElementById(`content-${type}-${id}`);
    const icon = document.getElementById(`icon-${type}-${id}`);
    
    if (content) {
        const isOpen = content.classList.contains('open');
        
        // Toggle the content visibility
        content.classList.toggle('open');
        
        // Handle Icon Rotation
        if (icon) {
            if (!isOpen) {
                icon.classList.add('rotate-90');
            } else {
                icon.classList.remove('rotate-90');
            }
        }
    }
}