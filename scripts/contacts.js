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
        <h2 class='text-xl font-bold mb-4 text-orange-800 uppercase tracking-tight'>📞 Contact Us</h2>
        
        <div class="space-y-3 mb-6">
            <div class='bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm'>
                <p class='text-orange-900 font-black text-lg'>${data.organizationName}</p>
                <p class='text-orange-700 text-sm flex items-center gap-2 mt-1'>
                    <i class="fa-solid fa-envelope"></i> ${data.mainEmail}
                </p>
            </div>
        </div>

        <h3 class='text-md font-bold text-orange-800 mb-3 uppercase flex items-center gap-2'>
            <i class="fa-solid fa-map-location-dot"></i> Area Coordinators
        </h3>

        <div class="area-grid">
            ${data.areas.map(area => `
                <div class='area-box'>
                    <div class='text-[10px] font-black uppercase text-orange-600 tracking-widest mb-2 border-b border-orange-100 pb-1'>
                        ${area.name}
                    </div>
                    ${area.contacts.map(c => `
                        <div class='contact-row mb-2 last:mb-0'>
                            <div class='text-xs font-bold text-gray-700'>${c.name}</div>
                            <a href="tel:${c.phone}" class="call-btn flex items-center gap-1">
                                <i class="fa-solid fa-phone text-[8px]"></i> ${c.phone}
                            </a>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>

        <h3 class='text-md font-bold text-orange-800 mt-8 mb-3 uppercase flex items-center gap-2'>
            <i class="fa-solid fa-share-nodes"></i> Join Our Community
        </h3>
        
        <div class="flex flex-wrap gap-2">
          <a href="https://wa.me/919686155558" target="_blank" 
             class="action-btn whatsapp shadow-md flex items-center justify-center gap-2" 
             style="padding: 6px 14px; font-size: 0.8rem; flex: 0 1 auto; background-color: #16a34a;">
            <i class="fa-brands fa-whatsapp text-lg"></i> Community
          </a>

          <a href="https://www.instagram.com/jayahariparayanasangha/" target="_blank" 
             class="action-btn instagram shadow-md flex items-center justify-center gap-2" 
             style="padding: 6px 14px; font-size: 0.8rem; flex: 0 1 auto;">
            <i class="fa-brands fa-instagram text-base"></i> Instagram
          </a>

          <a href="https://www.youtube.com/@JayaHariParayanaSangha" target="_blank" 
             class="action-btn youtube shadow-md flex items-center justify-center gap-2" 
             style="padding: 6px 14px; font-size: 0.8rem; flex: 0 1 auto;">
            <i class="fa-brands fa-youtube text-base"></i> Youtube
          </a>
        </div>
        
        <div class="pb-20"></div>
    `;

    area.innerHTML = html;
}