/* ================================================================
   LIBRARY DATA
================================================================ */
// Use 'var' with a check to prevent "Already Declared" fatal errors
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
        const ch = i + 1;
        return {
            id: `bg${ch}`,
            title: `Chapter - ${ch}`,
            description: window.GITA_DESCRIPTIONS[ch],
            audio: `media/bg_ch${ch}.mp3`,
            video: `https://www.youtube.com/results?search_query=bhagavad+gita+chapter+${ch}`,
            pdfSanskrit: `downloads/bg_ch${ch}_san.pdf`,
            pdfTelugu: `downloads/bg_ch${ch}_tel.pdf`,
            pdfKannada: `downloads/bg_ch${ch}_kan.pdf`
        };
    }),
    "Mani Manjari": Array.from({ length: 4 }, (_, i) => ({
        id: `mm${i + 1}`,
        title: `Sarga - ${i + 1}`,
        description: `Historical account of the lineage and background - Sarga ${i + 1}.`,
        audio: `media/mm_s${i + 1}.mp3`,
        video: "#",
        pdfSanskrit: `downloads/mm_s${i + 1}_san.pdf`,
        pdfTelugu: `downloads/mm_s${i + 1}_tel.pdf`,
        pdfKannada: `downloads/mm_s${i + 1}_kan.pdf`
    })),
    "Sumadhwa Vijaya": Array.from({ length: 16 }, (_, i) => {
    const sargaNum = i + 1;
    return {
        id: `smv${sargaNum}`,
        title: `Sarga - ${sargaNum}`,
        description: `Glories and life of Sri Madhvacharya - Sarga ${sargaNum}.`,
        audio: `media/smv_s${sargaNum}.mp3`,
        video: `https://www.youtube.com/results?search_query=Sumadhwa+Vijaya+Sarga+${sargaNum}`,
        // All Sargas point to the same shared PDF files
        pdfSanskrit: `downloads/Sumadhwa_Vijaya_Full_Sanskrit.pdf`,
        pdfTelugu: `downloads/Sumadhwa_Vijaya_Full_Telugu.pdf`,
        pdfKannada: `downloads/Sumadhwa_Vijaya_Full_Kannada.pdf`
    }))
};

window.activeLibrarySubTab = "Bhagavad Gita";

/* ================================================================
   LIBRARY RENDERER
================================================================ */
window.renderLibraryUI = function() {
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
    
    items.forEach(item => {
        // Fallback description if one isn't explicitly provided in the data object
        const displayDesc = item.description || "Sacred Text Study";

        html += `
            <div class="group overflow-hidden bg-white border border-orange-100 rounded-2xl shadow-sm transition-all duration-300">
                <button onclick="toggleDropdown('${item.id}', 'lib')" 
                        class="w-full flex justify-between items-center p-4 bg-orange-50/50 hover:bg-yellow-50/50 transition-colors text-left">
                    
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-yellow-100">
                             <i class="fa-solid fa-dharmachakra text-[12px] text-orange-400 group-hover:text-yellow-700"></i>
                        </div>
                        
                        <div class="flex flex-col">
                            <span class="font-bold text-orange-900 group-hover:text-yellow-900">${item.title}</span>
                            <span class="text-[10px] text-gray-500 italic leading-tight">${displayDesc}</span>
                        </div>
                    </div>

                    <i id="icon-lib-${item.id}" class="fa-solid fa-chevron-right text-black text-sm transition-transform duration-300"></i>
                </button>
                
                <div id="content-lib-${item.id}" class="dropdown-content">
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
								<button onclick="openPDFViewer('${item.pdfSanskrit}', 'Sumadhwa Vijaya - Full (Sanskrit)')" 
										class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100 uppercase">SAN</button>
								<button onclick="openPDFViewer('${item.pdfTelugu}', 'Sumadhwa Vijaya - Full (Telugu)')" 
										class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100 uppercase">TEL</button>
								<button onclick="openPDFViewer('${item.pdfKannada}', 'Sumadhwa Vijaya - Full (Kannada)')" 
										class="text-[10px] bg-white px-2 py-1 rounded border border-green-200 font-bold hover:bg-green-100 uppercase">KAN</button>
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
};

window.switchLibrarySubTab = function(tabName) {
    window.activeLibrarySubTab = tabName;
    renderLibraryUI();
};