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

/* --- LEARNINGS RENDERER --- */
function renderLearningsUI() {
    const area = document.getElementById('contentArea');
    const lData = window.learningsData || [];
    
    if (lData.length === 0) {
        area.innerHTML = "<div class='p-10 text-center text-orange-500'>No learning modules found.</div>";
        return;
    }

    let html = `<h2 class='text-xl font-bold mb-4 text-orange-800 uppercase tracking-tight'>🎓 Learnings & Tutorials</h2>
                <div class='flex flex-col gap-4'>`;
    
    lData.forEach((cat, index) => {
        const catId = `learn-${index}`;
        html += `
        <div class="border border-orange-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div onclick="toggleDropdown('${catId}', 'learning')" class="bg-yellow-50 p-4 cursor-pointer flex justify-between items-center group">
                <span class="font-bold text-orange-900 group-hover:text-orange-600 transition">✦ ${cat.category}</span>
                <i id="icon-learning-${catId}" class="fa-solid fa-chevron-down text-orange-400 rotate-icon"></i>
            </div>
            <div id="content-learning-${catId}" class="learning-content space-y-6">`;
            
        cat.vedas.forEach(v => {
            const isRig = v.name.toLowerCase().includes('rig');
            const partKey = isRig ? 'rig' : 'yajur';
            const showPartsBtn = (cat.category === "Sandhya Vandana");

            html += `
                <div class="bg-orange-50 rounded-lg border border-orange-100 overflow-hidden mb-2 mx-2">
                    <div class="bg-orange-100 px-3 py-2 font-bold text-orange-900 flex justify-between items-center">
                        <span class="text-sm">📖 ${v.name}</span>
                        ${showPartsBtn ? `<button onclick="event.stopPropagation(); switchToParts('${partKey}')" class="bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-full animate-glow shadow-md hover:bg-blue-700 transition-colors">Click here to learn step by step</button>` : ''}
                    </div>
                    <table class="w-full text-xs text-left bg-white">
                        <tbody class="divide-y divide-orange-50">${v.resources.map(r => `
                            <tr class="hover:bg-orange-50 transition">
                                <td class="p-3 font-semibold text-gray-700">${r.lang}</td>
                                <td class="p-3">
                                    <div class="flex justify-end gap-5 text-lg">
                                        ${r.audio && r.audio !== '#' ? `<button onclick="playStream('${r.audio}', '${v.name} (${r.lang})')" class="text-blue-600 hover:scale-110 transition"><i class="fa-solid fa-circle-play"></i></button>` : `<i class="fa-solid fa-circle-play text-gray-200"></i>`}
                                        ${r.video && r.video !== '#' ? `<a href="${r.video}" target="_blank" class="text-red-600 hover:scale-110 transition"><i class="fa-brands fa-youtube"></i></a>` : `<i class="fa-brands fa-youtube text-gray-200"></i>`}
                                        ${r.pdf && r.pdf !== '#' ? `<a href="${r.pdf}" target="_blank" class="text-green-600 hover:scale-110 transition"><i class="fa-solid fa-file-pdf"></i></a>` : `<i class="fa-solid fa-file-pdf text-gray-200"></i>`}
                                    </div>
                                </td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>`;
        });
        html += `</div></div>`;
    });
    
    area.innerHTML = html + "</div><div class='pb-10'></div>";
}