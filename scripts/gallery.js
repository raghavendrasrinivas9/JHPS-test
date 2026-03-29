/* --- GALLERY DATA --- */
/* --- GALLERY DATA --- */
window.galleryData = {
    parayana: [
        { 
            type: "photo", 
            url: "images/Parayana1.jpg", 
            caption: "Group Parayana" 
        }
    ],
    stotras: [],
    events: [
        { 
            type: "photo", 
            url: "images/Parayana1.jpg", 
            caption: "Group Parayana" 
        }, // <--- THIS COMMA WAS MISSING
        { 
            type: "video", 
            url: "https://www.youtube.com/shorts/rlB0LHHOUmw", 
            caption: "Weekly Parayana Highlights" 
        }
    ],
    learnings: [],
    contact: []
};

/* --- GALLERY RENDERER --- */
function renderGalleryUI() {
    const area = document.getElementById('contentArea');
    const mediaItems = window.galleryData[activeTab] || [];

    if (mediaItems.length === 0) {
        area.innerHTML = `
            <div class="p-10 text-center text-gray-400 italic">
                <i class="fa-solid fa-camera-retro text-4xl mb-3 block opacity-20"></i>
                No media for ${activeTab.toUpperCase()} yet.
            </div>`;
        return;
    }

    let html = `
        <h2 class="text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2">
            <i class="fa-solid fa-images"></i> ${activeTab} Gallery
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">`;

    mediaItems.forEach((item, index) => {
        let thumbUrl = item.url;
        
        // If it's a video, use the helper to get the YouTube thumbnail
        if (item.type === "video") {
            const vId = getYTID(item.url);
            thumbUrl = vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : 'https://via.placeholder.com/400?text=Video+Error';
        }

        html += `
            <div class="relative aspect-square overflow-hidden rounded-xl shadow-md border border-orange-100 bg-black group cursor-pointer" 
                 onclick="openLightbox(${index})">
                
                <img src="${thumbUrl}" alt="${item.caption}" 
                     class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100">
                
                ${item.type === "video" ? `
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 group-hover:bg-red-600 transition-colors">
                        <i class="fa-solid fa-play text-white text-xl ml-1"></i>
                    </div>
                </div>
                ` : ''}

                ${item.caption ? `
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3">
                    <p class="text-white text-[11px] md:text-xs font-medium leading-tight">
                        ${item.type === "video" ? '<i class="fa-solid fa-video mr-1 text-orange-400"></i>' : ''} ${item.caption}
                    </p>
                </div>
                ` : ''}
            </div>`;
    });

    area.innerHTML = html + `</div><div class="pb-24"></div>`;
}