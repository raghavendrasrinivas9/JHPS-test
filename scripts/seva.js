/* --- SEVA DATA --- */
window.sevaData = {
    active: [
        { 
            name: "Anna Daana Seva", 
            desc: "#", 
            icon: "fa-bowl-food"
        },
        { 
            name: "Gow Seva", 
            desc: "#", 
            icon: "fa-cow"
        }
    ],
    contribution: {
        title: "General Contribution",
        desc: "#",
        link: "#" // Link to a form or payment gateway
     } 
};

/* --- SEVA RENDERER --- */
function renderSevaUI() {
    const area = document.getElementById('contentArea');
    const data = window.sevaData;

    if (!area) return;

    let html = `
        <h2 class="text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2">
            <i class="fa-solid fa-heart"></i> Seva Opportunities
        </h2>
        <p class="text-sm text-gray-600 mb-6 italic">"Your contribution supports our sacred traditions and community services."</p>
    `;

    // Render Active Seva Cards
    html += `<div class="grid gap-4 mb-8">`;
    data.active.forEach(seva => {
        html += `
            <div class="bg-white border border-orange-100 shadow-sm border-l-4 border-l-orange-500 p-4 rounded-xl flex items-start gap-4">
                <div class="bg-orange-50 p-3 rounded-lg text-orange-600 text-xl">
                    <i class="fa-solid ${seva.icon}"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                        <h4 class="font-bold text-orange-900">${seva.name}</h4>
                        <span class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-green-100 text-green-700">Active</span>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">${seva.desc}</p>
                </div>
            </div>`;
    });
    html += `</div>`;

    // Contribution Section (Button commented out for future use)
    html += `
        <div class="bg-orange-50 p-6 rounded-2xl border border-dashed border-orange-200 text-center">
            <h3 class="font-bold text-lg mb-2 text-orange-900">${data.contribution.title}</h3>
            <p class="text-gray-600 text-sm mb-4">${data.contribution.desc}</p>
            <p class="text-xs text-orange-400 italic"> </p>
        </div>
    `;

    area.innerHTML = html + `<div class="pb-20"></div>`;
}