/* --- LEARNINGS DATA --- */
window.learningsData = [
    {
        category: "Sandhya Vandana",
        vedas: [
            {
                name: "Rigveda Sandhya Vandana",
                resources: [
                    { lang: "Telugu", audio: "#", video: "#", pdf: "downloads/Rigveda-Telugu-Sandyavandana.pdf" },
                    { lang: "Kannada", audio: "#", video: "#", pdf: "downloads/Rigveda-Kannada-Sandyavandana.pdf" },
					{ lang: "Sanskrit", audio: "#", video: "#", pdf: "downloads/Rigveda-Sanskrit-Sandyavandana.pdf" },
					{ lang: "English", audio: "#", video: "#", pdf: "downloads/Rigveda-English-Sandyavandana.pdf" }
                ]
            },
            {
                name: "Yajurveda Sandhya Vandana",
                resources: [
                    { lang: "Telugu", audio: "#", video: "#", pdf: "downloads/Yajurveda-Telugu-Sandyavandana.pdf" },
                    { lang: "Kannada", audio: "#", video: "#", pdf: "downloads/Yajurveda-Kannada-Sandyavandana.pdf" },
					{ lang: "Sanskrit", audio: "#", video: "#", pdf: "downloads/Yajurveda-Sanskrit-Sandyavandana.pdf" },
					{ lang: "English", audio: "#", video: "#", pdf: "downloads/Rigveda-English-Sandyavandana.pdf" }
                ]
            }
        ]
    },
    {
        category: "Sakshipta Deva Pooja",
        vedas: [
            {
                name: "Sankshipta Deva Pooja",
                resources: [
                    { lang: "Telugu", audio: "#", video: "#", pdf: "#" },
					{ lang: "Kannada", audio: "#", video: "#", pdf: "#" }
                ]
            }
        ]
    }, // Added missing comma here
    {
        category: "Pancha Skuktha",
        vedas: [
            {
                name: "Purusha Suktam",
                resources: [{ lang: "Sanskrit", audio: "#", video: "https://www.youtube.com/watch?v=kyYfT94hNU4", pdf: "#" }]
            },
            {
                name: "Sri Suktam",
                resources: [{ lang: "Sanskrit", audio: "#", video: "https://www.youtube.com/watch?v=_yQs6-v0584", pdf: "#" }]
            },
            {
                name: "Manyu Suktam",
                resources: [{ lang: "Sanskrit", audio: "#", video: "https://www.youtube.com/watch?v=IG3J5iLzc_Y", pdf: "#" }]
            },
            {
                name: "Ambruni Suktam",
                resources: [{ lang: "Sanskrit", audio: "#", video: "https://www.youtube.com/watch?v=Jyw3--vT0lY", pdf: "#" }]
            },
            {
                name: "Balittha Suktam",
                resources: [{ lang: "Sanskrit", audio: "#", video: "https://www.youtube.com/watch?v=K4Q5Brf1PM4", pdf: "#" }]
            }
        ]
    }
];

/* --- UPDATED LEARNINGS RENDERER --- */
function renderLearningsUI() {
    const area = document.getElementById('contentArea');
    const lData = window.learningsData || [];
    
    if (lData.length === 0) {
        area.innerHTML = "<div class='p-10 text-center text-orange-500'>No learning modules found.</div>";
        return;
    }

    let html = `<h2 class='text-xl font-bold mb-4 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
                    <i class="fa-solid fa-graduation-cap"></i> Learnings & Tutorials
                </h2>
                <div class='flex flex-col gap-4'>`;
    
    lData.forEach((cat, index) => {
        const catId = `learn-${index}`;
        html += `
        <div class="border border-orange-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div onclick="toggleDropdown('${catId}', 'learning')" class="bg-yellow-50 p-4 cursor-pointer flex justify-between items-center group">
                <span class="font-bold text-orange-900 group-hover:text-orange-600 transition">✦ ${cat.category}</span>
                <i id="icon-learning-${catId}" class="fa-solid fa-chevron-right text-orange-400 transition-transform duration-300"></i>
            </div>
            <div id="content-learning-${catId}" class="dropdown-content bg-white">`;
            
        cat.vedas.forEach(v => {
            const isRig = v.name.toLowerCase().includes('rig');
            const partKey = isRig ? 'rig' : 'yajur';
            const showPartsBtn = (cat.category === "Sandhya Vandana");

            // Extract specific resources for the grid
            const audioRes = v.resources.find(r => r.audio && r.audio !== '#');
            const videoRes = v.resources.find(r => r.video && r.video !== '#');

            html += `
                <div class="p-4 border-b border-orange-50">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-bold text-gray-800 uppercase tracking-wide">${v.name}</span>
                        ${showPartsBtn ? `<button onclick="event.stopPropagation(); switchToParts('${partKey}')" class="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-full animate-glow shadow-md hover:bg-blue-700 transition-all">Step-by-Step Guide</button>` : ''}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        
                        ${audioRes ? 
                            `<button onclick="playStream('${audioRes.audio}', '${v.name}')" class="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors">
                                <i class="fa-solid fa-circle-play text-lg"></i>
                                <span class="text-xs font-bold uppercase">Listen</span>
                            </button>` : 
                            `<button class="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-400 cursor-not-allowed">
                                <i class="fa-solid fa-circle-play text-lg"></i>
                                <span class="text-xs font-bold uppercase">Coming Soon</span>
                            </button>`
                        }

                        ${videoRes ? 
                            `<a href="${videoRes.video}" target="_blank" class="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-xl text-red-700 hover:bg-red-100 transition-colors">
                                <i class="fa-brands fa-youtube text-lg"></i>
                                <span class="text-xs font-bold uppercase">Watch</span>
                            </a>` : 
                            `<button class="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-400 cursor-not-allowed">
                                <i class="fa-brands fa-youtube text-lg"></i>
                                <span class="text-xs font-bold uppercase">Coming Soon</span>
                            </button>`
                        }

                        <div class="flex flex-col gap-2 p-3 bg-green-50 rounded-xl">
                            <div class="flex items-center justify-center gap-2 text-green-700 mb-1">
                                <i class="fa-solid fa-file-pdf text-lg"></i>
                                <span class="text-xs font-bold uppercase">Read PDF</span>
                            </div>
                            <div class="flex justify-center flex-wrap gap-2">
                                ${['Sanskrit', 'Telugu', 'Kannada', 'English'].map(lang => {
                                    // Look for a resource matching this language in the v.resources array
                                    const langRes = v.resources.find(r => r.lang === lang && r.pdf && r.pdf !== '#');
                                    return `
                                        <button 
                                            ${langRes ? `onclick="openPDFViewer('${langRes.pdf}', '${v.name} - ${lang}')"` : ''} 
                                            class="text-[10px] px-2 py-1 rounded border font-bold transition-colors ${langRes 
                                                ? 'bg-white border-green-200 text-green-800 hover:bg-green-100 shadow-sm' 
                                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}">
                                            ${lang.substring(0,3).toUpperCase()}
                                        </button>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        html += `</div></div>`;
    });
    
    area.innerHTML = html + "</div><div class='pb-10'></div>";
}