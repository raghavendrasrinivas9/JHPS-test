/* --- PARAYANA DATA --- */
window.parayanaData = {
    sequences: {
        rayara: [
            "Venkatesha Stotra", 
            "Vishnu Sahasranama", 
            "Manyu Skutha", 
            "Rama Stotra", 
            "Sundarakanda", 
            "Hari Vayu Stuti", 
            "Yantrodharaka Hanumat Stotra", 
            "Jayatheertha Stotra", 
            "Raghuttama Stotra", 
            "Raghavendra Stotra - 3 times"
        ],
        vayu: [
            "Venkatesha Stotra", 
            "Vishnu Sahasranama", 
            "Manyu Skutha", 
            "Rama Stotra", 
            "Sundarakanda", 
            "Hari Vayu Stuti - Purascharana", 
            "Yantrodharaka Hanumat Stotra", 
            "Jayatheertha Stotra", 
            "Raghuttama Stotra", 
            "Raghavendra Stotra"
        ],
        sundara: [
            "Venkatesha Stotra", 
            "Vishnu Sahasranama", 
            "Manyu Skutha", 
            "Rama Stotra", 
            "Sundarakanda - 3 times", 
            "Hari Vayu Stuti", 
            "Yantrodharaka Hanumat Stotra", 
            "Jayatheertha Stotra", 
            "Raghuttama Stotra", 
            "Raghavendra Stotra"
        ]
    },
    items: [
        { name: "Rayara Ashtottara", key: "rayara" },
        { name: "Hari Vayu Stuti Purascharana", key: "vayu" },
        { name: "Sundarakanda", key: "sundara" }
    ]
};

/* --- PARAYANA RENDERER --- */
function renderParayanaUI() {
    const area = document.getElementById('contentArea');
    const data = window.parayanaData;
    const WHATSAPP = "919686155558";
    const FORM = "https://docs.google.com/forms/d/1JZgvz4o701VtrCeTcyD5mb1Dl31DC_eAXagFk_2iUck/viewform";

    let html = `<h2 class='text-xl font-bold mb-4 text-orange-800 uppercase tracking-tight'>📖 Parayana</h2>
                <div class='flex flex-col gap-3'>`;

    data.items.forEach(item => {
        const steps = data.sequences[item.key];
        html += `
        <div class="border border-orange-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div onclick="toggleDropdown('${item.key}', 'dropdown')" class='bg-yellow-50 p-4 cursor-pointer flex justify-between items-center hover:bg-yellow-100 transition'>
                <span class="font-bold text-gray-800">✦ ${item.name}</span>
                <i id="icon-dropdown-${item.key}" class="fa-solid fa-chevron-down text-orange-500 rotate-icon"></i>
            </div>
            <div id="content-dropdown-${item.key}" class="dropdown-content">
                <ul class="list-disc list-inside text-sm text-gray-700 p-2 space-y-1">
                    ${steps.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    });

    html += `</div>
            <div class='mt-6 p-5 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl shadow-inner'>
                <p class='font-bold text-orange-900 text-sm mb-4 italic underline text-center'>
                    Please contact us via WhatsApp to confirm slots before registering.
                </p>
                
                <div class='flex flex-wrap justify-center gap-3'>
                    <a class='action-btn whatsapp shadow-md flex items-center justify-center gap-2' 
                       href='https://wa.me/${WHATSAPP}' target='_blank'
                       style="padding: 8px 16px; font-size: 0.85rem; flex: 0 1 auto; background-color: #16a34a;">
                        <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                    </a>
                    
                    <a class='action-btn form shadow-md flex items-center justify-center gap-2' 
                       href='${FORM}' target='_blank'
                       style="padding: 8px 16px; font-size: 0.85rem; flex: 0 1 auto; background-color: #2563eb;">
                        <i class="fa-solid fa-file-signature text-base"></i> Register
                    </a>
                </div>
            </div>
            <div class="pb-10"></div>`;

    area.innerHTML = html;
}