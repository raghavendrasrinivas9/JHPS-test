/* --- CONTACTS DATA --- */
window.contactData = {
    mainEmail: "jayahariparayanasangha@gmail.com",
    organizationName: "Jaya Hari Parayana Sangha",
    areas: [
        {
            name: "Kondapur",
            contacts: [
                { name: "Pavan Ashrit", phone: "9686155558" },
                { name: "Srikanth Joshi", phone: "9573313511" }
            ]
        },
        {
            name: "Nallagandla",
            contacts: [
                { name: "Pavan Ashrit", phone: "9686155558" },
                { name: "Srikanth Joshi", phone: "9573313511" }
            ]
        },
        {
            name: "Miyapur",
            contacts: [
                { name: "Pavan Ashrit", phone: "9686155558" },
                { name: "Srikanth Joshi", phone: "9573313511" }
            ]
        },
        {
            name: "BHEL",
            contacts: [
                { name: "Pavan Ashrit", phone: "9686155558" },
                { name: "Srikanth Joshi", phone: "9573313511" }
            ]
        }
    ]
};

/* --- CONTACT RENDERER --- */
function renderContactUI() {
    const area = document.getElementById('contentArea');
    const data = window.contactData;

    let html = `
        <div class="animate-fade-in px-2 max-w-4xl mx-auto">
            <h2 class='text-lg font-bold mb-4 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
                <i class="fa-solid fa-address-book text-sm"></i> Contact Us
            </h2>
            
            <div class="mb-6 relative overflow-hidden bg-orange-900 rounded-2xl p-5 text-black shadow-lg border-b-4 border-orange-700">
                <div class="relative z-10">
                    <p class='text-[10px] font-black uppercase tracking-widest text-orange-300 mb-1'></p>
                    <h3 class='text-xl font-bold leading-tight mb-3'>${data.organizationName}</h3>
                    
                    <a href="mailto:${data.mainEmail}" class='inline-flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors px-3 py-1.5 rounded-lg text-xs border border-orange/10'>
                        <i class="fa-solid fa-envelope text-orange-400"></i>
                        <span class="truncate">${data.mainEmail}</span>
                    </a>
             

            <h3 class='text-[10px] font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center gap-2 px-1'>
                <i class="fa-solid fa-map-pin"></i> Area Coordinators
            </h3>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                ${data.areas.map(area => `
                    <div class='bg-white border border-orange-100 rounded-xl p-3 shadow-sm'>
                        <div class='flex items-center gap-1.5 mb-2 pb-1.5 border-b border-orange-50'>
                            <div class="w-1.5 h-3 bg-orange-500 rounded-full"></div>
                            <span class='font-bold text-[11px] text-gray-800 truncate'>${area.name}</span>
                        </div>
                        
                        <div class="space-y-2">
                            ${area.contacts.map(c => `
                                <div class='flex items-center justify-between gap-1'>
                                    <span class='text-[10px] font-medium text-gray-600 truncate'>${c.name}</span>
                                    <a href="tel:${c.phone}" class="h-6 w-6 flex items-center justify-center rounded-md bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                                        <i class="fa-solid fa-phone text-[9px]"></i>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="bg-orange-50 rounded-2xl p-4 border border-orange-100 text-center">
                <p class='text-[10px] font-black text-orange-800 mb-3 uppercase tracking-widest'>Stay Connected</p>
                
                <div class="flex justify-center gap-4">
                    <a href="https://wa.me/919686155558" target="_blank" class="flex flex-col items-center gap-1 group">
                        <div class="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </div>
                        <span class="text-[9px] font-bold text-gray-500 uppercase">WhatsApp</span>
                    </a>

                    <a href="https://www.instagram.com/jayahariparayanasangha/" target="_blank" class="flex flex-col items-center gap-1 group">
                        <div class="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                            <i class="fa-brands fa-instagram text-lg"></i>
                        </div>
                        <span class="text-[9px] font-bold text-gray-500 uppercase">Instagram</span>
                    </a>

                    <a href="https://www.youtube.com/@JayaHariParayanaSangha" target="_blank" class="flex flex-col items-center gap-1 group">
                        <div class="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                            <i class="fa-brands fa-youtube text-lg"></i>
                        </div>
                        <span class="text-[9px] font-bold text-gray-500 uppercase">YouTube</span>
                    </a>
                </div>
            </div>
            
            <div class="h-20"></div>
        </div>
    `;

    area.innerHTML = html;
}