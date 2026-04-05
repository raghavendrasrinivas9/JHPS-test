/* --- GALLERY DATA --- */
window.galleryData = {
    parayana: [
        { type: "photo", url: "images/Parayana1.jpg", caption: "Group Parayana" },
		{ type: "photo", url: "images/Parayana2.jpg", caption: "Group Parayana" }
       
    ],
    stotras: [], 
    events: [], 
    learnings: [
		{ type: "photo", url: "images/Training5.jpg", caption: "Kids Performance" },
		{ type: "photo", url: "images/Training6.jpg", caption: "Mantrabyasa Kids Performance" },
		{ type: "photo", url: "images/Training7.jpg", caption: "Mantrabyasa Kids Performance" },
		{ type: "photo", url: "images/Training8.jpg", caption: "Mantrabyasa Kids Performance" },
		{ type: "photo", url: "images/Training9.jpg", caption: "Mantrabyasa Kids Performance" },
		{ type: "photo", url: "images/Training10.jpg", caption: "Mantrabyasa Kids Performance" },
		{ type: "photo", url: "images/Training1.jpg", caption: "Mantrabyasa " },
		{ type: "photo", url: "images/Training2.jpg", caption: "Sandhya Vandane Training" },
		{ type: "photo", url: "images/Training3.jpg", caption: "Sandhya Vandane Training" },
		{ type: "photo", url: "images/Training4.jpg", caption: "Sandhya Vandane Training" }

		
	], 
    seva: [
	{ type: "photo", url: "images/Seva1.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva2.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva3.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva4.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva5.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva6.jpg", caption: "Gow Seva" },
	{ type: "photo", url: "images/Seva7.jpg", caption: "Gow Seva" }
	],
	contact: []
};

/* --- GALLERY RENDERER --- */
function renderGalleryUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    // Filter only for photos now
    let items = (window.galleryData[window.activeTab] || []).filter(i => i.type === 'photo');

    let html = `
        <div class="mb-8 flex flex-col gap-4">
            <h2 class="text-2xl font-black text-orange-900 uppercase tracking-tighter italic">
                ${window.activeTab.replace('-', ' ')} Gallery
            </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`;

    if (items.length === 0) {
        html += `<div class="col-span-full py-20 text-center text-gray-400 italic">No photos found in this category yet.</div>`;
    }

    items.forEach((item, index) => {
        html += `
            <div class="relative aspect-square overflow-hidden rounded-3xl shadow-lg border-4 border-white bg-white group cursor-pointer" onclick="openLightbox(${index})">
                <img src="${item.url}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-orange-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <i class="fa-solid fa-expand text-white text-3xl"></i>
                </div>
            </div>`;
    });

    area.innerHTML = html + `</div><div class="pb-28"></div>`;
}

// Remove the getYTID function entirely as it is no longer needed